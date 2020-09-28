// // const multer = require("multer");

// // const storage = multer.diskStorage({
// //   destination: "./images",
// //   filename: function (req, file, cb) {
// //     cb(null, new Date().toISOString() + "-" + file.originalname);
// //   },
// //   // destination(req, file, cb) {
// //   //   cb(null, "images");

// //   // filename(req, file, cb) {
// //   //   cb(null, new Date().toISOString() + "-" + file.originalname);
// //   // },
// // });

// // const imageType = ["image/png", "image/jpg", "image/jpeg"];

// // const fileFilter = (req, file, cb) => {
// //   if (imageType.includes(file.mimetype)) {
// //     cb(null, true);
// //   } else {
// //     cb(null, false);
// //   }
// // };

// // module.exports = multer({
// //   storage,
// //   fileFilter,
// // });

// const firebase = require("firebase");

// const firebaseConfig = {
//   apiKey: "AIzaSyDmRwCWtQpK4BE2P2OH2oin_lKLgC6AVRk",
//   authDomain: "slana-88585.firebaseapp.com",
//   databaseURL: "https://slana-88585.firebaseio.com",
//   projectId: "slana-88585",
//   storageBucket: "slana-88585.appspot.com",
//   messagingSenderId: "529564567921",
//   appId: "1:529564567921:web:868e97c1593862379f0ed0",
//   measurementId: "G-F7699MYYR9",
// };
// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
// const db = firebase.firestore();
// const storage = firebase.storage();

// export { auth, db, storage };

// export const uploadImgToStorage = (dbName, files) =>  {
//   try {
//     const storageRef = storage.ref(`${dbName}/${files.name}`);
//     await storageRef.put(files);
//     console.log(storageRef);
//   } catch (error) {
//     console.log("error", error);
//   }
// };
