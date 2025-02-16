import React, { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import { useSelector } from "react-redux";

function Profile() {
  const [userData, setUserData] = useState(null);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    (async () => {
      try {
        const data = await authService.getCurrentUser();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Function to get user initials
  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0].toUpperCase())
          .join("")
      : "U";
  };

  return authStatus ? (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br text-white">
      {userData ? (
        <div className=" text-gray-900 rounded-3xl shadow-lg p-10 w-full max-w-lg flex flex-col items-center bg-slate-700 bg-opacity-90">
          {/* Profile Picture */}
          {userData.prefs?.photoUrl ? (
            <img
              src={userData.prefs.photoUrl}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-md transition-all duration-300 hover:scale-105"
            />
          ) : (
            // Fallback: Show Initials
            <div className="w-40 h-40 flex items-center justify-center bg-gray-300 rounded-full text-5xl font-bold text-gray-700 shadow-md transition-all duration-300 hover:scale-105">
              {getInitials(userData.name)}
            </div>
          )}

          <h1 className="text-3xl font-bold mt-6">{userData.name}</h1>
          <p className="text-xl text-gray-500">{userData.email}</p>
          <p className="text-xl text-gray-400">
            Joined on: {userData.registration.slice(0, 10)}
          </p>
        </div>
      ) : (
        <p className="text-xl font-semibold">Loading...</p>
      )}
    </div>
  ) : null;
}

export default Profile;
