const Post = ({ post }) => {
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
    return new Date(dateString).toLocaleString('es-ES', options).replace(',', '');
  };

  return (
    <div className="post-card bg-white mt-4 rounded-sm px-4 py-6 border border-neutral-200 border-dashed">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 flex items-center justify-center border border-neutral-300 rounded-full text-xs">MB</div>
          <div className="flex flex-col">
            <p className="font-medium">{post.title}</p>
            <p className="text-xs text-neutral-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <div>
        </div>
      </div>
      <p className="mt-5 text-pretty">
        {post.content}
      </p>
    </div>
  )
}

export default Post;