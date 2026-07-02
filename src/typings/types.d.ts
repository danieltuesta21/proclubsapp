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

type ClubOverallStats = {
  clubId: string;
  gamesPlayed: string;
  wins: string;
  losses: string;
  ties: string;
  goals: string;
  goalsAgainst: string;
  skillRating: string;
  leagueAppearances: string;
};

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
