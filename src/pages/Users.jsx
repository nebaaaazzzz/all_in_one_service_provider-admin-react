import React, { useState } from "react";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
const defaultUrl = axios.getUri();

function Users() {
  const [page, setPage] = useState(1);
  const fetchUsers = (page = 1) =>
    axios("/admin/users?page=" + page).then((res) => {
      return res.data;
    });
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
  const {
    isLoading,
    isError,
    error,
    data: users,
    isFetching,
    isPreviousData,
  } = useQuery(["users", page], () => fetchUsers(page), {
    keepPreviousData: true,
  });
  console.log(users);
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (isError) {
    <div>Error: {error.message}</div>;
  }
  const disableNextPagePagination = isPreviousData || !users?.hasMore;
  const validToGoNextPage = !isPreviousData && users.hasMore;
  return (
    <div className="app">
      <Header />
      <div className="app-wrapper">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
              <div className="col-auto">
                <h1 className="app-page-title mb-0">Users</h1>
              </div>
              <div className="col-auto">
                <div className="page-utilities">
                  <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                    <div className="col-auto">
                      <form className="table-search-form row gx-1 align-items-center">
                        <div className="col-auto">
                          <input
                            type="text"
                            id="search-orders"
                            name="searchorders"
                            className="form-control search-orders"
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
                    <div className="col-auto">
                      <select
                        defaultChecked="option-1"
                        className="form-select w-auto"
                      >
                        <option value="option-1">All</option>
                        <option value="option-2">This week</option>
                        <option value="option-3">This month</option>
                        <option value="option-4">Last 3 months</option>
                      </select>
                    </div>
                    <div className="col-auto">
                      <a className="btn app-btn-secondary" href="#">
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 0 16 16"
                          className="bi bi-download me-1"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                          />
                        </svg>
                        Download CSV
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <nav
              id="orders-table-tab"
              className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4"
            >
              <a
                className="flex-sm-fill text-sm-center nav-link active"
                id="orders-all-tab"
                data-bs-toggle="tab"
                href="#orders-all"
                role="tab"
                aria-controls="orders-all"
                aria-selected="true"
              >
                All
              </a>
            </nav>

            <div className="tab-content" id="orders-table-tab-content">
              <div
                className="tab-pane fade show active"
                id="orders-all"
                role="tabpanel"
                aria-labelledby="orders-all-tab"
              >
                <div className="app-card app-card-orders-table shadow-sm mb-5">
                  <div className="app-card-body">
                    <div className="table-responsive">
                      <table className="table app-table-hover mb-0 text-left">
                        <thead>
                          <tr>
                            <th className="cell"></th>
                            <th className="cell">id</th>
                            <th className="cell">Name</th>
                            <th className="cell">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => {
                            return (
                              <tr key={index + 1}>
                                <td className="cell">
                                  <img
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                    }}
                                    crossOrigin="Anonymous"
                                    src={`${defaultUrl}/profile-pic/${user.profilePic}`}
                                  />
                                </td>
                                <td className="cell">{user._id}</td>
                                <td className="cell">
                                  <span className="truncate">
                                    {user.firstName} {user.lastName}
                                  </span>
                                </td>
                                <td className="cell">
                                  <span>{user.dateOfBirth}</span>
                                </td>
                                <td className="cell">
                                  <Link to={`/user/${user._id}`}>
                                    <span className="btn-sm app-btn-secondary">
                                      {" "}
                                      View
                                    </span>{" "}
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <Pagination
                  page={page}
                  setPage={setPage}
                  disableNextPagePagination={disableNextPagePagination}
                  validToGoNextPage={validToGoNextPage}
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Users;
