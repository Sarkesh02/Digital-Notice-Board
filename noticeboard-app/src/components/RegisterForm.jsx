import { useState } from "react";
import client from "../api/client";

function RegisterForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await client.post(
        "/auth/register",
        {
          username,
          password
        }
      );

      console.log(response.data);

      alert("Registration successful");

      setUsername("");
      setPassword("");

    } catch (err) {

      console.log(err);

      alert(err?.response?.data?.detail || "Registration failed. Please check your connection.");
    }
  };

  return (
    <div>

      <h2>Register</h2>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>
  );
}

export default RegisterForm;