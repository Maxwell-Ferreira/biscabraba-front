import { memo, useEffect, useState } from "react";

import SideBar from "../../Components/SideBar";
import { ohNo } from "../../consts/audios";

import { playAudio } from "../../utils";

import styles from './styles.module.css';
import Table from "../../Components/Table";

function Game({ Socket, initialGameData }) {
  const [gameData, setGameData] = useState(initialGameData);

  useEffect(() => {
    Socket.on('game-playerDisconnected', () => {
      const audio = playAudio(ohNo);
      audio.addEventListener('ended', () => window.location.reload());
    });
    Socket.on('game-gameData', data => setGameData(data));
    Socket.on('game-buyCard', data => setGameData(data));
  }, [Socket]);

  return (
    <div className={styles.container}>
      <SideBar
        Socket={Socket}
        idRoom={gameData.idRoom}
        gameTrump={gameData.gameTrump}
        playerTurn={ gameData.players.find(p => p.publicId === gameData.playerTurn).name } />
      <Table
       Socket={Socket}
       initialGameData={gameData} />
    </div>
  )
}

export default memo(Game);