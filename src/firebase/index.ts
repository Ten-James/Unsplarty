import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: 'AIzaSyC5FQJBQD2XoN29untyFB_lU1OKvT1ys8Y',
    authDomain: 'unsplarty.firebaseapp.com',
    databaseURL: 'https://unsplarty-default-rtdb.firebaseio.com',
    projectId: 'unsplarty',
    storageBucket: 'unsplarty.appspot.com',
    messagingSenderId: '953140030123',
    appId: '1:953140030123:web:8ad94f8051a7bc3e64e5ee',
  };
  
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;