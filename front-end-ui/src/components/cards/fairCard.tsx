import {BsCalendar2Date} from "react-icons/bs"
import { Link } from "react-router-dom"

const FairCard = ({event, joined, organizer}: {event: any, joined: boolean, organizer: boolean}) => {
    return (
        <div className="flex flex-col gap-3 border-2 shadow-lg rounded-lg relative">
            <img src={"http://localhost:8000/images/" + event.image} className="object-cover h-48 w-100 rounded-t-lg"/>
            <div className="p-5 flex flex-col gap-5">
            <p className="text-xl font-bold truncate">{event.name}</p>
            <div className="flex gap-3 items-center p-3 border-2 shadow-lg rounded-lg w-fit">
            <BsCalendar2Date className="text-2xl" />
            <div>
                <small>Event Date</small>
            <p>{new Date(event.date).toLocaleString()}</p>
            </div>
            </div>
            <p className="break-words h-[100px] line-clamp-4">{event.desc}</p>
            {joined || organizer ? (
          <a href={`/fair/${event._id}`} className="w-full justify-center bg-blue-800 flex text-white p-5 rounded-lg hover:bg-green-700 transition-all">
          View Info
        </a>) : (
            <a href={`/fair/${event._id}`} className="w-full justify-center bg-green-800 flex text-white p-5 rounded-lg hover:bg-green-700 transition-all">
            Register now
          </a>
          )
}
          </div>
        </div>
    )
}

export default FairCard