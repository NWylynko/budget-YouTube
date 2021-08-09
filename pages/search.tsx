import styled from "styled-components"
import { useRouter } from 'next/router' 
import { SearchBar } from "../components/SearchBar";

export default function SearchPage() {

  const router = useRouter()

  return (
    <>
      <SearchBar onSubmit={router.push} />
    </>
  )
}

