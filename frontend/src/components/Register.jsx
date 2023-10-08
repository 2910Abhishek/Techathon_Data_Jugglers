import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [hashedPassword, setHashedPassword] = useState(null);
  const [loading, setLoading] = useState(0);
  const [progresspercent, setProgresspercent] = useState(0);
  const navigate = useNavigate();

  // const hashPassword = async () => {};

  console.log(hashedPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(1);
    const fileInput = e.target.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (!file) {
      alert("File is not selected");
      setLoading(0);
      return;
    } else {
      console.log("File selected:", file.name);
    }

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const attendance_count = 0;
          await addDoc(collection(db, "employee"), {
            email,
            name,
            password,
            attendance_count,
            image: downloadURL,
            created: Timestamp.now(),
          });
        } catch (error) {
          alert(error);
        } finally {
          setEmail("");
          setName("");
          setPassword("");
          setImage("");
          setLoading(0);
          navigate('/login', { replace: true })
        }
      }
    );
  };

  console.log(db);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
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
            Registration of New Employee
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
            <div className="form-group">
              <label htmlFor="name">Enter Employee Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                required
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Add image</label>
              <input
                type="file"
                className="form-control-file"
                id="image"
                onChange={handleImageChange}
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

export default Register;
