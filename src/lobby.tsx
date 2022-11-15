import { useState } from "react";
import { write } from "./firebase";
import { formSubmit } from "./handlers";

interface Props {
  players: string[];
  name: string;
  setName: (name: string) => void;
}

const Lobby = (props: Props) => {
  return (
    <div className="App">
      <h1>Lobby</h1>
      <h2>Players</h2>
      <ul>
        {props.players ?props.players.map((player) => (
          <li key={player}>
            {player === props.name ? (
              <span className="bold">{player}</span>
            ) : (
              <>{player}</>
            )}
          </li>
        )):
        <li>No players yet</li>}
      </ul>
      {props.players?.includes(props.name) ? (
        <p>Youre logged in</p>
      ) : (
        <form onSubmit={(e) => formSubmit(e, props.players, props.name)}>
          <input
            id="name"
            type="text"
            onChange={(e) => props.setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <button onClick={() => write("gameState", "chooseGame")}>Start</button>
    </div>
  );
};

export default Lobby;
