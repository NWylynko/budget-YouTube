import { AddComment } from "./AddComment"
import { Comment } from "./Comment"
import { useApi, axios } from "../../ClientApi"

interface Comment {
  commentId: string;
  message: string;
  profilePicId: string;
  timestamp: number;
  userId: string;
  userName: string;
}

interface CommentsProps {
  comments: Comment[];
  userId: string;
  videoId: string;
}

export const Comments = ({ comments, userId, videoId }: CommentsProps) => {
  const { data, mutate } = useApi<Comment[]>(`/comment/get/${videoId}`, { initialData: comments });

  const addComment = async (comment: string) => {
    await axios.post("/comment/add", { userId, videoId, comment })
    mutate() // gets swr to re-fetch
  }

  return (
    <>
      <h2>Comments</h2>
      <AddComment userId={userId} onNewComment={addComment} />
      {data.map((comment) => (
        <Comment key={comment.commentId} {...comment} />
      ))}
    </>
  )
}