import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Footer from "../components/Footer";
const defaultUrl = axios.getUri();
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Option from "../components/Option";
import { Link } from "react-router-dom";
import moment from "moment";
function Posts() {
  const [page, setPage] = React.useState(1);
  const fetchPosts = (page = 0) =>
    axios("/admin/job/posts?page=" + page).then((res) => {
      return res.data;
    });
  const {
    isLoading,
    isError,
    error,
    data: jobs,
    isFetching,
    isPreviousData,
  } = useQuery(["jobposts", page], () => fetchPosts(page), {
    keepPreviousData: true,
  });

  // const disableNextPagePagination = isPreviousData || !users?.hasMore;
  // const validToGoNextPage = !isPreviousData && users.hasMore;
  let disableNextPagePagination = false,
    validToGoNextPage = true;
  if (jobs) {
    disableNextPagePagination = !Boolean(jobs.length);
  }
  // if (isLoading) {
  //   return <div>Loading....</div>;
  // }
  // if (isError) {
  //   <div>Error: {error.message}</div>;
  // }
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      {/*//app-header*/}
      <Header />
      <div style={{ marginTop: "5%" }}>
        <div>
          <div>
            <div>
              <div>
                <h1 className="app-page-title mb-0">Jobs</h1>
              </div>
              {/*//col-auto*/}
            </div>
            {/*//row*/}
            <div
              style={{
                marginLeft: "15%",
                flexDirection: "column",
                marginTop: "4%",
                marginBottom: 20,
              }}
            >
              {jobs.map((job) => {
                return (
                  <Link to={`/job/post/${job._id}`}>
                    <div
                      style={{
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.5)",
                        margin: 20,
                        borderStyle: "solid",
                      }}
                    >
                      <div className="app-card app-card shadow-sm">
                        <div className="app-card-thumb-holder p-3">
                          <h4>{job.title}</h4>
                        </div>
                        <div className="app-card-body p-3 has-card-actions">
                          <h5 className="app-doc-title truncate mb-0">
                            <a href="#file-link">{job.placeName}</a>
                          </h5>
                          <div className="app-doc-meta">
                            <ul className="list-unstyled mb-0">
                              <li>
                                <span className="text-muted">Uploaded:</span>{" "}
                                {moment(job.createdAt).fromNow()}
                              </li>
                            </ul>
                          </div>
                          {/*//app-doc-meta*/}
                          <Option />
                          {/*//app-card-actions*/}
                        </div>
                        {/*//app-card-body*/}
                      </div>
                      {/*//app-card*/}
                    </div>
                  </Link>
                );
              })}
              {/*//col*/}
            </div>
            {/*//row*/}
            <Pagination
              page={page}
              setPage={setPage}
              disableNextPagePagination={disableNextPagePagination}
              validToGoNextPage={validToGoNextPage}
            />
            {/*//app-pagination*/}
          </div>
          {/*//container-fluid*/}
        </div>
        {/*//app-content*/}
        <Footer />
        {/*//app-footer*/}
      </div>
      {/*//app-wrapper*/}
      {/* Javascript */}
      {/* Page Specific JS */}
    </div>
  );
}

export default Posts;
