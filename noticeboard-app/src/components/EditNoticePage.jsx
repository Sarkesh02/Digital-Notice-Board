import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import client from "../api/client";
import { toast } from "react-toastify";

function EditNoticePage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [important, setImportant] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchNotice();
  }, []);

  const fetchCategories = async () => {
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
  };

  const fetchNotice = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await client.get(
        `/notices/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTitle(response.data.title);
      setContent(response.data.content);
      setCategoryId(String(response.data.category_id));
      setImportant(response.data.important);

    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch notice details");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!categoryId) {
      toast.warning("Please select a category");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await client.put(
        `/notices/${id}`,
        {
          title,
          content,
          category_id: parseInt(categoryId),
          important
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Notice updated successfully");
      navigate("/notices");

    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.detail || 
        "Update failed"
      );
    }
  };

  return (
    <div>
      <h2>Edit Notice</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "10px", width: "100%", maxWidth: "300px", marginBottom: "15px" }}
        />

        <br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ padding: "10px", width: "100%", maxWidth: "300px", minHeight: "100px", marginBottom: "15px" }}
        />

        <br />

        <label style={{ display: "block", marginBottom: "5px" }}>Category:</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          style={{ padding: "10px", width: "100%", maxWidth: "320px", marginBottom: "15px" }}
        >
          <option value="" disabled>Select a Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={String(cat.id)}>
              {cat.name}
            </option>
          ))}
        </select>

        <br />

        <label style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
          Important:
          <input
            type="checkbox"
            checked={important}
            onChange={(e) => setImportant(e.target.checked)}
          />
        </label>

        <br />

        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Update Notice
        </button>
      </form>
    </div>
  );
}

export default EditNoticePage;