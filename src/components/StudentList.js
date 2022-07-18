import React from "react";

function StudentList(props) {
  console.log(props);
  return (
    <table style={{ height: 350, overflowY: "scroll" }}>
      <thead>
        <tr>
          <th>Username</th>
          <th>Correct Questions</th>
          <th>Marks Scored</th>
          <th>Total Marks</th>
          <th>Show on Chart</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>All Users</td>
          <td>
            {props.data
              .map((d) => d.correctAns)
              .reduce((prev, curr) => prev + curr, 0)}
          </td>
          <td>
            {props.data
              .map((d) => d.totalMarks)
              .reduce((prev, curr) => prev + curr, 0)}
          </td>
          <td>
            {props.data
              .map((d) => d.totalQuestions)
              .reduce((prev, curr) => prev + curr, 0)}
          </td>
          <td>
            <input
              type="checkbox"
              onChange={() => {
                props.setStudentName(null);
                props.setAllForm(true);
              }}
              checked={props.allForm}
            />
          </td>
        </tr>
        {props.data.map((d, idx) => (
          <tr key={idx}>
            <td>{d.username}</td>
            <td>{d.correctAns}</td>
            <td>{d.totalMarks}</td>
            <td>{d.totalQuestions}</td>
            <td>
              <input
                type="checkbox"
                onChange={() => {
                  props.setAllForm(false);
                  props.setStudentName(d.username);
                }}
                checked={d.username === props.studentName}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentList;
