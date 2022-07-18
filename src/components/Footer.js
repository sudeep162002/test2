import React from "react";

function Footer(){
    return (
        <div className="footer container displayflexrow" style={{ position:"fixed",bottom:"0vh",zIndex:4}}>
            <div>
                <a href="/" className="title mr-1">Quizard</a>
                <span>&copy; {new Date().getFullYear()}</span>
            </div>
            <div className="displayflexrow">
                <div><p className="title">Special Thanks to:</p></div>
                <div>Tally Codebrewers</div>
            </div>
            <div className="displayflexrow">
                <p className="title">Find us on:</p>
                <div> <a href="https://github.com/manishsencha/tally-codebrewers" className="li">Github</a></div>

            </div>
        </div>
    )
}

export default Footer