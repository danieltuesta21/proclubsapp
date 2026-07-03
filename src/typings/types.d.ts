type RespExampleType = {
  id: number;
  version: string;
};

type MissionStatus = "active" | "completed" | "planned";

type MissionType = {
  id: string;
  name: string;
  status: MissionStatus;
  launchDate: string;
  target: string;
  description: string;
};

type MissionStats = {
  total: number;
  active: number;
  completed: number;
  planned: number;
};

type ClubMemberType = {
  name: string;
  proPos: string;
  gamesPlayed: string;
  goals: string;
  assists: string;
  manOfTheMatch: string;
  winRate: string;
  ratingAve: string;
  passesMade: string;
  passSuccessRate: string;
  tacklesMade: string;
  tackleSuccessRate: string;
};

type ClubOverallStatsType = {
  clubId: string;
  bestDivision: string;
  bestFinishGroup: string;
  finishesInDivision1Group1: string;
  finishesInDivision2Group1: string;
  finishesInDivision3Group1: string;
  finishesInDivision4Group1: string;
  finishesInDivision5Group1: string;
  finishesInDivision6Group1: string;
  gamesPlayed: string;
  gamesPlayedPlayoff: string;
  goals: string;
  goalsAgainst: string;
  promotions: string;
  relegations: string;
  losses: string;
  ties: string;
  wins: string;
  lastMatch0: string;
  lastMatch1: string;
  lastMatch2: string;
  lastMatch3: string;
  lastMatch4: string;
  lastMatch5: string;
  lastMatch6: string;
  lastMatch7: string;
  lastMatch8: string;
  lastMatch9: string;
  lastOpponent0: string;
  lastOpponent1: string;
  lastOpponent2: string;
  lastOpponent3: string;
  lastOpponent4: string;
  lastOpponent5: string;
  lastOpponent6: string;
  lastOpponent7: string;
  lastOpponent8: string;
  lastOpponent9: string;
  wstreak: string;
  unbeatenstreak: string;
  skillRating: string;
  reputationtier: string;
  leagueAppearances: string;
};

type ClubOverallStats = ClubOverallStatsType;

type ClubRank = {
  clubId: string;
  rank: string;
  leaguePoints: string;
};

type Match = {
  matchId: string;
  timestamp: number;
  clubs: {
    [clubId: string]: {
      score: string;
      goals: string;
      result: string;
    };
    players: {
      [clubId: string]: {
        [playerId: string]: {
          playername: string;
          goals: string;
          assists: string;
          rating: string;
        };
      };
    };
  };
};
