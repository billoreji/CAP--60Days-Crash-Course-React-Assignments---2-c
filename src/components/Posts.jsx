import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchAndUpdateData(page) {
    setLoading(true);
    setError(false);
    try {
      let res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
      setPosts(res.data);
      setTotalPages(Math.ceil(Number(res.headers["x-total-count"]) / 10));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAndUpdateData(page);
  }, [page]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }
  console.log(posts);

  return (
    <div>
      <div id="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          PREVIOUS
        </button>
        <p>{page}</p>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          NEXT
        </button>
      </div>
      <h1>List of Posts</h1>
      {posts?.map((post) => (
        <Post  key={post.id} {...post} />
      ))}
    </div>
  );
}

export default Posts;
