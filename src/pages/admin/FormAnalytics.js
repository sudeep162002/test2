import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BarChart from "../../components/BarChart";
import StudentChart from "../../components/StudentChart";
import StudentList from "../../components/StudentList";
import { useAuth } from "../../context/AuthContext";
import {
  getFormData,
  getIndividualStatisticalData,
  getAllStatisticalData,
} from "../../utils/formAsyncFunctions";

function FormAnalytics() {
  console.log("/////////////////////////////////");
  const { formId } = useParams();
  console.log(formId);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState();
  const [individualStatisticalData, setIndividualStasticalData] = useState(
    null
  );
  const [allStatisticalData, setAllStasticalData] = useState(null);
  const [allForm, setAllForm] = useState(true);
  const [studentName, setStudentName] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("CURRENT USER", currentUser.uid);
        let formData = await getFormData(formId, currentUser.uid);
        console.log("DATA FETCHED!!");
        const aData = await getAllStatisticalData(formData);
        console.log("ADATA", aData);
        const iData = await getIndividualStatisticalData(formData);
        console.log("IDATA", iData);
        setIndividualStasticalData(iData);
        setAllStasticalData(aData);
        setFormData(formData);
        console.log(formData);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setMsg(e.message);
      }
    };
    fetchData();
  }, [currentUser, formId]);

  return (
    <div>
      {/* <div>
        <h3>Total Submissions</h3>
        {formData ? <h1>{formData.length}</h1> : 0}
      </div>
       */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div>
          {allForm && allStatisticalData && (
            <BarChart data={allStatisticalData} />
          )}
          {!allForm && individualStatisticalData && (
            <StudentChart
              studentName={studentName}
              data={individualStatisticalData}
            />
          )}
        </div>
        <div>
          {individualStatisticalData && (
            <StudentList
              allForm={allForm}
              studentName={studentName}
              setAllForm={setAllForm}
              setStudentName={setStudentName}
              data={individualStatisticalData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FormAnalytics;
