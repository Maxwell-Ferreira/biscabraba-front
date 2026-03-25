import { memo, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.css";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { Socket as SocketType } from "socket.io-client";
import { Message } from "../../types";

interface ChatProps {
  Socket: SocketType;
}

function Chat({ Socket }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    Socket.on("chat-message", (msg: Message) => {
      console.log(msg);
      setMessages((curr) => [...curr, msg]);
    });
  }, [Socket]);

  const getMessages = () =>
    messages.map((msg, idx) => (
      <div key={msg.id || idx}>
        <strong> {msg.playerName || msg.player}</strong>: {msg.text}
      </div>
    ));

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Socket.emit("message", { text: text });
  };

  return (
    <div className={`${styles.chat}`}>
      <h5>CHAT</h5>
      <div className={styles.messages}>{getMessages()}</div>
      <div className={styles.input}>
        <textarea onChange={handleText} />
        <button type="submit" onClick={handleSubmit}>
          {" "}
          <FontAwesomeIcon icon={faPaperPlane} />{" "}
        </button>
      </div>
    </div>
  );
}

export default memo(Chat);
