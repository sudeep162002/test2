function RenderPlainForm({ model }) {
  console.log(model);
  return (
    <div className="grey-container mb-1" style={{ borderRadius: "5px" }}>
      <h1
        className="mb-1"
        style={{ color: "white", fontWeight: "200", letterSpacing: "1px" }}
      >
        PREVIEW
      </h1>
      <div className="input">
        <label>
          Name<span className="err">*</span>
        </label>
        <div className="input">
          <input type="text" className="mr-1" />
        </div>
      </div>
      {model.questions.map((question, index) => (
        <div key={index} className="input">
          <label className="">
            {`Q${index + 1}. ${question.title}`}
            {question.required && <span className="err">*</span>}
          </label>
          {question.options.map((option, idx) => (
            <div className="input inline" key={idx}>
              <input
                type={question.type === "mosa" ? "radio" : "checkbox"}
                className="mr-1"
                name={question.title.replace(" ", "")}
              />
              <label style={{ transform: "translateY(0.5em)" }}>
                {option.content}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button className="btn mt-1">submit</button>
    </div>
  );
}

export default RenderPlainForm;
