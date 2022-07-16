function RenderPlainForm({ model }) {
  console.log(model);
  return (
    <div className="grey-container mb-1">
      <h1 className="mb-1">Preview</h1>
      {model.questions.map((question, index) =>
        question.type === "mosa" || question.type === "moma" ? (
          <div key={index} className="input">
            <label>
              {question.title}
              {question.required && <span className="err">*</span>}
            </label>
            {question.options.map((option, idx) => (
              <div className="input inline" key={idx}>
                <input
                  type={question.type === "mosa" ? "radio" : "checkbox"}
                  className="mr-1"
                  name={question.title.replace(" ", "")}
                />
                <label>{option.content}</label>
              </div>
            ))}
          </div>
        ) : (
          <p key={index}>Unknown field type.</p>
        )
      )}
      <button className="btn mt-1">submit</button>
    </div>
  );
}

export default RenderPlainForm;
