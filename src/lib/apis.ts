import { child, get, ref, set, update } from "firebase/database";
import { db } from "./firebase";
import { Game, Player } from "../types/game";
import { nanoid } from "nanoid";

const dbRef = ref(db);

const answers = {
  a: false,
  b: false,
  c: false,
  d: false,
  e: false,
  f: false,
  g: false,
  h: false,
  i: false,
  j: false,
  k: false,
  l: false,
  m: false,
  n: false,
  o: false,
  p: false,
  q: false,
  r: false,
  s: false,
  t: false,
  u: false,
  v: false,
  w: false,
  x: false,
  y: false,
  z: false,
};

export async function createGame(
  timer: number,
  code: string,
  playerCode: string,
  playerName: string
) {
  const game: Game = {
    code,
    timer,
    players: {
      [playerCode]: {
        id: playerCode,
        name: playerName,
        isHost: true,
      },
    },
    nextPlayerId: "",
    locked: false,
    answers,
  };

  await set(ref(db, "/" + code), game);
}

export async function getGameData(gameId: string) {
  try {
    const game = await get(child(dbRef, `/${gameId}`));
    return game.val();
  } catch (e) {
    console.error(e);
  }
}

export async function joinGame(
  gameId: string,
  playerName: string,
  playerId: string
) {
  const newPlayer = {
    id: playerId,
    name: playerName,
    isHost: false,
  };

  const updates: Record<string, Player> = {};
  updates[`/${gameId}/players/${playerId}`] = newPlayer;

  try {
    await update(ref(db), updates);
    return true;
  } catch (e) {
    return false;
  }
}
