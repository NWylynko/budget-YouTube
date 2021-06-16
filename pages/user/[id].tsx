import styled from "styled-components";
import { GridOfVideos } from "../../components/GridOfVideos";
import { SubscribeButton } from "../../components/Styles/SubscribeButton"

import { getUserAllVideo } from '../../Database/video/getUserAll'
import { getComment } from '../../Database/comment/get';
import { getVote } from '../../Database/vote/get';
import { getUser } from '../../Database/user/get'
import { getSubscriberCount } from '../../Database/subscriber/getCount'
import { getSubscriber } from '../../Database/subscriber/get'
import { getWatched } from '../../Database/history/get';
import { addHistory } from '../../Database/history/add';
import { getVideoAccess } from '../../Database/video/getAccess'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {

  const requestedUserId = context.params.id as string
  const userId = "2"

  const videos = await getUserAllVideo({ userId: requestedUserId })
  const requestedUser = await getUser({ userId: requestedUserId })
  const { subscribers } = await getSubscriberCount({ userId: requestedUserId })
  const { subscribed } = await getSubscriber({ subscriber: userId, subscribee: requestedUserId })

  return {
    props: { videos, requestedUser, subscribers, subscribed },
  }
}

export default function UserPage({ videos, requestedUser, subscribers, subscribed }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  console.log({videos, requestedUser, subscribers, subscribed})
  
  return (
    <Container>
      <UserBar>
        <div>
          <StyledProfilePic src={requestedUser.profilePicUrl} height={80} width={80} />
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