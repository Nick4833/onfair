import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password and confirm password do not match.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } else {
      const registerData = {
        name,
        email,
        password,
        location,
        role,
        password_confirmation: confirmPassword,
      };
      console.log(registerData);
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost",
        },
        redirect: "follow",
        body: JSON.stringify(registerData),
      }).then(async(response) => {
        if(!response.ok) {
          let responseJson = await response.json();
          console.log(responseJson.errors)
          toast.error(responseJson.errors, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }else {
          let responseJson = await response.json();
          console.log(responseJson);
          toast.success('Your account has been created. Please Log in.', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
      })
      
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="grid grid-cols-1 md:grid-cols-2 border-2 shadow-lg my-5 h-fit gap-5 rounded-lg">
      
      <div
        className="relative bg-no-repeat rounded-l-lg bg-cover"
        style={{ backgroundImage: "url(/signup.jpg)" }}
      ></div>
      <div className="flex flex-col gap-5 p-10">
        <h1 className="text-5xl font-bold max-w-[500px]">
          Start your journey today!
        </h1>
        <small>
          Register with us and start to advance your academic journey, today!
        </small>
        <form className="flex flex-col gap-6" onSubmit={(e) => register(e)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm">
              Username
            </label>
            <input
              id="name"
              className="border-2 shadow-lg max-w-[500px] h-8 border-black rounded-lg p-5"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border-2 shadow-lg max-w-[500px] h-8 border-black rounded-lg p-5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border-2 shadow-lg max-w-[500px] h-8 border-black rounded-lg p-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirm_password" className="text-sm">
              Confirm Password
            </label>
            <input
              id="confirm_password"
              type="password"
              className="border-2 shadow-lg max-w-[500px] h-8 border-black rounded-lg p-5"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="country" className="text-sm">
              Where Do You Live?
            </label>
            <input
              id="country"
              className="border-2 shadow-lg max-w-[500px] h-8 border-black rounded-lg p-5"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="text-sm">
              Who Are You?
            </label>
            <div className="flex gap-5">
              <label>
                <input
                  type="radio"
                  className="border-2 shadow-lg max-w-[500px]"
                  name="role"
                  value="ORGANIZER"
                  checked={role == "ORGANIZER" && true}
                  onChange={(e) => setRole(e.target.value)}
                />{" "}
                Organizer
              </label>
              <label>
                <input
                  type="radio"
                  className="border-2 shadow-lg max-w-[500px]"
                  name="role"
                  value="STUDENT"
                  checked={role == "STUDENT" && true}
                  onChange={(e) => setRole(e.target.value)}
                />{" "}
                Student
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-fit justify-center bg-green-800 flex text-white px-10 py-3 rounded-lg hover:bg-green-700 transition-all"
          >
            Join with us today!
          </button>
        </form>
      </div>
    </div>
    
    </>
  );
};

export default Signup;
