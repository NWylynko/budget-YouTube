import styled from "styled-components";
import NextImage from "next/image";
import Image from "../../Image"
import Link from "next/link";
import Cookies from "js-cookie";
import { useApi } from "../../../ClientApi";
import { BiHistory, BiVideoPlus, BiSearch } from "react-icons/bi";
import { User } from "../../../Types/User"

export interface HeaderProps {}

export const Header = () => {
  const userId = Cookies.get("userId");
  const { data } = useApi<User>(`/user/get/${userId}`);

  console.log({data});

  return (
    <StyledHeader>
      <Link href="/history" passHref>
        <div>
          <BiHistory size={36} color="#606060" />
        </div>
      </Link>
      <div />
      <Link href="/" passHref>
        <LogoWithTextContainer>
          <NextImage src="/logo.png" height={50} width={70} alt="budget youtube logo" />
          <Title>Budget YouTube</Title>
        </LogoWithTextContainer>
      </Link>
      <Link href="/search" passHref>
        <div>
          <BiSearch size={36} color="#606060" />
        </div>
      </Link>
      <Link href="/newVideo" passHref>
        <div>
          <BiVideoPlus size={36} color="#606060" />
        </div>
      </Link>
      {userId && data ? (
        <Link href={`/user/${userId}`} passHref>
        <div>
          
            <StyledProfilePic
              alt="profile pic"
              src={data.profilePicId}
              height={48}
              width={48}
            />
        </div>
        </Link>
      ) : (
        <></>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 48px calc(48px * 2) auto 48px 48px 48px;
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
  font-family: "Rock Salt", cursive;
`;

const StyledProfilePic = styled(Image)`
  border-radius: 50%;
`;
