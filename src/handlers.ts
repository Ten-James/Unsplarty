import { FormEvent } from "react";
import { write } from "./firebase";

export const formSubmit = (event: FormEvent<HTMLFormElement>, players: string[], newName: string) => {
    event.preventDefault();
    console.log(players, newName);
    if (!players)
    {
        write("players", [newName]);
        return;
    }
    if (players?.includes(newName)) {
        alert("Name already taken");
        return;
    }
    const newPlayers = [...players, newName];
    write("players", newPlayers);
}


export const StartGame = (players: string[]) => {
    write("gameState", 'choosing');
    //random player order
    const playerOrder = players.sort(() => Math.random() - 0.5);
    write("playerOrder", playerOrder);
    write("currentPlayer", Math.floor(Math.random() * players.length));
    write("theme", "");
    write("image", "");
    write("fakeImage", []);
}