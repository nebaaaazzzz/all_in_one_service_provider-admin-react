import React, { useState } from "react";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASEURI } from "../urls";
const defaultUrl = axios.getUri();
import { UserContext } from "./../App";
import { useContext } from "react";
function Users() {
  const user = useContext(UserContext).data;
  const [page, setPage] = useState(1);
  const fetchUsers = async (page = 1, searchQuery, userType) => {
    return await fetch(
      `${BASEURI}/admin/users?page=${page}&search=${searchQuery}&userType=${userType}&id=${user._id}`
    ).then((res) => {
      return res.json();
    });
  };
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
  const [searchQuery, setSearchQuery] = useState("");
  const [userType, setUserType] = useState("All");
  const {
    isLoading,
    isError,
    error,
    data: users,
    isPreviousData,
  } = useQuery(
    ["users", page, searchQuery, userType],
    () => fetchUsers(page, searchQuery, userType),
    {
      keepPreviousData: true,
    }
  );
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (isError) {
    <div>Error: {error.message}</div>;
  }
  const disableNextPagePagination = isPreviousData || !users?.hasMore;
  const validToGoNextPage = !isPreviousData && users.hasMore;
  return (
    <div style={{ marginTop: "10%" }}>
      <Header />
      <div>
        <div>
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
                            onChange={(e) =>
                              setSearchQuery(e.currentTarget.value)
                            }
                            value={searchQuery}
                            type="text"
                            id="search-orders"
                            name="searchorders"
                            className="form-control search-orders"
                            placeholder="Search"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="col-auto">
                      <select
                        onChange={(e) => setUserType(e.currentTarget.value)}
                        defaultChecked="option-1"
                        value={userType}
                        className="form-select w-auto"
                      >
                        <option value="All">All</option>
                        <option value="Admin">Admin</option>
                        <option value="Customer">Customer</option>
                      </select>
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
                                      borderRadius: "50%",
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
