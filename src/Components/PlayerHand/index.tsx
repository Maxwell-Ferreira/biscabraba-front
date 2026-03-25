import { memo } from "react";
import Player from "../../Components/Player";
import { deck } from "../../consts/deck";

import styles from "./styles.module.css";
import { Socket as SocketType } from "socket.io-client";
import { PlayerData } from "../../types";

interface PlayerHandProps {
  Socket: SocketType;
  player: PlayerData;
}

function PlayerHand({ Socket, player }: PlayerHandProps) {
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const cardIdStr = e.currentTarget.id;
    console.log("Card clicked:", cardIdStr);
    const cardId = parseInt(cardIdStr, 10);
    if (!isNaN(cardId)) {
      Socket.emit("playCard", { card_id: cardId });
    } else {
      console.error("Invalid card ID from click event", cardIdStr);
    }
  };

  return (
    <div className={styles.player}>
      <div className={styles.actualMove}>
        {player.actualMove && (
          <img
            className={`${styles.card} rotate-in-center actual-move`}
            style={{ marginBottom: "20px" }}
            src={deck[player.actualMove.id as unknown as keyof typeof deck]}
            alt="Jogada atual"
          />
        )}
      </div>

      <div className={styles.hand}>
        <Player
          style={{ width: "60px", fontSize: "10px", flexShrink: 0 }}
          player={player}
          withPoints
        />
        <div className={styles.cards}>
          {player.hand.map((card) => (
            <img
              onClick={handleClick}
              id={card?.id.toString()}
              key={card?.id}
              className={`${styles.card} rotate-in-center`}
              src={deck[card?.id as unknown as keyof typeof deck]}
              alt={`Carta ${card?.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(PlayerHand);
