import React,{useEffect,useState} from 'react'
import { useParams } from "react-router-dom";
import { getFormData,getStatisticalData } from "../../utils/formAsyncFunctions";


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
        // console.log("vfjfjgfefefhergtuhg")
        getStatisticalData(formData);
        // console.log(formData);
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
      {formData?<h1>{formData.length}</h1>:""}
      FormAnalytics</div>
  )
}

export default FormAnalytics