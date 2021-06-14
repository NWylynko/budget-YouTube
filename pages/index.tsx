import { GridOfVideos } from "../components/GridOfVideos"
import { getAllVideo } from '../Database/video/getAll';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {

  const videos = await getAllVideo()

  return {
    props: { videos }, // will be passed to the page component as props
  }
}

export default function HomePage({ videos }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <GridOfVideos videos={videos} />
  )
}
