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

export const createForm = (adminId, formModel) => {
  // return firestore.collection("forms").add({...formModel, uid: uid})

  const cityRef = collection(firestore, "admin", adminId, "forms");
  return addDoc(cityRef, formModel);
};

export const getForms = async (id) => {
  const q = query(collection(firestore, `admin/${id}/forms`));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

export const getForm = async (adminId, formId) => {
  // let docs = await firestore.collection("forms").get(ops);
  // let doc = docs.docs[0];
  // doc = { ...doc.data(), id: doc.id };
  // return doc;

  const docRef = doc(firestore, "admin", adminId, "forms", formId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  return docSnap.data();
};

export const deleteForm = async (adminId, formId) => {
  //   let submissions = await firestore
  //     .collection("submissions")
  //     .where("formId", "==", formId)
  //     .get();
  //   submissions = submissions.docs;
  //   for (let submission of submissions) {
  //     await firestore.collection("submissions").doc(submission.id).delete();
  //   }
  //   return firestore.collection("forms").doc(formId).delete();
  await deleteDoc(doc(firestore, `admin/${adminId}/forms`, formId));
};

export const uploadFile = (file, fileName) => {
  let ref = storage.ref("files/" + fileName);
  return ref.put(file);
};

export const submitForm = async (submission, adminId, formId) => {
  // firestore.collection("submissions").add({
  //   submission,
  //   formId,
  // });
  await setDoc(
    doc(firestore, "admin", adminId, "submissions", formId),
    submission
  );
};

export const getSubmissions = async (opts) => {
  let docs = await firestore.collection("submissions").get(opts);
  docs = docs.docs;
  let submissions = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  console.log(submissions);
  return submissions;
};
