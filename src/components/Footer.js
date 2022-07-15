function Footer(){
    return (
        <div className="footer container displayflexrow">
            <div>
                <a href="/" className="title mr-1">Formable</a>
                <span>&copy; {new Date().getFullYear()}</span>
            </div>
            <div className="displayflexrow">
                <div><p className="title">Special Thanks to:</p></div>
                <div>Tally Codebrewers</div>
            </div>
            <div className="displayflexrow">
                <p className="title">Find us on:</p>
                <div> <a href="https://github.com/0shuvo0" className="li">Github</a></div>

            </div>
        </div>
    )
}

export default Footer