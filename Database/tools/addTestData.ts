import { readFile } from "fs/promises";
import { join } from "path";
import axios from "axios";

import { addUser } from "../user/add"
import { addVideo } from "../video/add"
import { updateVideo } from "../video/update"
import { addHistory } from "../history/add"
import { addVote } from "../vote/add"
import { addComment } from "../comment/add"
import { addSubscriber } from "../subscriber/add"

import { uploadImage } from "../../pages/api/image/upload"
import { processNewVideo } from "../../pages/api/video/upload"

export const addTestData = async () => {

  console.time("addTestData")

  const { imageId: profilePicId } = await uploadImage(await openImage('./default-profile-pic.png'), { type: "none", userId: null, videoId: null })

  const user1 = await addUser({ userName: 'nick', email: 'nick@wylynko.com', profilePicId })
  const user2 = await addUser({ userName: 'bob', email: 'bob@smith.com', profilePicId })
  const user3 = await addUser({ userName: 'jack', email: 'jack@gmail.com', profilePicId })
  const user4 = await addUser({ userName: 'cameron', email: 'cameron@google.com', profilePicId })
  const user5 = await addUser({ userName: 'henry', email: 'henry@henry.com', profilePicId })

  await uploadImage(await openWebImage(`https://avatars.dicebear.com/api/croodles/${user1.userName}.svg`), { type: "user", userId: user1.userId, videoId: null })
  await uploadImage(await openWebImage(`https://avatars.dicebear.com/api/croodles/${user2.userName}.svg`), { type: "user", userId: user2.userId, videoId: null })
  await uploadImage(await openWebImage(`https://avatars.dicebear.com/api/croodles/${user3.userName}.svg`), { type: "user", userId: user3.userId, videoId: null })
  await uploadImage(await openWebImage(`https://avatars.dicebear.com/api/croodles/${user4.userName}.svg`), { type: "user", userId: user4.userId, videoId: null })
  await uploadImage(await openWebImage(`https://avatars.dicebear.com/api/croodles/${user5.userName}.svg`), { type: "user", userId: user5.userId, videoId: null })

  const video1 = await addVideo({ userId: user1.userId, videoName: 'my first video', access: "public" })
  const video2 = await addVideo({ userId: user1.userId, videoName: 'vlog day two', access: "public" })
  const video3 = await addVideo({ userId: user2.userId, videoName: 'test video 2', access: "private" })
  const video4 = await addVideo({ userId: user3.userId, videoName: 'sailing film 1', access: "public" })
  const video5 = await addVideo({ userId: user3.userId, videoName: 'sailing film 2 (unreleased)', access: "unlisted" })

  await updateVideo({ videoId: video1.videoId, newVideo: { description: 'my day at the beach', length: 398723 } })
  await updateVideo({ videoId: video2.videoId, newVideo: { description: 'today we go shopping', length: 234589 } })
  await updateVideo({ videoId: video3.videoId, newVideo: { description: 'test test test', length: 2456345 } })
  await updateVideo({ videoId: video4.videoId, newVideo: { description: 'sailing down the river', length: 23452345 } })
  await updateVideo({ videoId: video5.videoId, newVideo: { description: 'fixing up my boat for the race', length: 34253455 } })

  await processNewVideo({ videoId: video1.videoId, fileIn: "./test-data/muddy-vibing.MOV" })
  await processNewVideo({ videoId: video2.videoId, fileIn: "./test-data/the-class-be-kinda-dumb.mp4" })
  await processNewVideo({ videoId: video3.videoId, fileIn: "./test-data/muddy-vibing.MOV" })
  await processNewVideo({ videoId: video4.videoId, fileIn: "./test-data/funny-cat-video.mp4" })
  await processNewVideo({ videoId: video5.videoId, fileIn: "./test-data/the-monitor-is-blurry.mp4" })

  await uploadImage(await openImage("./test-data/sailing.jpg"), { type: "thumbnail", userId: null, videoId: video4.videoId })

  await addHistory({ videoId: video1.videoId, userId: user1.userId })
  await addVote({ videoId: video1.videoId, userId: user1.userId, type: "like" })
  await addComment({ videoId: video1.videoId, userId: user1.userId, message: "Subscribe to me to watch my next video" })

  await addHistory({ videoId: video1.videoId, userId: user4.userId })
  await addVote({ videoId: video1.videoId, userId: user4.userId, type: "dislike" })
  await addComment({ videoId: video1.videoId, userId: user4.userId, message: "This video is absolutely horrible" })

  await addHistory({ videoId: video1.videoId, userId: user5.userId })
  await addVote({ videoId: video1.videoId, userId: user5.userId, type: "like" })
  await addComment({ videoId: video1.videoId, userId: user5.userId, message: "love your work man, amazing" })
  await addSubscriber({ subscribee: video1.userId, subscriber: user5.userId })

  console.timeEnd("addTestData")

}

const openImage = async (path: string): Promise<Buffer> => {
  const imagePath = join(process.cwd(), path)
  const imageBuffer = await readFile(imagePath)
  return imageBuffer
}

const openWebImage = async (url: string): Promise<Buffer> => {
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  return response.data
}