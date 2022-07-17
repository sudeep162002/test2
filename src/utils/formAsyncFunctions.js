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
    console.log(doc.id, " => ", doc.data());
    data.push({ id: doc.id, ...doc.data() });
  });

  return data;
};

export const getForm = async (adminId, formId) => {
  const docRef = doc(firestore, "admin", adminId, "forms", formId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
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
  console.log("ye naya hai");
  console.log(submission);
  let allAnswers = { ...submission };
  const cityRef = collection(firestore, "submissions");
  return addDoc(cityRef, allAnswers);
};

export const getSubmissions = async (opts) => {
  let docs = await firestore.collection("submissions").get(opts);
  docs = docs.docs;
  let submissions = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  console.log(submissions);
  return submissions;
};

export const getFormData = async (formId, adminId) => {
  const q = query(collection(firestore, "submissions"));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    data.push(doc.data());

    console.log(doc.id, " => ", doc.data());
  });
  data = data.filter((e) => e[0].formId === formId && e[0].adminId === adminId);
  return data;
};

export const getIndividualStatisticalData = async (formData) => {
  console.log("FORM DATA", formData);
  let totalQuestions = 0;
  let finalData = [];
  let userName;
   Object.entries(formData).map((user) => {
      //console.log("Each User", user[1]);
      let correctAns=0;
      let totalUserMarks=0;
      let totalAttempted=0,totalCorrect=0, totalIncorrect=0,totalQuestions=0;
      //For each question
      Object.entries(user[1]).map((question) => {
          userName=question[1].userName
          totalQuestions+=1;
          console.log("Question ",question,"OOO",question[1])
          Object.entries(question[1].options).map((option) => {
                if(option.isMarked===true)
                {
                  totalAttempted++;
                }
                if(option.isCorrect==option.isMarked)
                {
                  totalCorrect++;
                }
                else if(option.isMarked){
                  totalIncorrect++;
                }
          });
          console.log("Sddsdsd",{"username":userName,"totalQuestions": totalQuestions,"totalAttempted":totalAttempted,"totalCorrect":totalCorrect,"totalIncorrect":totalIncorrect})
          //Store totalQuestion and correctAns for every user
          finalData.push({"username":userName,"totalQuestions": totalQuestions,"totalMarks":totalAttempted,"correctAns":totalCorrect,"worongAns":totalIncorrect});
          // finalData.push(d);
      });
      //Store totalQuestion and correctAns for every user
      finalData.push({
        username: userName,
        totalQuestions: totalQuestions,
        totalAttempted: totalAttempted,
        totalCorrect: totalCorrect,
        totalIncorrect: totalIncorrect,
      });
      // finalData.push(d);
    });
    console.log("Total Questions", totalQuestions);
    console.log("All User Details", finalData);
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
  };
  console.log("=============",formData)
  Object.entries(allUserData).map((user) => {

    let totalQuestions=user[1].totalQuestions
    let correctMarks=user[1].totalCorrect
    let relativeMarks=parseInt(((correctMarks*100)/totalQuestions)/10)*10
    allRanges[relativeMarks]++
  });
  console.log("All Ranges here", allRanges);
  return allRanges;
};
