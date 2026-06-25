import { useState } from "react";

import client from "../api/client";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function CreateCategoryPage() {

  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await client.post(
        "/categories/",
        { name },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      toast.success(
        "Category created successfully"
      );

      setName("");

      navigate("/categories");

    } catch (err) {

      console.log(err);

      toast.error(
        err?.response?.data?.detail ||
        "Failed to create category"
      );
    }
  };

  return (

    <div>

      <h2>Create Category</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <br />
        <br />

        <button type="submit">
          Create Category
        </button>

      </form>

    </div>
  );
}

export default CreateCategoryPage;
