import type { NextApiRequest, NextApiResponse } from 'next'
import { updateVideo } from "../../../Database/video/update"
import { Video } from "../../../Database/video/get";

export default async function updateVideoHandler(req: NextApiRequest, res: NextApiResponse) {

  const { videoId, data } = req.body as { videoId: string, data: Partial<Video>};


  res.status(200).json(await updateVideo({ videoId, newVideo: data }))
}