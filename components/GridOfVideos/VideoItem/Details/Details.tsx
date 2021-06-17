import styled from "styled-components";
// import Image from "next/image";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

interface DetailsProps {
  videoName: string;
  userName: string;
  timestamp: number;
  profilePicId?: string;
  views: number;
}

export const Details = ({profilePicId, videoName, userName, timestamp, views}: DetailsProps) => {
  return (
    <Container>
      {profilePicId && (
        <ImageContainer>
        <StyledImage
          src={`/api/image/get?imageId=${profilePicId}&height=36&width=36&format=webp`}
          height={36}
          width={36}
        />
      </ImageContainer>
      )}
      <TextContainer>
        <Title>{videoName}</Title>
        <SubText>{userName}</SubText>
        <SubText>{views} views • {formatDistanceToNow(timestamp)}</SubText>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 6px;
`;

const ImageContainer = styled.div`
  margin: 12px;
  margin-left: 6px;
  min-height: 36px;
  min-width: 36px;
`;

const StyledImage = styled.img`
  border-radius: 50%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  color: ${props => props.theme.colors.darkText};
`;

const SubText = styled.span`
  font-size: 14px;
  color: ${props => props.theme.colors.lightText};
`;