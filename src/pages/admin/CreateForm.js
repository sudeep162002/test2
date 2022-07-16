import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AddQuestionModal from "../../components/AddQuestionModal";

function CreateForm() {
  const history = useHistory();
  const [showAddModal, setShowAddModal] = useState(true);
  const [data, setData] = useState({});

  return (
    <div>
      <h1>Create Quiz</h1>
      <button className="btn" onClick={() => setShowAddModal(true)}>
        Add question
      </button>
      <AddQuestionModal
        open={showAddModal}
        handleClose={() => setShowAddModal(true)}
      />
    </div>
  );
}

export default CreateForm;
