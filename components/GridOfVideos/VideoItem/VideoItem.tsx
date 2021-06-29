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
  thumbnailId: string;
  profilePicId: string;
  views: number;
}

export const VideoItem = ({ videoId, videoName, timestamp, length, thumbnailId, profilePicId, userName, views }: VideoitemProps) => {

  return (
    <Link href={`/video/${videoId}`} passHref>
      <Container>
        <Thumbnail {...{ length, thumbnailId }} />
        <Details {...{ videoName, timestamp, profilePicId, userName, views }} />
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
