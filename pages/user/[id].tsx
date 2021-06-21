import styled from "styled-components";
import { GridOfVideos } from "../../components/GridOfVideos";
import { SubscribeButton } from "../../components/Styles/SubscribeButton"

import { getUserAllVideo } from '../../Database/video/getUserAll'
import { getUser } from '../../Database/user/get'
import { getSubscriberCount } from '../../Database/subscriber/getCount'
import { getSubscriber } from '../../Database/subscriber/get'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {

  const requestedUserId = context.params.id as string
  const { userId } = context.req.cookies

  const requestedUser = await getUser({ userId: requestedUserId }) || null

  if (requestedUser === null) {
    return {
      notFound: true,
    }
  }

  const { subscribers } = await getSubscriberCount({ userId: requestedUserId })
  const { subscribed } = await getSubscriber({ subscriber: userId, subscribee: requestedUserId })
  const publicVideos = await getUserAllVideo({ userId: requestedUserId, access: "public" })

  let unlistedVideos = []
  let privateVideos = []

  if (userId === requestedUser.userId) {
    unlistedVideos = await getUserAllVideo({ userId: requestedUserId, access: "unlisted" })
    privateVideos = await getUserAllVideo({ userId: requestedUserId, access: "private" })
  }

  const videos = [...publicVideos, ...unlistedVideos, ...privateVideos]

  return {
    props: { videos, requestedUser, subscribers, subscribed },
  }
}

export default function UserPage({ videos, requestedUser, subscribers, subscribed }: InferGetServerSidePropsType<typeof getServerSideProps>) {  
  return (
    <Container>
      <UserBar>
        <div>
          <StyledProfilePic src={`/api/image/get?imageId=${requestedUser.profilePicId}&height=80&width=80&format=webp`} height={80} width={80} />
        </div>
        <div>
          <UserName>{requestedUser.userName}</UserName>
          <SubscriberCount>{subscribers} subscribers</SubscriberCount>
        </div>
        <div>
          <SubscribeButton>Subscribe</SubscribeButton>
        </div>
      </UserBar>
      <GridOfVideos videos={videos} />
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