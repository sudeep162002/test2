import AddMultiOptionField from "./AddMultiOptionField";

function AddFieldModal({ inputType, add, close }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={close}>
          &times;
        </span>
        {<AddMultiOptionField inputType={inputType} add={add} close={close} />}
      </div>
    </div>
  );
}

export default AddFieldModal;
