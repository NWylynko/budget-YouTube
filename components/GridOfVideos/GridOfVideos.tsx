import styled from "styled-components";
import { VideoItem } from "./VideoItem"

interface Video {
  videoId: string;
  videoName: string;
  userName: string;
  timestamp: number;
  length: number;
  thumbnailId: string;
  profilePicId: string;
  views: number;
}

export const GridOfVideos = ({ videos }: { videos: Video[] }) => {
  return (
    <GridContainer>
      {videos.map((video) => (
        <VideoItem key={video.videoId} {...video} direction="column" />
      ))}
    </GridContainer>
  )
}

const GridContainer = styled.div`
  display: grid;
  justify-content: space-around;
  grid-gap: 16px;

  grid-template-columns: 320px;

  @media (min-width: 700px) {
    grid-template-columns: 320px 320px;
  }

  @media (min-width: 1050px) {
    grid-template-columns: 320px 320px 320px;
  }

  @media (min-width: 1400px) {
    grid-template-columns: 320px 320px 320px 320px;
  }

  @media (min-width: 1750px) {
    grid-template-columns: 320px 320px 320px 320px 320px;
  }
`;