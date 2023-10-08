import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [progresspercent, setProgresspercent] = useState(0);
  const [loading1, setLoading1] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const colref = collection(db, "employee");
    getDocs(colref).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        setEmployees((prevEmployee) => [
          ...prevEmployee,
          { ...doc.data(), id: doc.id },
        ]);
      });
      setLoading1(false);
    });
  }, []);

  function handleLogin() {
    if (loading1) return false;
    const isUserValid = employees.some((emp) => {
      return emp.email === email && emp.password === password;
    });
    return isUserValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(1);
    const correct = handleLogin();
    if (correct) {
      navigate('/home', { replace: true });
    } else {
      alert("Username or password is incorrect");
    }
    setLoading(0);
  };

  return (
    <div
      style={{
        height: "90%",
        marginTop: "6rem",
      }}
      className="margin30"
    >
      {loading === 1 && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {loading === 0 && (
        <>
          <div
            style={{
              backgroundColor: "blue",
              width: "100%",
              height: "4rem",
              marginBottom: "2rem",
              borderRadius: "6px",
              fontSize: "2.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "500",
              // fontFamily: "Consolas"
            }}
          >
            Login form
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Enter Employee email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                aria-describedby="emailHelp"
                required
                placeholder="Enter email"
                autoComplete="off"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Enter password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
                placeholder="Enter password"
                autoComplete="off"
              />
            </div>

            <button
              type="reset"
              className="btn btn-primary mr-5"
              onClick={(e) => {
                setEmail("");
                setName("");
                setImage(null);
              }}
            >
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
