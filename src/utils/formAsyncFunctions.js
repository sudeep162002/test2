import { firestore, storage } from "./firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";

export const createForm = (adminId, formModel) => {
  const cityRef = collection(firestore, "admin", adminId, "forms");
  return addDoc(cityRef, formModel);
};

export const getForms = async (id) => {
  const q = query(collection(firestore, `admin/${id}/forms`));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

export const getForm = async (adminId, formId) => {
  const docRef = doc(firestore, "admin", adminId, "forms", formId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
  } else {
    return null
  }
  return docSnap.data();
};

export const deleteForm = async (adminId, formId) => {
  await deleteDoc(doc(firestore, `admin/${adminId}/forms`, formId));
};

export const uploadFile = (file, fileName) => {
  let ref = storage.ref("files/" + fileName);
  return ref.put(file);
};

export const submitForm = async (submission, adminId, formId) => {
  let allAnswers = { ...submission };
  const cityRef = collection(firestore, "submissions");
  return addDoc(cityRef, allAnswers);
};

export const getSubmissions = async (opts) => {
  let docs = await firestore.collection("submissions").get(opts);
  docs = docs.docs;
  let submissions = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return submissions;
};

export const getFormData = async (formId, adminId) => {
  const q = query(collection(firestore, "submissions"));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
  });
  data = data.filter((e) => e[0].formId === formId && e[0].adminId === adminId);
  return data;
};

export const getIndividualStatisticalData = (formData) => {
  let totalQuestions = 0;
  let finalData = [];
  let userName;
   Object.entries(formData).map((user) => {
      let correctAns=0;
      let totalUserMarks=0;
      let totalAttempted=0,totalCorrect=0, totalIncorrect=0,totalQuestions=0,totalMarks=0;
      Object.entries(user[1]).map((question) => {
          userName=question[1].userName
          let ansCorrect=0
          let isAttempted=0,isIncorrect=0
          Object.entries(question[1].options).map((option) => {
                if(option[1].isMarked===true)
                {
                  isAttempted=1
                }
                if(option[1].isCorrect===true && option[1].isMarked===false)
                {
                  isIncorrect=1
                }
                if(option[1].isCorrect===false && option[1].isMarked===true)
                {
                  isIncorrect=1
                }
          });
            totalQuestions+=parseInt(question[1].positiveMarks)
          if(isIncorrect===0)
          {
            totalMarks+=parseInt(question[1].positiveMarks)
            totalIncorrect++
          }
          else
          {
            totalMarks+=parseInt(question[1].negativeMarks)
            totalCorrect++
          }
    });
    finalData.push({ "username": userName, "totalQuestions": totalQuestions, "totalAttempted": totalAttempted, "totalMarks": totalMarks, "correctAns": totalCorrect, "wrongAns": totalIncorrect });
  });
  return finalData;
};

export const getAllStatisticalData = async (formData) => {
  let allUserData = getIndividualStatisticalData(formData);
  let allRanges = {
    0: 0,
    10: 0,
    20: 0,
    30: 0,
    40: 0,
    50: 0,
    60: 0,
    70: 0,
    80: 0,
    90: 0,
    100: 0,
    110: 0
  };
  Object.entries(allUserData).map((user) => {
    let totalQuestions=user[1].totalQuestions
    let correctMarks=user[1].totalMarks        
    if(correctMarks<0)
    {
      allRanges[0]++
    }else{
    let relativeMarks=(parseInt(((correctMarks*100)/totalQuestions)/10)*10)
    allRanges[relativeMarks]++
    }
  });
  return allRanges;
};

export const checkFormExistence = async (formId, adminId) => {
  const docRef = doc(firestore, "admin", adminId, "forms", formId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
}