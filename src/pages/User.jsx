import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
const defaultUrl = axios.getUri();
const fetchUser = (id) =>
  axios(`/admin/user/${id}`).then((res) => {
    return res.data;
  });
function User() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const suspendmutation = useMutation(() => {
    return axios.patch(`/admin/user/${id}/suspend`);
  });

  const unsuspendmutation = useMutation(() => {
    axios.post;
    return axios.patch(`/admin/user/${id}/unsuspend`);
  });
  const updatemutation = useMutation(() => {
    return axios.patch(`/admin/left-update/${id}/`);
  });
  const { isLoading, isError, data, error } = useQuery(["user", id], () =>
    fetchUser(id)
  );
  if (
    isLoading ||
    suspendmutation.isLoading ||
    unsuspendmutation.isLoading ||
    updatemutation.isLoading
  ) {
    return <div>Loaing ....</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (suspendmutation.isError) {
    return <div>{suspendmutation.error.message}</div>;
  }
  queryClient.invalidateQueries(["user", id]);
  return (
    <div>
      <Header />
      <div>
        <div>
          <div style={{ marginTop: "30%" }}>
            <div className="row gy-4">
              <div>
                <div>
                  <div className="app-card-header p-3 border-bottom-0">
                    <div className="row align-items-center gx-3">
                      <div className="col-auto">
                        <div className="app-icon-holder">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-person"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                            />
                          </svg>
                        </div>
                        {/*//icon-holder*/}
                      </div>
                      {/*//col*/}
                      <div className="col-auto">
                        <h4 className="app-card-title">Profile</h4>
                      </div>
                      {/*//col*/}
                    </div>
                    {/*//row*/}
                  </div>
                  {/*//app-card-header*/}
                  <div className="app-card-body px-4 w-100">
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label mb-2">
                            <strong>Photo</strong>
                          </div>
                          <div className="item-data">
                            <img
                              className="profile-image"
                              crossOrigin="anonymous"
                              style={{
                                borderRaduis: "50%",
                                width: 150,
                                height: 150,
                              }}
                              src={`${defaultUrl}/profile-pic/${data.profilePic}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      {/*//row*/}
                    </div>
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Id</strong> {data._id}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Remaning</strong> {data.left}
                          </div>
                        </div>
                      </div>
                    </div>
                    {data.orderId ? (
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label">
                              <strong>OrderId</strong> {data.orderId}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Name</strong>
                          </div>
                          <div className="item-data">
                            {data.firstName} {data.lastName}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Gender</strong>
                          </div>
                          <div className="item-data">{data.gender}</div>
                        </div>
                      </div>
                    </div>
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Description</strong>
                          </div>
                          <div className="item-data">{data.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>PhoneNumber</strong>
                          </div>
                          <div className="item-data">{data.description}</div>
                        </div>
                      </div>
                    </div>

                    {/*//item*/}
                    {data?.email ? (
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label">
                              <strong>Email</strong>
                            </div>
                            <div className="item-data">{data.email}</div>
                          </div>
                        </div>{" "}
                      </div>
                    ) : null}
                    {data?.skill?.length ? (
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label">
                              <strong>Skills</strong>
                            </div>
                            <div className="item-data">
                              {data.skills.map((skill) => {
                                return <p>{skill}</p>;
                              })}
                            </div>
                          </div>
                          {/*//col*/}

                          {/*//col*/}
                        </div>
                        {/*//row*/}
                      </div>
                    ) : null}
                    {data.cv ? (
                      <div
                        style={{
                          backgroundColor: "#0244d0",
                          paddingVertical: 5,
                          paddingHorizontal: 5,
                          borderRadius: 5,
                        }}
                      >
                        <a
                          href={`${BASEURI}/cv/{data.cv}`}
                          download
                          style={{
                            textAlign: "center",
                            paddingVertical: 5,
                            fontSize: 16,
                            color: "#fff",
                          }}
                        >
                          open cv
                        </a>
                      </div>
                    ) : (
                      <></>
                    )}
                    {data.education.length ? (
                      <div>
                        <p style={{ fontWeight: "bold" }}>Education</p>
                        {data.education.map((item, index) => {
                          return (
                            <div key={index + 1}>
                              <p style={{ borderWidth: 0.25 }} />
                              <p>{item.institution}</p>
                              <div
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div style={{ flexDirection: "row" }}>
                                  <p>
                                    {new Date(item.start).getMonth() +
                                      "/" +
                                      new Date(item.start).getFullYear()}
                                    -
                                  </p>
                                  <p>
                                    {new Date(item.to).getMonth() +
                                      "/" +
                                      new Date(item.to).getFullYear()}
                                  </p>
                                </div>
                              </div>
                              <div style={{ flexDirection: "row" }}>
                                <p>
                                  {item.major} {"    "}
                                </p>
                                <p>{item.degree}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                    {data.languages.length ? (
                      <div style={{ marginVertical: 15 }}>
                        <p style={{ fontWeight: "bold" }}>Languages</p>
                        <p />
                        <div style={{ paddingVertical: 10 }}>
                          {data.languages.map((item, index) => {
                            return (
                              <div
                                key={index + 1}
                                style={{
                                  paddingVertical: 5,
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-around",
                                }}
                              >
                                <div
                                  style={{
                                    paddingRight: "10%",
                                    flex: 1,
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                  }}
                                >
                                  <p>{item.language}</p>
                                  <p>{item.level}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}

                    {/*//item*/}
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Location</strong>
                          </div>
                          <div className="item-data">{data.city}</div>
                          <span className="item-data">{data.region}</span>
                        </div>
                        {/*//col*/}

                        {/*//col*/}
                      </div>
                      {/*//row*/}
                    </div>
                    {/*//item*/}
                  </div>
                  {/*//app-card-body*/}
                  <div className="app-card-footer p-4 mt-auto">
                    {data.suspended ? (
                      <button
                        style={{ backgroundColor: "green" }}
                        onClick={() => unsuspendmutation.mutate()}
                      >
                        Unsuspend
                      </button>
                    ) : (
                      <button
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                          const bool = confirm(
                            "Are You sure You Want to suspend this User ?"
                          );
                          if (bool) {
                            suspendmutation.mutate();
                          }
                        }}
                      >
                        suspend
                      </button>
                    )}
                  </div>
                  <div>
                    <button onClick={() => updatemutation.mutate()}>
                      Update Remaning
                    </button>
                  </div>
                  {/*//app-card-footer*/}
                </div>
                {/*//app-card*/}
              </div>
              {/*//col*/}
            </div>
            {/*//row*/}
          </div>
          {/*//container-fluid*/}
        </div>
        {/*//app-content*/}

        {/*//app-footer*/}
      </div>
    </div>
  );
}

export default User;
