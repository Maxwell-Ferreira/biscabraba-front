import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader';
import Room from '../Room';
import Home from '../Home';
import styles from './styles.module.css';
import Game from '../Game';
import { playAudio } from '../../utils';
import { nope } from '../../consts/audios';

export default function Main({ Socket }) {
  const [screen, setScreen] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [initialGameData, setInitialGameData] = useState(null);

  const screens = {
    0: <Room Socket={Socket} initialGameData={initialGameData} />,
    1: <Home Socket={Socket} />,
    2: <Game Socket={Socket} initialGameData={initialGameData} />
  }

  const showErrors = (errors) => {
    playAudio(nope);
    const messages = document.getElementById('messages-box');
    errors.forEach(({ message }, i) => {
      setTimeout(() => {
        const span = document.createElement('span');
        span.classList = 'primary slide-in-right'
        span.textContent = message;
  
        messages.appendChild(span);
        setTimeout(() => { span.remove() }, 4500);
      }, i * 200)
    });
  };

  useEffect(() => {
    Socket.on('loadRoom', (data) => {
      setIsLoading(true);
      setTimeout(() => {
        setScreen(0);
        setInitialGameData(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }, 2000);
    });

    Socket.on('gameData', data => { setInitialGameData(data); });
    Socket.on('error', errors => { showErrors(errors); });

    Socket.on('startGame', (data) => {
      setIsLoading(true);
      setInitialGameData(data);
      setTimeout(() => {
        setScreen(2);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }, 2000);
    });
  }, [Socket]);

  return (
    <div id='main' className={`${styles.main} to-center seccondary`}>
      <Loader isLoading={isLoading} />
      <div id='messages-box' className={styles.messages}></div>
      {screens[screen]}
    </div>
  )
}