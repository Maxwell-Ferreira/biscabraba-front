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
    Socket.on("game-player-disconected", () => {
      const audio = playAudio(ohNo);
      audio.addEventListener("ended", () => window.location.reload());
    });
    Socket.on("card-played", (data: GameData) => setGameData(data));
    Socket.on("buy-card", (data: GameData) => setGameData(data));
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
