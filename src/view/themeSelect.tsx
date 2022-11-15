import { write } from "../firebase";

interface ThemeSelectProps {
    amIChooser: boolean;
} 

// TODO: USE https://random-words-api.vercel.app/word/noun

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ThemeSelect = (props: ThemeSelectProps) => {


    const Handler = async (theme:string) => {
        write('gameState', 'playing');
        write('theme', theme);
        const res1 = await fetch('https://source.unsplash.com/random/?' + theme);
        await sleep(1000);
        const res2 = await fetch('https://source.unsplash.com/random/?' + theme);
        await sleep(1000);
        const res3 = await fetch('https://source.unsplash.com/random/?' + theme);
        await sleep(1000);
        const res4 = await fetch('https://source.unsplash.com/random/?' + theme);

        write('image', res1.url);
        write('fakeImage', [res2.url, res3.url, res4.url]);
        }

    


    return (
        <div className="App">
        <h1>Theme Select</h1>
        {props.amIChooser ? (
            <div>
                <button onClick={() => Handler("animals")}>Animals</button>
                <button onClick={() => Handler("food")}>Food</button>
                <button onClick={() => Handler("persons")}>Persons</button>
        </div>
        ) : (
            <p>Waiting for chooser to choose</p>
        )}
        </div>
    );
    };

export default ThemeSelect;