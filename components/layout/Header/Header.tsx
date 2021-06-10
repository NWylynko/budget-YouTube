import styled from "styled-components"
import Image from 'next/image'
import Link from "next/link"

export interface HeaderProps {
}

export const Header = () => {
  return (
    <StyledHeader>
      <Link href="/">
        <LogoWithTextContainer>
          <Image src="/logo.png" height={50} width={70} />
          <Title>Budget YouTube</Title>
        </LogoWithTextContainer>
      </Link>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  padding: 5px;
`;

const LogoWithTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0px;
  font-family: 'Rock Salt', cursive;
`;