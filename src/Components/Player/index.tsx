import React, { memo } from "react";
import { avatars } from "../../consts/avatars";
import { PlayerPublicData } from "../../types";

import styles from "./styles.module.css";

interface PlayerProps {
  player: PlayerPublicData;
  style?: React.CSSProperties;
  withPoints?: boolean;
}

function Player({ player, style, withPoints }: PlayerProps) {
  const avatar = avatars[player.avatar - 1] || avatars[0];

  return (
    <div style={style} className={`${styles.avatar} rotate-in-center`}>
      <img src={avatar} alt={`player ${player.publicId}`} />
      <h3>{player.name}</h3>
      {withPoints && player.points + " pontos"}
    </div>
  );
}

export default memo(Player);
