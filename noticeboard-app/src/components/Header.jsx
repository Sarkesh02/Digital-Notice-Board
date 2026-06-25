import {
  Link,
  useNavigate,
  
} from "react-router-dom";

function Header() {

  
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    navigate("/login");
  }

  return (

    <div
      style={{
        background: "#222",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <div>
        <h2>Notice Board</h2>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center"
        }}
      >

        {token ? (

          <>

            <Link
              to="/notices"
              style={{ color: "white" }}
            >
              Notices
            </Link>

            <Link
              to="/categories"
              style={{ color: "white" }}
            >
              Categories
            </Link>

            {role === "admin" && (

              <>

                <Link
                  to="/notices/new"
                  style={{ color: "white" }}
                >
                  Post Notice
                </Link>

                <Link
                  to="/categories/new"
                  style={{ color: "white" }}
                >
                  Add Category
                </Link>

              </>

            )}

            <button
              onClick={logout}
              style={{ padding: "8px" }}
            >
              Logout
            </button>

          </>

        ) : (

          <>

            <Link
              to="/login"
              style={{ color: "white" }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{ color: "white" }}
            >
              Register
            </Link>

          </>

        )}

      </div>

    </div>

  );
}

export default Header;