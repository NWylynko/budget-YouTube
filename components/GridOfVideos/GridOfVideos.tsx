import styled from "styled-components";
import { VideoItem } from "./VideoItem"

export const GridOfVideos = () => {
  return (
    <GridContainer>
      <VideoItem />
      <VideoItem />
      <VideoItem />
      <VideoItem />
      <VideoItem />
      <VideoItem />
      <VideoItem />
      <VideoItem />
      <VideoItem />
      <VideoItem />
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