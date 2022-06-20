import { memo, useEffect, useState } from "react";

import styles from './styles.module.css';
import PlayerHand from "../PlayerHand";
import OtherPlayerHand from "../OtherPlayerHand";
import { naipes } from "../../consts/naipes";

function Table({ Socket, initialGameData }) {
  const [gameData, setGameData] = useState(initialGameData);

  console.log(gameData);

  useEffect(() => {
    Socket.on('game-gameData', data => setGameData(data));
    Socket.on('game-buyCard', data => {
      const moves = document.getElementsByName('actual-move');
      setTimeout(() => {
        for (const move of moves) {
          move.classList.add('roll-out-right');
        }
        setTimeout(() => {
          setGameData(data);
        }, 1000)
      }, 4000)
    });
  }, [Socket]);

  const getLeftPlayer = () => {
    const i = gameData.players.findIndex(p => p.publicId === gameData.currentPlayer.publicId);
    let player;
    if (gameData.players[i - 1]) { player = gameData.players[i - 1]; }
    else { player = gameData.players[3]; }

    return player;
  };

  const getRightPlayer = () => {
    const i = gameData.players.findIndex(p => p.publicId === gameData.currentPlayer.publicId);
    let player;
    if (gameData.players[i + 1]) { player = gameData.players[i + 1]; }
    else { player = gameData.players[0]; }

    return player;
  };

  return (
    <div className={styles.game}>

      <div className={styles.mid}>
        <img src={naipes['espadas']} alt="Naipe da partida." />
      </div>

      <div className={styles.top}>
        {
          gameData.numPlayers === 2
            ? <OtherPlayerHand player={gameData.players.find(p => p.publicId !== gameData.currentPlayer.publicId)} />
            : <OtherPlayerHand player={gameData.players.find(p =>
              p.team === gameData.currentPlayer.team &&
              p.publicId !== gameData.currentPlayer.publicId
            )} />
        }
      </div>
      <div className={styles.left}>
        {
          gameData.numPlayers === 4 &&
          <OtherPlayerHand player={getLeftPlayer()} horizontal='left' />
        }
      </div>
      <div className={styles.right}>
        {
          gameData.numPlayers === 4 &&
          <OtherPlayerHand player={getRightPlayer()} horizontal='right'/>
        }
      </div>
      <div className={styles.bot}>
        <PlayerHand Socket={Socket} player={gameData.currentPlayer} />
      </div>
    </div>
  );
}

export default memo(Table);