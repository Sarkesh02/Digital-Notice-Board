import { useState } from "react";

import client from "../api/client";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

function LoginForm() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const formData =
        new URLSearchParams();

      formData.append(
        "username",
        username
      );

      formData.append(
        "password",
        password
      );

      const response =
        await client.post(
          "/auth/login",
          formData,
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded"
            }
          }
        );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "username",
        username
      );

      toast.success(
        "Login successful"
      );

      setUsername("");

      setPassword("");

      navigate("/notices");

    } catch (error) {

      console.log(error);

      toast.error(
        "Login failed"
      );
    }
  };

  return (

    <div>

      <h2>
        Login
      </h2>

      <form
        onSubmit={handleLogin}
      >

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default LoginForm;