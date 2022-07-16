import { firestore, storage } from "./firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

export const createForm = (formModel) => {
  // return firestore.collection("forms").add({...formModel, uid: uid})

  const cityRef = collection(
    firestore,
    "admin",
    "n8v5fe1ioq8DrhSNnDKk",
    "forms"
  );
  return addDoc(cityRef, formModel);
};

export const getForms = async (id) => {
  const q = query(collection(firestore, "admin/n8v5fe1ioq8DrhSNnDKk/forms"));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

export const getForm = async (adminId, id) => {
  // let docs = await firestore.collection("forms").get(ops);
  // let doc = docs.docs[0];
  // doc = { ...doc.data(), id: doc.id };
  // return doc;

  const docRef = doc(
    firestore,
    "admin",
    "n8v5fe1ioq8DrhSNnDKk",
    "forms",
    "Qx7drpo6vwxEC5COYf6V"
  );
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  return docSnap.data();
};

export const deleteForm = async (formId) => {
  //   let submissions = await firestore
  //     .collection("submissions")
  //     .where("formId", "==", formId)
  //     .get();
  //   submissions = submissions.docs;
  //   for (let submission of submissions) {
  //     await firestore.collection("submissions").doc(submission.id).delete();
  //   }
  //   return firestore.collection("forms").doc(formId).delete();
  await deleteDoc(doc(firestore, "admin/n8v5fe1ioq8DrhSNnDKk/forms", formId));
};

export const uploadFile = (file, fileName) => {
  let ref = storage.ref("files/" + fileName);
  return ref.put(file);
};

export const submitForm = async (submission, formId) => {
  // firestore.collection("submissions").add({
  //   submission,
  //   formId,
  // });
  await setDoc(
    doc(firestore, "admin", "n8v5fe1ioq8DrhSNnDKk", "submissions", ""),
    {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    }
  );
};

export const getSubmissions = async (opts) => {
  let docs = await firestore.collection("submissions").get(opts);
  docs = docs.docs;
  let submissions = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  console.log(submissions);
  return submissions;
};
