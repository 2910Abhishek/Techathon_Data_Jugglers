import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const [employee, setEmployee] = useState([]);

  console.log(employee);

  useEffect(async () => {
    const querySnapshot = await getDocs(collection(db, "employee"));
    const employees = [];
    querySnapshot.forEach((doc) => {
      employees.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setEmployee(employees);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        marginTop: "3rem",
      }}
    >
      <table
        style={{
          width: "70%",
          margin: "auto",
        }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Attendance Count</th>
            <th>User Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1111</td>
            <td>Ronit Kothari</td>
            <td>ronitkothari22@gmail.com</td>
            <td>0</td>
            <td>
              <img
                src="src\components\ronit.jpg"
                alt="User 1"
                className="user-image"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
