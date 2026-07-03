

const BASE_URL = process.env.FC_PROCLUBS_BASE_URL || "https://proclubs.ea.com/api/fc";
const FC_CLUB_ID = process.env.FC_CLUB_ID || "";
const FC_CLUB_PLATFORM = process.env.FC_CLUB_PLATFORM || "common-gen5";
const FC_CLUB_NAME = process.env.FC_CLUB_NAME || "My Club";

function asNumber(v: number) {
  const n = Number(v);
  return isFinite(n) ? n : null;
}

function firstDefined(obj: any, keys: string[]): any {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null) return obj[k];
  }
  return undefined;
}

async function fetchJson(url: string) {
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9",
      "sec-ch-ua": "\"Google Chrome\";v=\"141\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"141\"",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ── Normalisation des réponses EA ─────────────────────────────────────────
// Ces fonctions traduisent les réponses brutes EA en objets stables.
// Si EA renomme un champ, ajouter l'alias ici sans toucher au reste du code.

function normalizeClubInfo(raw) {
  const obj = Array.isArray(raw) ? raw[0] : raw && typeof raw === "object" ? raw : {};
  return {
    name: firstDefined(obj, ["name", "clubName"]) || process.env.CLUB_NAME || "My Club",
    clubId: firstDefined(obj, ["clubId", "id"]) || FC_CLUB_ID,
    regionId: firstDefined(obj, ["regionId"]),
    teamId: firstDefined(obj, ["teamId"]),
    customKit: firstDefined(obj, ["customKit"]),
  };
}

function normalizePlayers(raw) {
  const arr = Array.isArray(raw) ? raw : raw && typeof raw === "object" ? Object.values(raw) : [];
  return arr
    .filter((p) => p && p.name)
    .map((p, i) => {
      const stats = Array.isArray(p) ? p[i] : p;
      return {
        name: firstDefined(stats, ["name", "proName"]) || "?",
        matches: asNumber(firstDefined(stats, ["gamesPlayed", "games_played", "matches"])) || 0,
        wins: asNumber(firstDefined(stats, ["wins"])) || 0,
        losses: asNumber(firstDefined(stats, ["losses"])) || 0,
        ties: asNumber(firstDefined(stats, ["ties", "draws"])) || 0,
        goals: asNumber(firstDefined(stats, ["goals"])) || 0,
        assists: asNumber(firstDefined(stats, ["assists"])) || 0,
        cleanSheetsDef: asNumber(firstDefined(stats, ["cleanSheetsDef"])) || 0,
        cleanSheetsGK: asNumber(firstDefined(stats, ["cleanSheetsGK"])) || 0,
        shotSuccessRate: asNumber(firstDefined(stats, ["shotSuccessRate"])) || 0,
        passesMade: asNumber(firstDefined(stats, ["passesMade"])) || 0,
        passSuccessRate: asNumber(firstDefined(stats, ["passSuccessRate"])) || 0,
        ratingAve: asNumber(firstDefined(stats, ["ratingAve", "averageRating"])) || 0,
        tacklesMade: asNumber(firstDefined(stats, ["tacklesMade"])) || 0,
        tackleSuccessRate: asNumber(firstDefined(stats, ["tackleSuccessRate"])) || 0,
        proName: firstDefined(stats, ["proName"]) || "",
        proPos: firstDefined(stats, ["proPos"]) || "",
        proStyle: firstDefined(stats, ["proStyle"]) || "",
        proHeight: firstDefined(stats, ["proHeight"]) || "",
        proNationality: firstDefined(stats, ["proNationality"]) || "",
        proOverall: asNumber(firstDefined(stats, ["proOverall"])) || 0,
        proOverallStr: firstDefined(stats, ["proOverallStr"]) || "",
      };
    });
}

function extractCurrentDivision(seasonalRaw) {
  if (!seasonalRaw) return null;
  const DIV_FIELDS = [
    "currentDivision",
    "division",
    "div",
    "currentDiv",
    "divisionId",
    "skill",
    "currentSeasonDivision",
    "relegationDivision",
    "promotionDivision",
  ];

  const tryObj = (obj) => {
    if (!obj || typeof obj !== "object") return 0;
    const v = asNumber(firstDefined(obj, DIV_FIELDS));
    if (v > 0 && v <= 5) return v;
    for (const key of DIV_FIELDS) {
      if (obj[key] !== undefined) {
        const n = asNumber(obj[key]);
        if (n > 0 && n <= 5) return n;
      }
    }
    return 0;
  };

  const root = Array.isArray(seasonalRaw)
    ? seasonalRaw[0]
    : seasonalRaw && typeof seasonalRaw === "object"
      ? Object.values(seasonalRaw)[0] || seasonalRaw
      : null;
  if (!root || typeof root !== "object") return null;

  const div =
    tryObj(root) ||
    tryObj(root?.clubInfo) ||
    tryObj(root?.seasonalStats) ||
    (Array.isArray(root?.seasons) ? tryObj(root.seasons[root.seasons.length - 1]) : 0) ||
    Object.values(root).reduce(
      (acc, val) => acc || (val && typeof val === "object" ? tryObj(val) : 0),
      0
    );

  return div > 0 ? div : null;
}

function extractClubRecord(raw) {
  if (!raw) return null;
  const obj = Array.isArray(raw) ? raw[0] : raw;
  if (!obj || typeof obj !== "object") return null;
  const w = asNumber(firstDefined(obj, ["wins", "w"]));
  const d = asNumber(firstDefined(obj, ["draws", "ties", "d"]));
  const l = asNumber(firstDefined(obj, ["losses", "l"]));
  if (w === null && d === null && l === null) return null;
  return { wins: w || 0, draws: d || 0, losses: l || 0 };
}

async function getClubInfo() {
  return fetchJson(
    `${BASE_URL}/clubs/info?platform=${encodeURIComponent(FC_CLUB_PLATFORM)}&clubIds=${encodeURIComponent(FC_CLUB_ID)}`
  );
}

async function getClubMembers() {
  return fetchJson(
    `${BASE_URL}/clubs/members?platform=${encodeURIComponent(FC_CLUB_PLATFORM)}&clubId=${encodeURIComponent(FC_CLUB_ID)}`
  );
}

async function getClubOverallStats() {
  return fetchJson(
    `${BASE_URL}/clubs/overallStats?platform=${encodeURIComponent(FC_CLUB_PLATFORM)}&clubId=${encodeURIComponent(FC_CLUB_ID)}`
  );
}

async function getClubSeasonalStats() {
  return fetchJson(
    `${BASE_URL}/clubs/seasonalStats?platform=${encodeURIComponent(FC_CLUB_PLATFORM)}&clubIds=${encodeURIComponent(FC_CLUB_ID)}`
  );
}

async function getDivisionFromSeasonalStats() {
  const raw = await getClubSeasonalStats();
  return extractCurrentDivision(raw);
}

async function getDivisionFromRankings() {
  const raw = await fetchJson(
    `${BASE_URL}/rankings?platform=${encodeURIComponent(FC_CLUB_PLATFORM)}&clubIds=${encodeURIComponent(FC_CLUB_ID)}`
  );
  if (!Array.isArray(raw)) return null;
  const entry = raw.find((e) => String(e.clubId) === String(FC_CLUB_ID));
  if (!entry) return null;
  const div = asNumber(
    firstDefined(entry, ["currentDivision", "division", "div", "currentDiv", "divisionId"])
  );
  return div && div >= 1 && div <= 5 ? div : null;
}


// ── Exports ────────────────────────────────────────────────────────────────

module.exports = {
  getClubInfo,
  getClubMembers,
  getClubOverallStats,
  getClubSeasonalStats,
  getDivisionFromSeasonalStats,
  getDivisionFromRankings,
  normalizeClubInfo,
  normalizePlayers,
  extractCurrentDivision,
  extractClubRecord,
};
