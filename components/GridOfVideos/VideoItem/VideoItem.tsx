import styled from "styled-components";
import Link from "next/link";

import { Thumbnail } from "./Thumbnail";
import { Details } from "./Details";

interface VideoitemProps {
  videoId: string;
  videoName: string;
  userName: string;
  timestamp: number;
  length: number;
  thumbnailUrl: string;
  profilePicUrl: string;
  views: number;
}

export const VideoItem = ({ videoId, videoName, timestamp, length, thumbnailUrl, profilePicUrl, userName, views }: VideoitemProps) => {

  return (
    <Link href={`/video/${videoId}`}>
      <Container>
        <Thumbnail {...{ length, thumbnailUrl }} />
        <Details {...{ videoName, timestamp, profilePicUrl, userName, views }} />
      </Container>
    </Link>
  );
};

const Container = styled.div`
  max-width: 320px;

  &:hover {
    cursor: pointer;
  }
`;
