import React from "react";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import AddFieldModal from "../../components/addFieldModal";
import RenderPlainForm from "../../components/RenderPlainForm";
import { useAuth } from "../../context/AuthContext";

import { updateObjState } from "../../utils";

import { createForm as saveForm } from "../../utils/formAsyncFunctions";

function Create() {
  const { currentUser } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [inputType, setInputType] = useState("text");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const openAddModal = (inputType) => {
    setShowAddModal(true);
    setInputType(inputType);
  };

  const [formModel, setFormModel] = useState({
    title: "",
    createdAt: +new Date(),
    questions: [],
    endMessage: "",
    expiration: "",
  });

  const addFieldToFormModel = (field) => {
    let _model = Object.assign({}, formModel);
    _model.questions.push(field);
    setFormModel(_model);
  };

  const createForm = async () => {
    if (loading) return;
    setErr("");

    if (!formModel.title.trim()) return setErr("Title is required");
    if (formModel.title.trim().length < 5 || formModel.title.trim().length > 50)
      return setErr("Title should be 5 - 50 characters long");

    if (formModel.expiration.trim() && formModel.expiration < 1)
      return setErr("Validity should be at least an hour");

    if (formModel.questions.length < 1)
      return setErr("You need to add at least one field");

    setLoading(true);
    try {
      await saveForm(currentUser.uid, formModel);
      setLoading(false);
      history.push("/admin");
    } catch (e) {
      setErr(e.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
        <h1
          className="heading"
          style={{
            color: "white",
            letterSpacing: "0.1em",
            fontWeight: "normal",
            margin: "0.5em 0",
          }}
        >
          Create Quiz
        </h1>

        <div className="form" style={{paddingLeft:"1em"}}>
          <div className="input">
            <label style={{ marginBottom: "0 !important" }}>
              Quiz Name
            </label>
            <input
              style={{ margin: "0" }}
              type="text"
              placeholder="Enter title"
              onChange={(e) =>
                updateObjState(setFormModel, formModel, "title", e.target.value)
              }
            />
          </div>

          <div className="input">
            <label>End message</label>
            <input
              type="text"
              placeholder="What should user see after submitting the form"
              onChange={(e) =>
                updateObjState(
                  setFormModel,
                  formModel,
                  "endMessage",
                  e.target.value
                )
              }
            />
          </div>

          <div className="input">
            <label>Validity(Optional)</label>
            <input
              type="number"
              placeholder="For how many hours the form should be fillable"
              onKeyDown={(e) => {
                if (e.key === "." || e.key === "-") {
                  e.preventDefault();
                }
              }}
              onChange={(e) =>
                updateObjState(
                  setFormModel,
                  formModel,
                  "expiration",
                  e.target.value
                )
              }
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", paddingLeft:"1em" }}>
          <div className="add-field-container grey-container">
            <button
              className="btn"
              onClick={() => openAddModal("moma")}
            >
              Add Question
            </button>
          </div>

          {err && <p className="err text-right mb-1">{err}</p>}
          <div className="add-field-container grey-container">
            <button className="btn fontsizetwo" onClick={createForm}>
              {loading ? (
                <span className="spinner white"></span>
              ) : (
                <span>Create quiz</span>
              )}
            </button>
          </div>
        </div>
        {showAddModal && (
          <AddFieldModal
            inputType={inputType}
            close={() => setShowAddModal(false)}
            add={addFieldToFormModel}
          />
        )}
      </div>
      {formModel.questions.length > 0 && (
        <div style={{ width: "65%", height: "70%", overflowY: "hidden" }}>
          <RenderPlainForm model={formModel} />
        </div>
      )}
    </div>
  );
}

export default Create;
