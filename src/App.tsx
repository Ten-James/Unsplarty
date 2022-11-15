import { useState, useEffect } from 'react'
import { subscribe, write } from './firebase'
import Lobby from './lobby'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('lobby')
  const [players, setPlayers] = useState<string[]>([])
  const [name, setName] = useState('')

  const amIMaster = players !== null && players[0] === name


  useEffect(() => {
    subscribe('players', setPlayers);
    subscribe('gameState', setGameState);
    
    return () => {
      if (amIMaster) {
        write('gameState', 'lobby');
        write('players', []);
      }
    }
  }, [])
  
  return (
    <div className="App">
      {amIMaster && <p>I am master</p>}
      {gameState === 'lobby' && <Lobby players={players} name={name} setName={setName} />}
    </div>
  );
};

export default App
