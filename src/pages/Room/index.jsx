import { memo, useCallback, useEffect, useState } from "react";
import Player from "../../Components/Player";
import { hellos, ohNo } from "../../consts/audios";

import { playAudio, getRandomInt } from "../../utils";

import styles from './styles.module.css';

function Room({ Socket, initialGameData }) {
  const [gameData, setGameData] = useState(initialGameData);

  useEffect(() => {
    Socket.on('gameData', data => {
      setTimeout(() => {
        playAudio(hellos[getRandomInt(1, 4)]);
        setGameData(data);
      }, 2300)
    });

    Socket.on('room-playerDisconnected', data => {
      playAudio(ohNo);
      setGameData(data);
    });

  }, [Socket]);

  const getConectedPlayers = useCallback(() => {
    return gameData?.players?.map(p => <Player style={{ width: '120px' }} key={p.publicId} player={p} />)
  }, [gameData?.players]);

  const handleSubmit = () => { Socket.emit('startGame'); }

  return (
    <div className={`${styles.room} to-center`}>
      <div className={styles.info}>
        <h2>SALA #{gameData.idRoom}</h2>
        <p>Status: {gameData?.players.length !== gameData?.numPlayers
          ? 'Aguardando todos os jogadores entrarem.' : 'Pronto para Iniciar!'}</p>
        <p>Tipo de Jogo: {gameData?.numPlayers} jogadores</p>
      </div>
      <br />
      <div className={styles.players}>
        <h3>JOGADORES CONECTADOS:</h3>
        <br />
        <div> {getConectedPlayers()} </div>
      </div>
      {gameData?.players.length === gameData?.numPlayers &&
        <button type="button" className="pulsate-bck" onClick={handleSubmit}>INICIAR</button>}
    </div>
  )
}

export default memo(Room);