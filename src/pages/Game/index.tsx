import { memo, useEffect, useState } from "react";

import SideBar from "../../Components/SideBar";
import { ohNo } from "../../consts/audios";

import { playAudio } from "../../utils";

import styles from "./styles.module.css";
import Table from "../../Components/Table";
import { Socket as SocketType } from "socket.io-client";
import { GameData } from "../../types";

interface GameProps {
  Socket: SocketType;
  initialGameData: GameData | null;
}

function Game({ Socket, initialGameData }: GameProps) {
  const [gameData, setGameData] = useState<GameData | null>(initialGameData);

  useEffect(() => {
    const handleDisconnect = () => {
      const audio = playAudio(ohNo);
      audio.addEventListener("ended", () => window.location.reload());
    };
    Socket.on("game-player-disconected", handleDisconnect);
    Socket.on("game-playerDisconnected", handleDisconnect);

    const handleGameData = (data: GameData) => setGameData(data);
    Socket.on("card-played", handleGameData);
    Socket.on("game-gameData", handleGameData);
    Socket.on("buy-card", handleGameData);
    Socket.on("game-buyCard", handleGameData);

    return () => {
      Socket.off("game-player-disconected", handleDisconnect);
      Socket.off("game-playerDisconnected", handleDisconnect);
      Socket.off("card-played", handleGameData);
      Socket.off("game-gameData", handleGameData);
      Socket.off("buy-card", handleGameData);
      Socket.off("game-buyCard", handleGameData);
    };
  }, [Socket]);

  if (!gameData) return null;

  return (
    <div className={styles.container}>
      <SideBar
        Socket={Socket}
        idRoom={gameData.idRoom}
        gameTrump={gameData.gameTrump}
        playerTurn={
          gameData.players.find((p) => p.publicId === gameData.playerTurn)
            ?.name || ""
        }
      />
      <Table Socket={Socket} initialGameData={gameData} />
    </div>
  );
}

export default memo(Game);
