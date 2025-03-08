const Posts = ({ postsInfo }) => {
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    return new Date(dateString).toLocaleString('en-GB', options).replace(',', '');
  };

  return (
    <div className="post-card bg-white mt-4 rounded-md shadow-md p-4">
      <div className="user-info flex justify-between">
        <p>{postsInfo.title}</p>
        <div>
          <p>user</p>
          <p>{formatDate(postsInfo.createdAt)}</p>
        </div>
      </div>
      <div className="post-info">
        <p>
          {postsInfo.content}
        </p>
      </div>
    </div>
  )
}

export default Posts;