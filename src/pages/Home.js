import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="section">
        <center>
          <div className="content">
            <div>
              <h1>
                Hey,<span> Wizards</span> in the house!!!
              </h1>
              <h1>
                Create and Participate in <span>Quizzes</span>
              </h1>
            </div>
            <center>
              <Link to="/login" className="btn">
                Create Quiz
              </Link>
              <Link to="/participate" className="btn">
                Participate in Quiz
              </Link>
            </center>
          </div>
        </center>
      </div>
    </div>
  );
}

export default Home;
