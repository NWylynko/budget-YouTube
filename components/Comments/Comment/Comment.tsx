import styled from "styled-components";

export const Comment = () => {
  return (
    <Container>
      <ProfilePicContainer>
        <StyledImg src="https://via.placeholder.com/40" />
      </ProfilePicContainer>
      <SubContainer>
        <Horizontal>
          <UserName>User Name</UserName>
          <TimeStamp>2 years ago</TimeStamp>
        </Horizontal>
        <UserMessage>The users comment</UserMessage>
      </SubContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 6px;
  margin-bottom: 18px;
`;

const ProfilePicContainer = styled.div`
  margin: 12px;
`;

const StyledImg = styled.img`
  border-radius: 50%;
`;

const SubContainer = styled.div``;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserName = styled.h4`
  margin: 6px;
`;

const TimeStamp = styled.span`
  margin: 6px;
  color: ${props => props.theme.colors.lightText};
`;

const UserMessage = styled.span`
  margin: 12px;
`;