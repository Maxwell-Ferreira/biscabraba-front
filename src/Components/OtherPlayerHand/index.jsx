import { memo } from "react";
import Player from "../../Components/Player";
import { deck } from "../../consts/deck";

import cardVerse from '../../assets/img/deck/verse.svg';
import styles from './styles.module.css';

function OtherPlayerHand({ player, horizontal }) {

  const getAnotherPlayerCards = (player) => {
    const cards = [];
    for (let i = 0; i < player.numCards; i++) {
      cards.push(<img key={i} src={cardVerse} className={styles.card} alt="cardVerse" />);
    }
    return cards;
  };

  const cardsStyle = {
    left: { transform: 'rotate(90deg)', marginTop: '80px' },
    right: { transform: 'rotate(-90deg)', marginBottom: '80px' }
  }

  return (
    <div className={styles.player}>
      <div className={styles.hand}
        style={horizontal ? { 'flex-direction': horizontal === 'right' ? 'column-reverse' : 'column' } : {}} >

        <Player
          style={{
            width: '60px',
            fontSize: '10px',
            flexShrink: 0
          }}
          player={player}
          withPoints />

        <div className={styles.cards} style={cardsStyle[horizontal]} >
          {getAnotherPlayerCards(player)}
        </div>
      </div>

      <div className={`${styles.actualMove} ${styles[horizontal]}`} >
        {player.actualMove &&
          <img className={`${styles.card} rotate-in-center actual-move`}
            style={{ marginTop: '20px' }}
            src={deck[player.actualMove.id]}
            name='actual-move'
            alt="Jogada atual" />}
      </div>
    </div>
  );
}

export default memo(OtherPlayerHand);