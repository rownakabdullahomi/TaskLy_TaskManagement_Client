import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaHome, FaUserPlus } from "react-icons/fa";
import RegisterGif from "../assets/Sign up.gif";
import toast from "react-hot-toast";
import { useAuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  const navigate = useNavigate();
  const { userRegister, setUser, googleLogin, updateUserProfile } =
    useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic()

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const photo = formData.get("photo");
    const email = formData.get("email");
    const password = formData.get("password");

    const validatePassword = (password) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
      return regex.test(password);
    };

    if (!validatePassword(password)) {
      toast.error(
        "Password must have at least one uppercase letter, one lowercase letter, and at least 6 characters."
      );
      return;
    }

    userRegister(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo });
        toast.success("Registration Successful!");
        navigate("/");

        const createdAt = res.user.metadata.creationTime;
        const newUser = { name, email, photo, createdAt };
        axiosPublic.post(`/users`, newUser);
      })
      .catch((error) => {
        toast.error("Registration Failed! " + error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        const user = res.user;
        setUser(user);
        toast.success("Google login successful!");
        navigate("/");

        const createdAt = user?.metadata.creationTime;
        const newUser = {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
          createdAt,
        };
        axiosPublic.post(`/users`, newUser);
      })
      .catch((error) => {
        toast.error("Google login failed! " + error.message);
      });
  };

  return (
    <div className="bg-base-200 flex items-center justify-center md:h-screen p-6">
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-around gap-10 bg-base-100 rounded-xl shadow-lg p-6 overflow-hidden">
        {/* Left Side - GIF */}
        <div className="flex flex-col justify-center items-center">
          <img
            src={RegisterGif}
            alt="Register"
            className="lg:max-h-[400px] w-auto object-contain"
          />
          {/* Back to Home Button */}
          {/* <button
            onClick={() => navigate("/")}
            className="btn btn-outline btn-primary mt-5 w-full hover:!text-white transform hover:scale-105 transition duration-300"
          >
            <FaHome size={18} /> Back to Home
          </button> */}
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-w-md flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center">
            Create Your Account
          </h2>
          <p className="text-sm text-center text-gray-500 mb-4">
            Join us to enjoy all the features!
          </p>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full mt-1 focus:ring focus:ring-primary"
                required
              />
            </div>

            {/* Photo URL Input */}
            <div>
              <label className="block text-sm font-medium">Photo URL</label>
              <input
                type="text"
                name="photo"
                placeholder="Enter your Photo URL"
                className="input input-bordered w-full mt-1 focus:ring focus:ring-primary"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full mt-1 focus:ring focus:ring-primary"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  className="input input-bordered w-full mt-1 focus:ring focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Register Button */}
              <button
                type="submit"
                className="btn btn-primary btn-outline w-full md:w-fit flex-1 hover:!text-white transform hover:scale-105 transition duration-300"
              >
                <FaUserPlus size={18} /> Register
              </button>

              {/* Divider */}
              <div className="divider text-sm text-gray-400">OR</div>

              {/* Social Register */}
              <div
                onClick={handleGoogleLogin}
                className="btn btn-outline btn-neutral hover:!text-white flex items-center justify-center w-full md:w-fit transform hover:scale-105 transition duration-300"
              >
                <FcGoogle size={24} />
                Register With Google
              </div>
            </div>
          </form>

          {/* Divider */}
          {/* <div className="divider text-sm text-gray-400">OR</div> */}

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
