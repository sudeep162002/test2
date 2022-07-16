import React from "react";
import { firestore, storage } from "./firebase";
import {
  collection,
  where,
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
  console.log("ye naya hai")
  console.log(submission);
  let allAnswers={...submission}
  const cityRef = collection(firestore,"submissions");
  return addDoc(cityRef, allAnswers);
};

export const getSubmissions = async (opts) => {
  let docs = await firestore.collection("submissions").get(opts);
  docs = docs.docs;
  let submissions = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  console.log(submissions);
  return submissions;
};


// function to get form data for analytics
export const getFormData=async (formId,adminId)=>{ 
  // ek form ka saara data aa jaega isse
const q = query(collection(firestore, "submissions"), where("formId", "==", formId),where("adminId","==",adminId));
const querySnapshot = await getDocs(q);
// console.log(querySnapshot)
let data=[];
let count=0;
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  data.push(doc.data());
  // console.log(doc.id, " => ", doc.data());
});

  return data;
}

export const getStatisticalData=(formData)=>{
  // formData.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   // console.log(doc.id, " => ", doc.data());
  // });
  // console.log(formData)
  return 0;
}

export const getTotalMarks=(formData)=>{
  let marksArray=[];
  // formData.forEach((user)=>{
  //   let marks=0;
  //   user.questions
  // })
  console.log(formData)
}