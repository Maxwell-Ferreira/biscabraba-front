import { memo, useState } from 'react';
import styles from './styles.module.css';

import { avatars } from '../../consts/avatars';

function Home({ Socket }) {

  const [activeForm, setActiveForm] = useState('CREATE');
  const [idRoom, setIdRoom] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [numPlayers, setNumPlayers] = useState(null);
  const [activeAvatar, setActiveAvatar] = useState(null);

  const handleActiveForm = () => { setActiveForm(curr => curr === 'CREATE' ? 'ENTER' : 'CREATE'); };
  const handleIdRoom = (e) => { setIdRoom(e.target.value); };
  const handlePlayerName = (e) => { setPlayerName(e.target.value); };
  const handleNumPlayers = e => { setNumPlayers(e.target.id === '2' ? 2 : 4) };
  const handleActiveAvatar = e => { setActiveAvatar(e.target.id) };

  const handleSubmit = () => {
    const data = { idRoom, playerName, avatar: activeAvatar }
    let emit = 'enterRoom'

    if (activeForm === 'CREATE') {
      data.numPlayers = numPlayers;
      emit = 'createRoom';
    }
    Socket.emit(emit, data);
  }

  const loadAvatars = () => {
    return avatars.map((avatar, i) => <img 
        className={parseInt(activeAvatar) === (i + 1) ? styles.selected : ''}
        onClick={handleActiveAvatar}
        src={avatar}
        id={i + 1}
        key={i}
        alt={`avatar ${i + 1}`}
      />
    )
  }

  return (
    <div className={styles.room}>
      <h1 className='cool-font'>BISCA BRABA</h1>
      <h2> {activeForm === 'CREATE' ? 'Criar Sala' : 'Entrar em uma Sala'} </h2>
      <form>
        <div className={styles.title}>
          <div className={styles.avatars}>
            {loadAvatars()}
          </div>
        </div>
        <div className={styles.inputs}>
          <div className={styles.formGroup}>
            <label htmlFor="idRoom">ID da Sala</label>
            <input id='idRoom' name='idRoom' type="text" onChange={handleIdRoom} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="playerName">Apelido</label>
            <input id='playerName' name='playerName' type="text" onChange={handlePlayerName} />
          </div>
          {activeForm === 'CREATE' &&
            <div className={styles.formGroup}>
              <div className={styles.numPlayers}>
                <span onClick={handleNumPlayers} id='2' className={numPlayers === 2 ? styles.active : ''}>2 Jogadores</span>
                <span onClick={handleNumPlayers} id='4' className={numPlayers === 4 ? styles.active : ''}>4 Jogadores</span>
              </div>
            </div>
          }
          <div className={styles.formGroup}>
            <button onClick={handleSubmit} type='button'>{activeForm === 'CREATE' ? 'CRIAR' : 'ENTRAR'}</button>
          </div>
        </div>
      </form>
      <div className={styles.footer}>
        <span onClick={handleActiveForm}>
          {activeForm === 'CREATE' ? 'Clique aqui para entrar em uma sala' : 'Clique aqui para criar uma sala'}
        </span>
      </div>
    </div>
  )
}

export default memo(Home);