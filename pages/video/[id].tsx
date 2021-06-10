import ReactPlayer from 'react-player'
import styled from "styled-components"

import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai"

import { Comments } from "../../components/Comments"
import { Button } from "../../components/Styles/Button"

export default function VideoPage() {
  return (
    <Container>
      <ReactPlayer url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' width="100%" />
      <Title>Video Title</Title>
      <StatsBar>
        <StatsInfo>666,546 views • Oct 25, 2009</StatsInfo>
        <LikeContainer>
          <LikeSubContainer>
            <AiOutlineLike size={28} />
            <span>9.9M</span>
          </LikeSubContainer>
          <LikeSubContainer>
            <AiOutlineDislike size={28} />
            <span>287K</span>
          </LikeSubContainer>
        </LikeContainer>
      </StatsBar>
      <CreatorInfo>
        <ProfilePicContainer>
          <StyledProfilePic src="https://via.placeholder.com/48" />
        </ProfilePicContainer>
        <CreatorSubInfo>
          <UserNameTitle>User Name</UserNameTitle>
          <SubscriberCount>2.19M subscribers</SubscriberCount>
          <VideoDescription>the description of the video</VideoDescription>
        </CreatorSubInfo>
        <SubscribeButton>Subscribe</SubscribeButton>
      </CreatorInfo>
      <Comments />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 6px;
  margin-top: 16px;
`;

const StatsBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3px;
`;

const StatsInfo = styled.h4`
  color: ${props => props.theme.colors.lightText};
  margin: 3px;
`;

const LikeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const LikeSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 4px;
  padding: 4px;
`;

const CreatorInfo = styled.div`
  display: grid;
  grid-template-columns: calc(48px + 20px) auto 150px;
`;

const ProfilePicContainer = styled.div`
  margin: 5px;
`;

const StyledProfilePic = styled.img`
  border-radius: 50%;
`;

const CreatorSubInfo = styled.div``;

const UserNameTitle = styled.h2`
  margin: 3px;
  color: ${props => props.theme.colors.darkText};
`;

const SubscriberCount = styled.span`
  margin: 3px;
  color: ${props => props.theme.colors.lightText};
`;

const VideoDescription = styled.p`
  margin: 3px;
`;

const SubscribeButton = styled(Button)`
  background-color: ${props => props.theme.colors.darkBrand};
  color: white;
`;