import styled from "styled-components";
import useRouter from "next/router"

import { Thumbnail } from "./Thumbnail"
import { Details } from "./Details"

export const VideoItem = () => {

  const router = useRouter();

  return (
    <Container>
      <Thumbnail />
      <Details />
    </Container>
  );
};

const Container = styled.div`
  max-width: 320px;
`;

