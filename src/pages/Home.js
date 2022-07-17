import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="section">
        <center>
          <div className="content">
            <div>
              <h1 style={{color:"white",marginBottom:"1em"}}>
                Hey,<span> Wizards</span> in the house!!!
              </h1>
              <h1 style={{color:"white",marginBottom:"2em"}}>
                Create and Participate in <span>Quizzes</span>!!!
              </h1>
            </div>
            <center>
              <Link to="/login" className="btn">
                Create A Quiz
              </Link>
              <Link to="/participate" className="btn">
                Participate in A Quiz
              </Link>
            </center>
          </div>
        </center>
      </div>
    </div>
  );
}

export default Home;
