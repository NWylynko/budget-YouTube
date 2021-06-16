import styled from "styled-components"
import Image from 'next/image'
import Link from "next/link"

import { BiVideoPlus } from "react-icons/bi"

export interface HeaderProps {
}

export const Header = () => {
  return (
    <StyledHeader>
      <div />
      <Link href="/">
        <LogoWithTextContainer>
          <Image src="/logo.png" height={50} width={70} />
          <Title>Budget YouTube</Title>
        </LogoWithTextContainer>
      </Link>
      <Link href="/newVideo">
        <div><BiVideoPlus size={36} color="#606060" /></div>
      </Link>
      <Link href={`/user/1`}>
        <StyledProfilePic src="https://via.placeholder.com/48" height={48} width={48} />
      </Link>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: calc(48px * 2) auto 48px 48px;
  /* flex-direction: row; */
  max-height: 75px;
  /* justify-content: center; */
  align-items: center;
  margin: 20px;
  padding: 5px;
`;

const LogoWithTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const Title = styled.h1`
  margin: 0px;
  font-family: 'Rock Salt', cursive;
`;

const StyledProfilePic = styled.img`
  border-radius: 50%;
`;