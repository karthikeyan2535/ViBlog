import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FaRegHeart,FaHeart } from "react-icons/fa";
export default function Post() {
    const darkMode=useSelector(state=>state.theme.darkMode)
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [like,setlike]=useState();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 flex justify-center content-center">
            <Container>
                <div className={` flex justify-center mb-4  border ${darkMode?"bg-opacity-60 bg-slate-600 backdrop-blur-md": "bg-opacity-40 bg-gray-500 backdrop-blur-md"}  rounded-xl p-2`}>
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-400" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-400" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                        <Button onClick={()=>setlike(!like)} className={` rounded-full absolute bottom-3 bg-transparent right-6 p-0 text-6xl duration-400`}>{like? <FaHeart/>:<FaRegHeart/> }</Button>
                    
                </div>
                <div className="w-full mb-6">
                    <h1 className={`${darkMode?"text-white":"text-black"} text-2xl font-bold`}>{post.title}</h1>
                </div>
                <div className={`browser-css ${darkMode?"text-gray-400":"text-gray-600"}`}>
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
