import { useState, useEffect } from "react";
import { subscribe, write } from "../firebase";
import Lobby from "./lobby";
import GameSelect from "./gameSelect";
import "../App.css";
import ThemeSelect from "./themeSelect";
import Game from "./game";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [playerOrder, setPlayerOrder] = useState<string[]>([]);

  const [gameState, setGameState] = useState("lobby");
  const [players, setPlayers] = useState<string[]>([]);
  const [currentGame, setCurrentGame] = useState("talking");

  const [image, setImage] = useState("");
  const [fakeImage, setFakeImage] = useState<string[]>([]);

  const [name, setName] = useState("");

  const amIMaster = players !== null && players[0] === name;

  useEffect(() => {
    subscribe("players", setPlayers);
    subscribe("gameState", setGameState);
    subscribe("currentGame", setCurrentGame);
    subscribe("playerOrder", setPlayerOrder);
    subscribe("currentPlayer", setCurrentPlayer);
    subscribe("image", setImage);
    subscribe("fakeImage", setFakeImage);
  }, []);

  if (name === "" && gameState !== "lobby") {
    return (
      <div className="App">
        <h1>You are late ask them to reset game</h1>
      </div>
    );
  }

  return (
    <div className="App">
      {amIMaster && <p className="master">I am master</p>}
      {gameState === "lobby" && (
        <Lobby
          players={players}
          name={name}
          setName={setName}
          isAdmin={amIMaster}
        />
      )}
      {gameState === "gameSelect" && (
        <GameSelect
          players={players}
          currentGame={currentGame}
          onGameSelect={(game) => write("currentGame", game)}
          isAdmin={amIMaster}
        />
      )}
      {gameState === "choosing" && !playerOrder && <h1>Loading...</h1>}
      {gameState === "choosing" && playerOrder && (
        <ThemeSelect amIChooser={playerOrder[currentPlayer] === name} />
      )}
      {gameState === "playing" && (!image || !fakeImage) && <h1>Loading...</h1>}
      {gameState === "playing" && image && fakeImage && (
        <Game
          imageUrls={[image, ...fakeImage]}
          amIChooser={playerOrder[currentPlayer] === name}
        />
      )}
    </div>
  );
}

export default App;
