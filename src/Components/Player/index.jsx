import { memo } from "react";
import { avatars } from "../../consts/avatars";

import styles from './styles.module.css';

function Player({ player, style, withPoints }) {
  const avatar = avatars[parseInt(player.avatar) - 1];

  return (
    <div style={ style } className={`${styles.avatar} rotate-in-center`}>
      <img src={avatar} alt={`player ${player.publicId}`} />
      <h3>{player.name}</h3>
      { withPoints && player.points + ' pontos' }
    </div>
  )
}

export default memo(Player);