import React, { useState } from "react";
import Header from "../components/Header";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASEURI } from "../urls";
const defaultUrl = axios.getUri();
const FeedbackComponent = ({ feedbacks }) => {
  return (
    <>
      {feedbacks.map((feedback) => {
        return (
          <div
            style={{
              // borderBottomWidth: 1,
              // borderBottomColor: "red",
              // borderBottomStyle: "solid",
              borderTopWidth: 1,
              paddingTop: 10,
              borderTopColor: "red",
              borderTopStyle: "solid",
            }}
          >
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link to={`/user/${feedback.user._id}`} style={{ margin: 10 }}>
                <img
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    marginRight: "10%",
                    height: "50px",
                  }}
                  crossOrigin="Anonymous"
                  src={`${defaultUrl}/profile-pic/${feedback.user.profilePic}`}
                />
              </Link>
              <ul className="notification-meta list-inline">
                <li className="list-inline-item">
                  <Link to={`/user/${feedback.user._id}`}>
                    {feedback.user.firstName} {feedback.user.lastName}
                  </Link>
                </li>
                <li className="list-inline-item">|</li>
                <li className="list-inline-item">2 hrs ago</li>
              </ul>
            </div>
            <div className="app-card-body ">
              <div className="notification-content">
                <p
                  style={{
                    width: "100%",
                    textAlign: "left",
                    marginLeft: "15%",
                  }}
                >
                  {feedback.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

function Feedback() {
  const [page, setPage] = useState(1);

  const fetchFeedbacks = (page = 1, feedback) =>
    // axios("/admin/feedback?page=" + page).then((res) => {
    axios(`${BASEURI}/admin/feedback?page=${page}&feedback=${feedback}`).then(
      (res) => {
        return res.data;
      }
    );
  // useEffect(() => {
  //   fetch("http://localhost:5000/admin/users")
  //     .then((res) => {
  //       console.log(res.ok);
  //       return res.json();
  //     })
  //     .then((e) => {
  //       console.log(e);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // });
  const [selected, setSelected] = useState("Feedback");
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    ["feedback", page, selected],
    ({ pageParam = 1, queryKey }) => {
      return fetchFeedbacks(pageParam, queryKey[2] == "Feedback" ? 0 : 1);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length > 0) {
          return pages.length + 1;
        }
        return;
      },
    }
  );

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (isError) {
    <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Header />
      {/*//app-header*/}
      <div style={{ marginTop: "15%", width: 500 }}>
        <div>
          <div>
            <div>
              <div>
                <div className="col-auto">
                  <h1 className="app-page-title mb-0">{selected}</h1>
                </div>
                <div>
                  <div className="page-utilities">
                    <select
                      className="form-select form-select-sm w-auto"
                      onChange={(e) => setSelected(e.target.value)}
                    >
                      <option value="Feedback">Feedback</option>
                      <option value="Complain">complain</option>
                    </select>
                  </div>
                  {/*//page-utilities*/}
                </div>
              </div>
            </div>
            {data.pages.map((group, i) => {
              return <FeedbackComponent feedbacks={group} />;
            })}
            {/*//app-card*/}

            <>
              <div>
                <button
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                    ? "Load More"
                    : "Nothing more to load"}
                </button>
              </div>
              <div>
                {isFetching && !isFetchingNextPage ? "Fetching..." : null}
              </div>
            </>
          </div>
          {/*//container-fluid*/}
        </div>
        {/*//app-content*/}
        <footer className="app-footer">
          <div className="container text-center py-3">
            {/*/* This template is free as long as you keep the footer attribution link. If you'd like to use the template without the attribution link, you can buy the commercial license via our website: themes.3rdwavemedia.com Thank you for your support. :) * /*/}
            <small className="copyright">
              Designed with <span className="sr-only">love</span>
              <i className="fas fa-heart" style={{ color: "#fb866a" }} /> by
              <a
                className="app-link"
                href="http://themes.3rdwavemedia.com"
                target="_blank"
              >
                Xiaoying Riley
              </a>
              for developers
            </small>
          </div>
        </footer>
        {/*//app-footer*/}
      </div>
      {/*//app-wrapper*/}
      {/* Javascript */}
      {/* Page Specific JS */}
    </div>
  );
}

export default Feedback;
