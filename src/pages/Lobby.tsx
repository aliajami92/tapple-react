import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../lib/firebase";
import { Game } from "../types/game";
import { joinGame } from "../lib/apis";
import { nanoid } from "nanoid";

const Lobby = () => {
  const params = useParams();

  const [game, setGame] = useState<Game | null>(null);
  const [name, setName] = useState("");
  const [isJoined, setIsJoind] = useState(false);

  useEffect(() => {
    const dbRef = ref(db, "/" + params.id);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const value = snapshot.val();
      setGame(value);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  async function handleJoinGame() {
    if (!params.id) return;
    console.log(params.id);
    const playerId = nanoid(4);

    const isPlayerJoined = await joinGame(params.id, name, playerId);

    if (isPlayerJoined) {
      localStorage.setItem("playerId", playerId);
      setIsJoind(isPlayerJoined);
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("playerId");
    if (userId) {
      const isPlayerInGame = game?.players[userId];
      setIsJoind(true);
    }
  }, []);

  return (
    <div>
      <div className="players-container">
        {Object.values(game?.players ?? {}).map((player) => (
          <div className="player" key={player.id}>
            {player.name}
          </div>
        ))}
      </div>
      {!isJoined && (
        <div style={{ display: "flex" }}>
          <input
            placeholder="Player name"
            type="text"
            name="gameId"
            id="gameId"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button disabled={!name} className="btn" onClick={handleJoinGame}>
            Join
          </button>
        </div>
      )}
    </div>
  );
};

export default Lobby;
