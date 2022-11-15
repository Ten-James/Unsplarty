interface GameInterface {
    amIChooser: boolean;
    imageUrls: string[];
} 



const Game = ({amIChooser, imageUrls} : GameInterface) => {
    return (
        <div className="App">
            <h1>Game</h1>
            {amIChooser ? (
                <div>
                    <p>Describe this picture </p>
                    <div>
                        <img src={imageUrls[0]} style={{maxWidth:'50%', maxHeight:'50%'}} alt="
                            " />
                    </div>
                </div>
            ) : (
                <div>
                    <p>Guess the correct image</p>
                    <div>
                        {imageUrls.map((url) => (
                            <img src={url} style={{maxWidth:'30%', maxHeight:'50%'}} alt="
                            " />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;