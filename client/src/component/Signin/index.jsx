import React, { useState } from "react";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

require("dotenv").config();

toast.configure();
const Signin = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setUserDetails((userDetails) => ({ ...userDetails, [name]: value }));
  }

  const LoginUser = async (e) => {
    e.preventDefault();
    const User = {
      password: userDetails.password,
      email: userDetails.email,
    };
    const output = await axios.post(process.env.REACT_APP_AXIOS_PATH, User);
    console.log(output.data);
    if (parseInt(output.data.statusCode) === 200) {
      navigate("/dashboard");
    } else if (parseInt(output.data.statusCode) === 400) {
      const message = output.data.message;
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const errormessage = output.data.message;
      toast.error(errormessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form onSubmit={LoginUser}>
          <h1>Sign in</h1>
          <input
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            value={userDetails.email}
            required
          />
          <input
            placeholder="Enter password"
            name="password"
            type="password"
            value={userDetails.password}
            onChange={handleChange}
          />
          <button>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
