import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import { BASEURI } from "../urls";
import { useEffect } from "react";
import Footer from "../components/Footer";
function Start() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch(`${BASEURI}/admin/overview`);
      if (response.ok) {
        setData(await response.json());
        setIsLoading(false);
      } else {
        setIsError(true);
        setError(await response.json());
      }
    })();
  }, []);
  if (isLoading) {
    return <div>Loading ....</div>;
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
            <h1 className="app-page-title">Overview</h1>
            {/*//app-card*/}
            <div
              style={{ display: "flex", flexWrap: "wrap", marginLeft: "30%" }}
            >
              {Object.keys(data).map((info, index) => {
                return (
                  <div
                    style={{
                      borderWidth: 1,
                      borderStyle: "solid",
                      margin: 10,
                      padding: "10px 15px",
                      borderRadius: 10,
                      borderColor: "#0244d0",
                    }}
                  >
                    <div>
                      <div>
                        <h5>{info}</h5>
                        <div>{data[info]}</div>
                      </div>
                      {/*//app-card-body*/}
                    </div>
                    {/*//app-card*/}
                    {/*//col*/}
                  </div>
                );
              })}
            </div>
            {/*//row*/}
          </div>
          {/*//container-fluid*/}
        </div>
        <Footer />
      </div>
      {/*//app-wrapper*/}
      {/* Javascript */}
      {/* Charts JS */}
      {/* Page Specific JS */}
    </div>
  );
}

export default Start;
