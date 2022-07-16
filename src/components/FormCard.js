import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { getDateFromMillis } from "../utils";
import { deleteForm } from "../utils/formAsyncFunctions";

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
    <div className="card">
      <h2 className="title mb-1">
        <span>{form.title}</span>
        <span className="card-date">{getDateFromMillis(form.createdAt)}</span>
      </h2>
      <p className="card-nav">
        <span className="nav-item" onClick={() => setPreview(true)}>
          preview
        </span>
        <Link to={"/submissions/" + form.id} className="nav-item">
          submissions
        </Link>
        <span className="nav-item" onClick={handleDelete}>
          {loading ? (
            <span className="spinner red"></span>
          ) : (
            <span>delete</span>
          )}
        </span>
        <span className="btn mt-1 center primary-color">
          <a
            href={`${window.location.origin}/fill/${currentUser.uid}/${form.id}`}
            rel="noreferrer"
            className="link mb-1"
            target="_blank"
          >
            Open Form
          </a>
        </span>
      </p>
      {preview && (
        <div className="modal">
          <div className="modal-content preview">
            <span className="close" onClick={() => setPreview(false)}>
              &times;
            </span>
            <RenderPlainForm model={form} />
          </div>
        </div>
      )}
    </div>
  );
}

export default FormCard;
