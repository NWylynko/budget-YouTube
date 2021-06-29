import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { BsUpload } from "react-icons/bs";
import { Button } from "../components/Styles/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { axios } from "../ClientApi";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { useEffect } from "react";

export default function NewVideoPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const userId = Cookies.get("userId");
  const [videoId, setVideoId] = useState("");

  const [videoName, setVideoName] = useState("");
  const [description, setDescription] = useState("");
  const [access, setAccess] = useState("private");

  const [connectedToProgress, setConnectedToProgress] = useState(false);
  const [processProgress, setProcessProgress] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { videoName, description, access };

    await axios.post("/video/update", { videoId, data})
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files

    const videoFile = acceptedFiles[0];

    console.log(videoFile);

    const videoFileNameArray = videoFile.name.split(".");

    videoFileNameArray.pop();

    const videoName = videoFileNameArray.join("");

    setVideoName(videoName);

    // change the page over to uploading screen
    setIsUploading(true);

    // create form and add the video to it
    const formData = new FormData();
    formData.append("file", videoFile);

    // upload the video to the api
    const { data } = await axios.post(
      `/video/upload?userId=${userId}&videoName=${videoName}`,
      formData,
      {
        // this content type needs to be defined to tell the api what the client is sending
        headers: {
          "Content-Type": "multipart/form-data",
        },

        // to provide the user feedback we listen to the onUploadProgress
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          const percentage = Math.round((100 * data.loaded) / data.total);
          setUploadProgress(percentage);
        },

        // timeout is default 1s, great for normal requests
        // but uploading a large video sadly takes longer than 1 second
        // here I set the timeout to 1 week, while this might seem extreme
        // lots of people have slow wifi and uploading a video can take many hours
        timeout: 1000 * 60 * 60 * 24 * 7,
      }
    );

    setVideoId(data.videoId);
  }, [userId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  // like the socket-io code in the process.ts file, this code chunk
  // is from https://stackoverflow.com/a/62547135, I have added some
  // checks in that if statement so the connection is only opened
  // once the videoId and isUploading is true
  useEffect(() => {
    if (isUploading && videoId) {
      const socket = io();

      socket.on("connect", () => {
        console.log("connect");

        // send the server the videoId so it can send updates
        socket.emit("video", videoId);
        setConnectedToProgress(true);
      });

      socket.on(videoId, (data) => {
        // log the update to console for now
        // console.log(videoId, data);
        if (data.index) {
          setProcessProgress(data.totalPercentage)
          console.log(`${data.index}:${data.totalPercentage}`)
        }

      });

      socket.on("disconnect", () => {
        console.log("disconnect");
        setConnectedToProgress(false);
      });
    }
  }, [isUploading, videoId]); // Added [] as useEffect filter so it will be executed only once, when component is mounted

  if (!isUploading) {
    return (
      <>
        <UploadContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <BsUpload size={64} color="#606060" />
          {isDragActive ? (
            <span>Drop the video file here...</span>
          ) : (
            <>
              <span>Drag and drop video file to upload</span>
              <span>Your video will be private until you publish it</span>
            </>
          )}
        </UploadContainer>
      </>
    );
  }

  return (
    <>
      <h2>{videoName}</h2>
      {connectedToProgress ? <span>Processing...</span> : <span>Uploading...</span>}
      <ProgressBar animated now={connectedToProgress ? processProgress : uploadProgress} />
      <ContainerForm onSubmit={onSubmit}>
        <h3>Details</h3>
        <Label>Title</Label>
        <Input
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
          required
        />
        <Label>Description</Label>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Label>Publicity of the video</Label>
        <Horizontal>
          <Input
            type="radio"
            name="access"
            value="public"
            id="public"
            checked={access === "public"}
            onChange={(e) => setAccess(e.target.value)}
            required
          />
          <Label htmlFor="public">
            <Vertical>
              <SelectionHeader>Public</SelectionHeader>
              <SelectionTest>Everyone can watch your video</SelectionTest>
            </Vertical>
          </Label>
        </Horizontal>
        <Horizontal>
          <Input
            type="radio"
            name="access"
            value="unlisted"
            id="unlisted"
            checked={access === "unlisted"}
            onChange={(e) => setAccess(e.target.value)}
            required
          />
          <Label htmlFor="unlisted">
            <Vertical>
              <SelectionHeader>Unlisted</SelectionHeader>
              <SelectionTest>
                Anyone with the video link can watch your video
              </SelectionTest>
            </Vertical>
          </Label>
        </Horizontal>
        <Horizontal>
          <Input
            type="radio"
            name="access"
            value="private"
            id="private"
            checked={access === "private"}
            onChange={(e) => setAccess(e.target.value)}
            required
          />
          <Label htmlFor="private">
            <Vertical>
              <SelectionHeader>Private</SelectionHeader>
              <SelectionTest>Only you can watch the video</SelectionTest>
            </Vertical>
          </Label>
        </Horizontal>
        <Button>Save</Button>
      </ContainerForm>
    </>
  );
}

const UploadContainer = styled.div`
  background-color: ${(props) => props.theme.colors.foreground};
  min-height: 500px;
  padding: 12px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 16px;
  padding: 16px;
`;

const Horizontal = styled.div`
  display: inline-flex;
  flex-direction: row;
`;

const Vertical = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 4px;
  padding: 4px;
  margin-top: 6px;
`;

const Input = styled.input`
  margin: 16px;
  padding: 16px;
  margin-bottom: 24px;
`;

const TextArea = styled.textarea`
  margin: 16px;
  padding: 16px;
  min-height: 125px;
`;

const SelectionHeader = styled.h4`
  margin: 0;
`;

const SelectionTest = styled.span`
  color: ${(props) => props.theme.colors.lightText};
`;
