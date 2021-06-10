import { useState } from "react"
import styled from "styled-components"
import { Button } from "../../Styles/Button"

export const AddComment = () => {

  const [comment, setComment] = useState("")

  return (
    <Container>
      <ImageContainer>
        <StyledImage src="https://via.placeholder.com/40" />
      </ImageContainer>
      <StyledInput value={comment}  />
      <CommentButton>Comment</CommentButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImageContainer = styled.div`
  margin: 5px;
`;

const StyledImage = styled.img`
  border-radius: 50%;
`;

const StyledInput = styled.input`
  width: 100%;
  margin: 10px;
  padding: 10px;
  border: none;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.lightGrey};
`;

const CommentButton = styled(Button)`
  background-color: ${props => props.theme.colors.lightGrey};
  color:  ${props => props.theme.colors.greyButtons};
`;