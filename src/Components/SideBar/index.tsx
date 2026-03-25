import { memo, useEffect, useState } from "react";
import styles from "./styles.module.css";

import Chat from "../../Components/Chat";
import Version from "../../Components/Version";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import { naipes } from "../../consts/naipes";
import { Socket as SocketType } from "socket.io-client";

interface SideBarProps {
  Socket: SocketType;
  idRoom: string;
  gameTrump: string;
  playerTurn: string;
}

function SideBar({ Socket, idRoom, gameTrump, playerTurn }: SideBarProps) {
  const [zoom, setZoom] = useState(1);

  const zoomIn = () => {
    setZoom((prev) => prev + 0.1);
  };
  const zoomOut = () => {
    setZoom((prev) => prev - 0.1);
  };

  useEffect(() => {
    const mainDiv = document.getElementById("main");
    if (mainDiv) mainDiv.style.transform = `scale(${zoom})`;
  }, [zoom]);

  return (
    <div className={styles.leftBar}>
      <div className={styles.zoom}>
        <button onClick={zoomIn}>
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
        </button>
        <button onClick={zoomOut}>
          <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
        </button>
      </div>
      <h2 className="cool-font">BISCA BRABA</h2>
      <div className={styles.info}>
        <p>
          <strong>ID: </strong> {idRoom}
        </p>
        <p>
          <strong>Trunfo: </strong>
          <span>{gameTrump?.toUpperCase()} </span>
          <span>
            {gameTrump && naipes[gameTrump as keyof typeof naipes] && (
              <img
                src={naipes[gameTrump as keyof typeof naipes]}
                width="14px"
                alt="Trunfo"
              />
            )}
          </span>
        </p>
      </div>
      <div className={styles.turn}>
        {" "}
        Vez de <strong>{playerTurn}</strong> jogar!{" "}
      </div>
      <Chat Socket={Socket} />
      <Version />
    </div>
  );
}

export default memo(SideBar);
