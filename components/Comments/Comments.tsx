import { AddComment } from "./AddComment"
import { Comment } from "./Comment"

interface Comment {
  commentId: string;
  message: string;
  profilePicUrl: string;
  timestamp: number;
  userId: string;
  userName: string;
}

export const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <>
      <h2>Comments</h2>
      <AddComment />
      {comments.map((comment) => (
        <Comment key={comment.commentId} {...comment} />
      ))}
    </>
  )
}