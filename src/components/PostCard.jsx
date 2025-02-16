import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage}) {
  const [postDate, setPostDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await appwriteService.getPost($id);
        setPostDate(post.$updatedAt);
        const image = await appwriteService.getFilePreview(featuredImage);
        setImageUrl(image);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
  }, [$id, featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-800 rounded-xl p-4">
        <h3 className='text-blue-200'>{postDate.slice(0,10)}  {postDate.slice(11,16)} </h3>
        <div className="w-full justify-center mb-4">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="rounded-xl" />
          ) : (
            <div className="h-40 bg-gray-300 rounded-xl animate-pulse"></div>
          )}
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
