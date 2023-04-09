import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const FairDetail = ({ current }: { current: any }) => {
  let { fairId } = useParams();
  const [event, setEvent] = useState({
    event: {
      _id: "",
      name: "",
      image: "",
      date: "",
      desc: "",
      apply: "",
      aim: "",
      link: "",
    },
  });
  const [fairs, setFairs] = useState<string[]>([]);
  const [registered, setRegistered] = useState(false);
  const [organizer, setOrganizer] = useState(false);

  const getAll = async (id: String) => {
    const response = await fetch(`http://localhost:8000/api/event/${fairId}`, {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost",
      },
      redirect: "follow",
    });
    let responseJson = await response.json();
    if ((responseJson.event.creator == id)) {
      setOrganizer(true);
    }
    setEvent(responseJson);
  };

  const getFairs = async (id: String) => {
    console.log(id);
    const response = await fetch(`http://localhost:8000/api/user/${id}`, {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost",
      },
      redirect: "follow",
    });
    let responseJson = await response.json();
    if(responseJson.fairs.length > 0){
    responseJson.fairs.map((fair: any) => {
      if (fair == fairId) {
        setRegistered(true);
      }
    });
  }
  };

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (!user) {
      navigate("/");
    } else {
      getAll(user.user.id);
      console.log(user);
      getFairs(user.user.id);
    }
  }, []);

  const registerEvent = async () => {
    const registerData = {
      event_id: event.event._id,
      user_id: current.user.id,
    };
    const response = await fetch(
      `http://localhost:8000/api/event/update_event`,
      {
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
        body: JSON.stringify(registerData),
      }
    );
    let responseJson = await response.json();
    console.log(responseJson);
    toast.success(`You are now registered to this event. See you on ${new Date(event.event.date).toLocaleDateString()}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    setRegistered(true);
  };

  const unregisterEvent = async () => {
    const registerData = {
      event_id: event.event._id,
      user_id: current.user.id,
    };
    const response = await fetch(
      `http://localhost:8000/api/event/decrease_event`,
      {
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
        body: JSON.stringify(registerData),
      }
    );
    let responseJson = await response.json();
    console.log(responseJson);
    toast.error('You are now un-registered to this event. Thanks for consideration.', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    setRegistered(false);
  };

  return (
    <>
    <ToastContainer/>
      {event && (
        <div className="flex flex-col border-2 shadow-lg my-5">
          <img
            src={"http://localhost:8000/images/" + event.event.image}
            className="object-cover h-48 w-100 rounded-t-lg"
          />
          <div className="p-5 flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
              <h1 className="text-4xl font-bold">{event.event.name}</h1>
              <div className="w-full flex justify-stretch md:justify-end">
                {organizer ? (
                  <button
                  disabled
                  onClick={registerEvent}
                  className="w-full md:w-fit h-fit justify-center bg-blue-800 flex text-white px-10 py-3 rounded-lg"
                >
                  You are the organizer.
                </button>
                ) : !registered ? (
                  <button
                    onClick={registerEvent}
                    className="w-full md:w-fit h-fit justify-center bg-green-800 flex text-white px-10 py-3 rounded-lg hover:bg-green-700 transition-all"
                  >
                    Register now
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-5">
                    <button
                      onClick={unregisterEvent}
                      className="w-full md:w-full h-fit justify-center bg-red-800 flex text-white px-10 py-3 rounded-lg"
                    >
                      Unregister Event
                    </button>
                    <Link
                      to={event.event.link}
                      target="_blank"
                      className="w-full md:w-full h-fit justify-center bg-green-800 flex text-white px-10 py-3 rounded-lg hover:bg-green-700 transition-all"
                    >
                      Go to Fair
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 items-center p-3 border-2 shadow-lg rounded-lg w-full md:w-fit">
              <BsCalendar2Date className="text-2xl" />
              <div>
                <small>Event Date</small>
                <p>{new Date(event.event.date).toLocaleString()}</p>
              </div>
            </div>
            <p>{event.event.desc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-3">
                <p className="font-bold">Who can apply?</p>
                <p>{event.event.apply}</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-bold">What are the aims of the fair?</p>
                <p>{event.event.aim}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FairDetail;
