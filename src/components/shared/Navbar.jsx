import { useEffect, useRef, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import userImage from "../../assets/user.gif";
import { useAuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, userLogout } = useAuthContext();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", localTheme);
  }, [theme]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    userLogout()
      .then(() => {
        toast.success("Logout Successful!");
      })
      .catch((error) => {
        toast.error("Error logging out! " + error.message);
      });
  };

  const links = (
    <>
      {/* <li>
        <NavLink to="/">Home</NavLink>
      </li>


      <li>
        <NavLink to="/about">About Us</NavLink>
      </li> */}

    </>
  );

  return (
    <div className="px-4 lg:px-6">
      <div className="navbar justify-between py-2">
        {/* Navbar Start */}
        <div className="flex items-center">
          <Link
            to="/"
            className="hidden lg:block text-4xl font-bold tracking-tight relative group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-purple-600 blur-lg opacity-30 group-hover:opacity-70 transition-opacity duration-300"></span>
            <div className="relative text-gray-700 group-hover:text-white transition-colors duration-300">
            <span className="text-warning">Task</span>ly
            </div>
          </Link>

          <div className="dropdown lg:hidden">
            <button
              onClick={toggleDropdown}
              className="btn btn-outline btn-warning"
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10">
                <li className="font-bold italic text-xl my-2 mx-auto tracking-tight relative group">
                  <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-purple-600 blur-lg opacity-30 group-hover:opacity-70 transition-opacity duration-300 mb-5"></span>
                  <Link
                    to={"/"}
                    className="flex gap-0 relative text-gray-500 group-hover:text-white transition-colors duration-300"
                  >
                    <span className="text-warning">Task</span>ly
                  </Link>
                </li>
                <div className="font-semibold text-yellow-500">{links}</div>
              </ul>
            )}
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-6 font-bold text-yellow-500">
            {links}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            className="p-2 text-2xl"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "light" ? (
              <FaMoon className="text-gray-300 transition-transform duration-300 hover:scale-110" />
            ) : (
              <FaSun className="text-yellow-500 transition-transform duration-300 hover:scale-110" />
            )}
          </button>

          {/* Profile Dropdown */}
          <div
            ref={profileDropdownRef}
            className="dropdown dropdown-end relative"
          >
            <button
              onClick={toggleProfileDropdown}
              className="btn btn-ghost btn-circle avatar"
              aria-label="Toggle Profile Dropdown"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden border border-gray-300 bg-gray-200">
                {user && user?.email ? (
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile"
                    src={user?.photoURL || "user"}
                    className="w-full h-full object-cover animate-pulse"
                  />
                ) : (
                  <img src={userImage} alt="" />
                )}
              </div>
            </button>
            {profileDropdownOpen && (
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {/* Username (non-clickable) */}
                {user?.email && (
                  <li>
                    <div
                      id="name"
                      className="justify-between text-base-content font-semibold"
                    >
                      {user?.displayName}
                    </div>
                  </li>
                )}


                <li>
                  {user && user?.email ? (
                    <button
                      onClick={handleLogout}
                      className="text-error font-semibold"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link to="/login" className="text-primary font-semibold">
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
