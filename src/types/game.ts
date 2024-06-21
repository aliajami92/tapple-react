export type Player = {
  id: string;
  name: string;
  isHost: boolean;
};

export type Game = {
  code: string;
  timer: number;
  players: Record<string, Player>;
  nextPlayerId: string;
  locked: boolean;
  answers: Record<string, boolean>;
};
