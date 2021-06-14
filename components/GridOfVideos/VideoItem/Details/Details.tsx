import styled from "styled-components";
// import Image from "next/image";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

interface DetailsProps {
  videoName: string;
  userName: string;
  timestamp: number;
  profilePicUrl: string;
  views: number;
}

export const Details = ({profilePicUrl, videoName, userName, timestamp, views}: DetailsProps) => {
  return (
    <Container>
      <ImageContainer>
        <StyledImage
          src={profilePicUrl}
          height={36}
          width={36}
        />
      </ImageContainer>
      <TextContainer>
        <span>{videoName}</span>
        <SubText>{userName}</SubText>
        <SubText>{views} views • {timeAgo.format(timestamp)}</SubText>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: calc(36px + 10px + 5px) auto;
  margin: 5px;
`;

const ImageContainer = styled.div`
  margin: 5px;
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