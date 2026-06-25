import { useEffect, useState } from "react";
import client from "../api/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateNoticePage() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [important, setImportant] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {

    async function fetchCategories() {
      try {
        const token = localStorage.getItem("token");

        const response = await client.get("/categories/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCategories(response.data);

      } catch (err) {
        console.log(err);
        toast.error("Failed to load categories");
      }
    }

    fetchCategories();

  }, []);


  async function handleSubmit(e) {
    e.preventDefault();

    if (!categoryId) {
      toast.warning("Please select a category");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await client.post(
        "/notices/",
        {
          title: title,
          content: content,
          category_id: Number(categoryId),
          important: important
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      toast.success("Notice created successfully");

      navigate("/notices");


    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.detail ||
        "Failed to create notice"
      );

    }
  }


  return (
    <div>

      <h2>Create Notice</h2>


      <form onSubmit={handleSubmit}>


        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "300px",
            marginBottom: "15px"
          }}
        />


        <br />


        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "300px",
            minHeight: "100px",
            marginBottom: "15px"
          }}
        />


        <br />


        <label>
          Category:
        </label>


        <br />


        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "320px",
            marginBottom: "15px"
          }}
        >

          <option value="" disabled>
            Select a Category
          </option>


          {categories.map((cat) => (

            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>

          ))}


        </select>


        <br />


        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "15px"
          }}
        >

          Important:

          <input
            type="checkbox"
            checked={important}
            onChange={(e) => setImportant(e.target.checked)}
          />

        </label>


        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          Create Notice
        </button>


      </form>


    </div>
  );
}


export default CreateNoticePage;