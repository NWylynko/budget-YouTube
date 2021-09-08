import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../Styles/Button";
import { useApi, axios } from "../../../ClientApi"
import { User } from "../../../Types/User"
import Image from "../../../components/Image"

interface AddCommentProps {
  userId: string;
  onNewComment: (comment: string) => void;
}

export const AddComment = ({ userId, onNewComment }: AddCommentProps) => {
  const [comment, setComment] = useState("");
  const { data: user } = useApi<User>(`/user/get/${userId}`);

  const addComment = () => {
    onNewComment(comment);
    setComment("");
  }

  return (
    <Container>
      <ImageContainer>
        <StyledImage src={user.profilePicId} height={40} width={40} />
      </ImageContainer>
      <StyledInput
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <CommentButton onClick={addComment} disabled={comment.length === 0}>Comment</CommentButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImageContainer = styled.div`
  margin: 5px;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
`;

const StyledInput = styled.input`
  width: 100%;
  margin: 10px;
  padding: 10px;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) => props.theme.colors.lightText};
`;

const CommentButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;

  &:disabled {
    background-color: #e7e7e7;
    color: ${(props) => props.theme.colors.greyButtons};
  }
`;
