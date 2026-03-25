import { memo } from "react";
import Player from "../../Components/Player";
import { deck } from "../../consts/deck";

import cardVerse from "../../assets/img/deck/verse.svg";
import styles from "./styles.module.css";
import { PlayerPublicData } from "../../types";

interface OtherPlayerHandProps {
  player?: PlayerPublicData;
  horizontal?: "left" | "right";
}

function OtherPlayerHand({ player, horizontal }: OtherPlayerHandProps) {
  if (!player) return null;

  const getAnotherPlayerCards = (player: PlayerPublicData) => {
    const cards = [];
    for (let i = 0; i < player.numCards; i++) {
      cards.push(
        <img key={i} src={cardVerse} className={styles.card} alt="cardVerse" />,
      );
    }
    return cards;
  };

  const cardsStyle = {
    left: { transform: "rotate(90deg)", marginTop: "80px" },
    right: { transform: "rotate(-90deg)", marginBottom: "80px" },
  };

  return (
    <div className={styles.player}>
      <div
        className={styles.hand}
        style={
          horizontal
            ? {
                flexDirection:
                  horizontal === "right" ? "column-reverse" : "column",
              }
            : {}
        }
      >
        <Player
          style={{
            width: "60px",
            fontSize: "10px",
            flexShrink: 0,
          }}
          player={player}
          withPoints
        />

        <div
          className={styles.cards}
          style={horizontal ? cardsStyle[horizontal] : undefined}
        >
          {getAnotherPlayerCards(player)}
        </div>
      </div>

      <div
        className={`${styles.actualMove} ${horizontal ? styles[horizontal] : ""}`}
      >
        {player.actualMove && (
          <img
            className={`${styles.card} rotate-in-center actual-move`}
            style={{ marginTop: "20px" }}
            src={deck[player.actualMove.id as keyof typeof deck]}
            alt="Jogada atual"
          />
        )}
      </div>
    </div>
  );
}

export default memo(OtherPlayerHand);
