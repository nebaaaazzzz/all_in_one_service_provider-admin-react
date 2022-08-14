import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
const defaultUrl = axios.getUri();
const fetchHouse = (id) =>
  axios(`/admin/house/post/${id}`).then((res) => {
    return res.data;
  });
function HousePost() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  // const suspendmutation = useMutation(() => {
  //   return axios.patch(`/admin/user/${id}/suspend`);
  // });
  // const unsuspendmutation = useMutation(() => {
  //   return axios.patch(`/admin/user/${id}/unsuspend`);
  // });
  const { isLoading, isError, data, error } = useQuery(["house", id], () =>
    fetchHouse(id)
  );

  const postApprovalState = ["pending", "approved", "rejected"];
  const approveMutation = useMutation(() => {
    // return axios.post(`/admin/house/approve/${data._id}`);
    return axios.patch(`/admin/house/approve/${data._id}`);
  });
  const rejectMutation = useMutation(() => {
    return axios.patch(`/admin/house/reject/${data._id}`);
  });

  // if (isLoading || suspendmutation.isLoading || unsuspendmutation.isLoading) {
  //   return <div>Loaing ....</div>;
  // }
  // if (isError) {
  //   return <div>{error.message}</div>;
  // }
  // if (suspendmutation.isError) {
  //   return <div>{suspendmutation.error.message}</div>;
  // }
  queryClient.invalidateQueries(["house", id]);
  if (isLoading || approveMutation.isLoading || rejectMutation.isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  if (approveMutation.isError) {
    return <p>{approveMutation.error.message}</p>;
  }
  if (rejectMutation.isError) {
    return <P>{rejectMutation.error.message}</P>;
  }
  return (
    <div>
      <Header />
      <div style={{ paddingLeft: "20%" }}>
        <div>
          <div>
            <h1 className="app-page-title">House</h1>
            <div>
              <div>
                <div>
                  <div>{/*//row*/}</div>
                  {/*//app-card-header*/}
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <strong>Photo</strong>
                            <strong style={{ margin: 30 }}>
                              {postApprovalState[data.isApproved]}
                            </strong>
                          </div>
                        </div>
                      </div>
                      {/*//row*/}
                    </div>
                    <div>
                      <div>
                        <div>
                          <div className="item-label">
                            <strong>Id</strong> {data._id}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Name</strong>
                          </div>
                          <div className="item-data">
                            {/* {data.firstName} {data.lastName} */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {data.houseImages.map((id, index) => {
                        return (
                          <img
                            style={{ width: 150, height: 150 }}
                            className="profile-image"
                            crossOrigin="anonymous"
                            src={`${defaultUrl}/houseImage/${id}`}
                            alt=""
                          />
                        );
                      })}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10%",
                        flexDirection: "row",
                        backgroundColor: "#fff",
                      }}
                    >
                      <div
                        style={{
                          padding: 5,
                          borderRadius: 5,
                        }}
                      >
                        <div>{data?.applicants?.length || 0} </div>
                        <p style={{}}>Applicants</p>
                      </div>
                      <div
                        style={{
                          padding: 5,

                          borderRadius: 5,
                        }}
                      >
                        <div>{data?.approved?.length || 0} </div>
                        <p style={{}}>Approved</p>
                      </div>
                      <div
                        style={{
                          padding: 5,

                          borderRadius: 5,
                        }}
                      >
                        <div>{data?.rejected?.length || 0} </div>
                        <p style={{}}>Rejected</p>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 30,
                        fontWeight: "600",
                        marginVertical: 20,
                      }}
                    >
                      {data.placeName}
                    </p>
                    {data.region ? (
                      <p>
                        Region :{" "}
                        <p style={{ color: "rgba(0,0,0,0.6)" }}>
                          {data.region}
                        </p>
                      </p>
                    ) : (
                      <></>
                    )}
                    {data?.guestFavourite?.length ? (
                      <div
                        style={{
                          marginVertical: "2%",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <p
                          style={{
                            marginRight: "2%",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          Guest Favourite
                        </p>
                        {data?.guestFavourite?.map((item, index) => {
                          return (
                            <div key={index + 1} style={{}}>
                              <p
                                style={{
                                  borderRadius: 15,
                                  // backgroundColor: "#0244d0",
                                }}
                              >
                                {item}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.saftyItems?.length ? (
                      <div
                        style={{
                          marginVertical: "2%",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <p
                          style={{
                            marginVertical: "2%",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          Safty Items
                        </p>
                        {data?.saftyItems?.map((item, index) => {
                          return (
                            <div key={index + 1}>
                              <p
                                style={{
                                  paddingVertical: 5,
                                  paddingHorizontal: 10,
                                  borderRadius: 15,
                                }}
                              >
                                {item}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                    {data?.amenities?.length ? (
                      <div
                        style={{
                          marginVertical: "2%",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          style={{
                            marginVertical: "2%",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          Amenities
                        </div>
                        {data?.amenities?.map((item, index) => {
                          return (
                            <div key={index + 1} style={{ marginRight: 10 }}>
                              <p
                                style={{
                                  paddingVertical: 5,
                                  paddingHorizontal: 10,
                                  borderRadius: 15,
                                  // backgroundColor: "#0244d0",
                                }}
                              >
                                {item}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                    <div
                      style={{
                        marginVertical: "2%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <p style={{ fontSize: 17, fontWeight: "bold" }}>
                        Price :{" "}
                      </p>
                      <p style={{ color: "rgba(0,0,0,0.7)" }}>{data.price}</p>
                    </div>
                    {data?.bestDescribe?.length ? (
                      <div
                        style={{
                          marginVertical: "2%",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <p
                          style={{
                            marginVertical: "2%",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          Best Describe
                        </p>
                        {data?.bestDescribe?.map((item, index) => {
                          return (
                            <div style={{}}>
                              <p
                                key={index + 1}
                                style={{
                                  paddingVertical: 5,
                                  paddingHorizontal: 10,
                                  borderRadius: 15,
                                  // backgroundColor: "#0244d0",
                                }}
                              >
                                {item}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: 17, fontWeight: "bold" }}>
                        Place Kind :{" "}
                      </p>
                      <p style={{ color: "rgba(0,0,0,0.7)" }}>
                        {data.placeKind}
                      </p>
                    </div>
                    {/*//item*/}
                    <div
                      style={{
                        marginVertical: 20,
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          fontWeight: "bold",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        Place Description
                      </p>
                      <div>
                        <p style={{ fontSize: 16 }}>
                          Type :{"  "}
                          <span style={{ color: "rgba(0,0,0,0.6)" }}>
                            {data.placeDescription.title}
                          </span>
                        </p>
                        <p style={{ fontSize: 16 }}>
                          Description :{" "}
                          <p style={{ color: "rgba(0,0,0,0.6)" }}>
                            {data.placeDescription.description}
                          </p>
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        marginVertical: 20,
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        Detail Description
                      </p>
                      <p style={{ fontSize: 16 }}>{data.detailDescription}</p>
                    </div>

                    {/*//item*/}
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Location</strong>
                          </div>
                          <div className="item-data">New York</div>
                        </div>
                        {/*//col*/}
                        <div className="col text-end">
                          <a className="btn-sm app-btn-secondary" href="#">
                            Change
                          </a>
                        </div>
                        {/*//col*/}
                      </div>
                      {/*//row*/}
                    </div>
                    {/*//item*/}
                  </div>
                  {/*//app-card-body*/}
                  <div className="app-card-footer p-4 mt-auto">
                    {data.isApproved === 0 ? (
                      <div>
                        <button
                          style={{ backgroundColor: "green" }}
                          onClick={() => approveMutation.mutate()}
                        >
                          Approve
                        </button>
                        <button
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            rejectMutation.mutate();
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    ) : data.isApproved == 1 ? (
                      <button
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                          rejectMutation.mutate();
                        }}
                      >
                        Reject
                      </button>
                    ) : (
                      <button
                        style={{ backgroundColor: "green" }}
                        onClick={() => {
                          approveMutation.mutate();
                        }}
                      >
                        Approve
                      </button>
                    )}
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

export default HousePost;
