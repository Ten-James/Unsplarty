import { StartGame } from "../handlers";

interface GameSelectProps {
  onGameSelect: (game: string) => void;
  players: string[];
  currentGame: string;
  isAdmin: boolean;
}

const GAMEMODES = ["talk&guess"];

const GameSelect = ({
  isAdmin,
  currentGame,
  onGameSelect,
  players,
}: GameSelectProps) => {
  return (
    <>
      <h1>Game Select</h1>
      <div className="container">
        <p>Current Game: {currentGame}</p>
        <div>
          {GAMEMODES.map((game) => (
            <button
              key={game}
              disabled={!isAdmin}
              className={game === currentGame ? "selected" : ""}
              onClick={() => onGameSelect(game)}
            >
              {game}
            </button>
          ))}
        </div>
        <button disabled={!isAdmin} onClick={() => StartGame(players)}>
          Start
        </button>
      </div>
    </>
  );
};

export default GameSelect;
