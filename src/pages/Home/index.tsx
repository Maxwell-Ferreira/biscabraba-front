import { memo, useState, ReactElement } from "react";
import styles from "./styles.module.css";
import { Socket as SocketType } from "socket.io-client";

import { avatars } from "../../consts/avatars";

interface HomeProps {
  Socket: SocketType;
}

function Home({ Socket }: HomeProps): ReactElement {
  const [activeForm, setActiveForm] = useState<"CREATE" | "ENTER">("CREATE");
  const [idRoom, setIdRoom] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [numPlayers, setNumPlayers] = useState<number | null>(null);
  const [activeAvatar, setActiveAvatar] = useState<number | null>(null);

  const handleActiveForm = () => {
    setActiveForm((curr) => (curr === "CREATE" ? "ENTER" : "CREATE"));
  };
  const handleIdRoom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdRoom(e.target.value);
  };
  const handlePlayerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };
  const handleNumPlayers = (e: React.MouseEvent<HTMLSpanElement>) => {
    setNumPlayers((e.target as HTMLElement).id === "2" ? 2 : 4);
  };
  const handleActiveAvatar = (e: React.MouseEvent<HTMLImageElement>) => {
    setActiveAvatar(parseInt((e.target as HTMLElement).id));
  };

  const handleSubmit = () => {
    const data: any = { idRoom, playerName, avatar: activeAvatar.toString() };
    let emit = "enterRoom";

    if (activeForm === "CREATE") {
      data.numPlayers = numPlayers;
      emit = "createRoom";
    }
    Socket.emit(emit, data);
  };

  const loadAvatars = () => {
    return avatars.map((avatar, i) => (
      <img
        className={activeAvatar === i + 1 ? styles.selected : ""}
        onClick={handleActiveAvatar}
        src={avatar}
        id={(i + 1).toString()}
        key={i}
        alt={`avatar ${i + 1}`}
      />
    ));
  };

  return (
    <div className={styles.room}>
      <h1 className="cool-font">BISCA BRABA</h1>
      <h2> {activeForm === "CREATE" ? "Criar Sala" : "Entrar em uma Sala"} </h2>
      <form>
        <div className={styles.title}>
          <div className={styles.avatars}>{loadAvatars()}</div>
        </div>
        <div className={styles.inputs}>
          <div className={styles.formGroup}>
            <label htmlFor="idRoom">ID da Sala</label>
            <input
              id="idRoom"
              name="idRoom"
              type="text"
              onChange={handleIdRoom}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="playerName">Apelido</label>
            <input
              id="playerName"
              name="playerName"
              type="text"
              onChange={handlePlayerName}
            />
          </div>
          {activeForm === "CREATE" && (
            <div className={styles.formGroup}>
              <div className={styles.numPlayers}>
                <span
                  onClick={handleNumPlayers}
                  id="2"
                  className={numPlayers === 2 ? styles.active : ""}
                >
                  2 Jogadores
                </span>
                <span
                  onClick={handleNumPlayers}
                  id="4"
                  className={numPlayers === 4 ? styles.active : ""}
                >
                  4 Jogadores
                </span>
              </div>
            </div>
          )}
          <div className={styles.formGroup}>
            <button onClick={handleSubmit} type="button">
              {activeForm === "CREATE" ? "CRIAR" : "ENTRAR"}
            </button>
          </div>
        </div>
      </form>
      <div className={styles.footer}>
        <span onClick={handleActiveForm}>
          {activeForm === "CREATE"
            ? "Clique aqui para entrar em uma sala"
            : "Clique aqui para criar uma sala"}
        </span>
      </div>
    </div>
  );
}

export default memo(Home);
