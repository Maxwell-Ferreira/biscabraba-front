import { memo } from "react";
import Player from "../../Components/Player";
import { deck } from "../../consts/deck";

import styles from './styles.module.css';

function PlayerHand({ Socket, player }) {

  const handleClick = (e) => {
    const card = e.target.id;
    console.log(card);
    Socket.emit('playCard', { card_id: parseInt(card) });
  }

  return (
    <div className={styles.player}>

      <div div={styles.actualMove}>
        {player.actualMove &&
          <img className={`${styles.card} rotate-in-center actual-move`}
            style={{ marginBottom: '20px' }}
            src={deck[player.actualMove.id]}
            name="actual-move"
            alt="Jogada atual" />}
      </div>

      <div className={styles.hand}>
        <Player style={{ width: '60px', fontSize: '10px', 'flexShrink': 0 }} player={player} withPoints />
        <div className={styles.cards}>
          {player.hand.map(card => (
            <img onClick={handleClick}
              id={card?.id}
              key={card?.id}
              className={`${styles.card} rotate-in-center`}
              src={deck[card?.id]}
              alt={`Carta ${card?.id}`} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default memo(PlayerHand);