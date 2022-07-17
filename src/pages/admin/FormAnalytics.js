import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getFormData,
  getIndividualStatisticalData,
  getTotalMarks,
} from "../../utils/formAsyncFunctions";

function FormAnalytics() {
  const { formId } = useParams();
  console.log(formId);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(currentUser.uid);
        let formData = await getFormData(formId, currentUser.uid);

        setFormData(formData);
        getIndividualStatisticalData(formData);
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
    <div style={{ backgroundColor: "blue" }}>
      <div>
        <h3>Total Submissions</h3>
        {formData ? <h1>{formData.length}</h1> : 0}
      </div>
      <div></div>
    </div>
  );
}

export default FormAnalytics;
