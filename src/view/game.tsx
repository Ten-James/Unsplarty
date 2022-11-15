import { useEffect } from "react";

interface GameInterface {
  amIChooser: boolean;
  imageUrls: string[];
}

const Game = ({ amIChooser, imageUrls }: GameInterface) => {
  useEffect(() => {
    if (amIChooser)
      setTimeout(() => document.getElementById("mainPicture")?.remove(), 3000);

    return () => {};
  }, []);

  return (
    <div className="App">
      <h1>Game</h1>
      <div className="container">
        {amIChooser ? (
          <div>
            <p>Describe this picture </p>
            <div>
              <img
                id="mainPicture"
                src={imageUrls[0]}
                style={{ maxWidth: "50%", maxHeight: "50%" }}
                alt="
                            "
              />
            </div>
          </div>
        ) : (
          <div>
            <p>Guess the correct image</p>
            <div>
              {imageUrls
                .sort(() => Math.random() - 0.5)
                .map((url) => (
                  <img
                    src={url}
                    style={{ maxWidth: "30%", maxHeight: "50%" }}
                    alt="
                            "
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
