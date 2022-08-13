import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
const defaultUrl = axios.getUri();
const fetchJob = (id) =>
  axios(`/admin/job/post/${id}`).then((res) => {
    return res.data;
  });
function JobPost() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  // const suspendmutation = useMutation(() => {
  //   return axios.patch(`/admin/user/${id}/suspend`);
  // });
  // const unsuspendmutation = useMutation(() => {
  //   return axios.patch(`/admin/user/${id}/unsuspend`);
  // });
  const { isLoading, isError, data, error } = useQuery(["job", id], () =>
    fetchJob(id)
  );
  console.log(data);
  const postApprovalState = ["pending", "approved", "rejected"];
  const approveMutation = useMutation(() => {
    // return axios.post(`/admin/house/approve/${data._id}`);
    return axios.patch(`/admin/job/approve/${data._id}`);
  });
  const rejectMutation = useMutation(() => {
    return axios.patch(`/admin/job/reject/${data._id}`);
  });

  queryClient.invalidateQueries(["job", id]);
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
      <div>
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
                            {/* <p>posted {timeAgo(data.createdAt)}</p> */}
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
                        gap: "10%",
                        flexDirection: "row",
                        backgroundColor: "#fff",
                      }}
                    >
                      <div
                        style={{
                          padding: 10,
                          borderRadius: 5,
                          backgroundColor: "#0244d0",
                        }}
                      >
                        <div>{data?.applicants?.length || 0} </div>
                        <p style={{ color: "#fff" }}>Applicants</p>
                      </div>
                      <div
                        style={{
                          padding: 10,

                          borderRadius: 5,
                          backgroundColor: "#0244d0",
                        }}
                      >
                        <div>{data?.approved?.length || 0} </div>
                        <p style={{ color: "#fff" }}>Approved</p>
                      </div>
                      <div
                        style={{
                          padding: 10,

                          borderRadius: 5,
                          backgroundColor: "#0244d0",
                        }}
                      >
                        <div>{data?.rejected?.length || 0} </div>
                        <p style={{ color: "#fff" }}>Rejected</p>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: 30,
                        fontWeight: "600",
                        marginVertical: 20,
                      }}
                    >
                      {data.title}
                    </p>

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
                          textAlign: "center",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        Detail Description
                      </p>
                      <p style={{ fontSize: 16 }}>{data.description}</p>
                    </div>
                    <p>permanent {data.permanent ? "Yes" : "No"}</p>
                    <p>cvRequired {data.cvRequired ? "Yes" : "No"}</p>
                    <p>gender {data.gender}</p>
                    <p>hours per week {data.hourPerWeek}</p>
                    <div>
                      <h4>skills</h4>
                      {data.skills.map((skill, index) => {
                        return <p key={index + 1}>{skill}</p>;
                      })}
                    </div>
                    <div>
                      <h3>Experience</h3>
                      <div>
                        <p> {data.experience.title}</p>
                      </div>
                    </div>
                    {data?.budget ? (
                      <div>
                        <p
                          style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            marginVertical: 10,
                          }}
                        >
                          Salary
                        </p>
                        <div style={{ flexDirection: "row" }}>
                          <p style={{ fontSize: 16, marginLeft: "5%" }}>
                            {data.budget.from} birr- {data.budget.to} birr
                          </p>
                        </div>
                      </div>
                    ) : (
                      <View>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 17,
                            marginVertical: 10,
                          }}
                        >
                          Salary
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontSize: 16, marginLeft: "5%" }}>
                            {jobPost.paymentStyle}
                          </Text>
                        </View>
                      </View>
                    )}
                    {data.document ? (
                      <a
                        href={`${defaultUrl}/cv/{data.document}`}
                        download={true}
                      />
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
                          <div className="item-data">{data.placeName}</div>
                          {data.region ? (
                            <p>
                              Region :{" "}
                              <span style={{ color: "rgba(0,0,0,0.6)" }}>
                                {data.region}
                              </span>
                            </p>
                          ) : (
                            <></>
                          )}
                        </div>
                        {/*//col*/}
                      </div>
                    </div>
                  </div>
                  {/*approve and reject*/}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    // Adding leading zero to minutes
    minutes = `0${minutes}`;
  }

  if (prefomattedDate) {
    // Today at 10:20
    // Yesterday at 10:20
    return `${prefomattedDate} at ${hours}:${minutes}`;
  }

  if (hideYear) {
    // 10. January at 10:20
    return `${day}. ${month} at ${hours}:${minutes}`;
  }

  // 10. January 2017. at 10:20
  return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}

// --- Main function
function timeAgo(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 5) {
    return "now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return "about a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, "Today"); // Today at 10:20
  } else if (isYesterday) {
    return getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
  } else if (isThisYear) {
    return getFormattedDate(date, false, true); // 10. January at 10:20
  }

  return getFormattedDate(date); // 10. January 2017. at 10:20
}
export default JobPost;
