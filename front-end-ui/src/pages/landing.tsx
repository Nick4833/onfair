import hero from "/hero.png";
import callToAction from "/callToAction.png";
import { BsStars } from "react-icons/bs";

const Landing = () => {
    return (
        <div className="App mt-5 flex flex-col gap-20 py-5">
      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center border-b-2">
        <div className="flex flex-col gap-7 max-w-[600px]">
          <h1 className="text-3xl md:text-5xl font-bold md:leading-normal">
            Best Platform For Connecting Universities And Students
          </h1>
          <p>
            The platform for finding Online Education Fairs for your academic
            future. Sign up and start Joining events.
          </p>
          <button className="w-full md:w-fit justify-center bg-green-800 flex text-white p-5 rounded-lg hover:bg-green-700 transition-all">
            Join with us today!
          </button>
        </div>
        <img
          src={hero}
          alt="hero_image"
          className="order-first md:order-last"
        />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col gap-5 border-2 p-5 rounded-lg shadow-lg">
          <p className="font-semibold text-lg flex items-center gap-5">
            <span>
              <BsStars className="text-3xl" />
            </span>
            Faster way to start your educational journey.
          </p>
          <p>
            We provide faster methods to start your educational journey by
            connecting you with the right university or college.
          </p>
        </div>
        <div className="flex flex-col gap-5 border-2 p-5 rounded-lg shadow-lg">
          <p className="font-semibold text-lg flex items-center gap-5">
            <span>
              <BsStars className="text-3xl" />
            </span>
            Faster way to start your educational journey.
          </p>
          <p>
            We provide faster methods to start your educational journey by
            connecting you with the right university or college.
          </p>
        </div>
        <div className="flex flex-col gap-5 border-2 p-5 rounded-lg shadow-lg">
          <p className="font-semibold text-lg flex items-center gap-5">
            <span>
              <BsStars className="text-3xl" />
            </span>
            Faster way to start your educational journey.
          </p>
          <p>
            We provide faster methods to start your educational journey by
            connecting you with the right university or college.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="flex flex-wrap md:flex-nowrap border-2 rounded-lg items-center shadow-lg">
        <img src={callToAction} className="rounded-l-lg" />
        <div className="flex flex-col gap-5 p-5 max-w-[800px]">
          <p className="text-2xl md:text-4xl font-bold">Start Connecting With Your Future Teachers and Students</p>
          <p>
            Don’t be shy. Start viewing events and join them if you think you
            meet the requirements for the fair. Your Future is starting today!
          </p>
          <button className="w-full md:w-fit justify-center bg-green-800 flex text-white p-5 rounded-lg hover:bg-green-700 transition-all">
            Start your journey today!
          </button>
        </div>
      </div>
    </div>
    )
}

export default Landing