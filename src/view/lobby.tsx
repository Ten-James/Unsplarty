import { useContext } from 'react';
import { DataContext } from './App';
import { write } from '../firebase';
import { formSubmit } from '../handlers';

const Lobby = () => {
	const { setGameState, players, userName, setUserName, amIMaster } = useContext(DataContext);

	return (
		<>
			<h1>Unsplarty</h1>
			<div className='container'>
				<h2>Players</h2>
				<ul>{players ? players.map((player) => <li key={player}>{player === userName ? <span className='bold'>{player}</span> : <>{player}</>}</li>) : <li>No players yet</li>}</ul>
				{players?.includes(userName) ? (
					<p>Youre logged in</p>
				) : (
					<form onSubmit={(e) => formSubmit(e, players, userName)}>
						<input
							id='name'
							type='text'
							onChange={(e) => setUserName(e.target.value)}
							placeholder='Enter your name'
						/>
						<button type='submit'>Submit</button>
					</form>
				)}
				{amIMaster ? <button onClick={() => setGameState('gameSelect')}>Start</button> : <p>Waiting for master to start</p>}
			</div>
		</>
	);
};

export default Lobby;
