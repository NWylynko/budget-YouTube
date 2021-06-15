import { addUser } from "../user/add"
import { addVideo } from "../video/add"
import { updateVideo } from "../video/update"

export const addTestData = async () => {

  const profilePicUrl = 'https://via.placeholder.com/100'

  const user1 = await addUser({ userName: 'nick', email: 'nick@wylynko.com', profilePicUrl })
  const user2 = await addUser({ userName: 'bob', email: 'bob@smith.com', profilePicUrl })
  const user3 = await addUser({ userName: 'jack', email: 'jack@gmail.com', profilePicUrl })
  const user4 = await addUser({ userName: 'cameron', email: 'cameron@google.com', profilePicUrl })
  const user5 = await addUser({ userName: 'henry', email: 'henry@henry.com', profilePicUrl })

  const video1 = await addVideo({ userId: user1.userId, videoName: 'my first video', access: "public" })
  const video2 = await addVideo({ userId: user1.userId, videoName: 'vlog day two', access: "public" })
  const video3 = await addVideo({ userId: user2.userId, videoName: 'test video 2', access: "private" })
  const video4 = await addVideo({ userId: user3.userId, videoName: 'sailing film 1', access: "public" })
  const video5 = await addVideo({ userId: user3.userId, videoName: 'sailing film 2 (unreleased)', access: "unlisted" })

  const thumbnailUrl = 'https://via.placeholder.com/320x180'

  await updateVideo({ videoId: video1.videoId, newVideo: { description: 'my day at the beach', thumbnailUrl, length: 398723 } })
  await updateVideo({ videoId: video2.videoId, newVideo: { description: 'today we go shopping', thumbnailUrl, length: 234589 } })
  await updateVideo({ videoId: video3.videoId, newVideo: { description: 'test test test', thumbnailUrl, length: 2456345 } })
  await updateVideo({ videoId: video4.videoId, newVideo: { description: 'sailing down the river', thumbnailUrl, length: 23452345 } })
  await updateVideo({ videoId: video5.videoId, newVideo: { description: 'fixing up my boat for the race', thumbnailUrl, length: 34253455 } })

  

}