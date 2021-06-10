import styled from "styled-components";
import { GridOfVideos } from "../../components/GridOfVideos";
import { SubscribeButton } from "../../components/Styles/SubscribeButton"

export default function UserPage() {
  return (
    <Container>
      <UserBar>
        <div>
          <StyledProfilePic src="https://via.placeholder.com/80" />
        </div>
        <div>
          <UserName>User Name</UserName>
          <SubscriberCount>2.19M subscribers</SubscriberCount>
        </div>
        <div>
          <SubscribeButton>Subscribe</SubscribeButton>
        </div>
      </UserBar>
      <GridOfVideos />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 36px;
`;

const StyledProfilePic = styled.img`
  border-radius: 50%;
`;

const UserName = styled.h2`
  margin: 2px;
`;

const SubscriberCount = styled.span`
  color: ${props => props.theme.colors.lightText};
`;