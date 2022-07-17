import React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { getDateFromMillis } from "../utils";
import { deleteForm, getFormData } from "../utils/formAsyncFunctions";

import RenderPlainForm from "./RenderPlainForm";

function FormCard({ form, onDelete }) {
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;
    setLoading(true);
    await deleteForm(currentUser.uid, form.id);
    setLoading(false);
    onDelete(form.id);
  };

  return (
    <div className="card" style={{ backgroundColor:"white",padding:"2em 1em 2em 1em",boxShadow:"none",border:"2px solid #8700f5"}}>
      <p className="card-date" style={{fontSize:"1em",textAlign:"right",marginBottom:"2em"}}>{getDateFromMillis(form.createdAt)}</p>
      <h2 className="title mb-1" style={{color:"white",letterSpacing:"0.1em",fontWeight:"normal"}}>
        <span>{form.title}</span>
        </h2>
      <p className="card-nav" style={{textAlign:"left"}}>
        <p className="nav-item" onClick={() => setPreview(true)}>
          preview
        </p>
        <Link to={`/analytics/${form.id}`} className="nav-item" 
        >
          submissions
        </Link>
        <p className="nav-item" onClick={handleDelete}>
          {loading ? (
            <span className="spinner red"></span>
          ) : (
            <span>delete</span>
          )}
        </p>
        <p className="btn mt-1 center primary-color">
          <a
            href={`${window.location.origin}/fill/${currentUser.uid}/${form.id}`}
            rel="noopener noreferrer"
            className="link mb-1"
            target="_blank"
            style={{fontSize:"0.8em",fontWeight:"normal",padding:"0.4em 0.6em",marginTop:"1em"}}
          >
            Open Form
          </a>
        </p>
      </p>
      {preview && (
        <div className="modal">
          <div className="modal-content preview">
            <p className="close" style={{fontSize:"2em"}} onClick={() => setPreview(false)}>
              &times;
            </p>
            <RenderPlainForm model={form} />
          </div>
        </div>
      )}
    </div>
  );
}

export default FormCard;
