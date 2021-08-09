import styled from "styled-components"
import { GridOfVideos } from "../../components/GridOfVideos"
import { getSearch } from '../../Database/video/getSearch';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router' 
import { useState } from "react";
import { Button } from "../../components/Styles/Button";
import { SearchBar } from "../../components/SearchBar";

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { searchString } = context.params as { searchString: string }

  const videos = await getSearch({ searchString })

  return {
    props: { videos, searchString }, // will be passed to the page component as props
  }
}

export default function HomePage({ videos, searchString }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const router = useRouter()

  return (
    <>
    <SearchBar onSubmit={router.push} />
    <GridOfVideos videos={videos} />
    </>
  )
}