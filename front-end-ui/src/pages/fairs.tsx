import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import FairCard from "../components/cards/fairCard";


const Fairs = () => {
    const [events, setEvents] = useState([])
    const getAll = async() => {
        const response = await fetch("http://localhost:8000/api/event", {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost",
        },
        redirect: "follow"
      });
      let responseJson = await response.json();
      setEvents(responseJson.events)
    }
    const navigate = useNavigate()
    useEffect(() => {
        const user = localStorage.getItem("user");
        if(!user) {
            navigate("/")
        }else {
            getAll()
        }
    }, [])
    return (
        <div className="flex flex-col gap-10 py-10">
            <h1 className="text-3xl font-bold">Upcoming Fairs For You</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {events && events.map((event: any, index) => (
                <FairCard key={index} event={event} joined={false} organizer={false}/>
            ))}
        </div>
        </div>
    )
}


export default Fairs