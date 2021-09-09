import { GridOfVideos } from "../components/GridOfVideos"
import { getAllHistory } from '../Database/history/getAll';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import styled from "styled-components"
import { VideoItem } from "../components/GridOfVideos/VideoItem"

export const getServerSideProps: GetServerSideProps = async (context) => {

  const userId = context.req.cookies.userId;

  const videos = await getAllHistory({ userId })

  return {
    props: { videos }
  }
}

export default function HomePage({ videos }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  console.log({ videos })
  
  return (
    <>
    <Header><Title>History</Title></Header>
    
    <Container>
      {videos.map((video) => (
        <VideoItem key={video.videoId} {...video} direction="row" />
      ))}
    </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 36px;
`;

const Title = styled.h2`
  margin: 2px;
`;
