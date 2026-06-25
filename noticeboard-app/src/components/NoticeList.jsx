import {
  useEffect,
  useState
} from "react";

import client from "../api/client";

import {
  Link
} from "react-router-dom";

import { toast } from "react-toastify";


function NoticeList() {


  const [notices, setNotices] = useState([]);

  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("");


  const role = localStorage.getItem("role");



  // Load categories and notices
  useEffect(() => {


    async function loadData() {

      try {


        const token = localStorage.getItem("token");



        const categoryResponse = await client.get(
          "/categories/",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );


        setCategories(categoryResponse.data);




        const noticeResponse = await client.get(
          "/notices/",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );


        setNotices(noticeResponse.data);



      } catch (error) {

        console.log(error);

        toast.error("Failed to load notices");

      }

    }



    loadData();



  }, []);





  // Filtering logic
  const filteredNotices = notices.filter((notice) => {


    const matchesSearch =
      (notice.title || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );



    const matchesCategory =
      categoryFilter === "" ||
      String(notice.category_id) === categoryFilter;



    return matchesSearch && matchesCategory;


  });






  async function handleDeleteNotice(noticeId) {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );


    if (!confirmDelete) {

      return;

    }




    try {


      const token = localStorage.getItem("token");



      await client.delete(
        `/notices/${noticeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );



      toast.success(
        "Notice deleted successfully"
      );



      setNotices((previousNotices) =>
        previousNotices.filter(
          (notice) =>
            notice.id !== noticeId
        )
      );



    } catch (error) {


      console.log(error);


      toast.error(
        error?.response?.data?.detail ||
        "Failed to delete notice"
      );


    }


  }





  return (

    <div>


      <h2>
        All Notices
      </h2>




      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px"
        }}
      >



        <input

          type="text"

          placeholder="Search notices..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          style={{
            padding: "10px",
            width: "250px"
          }}

        />





        <select

          value={categoryFilter}

          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }

          style={{
            padding: "10px"
          }}

        >


          <option value="">
            All Categories
          </option>



          {
            categories.map((cat) => (

              <option

                key={cat.id}

                value={String(cat.id)}

              >

                {cat.name}

              </option>

            ))
          }


        </select>


      </div>







      {
        filteredNotices.length === 0 ? (

          <p>
            No notices found
          </p>

        ) : (


          filteredNotices.map((notice) => (


            <div

              key={notice.id}

              style={{

                background: "white",

                padding: "20px",

                marginBottom: "20px",

                borderRadius: "10px"

              }}

            >



              <h3>
                {notice.title}
              </h3>




              <p>
                {notice.content}
              </p>




              <p>
                Category ID:
                {" "}
                {notice.category_id}
              </p>




              <p>
                Important:
                {" "}
                {
                  notice.important
                    ? "Yes"
                    : "No"
                }
              </p>




              <Link
                to={`/notices/${notice.id}`}
              >
                View Details
              </Link>





              {
                role === "admin" && (

                  <span>


                    {" | "}



                    <Link
                      to={`/notices/${notice.id}/edit`}
                    >
                      Edit
                    </Link>




                    {" | "}




                    <button

                      onClick={() =>
                        handleDeleteNotice(notice.id)
                      }

                      style={{

                        background: "none",

                        border: "none",

                        color: "red",

                        cursor: "pointer",

                        textDecoration: "underline",

                        padding: 0,

                        font: "inherit"

                      }}

                    >
                      Delete
                    </button>


                  </span>

                )
              }



            </div>


          ))

        )
      }




    </div>

  );


}


export default NoticeList;