import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Footer from "../components/Footer";
const defaultUrl = axios.getUri();
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Option from "../components/Option";
import { Link } from "react-router-dom";
function HousePosts() {
  const [page, setPage] = React.useState(1);
  const fetchPosts = (page = 0) =>
    axios(`/admin/house/posts?page=` + page).then((res) => {
      return res.data;
    });
  const {
    isLoading,
    isError,
    error,
    data: houses,
    isFetching,
    isPreviousData,
  } = useQuery(["houseposts", page], () => fetchPosts(page), {
    keepPreviousData: true,
  });

  // const disableNextPagePagination = isPreviousData || !users?.hasMore;
  // const validToGoNextPage = !isPreviousData && users.hasMore;
  const disableNextPagePagination = false,
    validToGoNextPage = true;
  // if (isLoading) {
  //   return <div>Loading....</div>;
  // }
  // if (isError) {
  //   <div>Error: {error.message}</div>;
  // }
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="app">
      <Header />
      {/*//app-header*/}
      <div className="app-wrapper">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
              <div className="col-auto">
                <h1 className="app-page-title mb-0">Houses</h1>
              </div>
              <div className="col-auto">
                <div className="page-utilities">
                  <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                    <div className="col-auto">
                      <form className="docs-search-form row gx-1 align-items-center">
                        <div className="col-auto">
                          <input
                            type="text"
                            id="search-docs"
                            name="searchdocs"
                            className="form-control search-docs"
                            placeholder="Search"
                          />
                        </div>
                        <div className="col-auto">
                          <button
                            type="submit"
                            className="btn app-btn-secondary"
                          >
                            Search
                          </button>
                        </div>
                      </form>
                    </div>
                    {/*//col*/}
                    <div className="col-auto">
                      <select className="form-select w-auto">
                        <option selected="" value="option-1">
                          All
                        </option>
                        <option value="option-2">Text file</option>
                        <option value="option-3">Image</option>
                        <option value="option-4">Spreadsheet</option>
                        <option value="option-5">Presentation</option>
                        <option value="option-6">Zip file</option>
                      </select>
                    </div>
                    <div className="col-auto">
                      <a className="btn app-btn-primary" href="#">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-upload me-2"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"
                          />
                        </svg>
                        Upload File
                      </a>
                    </div>
                  </div>
                  {/*//row*/}
                </div>
                {/*//table-utilities*/}
              </div>
              {/*//col-auto*/}
            </div>
            {/*//row*/}
            <div className="row g-4">
              {houses.map((house, index) => {
                if (index == 1) {
                  console.log(house);
                }
                return (
                  <div
                    className="col-6 col-md-4 col-xl-3 col-xxl-2"
                    key={index + 1}
                  >
                    <Link to={`/house/post/${house._id}`}>
                      <div className="app-card app-card-doc shadow-sm h-200">
                        <div className="app-card-thumb-holder">
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            crossOrigin="Anonymous"
                            src={`${defaultUrl}/house/image/${house.houseImages[0]}`}
                          />
                        </div>
                        <div className="app-card-body p-3 has-card-actions">
                          <h4 className="app-doc-title truncate mb-0">
                            <a href="#file-link">{house.placeTitle}</a>
                          </h4>
                          <div className="app-doc-meta">
                            <ul className="list-unstyled mb-0">
                              <li>
                                <span className="text-muted">Type:</span>{" "}
                                {house.placeDescription.title}
                              </li>
                              <li>
                                <span className="text-muted">price:</span>{" "}
                                {house.price}
                              </li>
                              <li>
                                <span className="text-muted">Posted:</span> 3
                                weeks ago
                              </li>
                            </ul>
                          </div>
                          {/*//app-doc-meta*/}
                          <Option />

                          {/*//app-card-actions*/}
                        </div>
                        {/*//app-card-body*/}
                      </div>
                    </Link>

                    {/*//app-card*/}
                  </div>
                );
              })}

              {/*//col*/}

              {/*//app-card*/}

              {/*//col*/}

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

export default HousePosts;
