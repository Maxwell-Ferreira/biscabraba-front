import { memo, useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './styles.module.css';
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";

function Chat({ Socket }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    Socket.on('chat-message', msg => {
      console.log(msg);
      setMessages(curr => [...curr, msg]);
    });

  }, [Socket]);

  const getMessages = () => 
    messages.map(msg => (
      <div key={msg.id}>
        <strong> {msg.playerName}</strong>: {msg.text}
      </div>
    )
  );

  const handleText = (e) => { setText(e.target.value); };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    Socket.emit('message', { text: text });
  }

  return (
    <div className={`${styles.chat}`}>
      <h5>CHAT</h5>
      <div className={styles.messages}>
        {getMessages()}
      </div>
      <div className={styles.input}>
        <textarea onChange={handleText} />
        <button type="submit" onClick={handleSubmit}> <FontAwesomeIcon icon={faPaperPlane} /> </button>
      </div>
    </div>
  )
}

export default memo(Chat);
