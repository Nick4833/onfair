import hero from "/hero.png";
import callToAction from "/callToAction.png";
import "./App.css";
import { BsStars } from "react-icons/bs";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Fairs from "./pages/fairs";
import Landing from "./pages/landing";
import { useAuth } from "./context/AuthContext";
import {useState} from "react"
import CreateEvent from "./pages/createEvent";
import FairDetail from "./pages/fairDetail";
import JoinedFairs from "./pages/joinedFairs";
import CreatedFairs from "./pages/createdFairs";




function App() {
  const {auth} = useAuth()
  const [current, setCurrent] = useState((localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")!) : null)
  console.log("currennt" + current)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout current={current} setCurrent={setCurrent}/>,
      children: [{
        path: "/",
        element: <Landing />,
        
      }, {
        path: "/signup",
        element: <Signup />
      }, {
        path: "/login",
        element: <Login setCurrent={setCurrent}/>
      }, {
        path: "/fairs",
        element: <Fairs />
      }, {
        path: "/create_fair",
        element: <CreateEvent />
      }, {
        path: "/fair/:fairId",
        element: <FairDetail current={current}/>
      }, {
        path: "/joined_fairs",
        element: <JoinedFairs />
      }, {
        path: "/created_fairs",
        element: <CreatedFairs />
      }]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App;
