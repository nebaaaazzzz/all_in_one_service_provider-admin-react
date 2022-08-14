import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import Start from "./pages/Start";
import Charts from "./pages/Charts";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import User from "./pages/User";
import HousePost from "./pages/HousePost";
import HousePosts from "./pages/HousePosts";
import JobPost from "./pages/JobPost";
import JobPosts from "./pages/JobPosts";
import Account from "./pages/Account";
import Signup from "./pages/Signup";
import NotFound from "./pages/Notfound";
import ResetPassword from "./pages/ResetPassword";
import AddAdmin from "./pages/AddAdmin";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASEURI } from "./urls";
const defaultUrl = axios.getUri();
export const UserContext = React.createContext();
function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(`${BASEURI}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setIsLoading(false);
          setData(await response.json());
        } else {
          setIsLoading(false);
        }
      }
      {
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) {
    return <div>loading ....</div>;
  }
  return (
    <BrowserRouter>
      {data ? (
        <UserContext.Provider value={{ data, setData }}>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="charts" element={<Charts />} />
            <Route path="help" element={<Help />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="feedback/user/:id" element={<User />} />
            <Route path="job/posts" element={<JobPosts />} />
            <Route path="job/post/:id" element={<JobPost />} />
            <Route path="house/posts" element={<HousePosts />} />
            <Route path="house/post/:id" element={<HousePost />} />
            <Route path="users" element={<Users />} />
            <Route path="user/:id" element={<User />} />
            <Route path="account" element={<Account />} />
            <Route path="add-user" element={<AddAdmin />} />
            <Route path="*" element={<NotFound />} />
            {/*
      <Route path="orders" element={<Orders />} />
      <Route path="*">{() => <div>not found</div>}</Route>
      
       */}
            {/* <Route path="*" exact={true} element={<NotFound />} /> */}
          </Routes>{" "}
        </UserContext.Provider>
      ) : (
        <UserContext.Provider value={{ setData }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="rest-password" element={<ResetPassword />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </UserContext.Provider>
      )}
    </BrowserRouter>
  );
}

export default App;
