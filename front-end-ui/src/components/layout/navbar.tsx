import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ current, setCurrent }: { current: any; setCurrent: any }) => {
  console.log(current);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    setCurrent(null);
    navigate("/");
  };

  return (
    <div className="flex justify-between border-b-2 py-5">
      <p className="text-xl font-bold">OnFair</p>
      <ul className="list-none flex gap-5 font-medium items-center">
        <li>
          <Link to="/" className="hover:text-green-900">
            Home
          </Link>
        </li>
        {!current ? (
          <>
            <li>
              <Link to="/signup" className="hover:text-green-900">
                Sign up
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-green-900">
                Log in
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/fairs" className="hover:text-green-900">
              Fairs
            </Link>
          </li>
        )}
        {current && current.user.role == "ORGANIZER" && (
          <>
            <li>
              <Link to="/create_fair" className="hover:text-green-900">
                Create a Fair
              </Link>
            </li>
            <li>
              <Link to="/created_fairs" className="hover:text-green-900">
                Created Fairs
              </Link>
            </li>
          </>
        )}
        {current && (
          <>
            <li>
              <Link to="/joined_fairs" className="hover:text-green-900">
                Joined Fairs
              </Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
            <li>{current.user.name}</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
