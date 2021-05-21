import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC0xtIgUDkLrwxnQ7wEy5Sl4RrnuYGNYy4",
  authDomain: "fir-sample-ebd48.firebaseapp.com",
  projectId: "fir-sample-ebd48",
  storageBucket: "fir-sample-ebd48.appspot.com",
  messagingSenderId: "501525580831",
  appId: "1:501525580831:web:5cf836dc6bb0fb488bd92a"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};
