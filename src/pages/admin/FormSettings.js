import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import { getForms } from "../../utils/formAsyncFunctions";
import FormCard from "../../components/FormCard";

function FormSettings() {
  const [forms, setForms] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  // current admin object
  const { currentUser } = useAuth();
  useEffect(() => {
    // if(!localStorage.getItem('gfc-user')) return
    const fetchData = async () => {
      try {
        // get all the forms for this user id
        let forms = await getForms("OK");

        setForms(forms);
        // console.log(forms);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setMsg(e.message);
      }
    };
    fetchData();
  }, []);

  const onFormDelete = (id) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  return (
    <div>
      <h1 className="heading primary-color">
        <span> My Quizzes</span>
      </h1>
      {loading ? (
        <p className="text-center mt-1">
          <span className="spinner"></span>
        </p>
      ) : msg ? (
        <h3 className="msg mt-1">{msg}</h3>
      ) : (
        <div className="cards-container">
          {forms.length > 0 ? (
            forms.map((form) => (
              <FormCard key={form.id} form={form} onDelete={onFormDelete} />
            ))
          ) : (
            <h3 className="msg mt-1">You haven't created any forms yet</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default FormSettings;

// import React from 'react'

// function FormSettings() {
//   return (
//     <div>FormSettings</div>
//   )
// }

// export default FormSettings
