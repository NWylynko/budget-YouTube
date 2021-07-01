import styled from "styled-components";
import Link from "next/link";
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
import { getVote } from "../../Database/vote/get";
import { getUser } from "../../Database/user/get";
import { getSubscriberCount } from "../../Database/subscriber/getCount";
import { getSubscriber } from "../../Database/subscriber/get";
import { getWatched } from "../../Database/history/get";
import { addHistory } from "../../Database/history/add";
import { getVideoAccess } from "../../Database/video/getAccess";
import { getResolutions } from "../../Database/resolutions/get";

import { axios } from "../../ClientApi"

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
  const vote = await getVote({ videoId });
  const videoUser = await getUser({ userId: video.userId });
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
      vote,
      videoUser,
      subCount,
      subscribed,
      watched,
      resolutions,
      userId
    },
  };
};

export default function VideoPage({
  video,
  comments,
  vote,
  videoUser,
  subCount,
  subscribed,
  watched,
  error,
  resolutions,
  userId
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [height, setHeight] = useState("720");
  const videoPlayer = useRef(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribed || false)

  useEffect(() => {
    if (videoPlayer.current) {
      videoPlayer.current.currentTime = watched
    }
  }, [watched])

  if (error) {
    return (
      <Container>
        <span>{error}</span>
      </Container>
    );
  }

  console.log({video, comments, vote, videoUser, subCount, subscribed, watched, resolutions, userId})

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
        poster={`/api/image/get?imageId=${video.thumbnailId}&height=720&width=1280&format=webp`}
        ref={videoPlayer}
      >
        <source
          src={`/api/video/get?videoId=${video.videoId}&height=${height}&fileType=webm`}
          type="video/webm"
        />
        <source
          src={`/api/video/get?videoId=${video.videoId}&height=${height}&fileType=mp4`}
          type="video/mp4"
        />
      </video>
      <Title>{video.videoName}</Title>
      <StatsBar>
        <StatsInfo>
          {video.views} views • {format(video.timestamp, "PPP")}
        </StatsInfo>
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
          <StyledProfilePic
            src={`/api/image/get?imageId=${videoUser.profilePicId}&height=48&width=48&format=webp`}
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

const StyledProfilePic = styled.img`
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
