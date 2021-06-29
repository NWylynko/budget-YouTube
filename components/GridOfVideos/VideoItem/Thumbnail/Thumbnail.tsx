import styled from "styled-components";
import Image from "next/image";

interface ThumbnailProps { length: number; thumbnailId: string; }

export const Thumbnail = ({ length, thumbnailId }: ThumbnailProps) => {
  return (
    <Container>
      <Image
        alt="thumbnail of video"
        src={`/api/image/get?imageId=${thumbnailId}&height=180&width=320&format=webp`}
        width={320}
        height={180}
      />
      <TimeStampContainer>
        <TimeStamp>
          {Length(length)}
        </TimeStamp>
      </TimeStampContainer>
    </Container>
  );
};

const Length = (timestamp: number) => {
  const seconds = Math.floor(timestamp / 1000);
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const minutesAndSeconds = `${minutes - hours * 60}:${seconds - minutes * 60}`

  if (hours > 0) {
    return `${hours}:${minutesAndSeconds}`
  }

  return minutesAndSeconds
}

const Container = styled.div`
position: relative;
  max-width: 320px;
  max-height: 180px;
`;

const TimeStampContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const TimeStamp = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
  padding: 5px;
  background-color: #000000b3;
  color: #ffffff;
  border-radius: 5px;
`;
