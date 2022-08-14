import React, { useRef } from "react";
import Header from "./../components/Header";
import { useMutation } from "@tanstack/react-query";
import { BASEURI } from "../urls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddAdmin() {
  const navigate = useNavigate();
  // enail password  phoneNumber dateOfBirh gender
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const dateOfBithRef = useRef();
  const phoneNumberRef = useRef();
  const genderRef = useRef();
  const [errorMsg, setErrorMsg] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstNameRef.current.value &&
      lastNameRef.current.value &&
      passwordRef.current.value &&
      confirmPasswordRef.current.value &&
      passwordRef.current.value.length > 5 &&
      confirmPasswordRef.current.value.length > 5 &&
      dateOfBithRef.current.value &&
      genderRef.current.value &&
      phoneNumberRef.current.value &&
      phoneNumberRef.current.value.length == 9 &&
      passwordRef.current.value == confirmPasswordRef.current.value
    ) {
      const response = await fetch(`${BASEURI}/admin/add-admin`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "Application/json",
        },
        body: JSON.stringify({
          firstName: firstNameRef.current.value,
          phoneNumber: phoneNumberRef.current.value,
          lastName: lastNameRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value,
          gender: genderRef.current.value,
          date: dateOfBithRef.current.value,
        }),
      });
      if (response.ok) {
        navigate("/");
      } else {
        setErrorMsg(await response.json());
      }
    }
  };
  // const [isLoading, isError, error, mutate] = useMutation(() => {
  //   fetch(`${BASEURI}/`);
  // });
  return (
    <div>
      <Header />
      <h2>Add Admin</h2>
      <div
        style={{
          borderStyle: "solid",
          borderColor: "#0244d0",
          width: 500,
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
          borderRadius: 20,
          height: 500,
          paddingTop: "10%",
        }}
      >
        <div>
          <div>
            <input
              ref={firstNameRef}
              type="text"
              placeholder="FirstName"
              style={{
                padding: 10,
                outline: "none",
                border: "none",
                borderBottom: "1px solid #000",
                backgroundColor: "transparent",
                color: "#000",
              }}
            />
          </div>
          <div>
            <input
              ref={lastNameRef}
              style={{
                outline: "none",
                padding: 10,

                border: "none",
                borderBottom: "1px solid #000",
                backgroundColor: "transparent",
                color: "#000",
              }}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div>
            <input
              type="text"
              ref={phoneNumberRef}
              placeholder="Phone Number"
              style={{
                border: "none",
                outline: "none",
                padding: 10,

                borderBottom: "1px solid #000",
                backgroundColor: "transparent",
                color: "#000",
              }}
            />
          </div>
          <div>
            <input
              type="date"
              ref={dateOfBithRef}
              style={{
                border: "none",
                outline: "none",
                padding: 10,

                borderBottom: "1px solid #000",
                backgroundColor: "transparent",
                color: "#000",
              }}
            />
          </div>
          <div style={{ alignSelf: "flex-start", margin: "15px  0" }}>
            <span> Gender</span>
            <select ref={genderRef}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              style={{
                outline: "none",
                padding: 10,
                border: "none",
                borderBottom: "1px solid #000",
                backgroundColor: "transparent",
                color: "#000",
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
              style={{
                outline: "none",
                padding: 10,
                border: "none",
                borderBottom: "1px solid #000",
                backgroundColor: "transparent",
                color: "#000",
              }}
            />
          </div>
          <div>
            <input
              onMouseUp={handleSubmit}
              type="submit"
              value="Submit"
              style={{
                backgroundColor: "#0244d0",
                border: "none",
                boxShadow: "1px 1px 4px #000",
                borderRadius: 20,
                padding: "5px 15px",
                margin: 50,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
