import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { validateEmail } from "../../utils/validateEmail";

function Signup() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErr("");

    if (!email.trim()) return setErr("Email is required");
    if (!validateEmail(email)) return setErr("Email is not valid");

    if (!pwd.trim()) return setErr("Password is required");
    if (pwd.trim().length < 6 || pwd.trim().length > 20)
      return setErr("Password should be 6 - 20 characters long");

    if (!cpwd.trim()) return setErr("Confirm your password");
    if (pwd !== cpwd) return setErr("Passwords do not match");

    setLoading(true);

    try {
      await signup(name, email, pwd);
    } catch (e) {
      setLoading(false);
      setErr(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="heading mb-1">Create a new account</h1>
      <div className="input">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPwd(e.target.value)}
        />
      </div>
      <div className="input">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          onChange={(e) => setCpwd(e.target.value)}
        />
      </div>
      {err && <p className="err mb-1">{err}</p>}
      <Link to="/login" className="alt">
        already have an account?
      </Link>
      <button className="btn" type="submit">
        {loading ? (
          <span className="spinner white"></span>
        ) : (
          <span>create account</span>
        )}
      </button>
    </form>
  );
}

export default Signup;
