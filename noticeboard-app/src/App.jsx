import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NoticeList from "./components/NoticeList";
import NoticeDetail from "./components/NoticeDetail";
import CreateNoticePage from "./components/CreateNoticePage";
import EditNoticePage from "./components/EditNoticePage";
import CategoryList from "./components/CategoryList";
import CreateCategoryPage from "./components/CreateCategoryPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Header />

      <div style={{ padding: "20px", minHeight: "100vh" }}>

        <Routes>

          <Route
            path="/login"
            element={<LoginForm />}
          />

          <Route
            path="/register"
            element={<RegisterForm />}
          />

          <Route
            path="/notices"
            element={
              <ProtectedRoute>
                <NoticeList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notices/new"
            element={
              <ProtectedRoute>
                <CreateNoticePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notices/:id"
            element={
              <ProtectedRoute>
                <NoticeDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notices/:id/edit"
            element={
              <ProtectedRoute>
                <EditNoticePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoryList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categories/new"
            element={
              <ProtectedRoute>
                <CreateCategoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={<LoginForm />}
          />

        </Routes>

      </div>

      <ToastContainer />

    </BrowserRouter>

  );
}

export default App;