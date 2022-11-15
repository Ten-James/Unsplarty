import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC5FQJBQD2XoN29untyFB_lU1OKvT1ys8Y",
  authDomain: "unsplarty.firebaseapp.com",
  databaseURL: "https://unsplarty-default-rtdb.firebaseio.com",
  projectId: "unsplarty",
  storageBucket: "unsplarty.appspot.com",
  messagingSenderId: "953140030123",
  appId: "1:953140030123:web:8ad94f8051a7bc3e64e5ee",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const write = (path: string, data: any) => {
  set(ref(db, path), data);
  console.log(JSON.stringify(data));
};
export const read = (path: string, setter: (a: any) => void) => {
  get(ref(db, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setter(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const subscribe = (path: string, setter: (a: any) => void) => {
  onValue(ref(db, path), (snapshot) => {
    const data = snapshot.val();
    setter(data);
  });
};
