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