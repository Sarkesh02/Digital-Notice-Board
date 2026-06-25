import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import client from "../api/client";

function NoticeDetail() {

  const { id } = useParams();

  const [notice, setNotice] =
    useState(null);

  useEffect(() => {

    fetchNotice();

  }, []);

  const fetchNotice = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await client.get(
          `/notices/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setNotice(response.data);

    } catch (err) {

      console.log(err);
    }
  };

  if (!notice) {

    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <h2>
        {notice.title}
      </h2>

      <p>
        {notice.content}
      </p>

      <p>
        Category ID:
        {notice.category_id}
      </p>

      <p>
        Important:
        {
          notice.important
            ? "Yes"
            : "No"
        }
      </p>

    </div>
  );
}

export default NoticeDetail;