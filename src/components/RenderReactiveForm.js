import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  createFillableModel,
  createSubmitableModel,
  updateArrOfObjState,
  hasError,
} from "../utils";

import { submitForm ,checkFormExistence} from "../utils/formAsyncFunctions";

import MultiOptionField from "./multiOptionField";
import FileField from "./fileField";
import { TryOutlined } from "@mui/icons-material";

function RenderReactiveForm({  model, onSubmitted }) {
  const [userName, setUserName] = useState("");
  const [fillableModel, setFillableModel] = useState(
    createFillableModel(model)
  );
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
 const [exists,setExists]=useState(true)


 useEffect(() => {
  let x= checkFormExistence(model.formId,model.adminId);
  if(x===true){
    setExists(true)
  }

}, [model]);


  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async () => {
    setErr("");
    if (loading) return;

    let error = hasError(fillableModel, model.id);
    if (error) return setErr(error);

    setLoading(true);

    let submitableModel = createSubmitableModel(
      fillableModel,
      userName,
      model.adminId,
      model.formId
    );
     if(checkFormExistence(model.formId,model.adminId)===true){
      try {
        await submitForm(submitableModel, model.adminId, model.formId);
        setLoading(false);
        onSubmitted();
      } catch (e) {
        setErr(e.message);
        setLoading(false);
      }
     }else{
      setExists(false)
     }
  };

  return (

      exists===true? <div
      className="main-form mt-1"
      style={{ width: "50%", paddingLeft: "2em" }}
    >
      <div>
        <input
          style={{
            outline: "none",
            border: "3px solid #8700f5",
            height: "3em",
            width: "40%",
            backgroundColor: "#fffff",
            marginBottom: "3em",
            borderRadius: "0.5em",
          }}
          placeholder="Enter Your Name"
          value={userName}
          onChange={handleNameChange}
        />
      </div>
      {fillableModel.map((field, index) =>
        ["short-text", "number"].indexOf(field.type) > -1 ? (
          <div key={index} className="input">
            <label>
              {field.title}
              {field.required && <span className="err">*</span>}
            </label>
            <input
              type={field.type === "number" ? "number" : "text"}
              onChange={(e) =>
                updateArrOfObjState(
                  setFillableModel,
                  fillableModel,
                  index,
                  "value",
                  e
                )
              }
            />
          </div>
        ) : field.type === "long-text" ? (
          <div key={index} className="input">
            <label>
              {field.title}
              {field.required && <span className="err">*</span>}
            </label>
            <textarea
              onChange={(e) =>
                updateArrOfObjState(
                  setFillableModel,
                  fillableModel,
                  index,
                  "value",
                  e.target.value
                )
              }
            ></textarea>
          </div>
        ) : field.type === "mosa" || field.type === "moma" ? (
          <MultiOptionField
            key={index}
            fieldModel={field}
            onSelected={(res) => {
              updateArrOfObjState(
                setFillableModel,
                fillableModel,
                index,
                "value",
                res
              );
            }}
          />
        ) : field.type === "file" ? (
          <FileField
            key={index}
            fieldModel={field}
            onCompleted={(fileName) =>
              updateArrOfObjState(
                setFillableModel,
                fillableModel,
                index,
                "value",
                fileName
              )
            }
          />
        ) : (
          <p key={index}>Unknown field type</p>
        )
      )}
      {err && <p className="err mb-1">{err}</p>}
      <button
        className="btn"
        style={{ marginTop: "2em" }}
        onClick={handleSubmit}
      >
        {loading ? (
          <span className="spinner white"></span>
        ) : (
          <span>submit</span>
        )}
      </button>
    </div>: <div>doesnt exist</div>

  );
}

export default RenderReactiveForm;
