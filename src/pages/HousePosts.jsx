import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Footer from "../components/Footer";
const defaultUrl = axios.getUri();
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Option from "../components/Option";
import { Link } from "react-router-dom";
import { BASEURI } from "../urls";
import { useEffect } from "react";
function HousePosts() {
  const [page, setPage] = React.useState(1);
  const fetchPosts = async (page = 0) =>
    await fetch(`${BASEURI}/admin/house/posts?page=` + page).then((res) => {
      return res.json();
    });
  const {
    isLoading,
    isError,
    error,
    data: houses,
    isFetching,
    isPreviousData,
  } = useQuery(
    ["houseposts", page],
    () => fetchPosts(page),
    {},
    {
      keepPreviousData: true,
    }
  );
  useEffect(() => {
    (async () => {
      console.log(
        await fetch("http://localhost:5000/admin/house/posts").then((res) => {
          return res.json();
        })
      );
    })();
  }, []);
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
    <div>
      <Header />
      {/*//app-header*/}
      <div>
        <div>
          <div>
            <div>
              <div className="col-auto">
                <h1 className="app-page-title mb-0">Houses</h1>
              </div>
            </div>
            {/*//row*/}
            <div>
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
                      <div className="app-card shadow-sm">
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
                            <p>{house.placeTitle}</p>
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
