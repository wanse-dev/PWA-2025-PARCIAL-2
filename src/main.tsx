import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./components/layout/Layout";
import { Register } from "./pages/register/Register";
import { Posts } from "./pages/posts/Posts";
import { PostDashboard } from "./pages/postDashboard/PostDashboard";
import { CreatePost } from "./pages/createPost/CreatePost";
import { Users } from "./pages/users/Users";
import { UserDashboard } from "./pages/userDashboard/UserDashboard";
import { FallBack } from "./pages/fallBack/FallBack";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
    errorElement: <FallBack />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <FallBack />,
  },
  {
    element: <Layout />,
    errorElement: <FallBack />,
    children: [
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/postDashboard",
        element: <PostDashboard />,
      },
      {
        path: "/createPost",
        element: <CreatePost />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/userDashboard",
        element: <UserDashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
