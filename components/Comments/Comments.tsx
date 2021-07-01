import { AddComment } from "./AddComment"
import { Comment } from "./Comment"

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
  return (
    <>
      <h2>Comments</h2>
      <AddComment {...{userId, videoId}} />
      {comments.map((comment) => (
        <Comment key={comment.commentId} {...comment} />
      ))}
    </>
  )
}