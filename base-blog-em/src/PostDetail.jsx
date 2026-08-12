import { fetchComments } from "./api";
import "./PostDetail.css";
import { useQuery } from "@tanstack/react-query";

export function PostDetail({ post, updateMutation, deleteMutation }) {
  // replace with useQuery
    const { data, isError, isLoading } = useQuery({
      queryKey: ["Comments", post.id],
      queryFn: () => fetchComments(post.id)
    });
    if (isLoading) { return <h2>Loading...</h2>; }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.ispending && <p className="loading">Deleting the post...</p>}
      {deleteMutation.isError && (
        <p className="error">
          Error deleting the post: {deleteMutation.error.toString()}
          </p>
          )}
      {deleteMutation.isSuccess && <p className="success">Post was (not) deleted</p>}
      
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {updateMutation.ispending && <p className="loading">Updating the post...</p>}
      {updateMutation.isError && (
        <p className="error">
          Error updating the post: {updateMutation.error.toString()}
          </p>
          )}
      {updateMutation.isSuccess && <p className="success">Post was (not) updated</p>}
      
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
