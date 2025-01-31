import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInSuccess,
  signoutFailure,
  signoutStart,
} from "../redux/user/userSlice";
import ProfileInfo from "./Cards/ProfileInfo";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onLogout = async () => {
    try {
      dispatch(signoutStart());
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/auth/signout`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success === false) {
        dispatch(signoutFailure(res.data.message));
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      dispatch(signInSuccess());
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      dispatch(signoutFailure(error.message));
    }
  };

  return (
    <>
      <div className="bg-white flex gap-2 flex-col justify-between sm:hidden px-5 py-4 drop-shadow">
        <div className="flex justify-between">
          <Link to={"/"}>
            <h2 className="text-xl font-medium text-black py-2">
              <span className="text-slate-500">Good</span>
              <span className="text-slate-900">Notes.</span>
            </h2>
          </Link>

          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>

        <div className="">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>
      </div>

      <div className="hidden bg-white sm:flex items-center justify-between px-6 py-2 drop-shadow">
        <Link to={"/"}>
          <h2 className="text-xl font-medium text-black py-2">
            <span className="text-slate-500">Good</span>
            <span className="text-slate-900">Notes</span>
          </h2>
        </Link>

        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </>
  );
};

export default Navbar;
