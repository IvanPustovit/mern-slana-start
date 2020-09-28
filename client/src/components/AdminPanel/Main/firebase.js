import firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";
import { FIREBASE_KEY } from "../../../constant/constant";

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: "slana-88585.firebaseapp.com",
  databaseURL: "https://slana-88585.firebaseio.com",
  projectId: "slana-88585",
  storageBucket: "slana-88585.appspot.com",
  messagingSenderId: "529564567921",
  appId: "1:529564567921:web:868e97c1593862379f0ed0",
  measurementId: "G-F7699MYYR9",
};
firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const db = firebase.firestore();
const storage = firebase.storage();

export { storage };

export const uploadImgToStorage = async (dbName, files) => {
  try {
    const storageRef = storage.ref(`${dbName}/${files.name}`);
    await storageRef.put(files);
    console.log(storageRef);
  } catch (error) {
    console.log("error", error);
  }
};

export const uploadUrl = async (dbName, files) => {
  let urlImg = "";

  await storage
    .ref()
    .child(`${dbName}/${files.name}`)
    .getDownloadURL()
    .then((url) => (urlImg = url));
  return urlImg;
};
