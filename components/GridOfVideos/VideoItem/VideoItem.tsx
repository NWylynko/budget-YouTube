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

export const VideoItem = ({ videoId, videoName, timestamp, length, thumbnailId, profilePicId, userName, views, direction = "column" }: VideoitemProps & { direction?: "row" | "column" }) => {

  return (
    <Link href={`/video/${videoId}`} passHref>
      <Container direction={direction}>
        <Thumbnail {...{ length, thumbnailId }} />
        <Details {...{ videoName, timestamp, profilePicId, userName, views }} />
      </Container>
    </Link>
  );
};

interface ContainerProps {
  direction: "row" | "column"
}

const Container = styled.div`
  max-width: ${({ direction }) => direction === "column" ? "320px" : "auto"};;
  display: flex;
  flex-direction: ${({ direction }: ContainerProps) => direction};

  &:hover {
    cursor: pointer;
  }
`;
