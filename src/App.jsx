import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const queryClient = new QueryClient();
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Start from "./pages/Start";
import Charts from "./pages/Charts";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Notification from "./pages/Notifications";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import User from "./pages/User";
import HousePost from "./pages/HousePost";
import HousePosts from "./pages/HousePosts";
import JobPost from "./pages/JobPost";
import JobPosts from "./pages/JobPosts";
import Account from "./pages/Account";
import NotFound from "./pages/Notfound";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="charts" element={<Charts />} />
          <Route path="help" element={<Help />} />
          <Route path="login" element={<Login />} />
          <Route path="notification" element={<Notification />} />
          <Route path="job/posts" element={<JobPosts />} />
          <Route path="job/post/:id" element={<JobPost />} />
          <Route path="house/posts" element={<HousePosts />} />
          <Route path="house/post/:id" element={<HousePost />} />
          <Route path="users" element={<Users />} />
          <Route path="user/:id" element={<User />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*">{() => <div>not found</div>}</Route>
          {/*<Route path="signup" element={<Signup />} />
          
          <Route path="rest-password" element={<ResetPassword />} />
          <Route path="account" element={<Account />} /> */}
          {/* <Route path="*" exact={true} element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
