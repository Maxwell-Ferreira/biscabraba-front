import { memo, useEffect, useState } from "react"
import styles from './styles.module.css';

import Chat from "../../Components/Chat";
import Version from "../../Components/Version";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassMinus, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { naipes } from "../../consts/naipes";

function SideBar({ Socket, idRoom, gameTrump, playerTurn }) {
  const [zoom, setZoom] = useState(1);

  const mainDiv = document.getElementById('main');

  const zoomIn = e => { setZoom(prev => prev + 0.1); }
  const zoomOut = e => { setZoom(prev => prev - 0.1); }

  useEffect(() => {
    mainDiv.style.transform = `scale(${zoom})`;
  }, [zoom, mainDiv.style]);
  
  return (
    <div className={styles.leftBar}>
      <div className={styles.zoom}>
        <button onClick={zoomIn}><FontAwesomeIcon icon={ faMagnifyingGlassPlus } /></button>
        <button onClick={zoomOut}><FontAwesomeIcon icon={ faMagnifyingGlassMinus } /></button>
      </div>
      <h2 className="cool-font">BISCA BRABA</h2>
      <div className={styles.info}>
        <p><strong>ID: </strong> {idRoom}</p>
        <p>
          <strong>Trunfo: </strong> 
          <span>{gameTrump.toUpperCase()} </span>
          <span>
            <img src={naipes[gameTrump]} width="14px" alt="Trunfo" />
          </span>
        </p>
      </div>
      <div className={styles.turn}> Vez de <strong>{playerTurn}</strong> jogar! </div>
      <Chat Socket={Socket} />
      <Version />
    </div>
  )
}

export default memo(SideBar);