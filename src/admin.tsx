import { write } from "./firebase";

const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>
        <button onClick={() => {
write("gameState", "lobby");
write('players', []);

        }}>
            Reset
        </button>
    </div>
  );
};
export default Admin;
