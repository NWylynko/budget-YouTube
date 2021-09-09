import styled from "styled-components";
import Link from "next/link";
import Image, { imageLoader } from "../../components/Image"
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import format from "date-fns/format";
import { useState, useRef, useEffect } from "react";

import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";

import { Comments } from "../../components/Comments";
import { SubscribeButton } from "../../components/Styles/SubscribeButton";

import { getVideo } from "../../Database/video/get";
import { getComment } from "../../Database/comment/get";
import { getVoteCount } from "../../Database/vote/getCount";
import { getVote } from "../../Database/vote/get";
import { getUser } from "../../Database/user/get";
import { getSubscriberCount } from "../../Database/subscriber/getCount";
import { getSubscriber } from "../../Database/subscriber/get";
import { getWatched } from "../../Database/history/get";
import { addHistory } from "../../Database/history/add";
import { getVideoAccess } from "../../Database/video/getAccess";
import { getResolutions } from "../../Database/resolutions/get";

import { axios, useApi, mutate } from "../../ClientApi"
import { User } from "../../Types/User"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const videoId = context.params.id as string;
  const userId = context.req.cookies.userId;

  const access = await getVideoAccess({ videoId });

  if (access.access === "private" && access.userId !== userId) {
    return {
      props: { error: "you don't have access to this video" },
    };
  }

  const video = await getVideo({ videoId });
  const resolutions = await getResolutions({ videoId });
  const comments = (await getComment({ videoId })) || [];
  const votes = await getVoteCount({ videoId });
  const vote = await getVote({ videoId, userId })
  const videoUser = await getUser({ userId: video.userId });
  const _user = await getUser({ userId })
  const subCount = await getSubscriberCount({ userId: video.userId });
  const { subscribed } = await getSubscriber({
    subscriber: userId,
    subscribee: video.userId,
  });
  const { watched } = (await getWatched({ userId, videoId })) || { watched: 0 };
  await addHistory({ videoId, userId });

  return {
    props: {
      video,
      comments,
      votes,
      vote,
      videoUser,
      subCount,
      subscribed,
      watched,
      resolutions,
      userId,
      _user
    },
  };
};

export default function VideoPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { video, comments, videoUser, subCount, subscribed, watched, resolutions, userId } = props
  const { videoId } = video

  const resolutionOptions = resolutions
    .filter(({fileType}) => fileType === ".webm") // could be either .webm or .mp4, just want only one of the file types
    .filter(({status}) => status === "DONE") // only can display resolutions that have been rendered
    .map(({height, resolutionId}) => ({height, resolutionId})) // strip objects down to just height and id
    .sort(({height: height1}, {height: height2}) => parseInt(height1) - parseInt(height2)) // sort the list from least to most

  const [height, setHeight] = useState(resolutionOptions[resolutionOptions.length - 1].height);
  const videoPlayer = useRef(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(props.subscribed || false)

  // using swr effectively like a key-pair global state
  // by setting initialData from server side data
  // no loading state is needed
  // this allows components to be able to access data
  // without using a context or prop drilling
  // with the added feature of easy re-fetching
  const { data: user } = useApi<User>(`/user/get/${props.userId}`, {}, props._user);

  useEffect(() => {
    if (videoPlayer.current) {
      videoPlayer.current.currentTime = watched
    }
  }, [watched])

  console.log({props})

  const { data: vote } = useApi("/vote/get", { videoId, userId }, props.vote)
  const { data: votes } = useApi("/vote/getCount", { videoId }, props.votes)

  console.log('vote', vote)
  console.log('votes', votes)

  if (props.error) {
    return (
      <Container>
        <span>{props.error}</span>
      </Container>
    );
  }

  const onSubscribe = async () => {
    if (!isSubscribed) {
      setIsSubscribed(true)
      await axios.post("/subscriber/add", { subscribee: videoUser.userId, subscriber: userId })
    } else {
      setIsSubscribed(false)
      await axios.post("/subscriber/remove", { subscribee: videoUser.userId, subscriber: userId })
    }
  }

  return (
    <Container>
      <video
        width="100%"
        controls
        autoPlay
        onTimeUpdate={(e: any) => {
          const { currentTime: watched } = e.target as { currentTime: number }
          axios.post("/history/update", { videoId: video.videoId, userId, watched })
          console.log("timeupdate", watched);
        }}
        poster={imageLoader({ src: video.thumbnailId, width: 1280 })}
        ref={videoPlayer}
      >
        <source
          src={`/api/video/get?videoId=${video.videoId}&height=${height}&fileType=webm`}
          type="video/webm"
        />
        {/* this needs to be added to support browsers that don't support webm
         the video format will also need to be enabled in the upload file so the 
         format is available to be downloaded */}
        {/* <source
          src={`/api/video/get?videoId=${video.videoId}&height=${height}&fileType=mp4`}
          type="video/mp4"
        /> */}
      </video>
      <TitleBar>
        <Title>{video.videoName}</Title>
        <select value={height} onChange={(e) => setHeight(e.target.value)}>
          {resolutionOptions.map(({ height, resolutionId }) => (
            <option value={height} key={resolutionId}>{height}p</option>
          ))}
        </select>
      </TitleBar>
      <StatsBar>
        <StatsInfo>
          {video.views} views • {format(video.timestamp, "PPP")}
        </StatsInfo>
        <LikeContainer>
          <LikeSubContainer onClick={async () => {

            if (vote.vote === null) {
              await axios.post("/vote/add", { userId, videoId: video.videoId, type: 'like' })
              mutate("/vote/get", { vote: 'like' }, true)
            } else if (vote.vote === 'like') {
              await axios.post("/vote/remove", { userId, videoId: video.videoId, type: 'like' })
              mutate("/vote/get", { vote: null }, true)
            } else {
              await axios.post("/vote/update", { userId, videoId: video.videoId, type: 'like' })
              mutate("/vote/get", { vote: 'like' }, true)
            }

            mutate("/vote/getCount")
          }}>
            {vote.vote === 'like' ? <AiFillLike size={28} /> : <AiOutlineLike size={28} />}
            <span>{votes.likes}</span>
          </LikeSubContainer>
          <LikeSubContainer onClick={async () => {

            if (vote.vote === null) {
              await axios.post("/vote/add", { userId, videoId: video.videoId, type: 'dislike' })
              mutate("/vote/get", { vote: 'dislike' }, true)
            } else if (vote.vote === 'dislike') {
              await axios.post("/vote/remove", { userId, videoId: video.videoId, type: 'dislike' })
              mutate("/vote/get", { vote: null }, true)
            } else {
              await axios.post("/vote/update", { userId, videoId: video.videoId, type: 'dislike' })
              mutate("/vote/get", { vote: 'dislike' }, true)
            }

            mutate("/vote/getCount")
          }}>
            {vote.vote === 'dislike' ? <AiFillDislike size={28} /> : <AiOutlineDislike size={28} />}
            <span>{votes.dislikes}</span>
          </LikeSubContainer>
        </LikeContainer>
      </StatsBar>
      <CreatorInfo>
        <ProfilePicContainer>
          <StyledProfilePic
            src={videoUser.profilePicId}
            width={48}
            height={48}
          />
        </ProfilePicContainer>
        <CreatorSubInfo>
          <Link href={`/user/${videoUser.userId}`} passHref>
            <UserNameTitle>{videoUser.userName}</UserNameTitle>
          </Link>
          <SubscriberCount>{subCount.subscribers} subscribers</SubscriberCount>
          <VideoDescription>{video.description}</VideoDescription>
        </CreatorSubInfo>
        <SubscribeButton onClick={onSubscribe} isSubscribed={isSubscribed}>Subscribe</SubscribeButton>
      </CreatorInfo>
      <Comments comments={comments} userId={userId} videoId={video.videoId} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 6px;
  margin-top: 16px;
`;

const TitleBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3px;
`;

const StatsBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3px;
`;

const StatsInfo = styled.h4`
  color: ${(props) => props.theme.colors.lightText};
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

const StyledProfilePic = styled(Image)`
  border-radius: 50%;
`;

const CreatorSubInfo = styled.div``;

const UserNameTitle = styled.h3`
  margin: 3px;
  color: ${(props) => props.theme.colors.darkText};
`;

const SubscriberCount = styled.span`
  margin: 3px;
  color: ${(props) => props.theme.colors.lightText};
`;

const VideoDescription = styled.p`
  margin: 3px;
`;
