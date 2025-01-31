import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import LoginSignupNavbar from "../../components/Navbar/LoginSignupNavbar";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice.js";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Login API

    try {
      dispatch(signInStart());

      const url = `${import.meta.env.VITE_BASE_URL}/api/auth/signin`;
      
      const res = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        console.log(res.data);
        dispatch(signInFailure(data.message));
      }

      toast.success(res.data.message);
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <LoginSignupNavbar btnType={"login"} />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              LOGIN
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-[#2B85FF] underline"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
