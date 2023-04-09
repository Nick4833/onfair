import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
const Login = ({setCurrent}: {setCurrent: any}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    const response = await fetch("http://localhost:8000/api/login", {
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
      body: JSON.stringify(loginData),
    }).then(async(response) => {
      if(!response.ok) {
        console.log(await response.json())
      }else {
        
        let responseJson = await response.json();
        localStorage.setItem("user", JSON.stringify(responseJson));
        setCurrent(responseJson)
        return navigate("/fairs");
      }
    });
  };

  return (
    <div className="flex items-center justify-center w-full min-h-full">
    <div className="grid grid-cols-1 md:grid-cols-2 border-2 shadow-lg my-5 h-fit gap-5 rounded-lg w-full lg:w-3/5">
      <div
        className="relative bg-no-repeat rounded-l-lg bg-cover"
        style={{ backgroundImage: "url(/signup.jpg)" }}
      ></div>
      <div className="flex flex-col gap-5 p-10">
        <h1 className="text-2xl lg:text-5xl font-bold max-w-[500px]">
          Welcome back, Fairer!
        </h1>
        <small>Continue your journey from where you left off.</small>
        <form className="flex flex-col gap-6" onSubmit={(e) => login(e)}>
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

          <button
            type="submit"
            className="w-full md:w-fit justify-center bg-green-800 flex text-white md:px-10 md:py-3 p-2 rounded-lg hover:bg-green-700 transition-all"
          >
            Continue your journey
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
