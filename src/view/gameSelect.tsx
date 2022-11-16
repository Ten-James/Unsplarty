import { useContext } from 'react';
import { DataContext } from './App';
import { StartGame } from '../handlers';

const GAMEMODES = ['talk&guess'];

const GameSelect = () => {
	const { currentGame, setCurrentGame, amIMaster, players } = useContext(DataContext);
	return (
		<>
			<h1>Game Select</h1>
			<div className='container'>
				<p>Current Game: {currentGame}</p>
				<div>
					{GAMEMODES.map((game) => (
						<button
							key={game}
							disabled={!amIMaster}
							className={game === currentGame ? 'selected' : ''}
							onClick={() => setCurrentGame(game)}
						>
							{game}
						</button>
					))}
				</div>
				<button
					disabled={!amIMaster}
					onClick={() => StartGame(players)}
				>
					Start
				</button>
			</div>
		</>
	);
};

export default GameSelect;
