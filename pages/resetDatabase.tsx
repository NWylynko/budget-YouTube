import { reset } from '../Database/tools/reset';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {

  const results = await reset()

  return {
    props: { results }, // will be passed to the page component as props
  }
}

export default function HomePage({ results }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  console.log(results)
  
  return (
    <><p>done</p></>
  )
}
