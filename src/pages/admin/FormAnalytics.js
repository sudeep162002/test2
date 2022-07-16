import React,{useEffect,useState} from 'react'
import { useParams } from "react-router-dom";
import { getFormData,getStatisticalData,getTotalMarks } from "../../utils/formAsyncFunctions";


function FormAnalytics() {
  const { adminId, formId } = useParams();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData,setFormData]=useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let formData = await getFormData(formId,adminId);
       
        setFormData(formData);
        getStatisticalData(formData);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setMsg(e.message);
      }
    };
    fetchData();
  }, [adminId,formId]);
  

  return (
    <div style={{backgroundColor:"blue"}}>
      <div>
      <h3>Total Submissions</h3>
      {formData?<h1>{formData.length}</h1>:0}
      </div>
      <div>

      </div>
      FormAnalytics</div>
  )
}

export default FormAnalytics