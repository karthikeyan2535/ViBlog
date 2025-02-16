import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";
import { FaLinkedin, FaGithub, FaSquareXTwitter, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const authStatus = useSelector((state) => state.auth.status);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });

    const fetchUser = async () => {
      try {
        const user = await authService.account.get();
        setUser(user.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  if (!authStatus) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white text-center">
        <h1 className="text-5xl font-bold hover:text-gray-400 transition-all">
          Login/Signup to read posts
        </h1>
        <div className="flex space-x-6 mt-4">
          <Link to="/login" className="text-gray-600 hover:underline text-xl">
            Login
          </Link>
          <Link to="/signup" className="text-gray-600 hover:underline text-xl">
            Signup
          </Link>
        </div>
      </div>
    );
  
  
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl font-bold hover:text-gray-500 transition-all">
          No Blogs uploaded yet
        </h1>
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      <div className="py-8">
        <Container>
          <div className={`text-center ${darkMode ? "text-white" : "text-blue-950"}`}>
            <h1 className="text-4xl md:text-6xl font-thin tracking-tight">
              Welcome <span className="font-semibold">{user.toUpperCase()}!</span>
            </h1>

            <p className="text-lg md:text-2xl font-serif mt-10 mx-4 md:mx-auto max-w-3xl leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque provident temporibus commodi cupiditate quae quasi quidem, perspiciatis nisi pariatur excepturi qui laboriosam necessitatibus. Illum eius deserunt dolor dolore nisi mollitia.
            </p>

            <div className="flex justify-center space-x-6 text-3xl md:text-4xl mt-8">
              <a href="#" className="hover:text-gray-500 transition-all">
                <FaGithub />
              </a>
              <a href="#" className="hover:text-pink-500 transition-all">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-blue-500 transition-all">
                <FaSquareXTwitter />
              </a>
              <a href="#" className="hover:text-blue-700 transition-all">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Static Footer */}
      <footer className="w-full bg-gray-800 text-white text-center py-4">
      </footer>
    </>
  );
}

export default Home;
