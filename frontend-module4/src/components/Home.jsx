// components/PostList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../redux/actions/postActions';

const PostList = () => {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="post-list">
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.imgSrc} alt={`Post ${post.id}`} />
            <div className="post-content">
              <h3>User ID : {post.id}</h3>
              <h3>
                {post.title.length > 30 
                  ? `Title : ${post.title.slice(0, 30)}...` 
                  : `Title : ${post.title}`}
              </h3>
              <p>
                {post.body.length > 100 
                  ? `Body : ${post.body.slice(0, 100)}...` 
                  : `Body : ${post.body}`}
                {post.body.length > 100 && (
                  <Link to={`/post/${post.id}`} className="read-more">
                    Read More...
                  </Link>
                )}
              </p>
              {/* <Link to={`/post/${post.id}`} className="view-details">
                View Details
              </Link> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;