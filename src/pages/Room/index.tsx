import { memo, useCallback, useEffect, useState } from "react";
import Player from "../../Components/Player";
import { hellos, ohNo } from "../../consts/audios";

import { playAudio, getRandomInt } from "../../utils";

import styles from "./styles.module.css";
import { Socket as SocketType } from "socket.io-client";
import { GameData } from "../../types";

interface RoomProps {
  Socket: SocketType;
  initialGameData: GameData | null;
}

function Room({ Socket, initialGameData }: RoomProps) {
  const [gameData, setGameData] = useState<GameData | null>(initialGameData);

  useEffect(() => {
    Socket.on("gameData", (data: GameData) => {
      setTimeout(() => {
        playAudio(hellos[getRandomInt(1, 4) as keyof typeof hellos]);
        setGameData(data);
      }, 2300);
    });

    Socket.on("room-playerDisconnected", (data: GameData) => {
      playAudio(ohNo);
      setGameData(data);
    });
  }, [Socket]);

  const getConectedPlayers = useCallback(() => {
    return gameData?.players?.map((p) => (
      <Player style={{ width: "120px" }} key={p.publicId} player={p} />
    ));
  }, [gameData?.players]);

  const handleSubmit = () => {
    Socket.emit("startGame");
  };

  return (
    <div className={`${styles.room} to-center`}>
      <div className={styles.info}>
        <h2>SALA #{gameData?.idRoom}</h2>
        <p>
          Status:{" "}
          {gameData && gameData.players.length !== gameData.numPlayers
            ? "Aguardando todos os jogadores entrarem."
            : "Pronto para Iniciar!"}
        </p>
        <p>Tipo de Jogo: {gameData?.numPlayers} jogadores</p>
      </div>
      <br />
      <div className={styles.players}>
        <h3>JOGADORES CONECTADOS:</h3>
        <br />
        <div style={{ display: "flex" }}> {getConectedPlayers()} </div>
      </div>
      {gameData && gameData.players.length === gameData.numPlayers && (
        <button type="button" className="pulsate-bck" onClick={handleSubmit}>
          INICIAR
        </button>
      )}
    </div>
  );
}

export default memo(Room);
