import { Link, useNavigate } from "react-router-dom";

const LoginSignupNavbar = ({ btnType }) => {
  const navigate = useNavigate();

  const handleBtn = () => {
    if (btnType == "login") {
      navigate("/signup");
      return;
    }

    if (btnType == "signup") {
      navigate("/login");
      return;
    }
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <Link to={"/"}>
        <h2 className="text-xl font-medium text-black py-2">
          <span className="text-slate-500">Good</span>
          <span className="text-slate-900">Notes.</span>
        </h2>
      </Link>

      <div>
        <button
          onClick={handleBtn}
          className="text-sm bg-orange-500 p-2 px-5 rounded text-white hover:opacity-80"
        >
          {btnType === "login" ? "Signup" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginSignupNavbar;
