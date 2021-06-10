import styled from "styled-components";
import Link from "next/link";

import { Thumbnail } from "./Thumbnail";
import { Details } from "./Details";

export const VideoItem = () => {

  return (
    <Link href={`/video/${1}`}>
      <Container>
        <Thumbnail />
        <Details />
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
