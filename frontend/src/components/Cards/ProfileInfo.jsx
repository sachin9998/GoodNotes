import Avatar from "react-avatar";

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center">
        <Avatar name={userInfo?.username} size="35" round={true} />
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo?.username}</p>
      </div>

      <button
        onClick={onLogout}
        className="text-sm bg-red-500 p-2 rounded-md text-white hover:opacity-80"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfo;
