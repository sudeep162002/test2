import React from "react";

import { useState, createRef } from "react";

function AddMultiOptionField({ inputType, add, close, isMosa }) {
  const [err, setErr] = useState("");
  const [opterr, setOpterr] = useState("");
  const [correctAns, setCorrectAns] = useState(0);
  const [positiveMarks, setPositiveMarks] = useState(0);
  const [negativeMarks, setNegativeMarks] = useState(0);
  const [title, setTitle] = useState("");
  const [required, setRequired] = useState(false);
  const inputRef = createRef();
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState();
   const [checkbox,setCheckbox]=useState(true);
  const addField = () => {
    console.log(options)
    if (!title.trim()) return setErr("Title is required");
    if (title.trim().length < 4)
      return setErr("Title should be atleast 4 characters long");
    if (options.length < 1) return setErr("Atleast one option is required");
    add({
      title,
      required,
      options,
      type: inputType,
      correctAns,
      positiveMarks,
      negativeMarks
    });
    close();
  };

  const addOption = () => {
    if (!option.content.trim()) return setOpterr("Option is required");
    let _opts = [...options];
    console.log(option)
    _opts.push(option);
    setOption("");
    setOptions(_opts);
    inputRef.current.value = "";
    setOpterr("");
  };

  return (
    <div>
      <div className="input">
        <label>Enter field title</label>
        <input
          type="text"
          placeholder={`Eg. Enter the question`}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {options.length > 0 && (
        <div className="mb-1">
          <p className="b">Options</p>
          {options.map((opt, index) => (
            <div className="input inline mb-0" key={index}>
              <input
                type={inputType === "mosa" ? "radio" : "checkbox"}
                className="mr-1"
                name="inputs"
                onChange={()=>{
                  setCheckbox(!checkbox)
                  opt.isCorrect=checkbox
                  setCheckbox(checkbox)
                  console.log(opt)
                }}
              />
              <label>{opt.content}</label>
            </div>
          ))}
        </div>
      )}
      <div className="input grey-container p-1">
        <input
          type="text"
          className="mb-1"
          placeholder="Enter a option"
          onChange={(e) =>{
            setOption({
              id: options.length,
              content: e.target.value,
              isCorrect:false,
              isMarked:false
            })}
          }
          ref={inputRef}
        />
        {opterr && <p className="err mb-1 text-small">{opterr}</p>}
        <button className="btn" onClick={addOption}>
          Add Option
        </button>
      </div>
      <div className="input inline">
        <label>Required: </label>
        <input type="checkbox" onChange={() => setRequired(!required)} />
      </div>
      <div className="input inline">
        <label>Correct Ans: </label>
        <input type="number" value={correctAns} onChange={(e) => setCorrectAns(e.target.value)} />
      </div>
      <div className="input inline">
        <label> Positive Marks: </label>
        <input type="number" value={positiveMarks} onChange={(e) => setPositiveMarks(e.target.value)} />
      </div>
      <div className="input inline">
        <label>Negative Marks: </label>
        <input type="number" value={negativeMarks} onChange={(e) => setNegativeMarks(e.target.value)} />
      </div>
      {err && <p className="err mb-1">{err}</p>}
      <button className="btn" onClick={addField}>
        add field
      </button>
    </div>
  );
}

export default AddMultiOptionField;
