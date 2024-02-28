import React from 'react'

const UserPostCard = ({ post }) => {

  return (
    <div className="card" key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button>Edit Post</button>
      <button>Delete Post</button>
      <p>Posted by: {post.user.username}</p>
    </div>
  )
}

export default UserPostCard