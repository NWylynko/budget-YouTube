import ReactPlayer from 'react-player'
import styled from "styled-components"
import Link from "next/link"
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import format from 'date-fns/format'

import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai"

import { Comments } from "../../components/Comments"
import { SubscribeButton } from "../../components/Styles/SubscribeButton"

import { getVideo } from '../../Database/video/get'
import { getComment } from '../../Database/comment/get';
import { getVote } from '../../Database/vote/get';
import { getUser } from '../../Database/user/get'
import { getSubscriberCount } from '../../Database/subscriber/getCount'
import { getSubscriber } from '../../Database/subscriber/get'
import { getWatched } from '../../Database/history/get';
import { addHistory } from '../../Database/history/add';

export const getServerSideProps: GetServerSideProps = async (context) => {

  console.time()

  const videoId = context.params.id as string
  const userId = "2"

  const video = await getVideo({ videoId })
  const comments = await getComment({ videoId }) || []
  const vote = await getVote({ videoId })
  const videoUser = await getUser({ userId: video.userId })
  const subCount = await getSubscriberCount({ userId: video.userId })
  const { subscribed } = await getSubscriber({ subscriber: userId, subscribee: video.userId })
  const { watched } = await getWatched({ userId, videoId }) || { watched: 0 }
  await addHistory({ videoId, userId });

  console.timeEnd()

  return {
    props: { video, comments, vote, videoUser, subCount, subscribed, watched },
  }
}

export default function VideoPage({ video, comments, vote, videoUser, subCount, subscribed, watched }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  console.log({video, comments, vote, videoUser, subCount, subscribed, watched})

  return (
    <Container>
      <ReactPlayer url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' width="100%" />
      <Title>{video.videoName}</Title>
      <StatsBar>
        <StatsInfo>{video.views} views • {format(video.timestamp, "PPP")}</StatsInfo>
        <LikeContainer>
          <LikeSubContainer>
            <AiOutlineLike size={28} />
            <span>{vote.likes}</span>
          </LikeSubContainer>
          <LikeSubContainer>
            <AiOutlineDislike size={28} />
            <span>{vote.dislikes}</span>
          </LikeSubContainer>
        </LikeContainer>
      </StatsBar>
      <CreatorInfo>
        <ProfilePicContainer>
          <StyledProfilePic src={videoUser.profilePicUrl} width={48} height={48} />
        </ProfilePicContainer>
        <CreatorSubInfo>
          <Link href={`/user/${videoUser.userId}`}><UserNameTitle>{videoUser.userName}</UserNameTitle></Link>
          <SubscriberCount>{subCount.subscibers} subscribers</SubscriberCount>
          <VideoDescription>{video.description}</VideoDescription>
        </CreatorSubInfo>
        <SubscribeButton>Subscribe</SubscribeButton>
      </CreatorInfo>
      <Comments comments={comments} />
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

const UserNameTitle = styled.h3`
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

