import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { BsUpload } from "react-icons/bs";
import { Button } from "../components/Styles/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import ProgressBar from "react-bootstrap/ProgressBar"
import { axios } from "../ClientApi"
import Cookies from "js-cookie"

type FormValues = {
  title: string;
  description: string;
  access: "public" | "unlisted" | "private";
};

export default function newVideoPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0)

  const userId = Cookies.get("userId")

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data)
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files

    // change the page over to uploading screen
    setIsUploading(true);

    // create form and add the video to it
    const formData = new FormData()
    formData.append("file", acceptedFiles[0])

    // upload the video to the api
    await axios.post(`/image/upload?userId=${userId}`, formData, {

      // this content type needs to be defined to tell the api what the client is sending
      headers: {
        "Content-Type": "multipart/form-data",
      },

      // to provide the user feedback we listen to the onUploadProgress
      onUploadProgress: data => {
        //Set the progress value to show the progress bar
        const percentage = Math.round((100 * data.loaded) / data.total)
        setUploadProgress(percentage)
      },

      // timeout is default 1s, great for normal requests
      // but uploading a large video sadly takes longer than 1 second
      // here I set the timeout to 1 week, while this might seem extreme
      // lots of people have slow wifi and uploading a video can take many hours
      timeout: 1000 * 60 * 60 * 24 * 7
    })

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

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
      <h2>Video Name</h2>
      <ProgressBar animated now={uploadProgress} />
      <ContainerForm onSubmit={handleSubmit(onSubmit)}>
        <h3>Details</h3>
        <Label>Title</Label>
        <Input {...register("title")} required />
        <Label>Description</Label>
        <TextArea {...register("description")} />
        <Label>Publicity of the video</Label>
        <Horizontal>
          <Input type="radio" name="access" value="public" id="public"  {...register("access")} required />
          <Label htmlFor="public">
            <Vertical>
              <SelectionHeader>Public</SelectionHeader>
              <SelectionTest>Everyone can watch your video</SelectionTest>
            </Vertical>
          </Label>
        </Horizontal>
        <Horizontal>
          <Input type="radio" name="access" value="unlisted" id="unlisted" {...register("access")} required />
          <Label htmlFor="unlisted"><Vertical>
              <SelectionHeader>Unlisted</SelectionHeader>
              <SelectionTest>Anyone with the video link can watch your video</SelectionTest>
            </Vertical></Label>
        </Horizontal>
        <Horizontal>
          <Input type="radio" name="access" value="private" id="private" {...register("access")} required />
          <Label htmlFor="private"><Vertical>
              <SelectionHeader>Private</SelectionHeader>
              <SelectionTest>Only you can watch the video</SelectionTest>
            </Vertical></Label>
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
  color: ${props => props.theme.colors.lightText};
`;