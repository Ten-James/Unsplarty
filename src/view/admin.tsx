import { write } from "../firebase";

const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>
      <button
        onClick={() => {
          write("gameState", "lobby");
          write("players", []);
          write("theme", "");
          write("image", "");
          write("playerOrder", []);
          write("fakeImage", []);

          // redirect to lobby
          setTimeout(() => (window.location.href = "/"), 2000);
        }}
      >
        Reset
      </button>
    </div>
  );
};
export default Admin;
