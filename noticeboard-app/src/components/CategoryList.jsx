import { useEffect, useState } from "react";
import client from "../api/client";
import { toast } from "react-toastify";

function CategoryList() {

  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await client.get(
        "/categories/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setCategories(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch categories");
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleUpdateCategory = async (categoryId) => {
    if (!editingName.trim()) {
      toast.warning("Category name cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await client.put(
        `/categories/${categoryId}`,
        { name: editingName },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("Category updated successfully");
      setCategories(categories.map(cat => cat.id === categoryId ? { ...cat, name: editingName } : cat));
      setEditingId(null);
      setEditingName("");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.detail || "Failed to update category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category? Any associated notices might be affected.")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await client.delete(
        `/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("Category deleted successfully");
      setCategories(categories.filter(cat => cat.id !== categoryId));
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.detail || "Failed to delete category");
    }
  };

  return (
    <div>
      <h2>Categories</h2>

      {categories.map((category) => (
        <div
          key={category.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {editingId === category.id ? (
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                style={{ flex: 1, padding: "5px" }}
              />
              <button onClick={() => handleUpdateCategory(category.id)}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <>
              <h3>{category.name}</h3>
              {role === "admin" && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => handleEdit(category)}>Edit</button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default CategoryList;