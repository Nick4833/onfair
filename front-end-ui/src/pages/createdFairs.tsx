import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import FairCard from "../components/cards/fairCard";

const CreatedFairs = () => {
    const [events, setEvents] = useState([])

    const getAll = async(id: String) => {
        const joinedData = {
            userId: id
        }
        const response = await fetch("http://localhost:8000/api/event/created_events", {
        method: "POST",
        mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost",
      },
      redirect: "follow",
      body: JSON.stringify(joinedData),
      });
      let responseJson = await response.json();
      console.log(responseJson)
      setEvents(responseJson.events)
    }



    const navigate = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")!);
        if(!user || user.user.role == "STUDENT") {
            navigate("/")
        }else {
            getAll(user.user.id)
        }
    }, [])
    return (
        <div className="flex flex-col gap-10 py-10">
            <h1 className="text-3xl font-bold">Fairs You Created</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {events && events.map((event: any, index) => (
                <FairCard key={index} event={event} joined={false} organizer={true}/>
            ))}
        </div>
        </div>
    )
}

export default CreatedFairs