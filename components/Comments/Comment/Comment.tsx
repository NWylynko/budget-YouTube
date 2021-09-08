import styled from "styled-components";
import Link from "next/link";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Image from "../../Image"

interface Comment {
  commentId: string;
  message: string;
  profilePicId: string;
  timestamp: number;
  userId: string;
  userName: string;
}

export const Comment = ({
  message,
  profilePicId,
  timestamp,
  userId,
  userName,
}: Comment) => {
  return (
    <Container>
      <ProfilePicContainer>
        <StyledImg
          src={profilePicId}
          height={40}
          width={40}
        />
      </ProfilePicContainer>
      <SubContainer>
        <Horizontal>
          <Link href={`/user/${userId}`} passHref>
            <UserName>{userName}</UserName>
          </Link>
          <TimeStamp>{formatDistanceToNow(timestamp)}</TimeStamp>
        </Horizontal>
        <UserMessage>{message}</UserMessage>
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

const StyledImg = styled(Image)`
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
  color: ${(props) => props.theme.colors.lightText};
`;

const UserMessage = styled.span`
  margin: 12px;
`;
