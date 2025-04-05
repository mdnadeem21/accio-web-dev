// components/PostDetail.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts.posts);
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-detail">
      <img src={post.imgSrc} alt={`Post ${post.id}`} />
      <div className="post-content">
        <p className="">User ID: {post.userId}</p>
        <h1>Tilte : {post.title}</h1>
        <p>Body : {post.body}</p>
      </div>
    </div>
  );
};

export default PostDetail;