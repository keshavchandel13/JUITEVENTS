import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  HomeLayout,
  Landing,
  Login,
  Logout,
  Register,
  CreateEvent,
  Registration,
  ViewEvents,
  EventGallery,
  AdminEventRegistrations,
  EventRegister,
  AdminDashboard,
  Profile
} from "./pages";
import { ToastContainer, toast } from "react-toastify";
import PublicLayout from "./pages/PublicLayout";
import AdminLayout from "./pages/AdminLayout";
import EventWinners from "./pages/EventWinners";
import AdminWinners from "./pages/AdminWinners";
const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // APP ROUTES (WITH SIDEBAR)
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/events",
        element: <ViewEvents />,
      },
      {
        path: "profile",
        element: <Profile />,
      },  
      {
        path: "/gallery",
        element: <EventGallery />,
      },
      {
        path: "/register-event/:id",
        element: <EventRegister />,
      },
      {
        path: "/winner",
        element: <EventWinners />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "create-event",
        element: <CreateEvent />,
      },
      {
        path: "participant",
        element: <AdminEventRegistrations />,
      },
      {
        path: "gallery",
        element: <EventGallery />,
      },
      {
        path: "winners",
        element: <AdminWinners />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
