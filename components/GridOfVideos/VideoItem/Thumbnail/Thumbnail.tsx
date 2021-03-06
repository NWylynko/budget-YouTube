import styled from "styled-components";
import Image from "../../../Image";

interface ThumbnailProps { length: number; thumbnailId: string; watched?: number; }

export const Thumbnail = ({ length, thumbnailId, watched }: ThumbnailProps) => {

  const percentageWatched = watched ? Math.floor(((watched * 1000) / length) * 100) : 0

  console.log({ percentageWatched })

  return (
    <Container>
      <Image
        alt="thumbnail of video"
        src={thumbnailId}
        width={320}
        height={180}
      />
      {percentageWatched !== 0 && <ProgressBar percentageWatched={percentageWatched} />}
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

interface ProgressBarProps {
  percentageWatched: number;
}

const ProgressBar = styled.div`
  width: ${({ percentageWatched }: ProgressBarProps) => `${Math.min(percentageWatched, 100)}%`};
  height: 5px;
  background-color: ${({ theme }) => theme.colors.brand};
  position: absolute;
  bottom: 0px;
`;

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
  bottom: 5px;
  right: 5px;
  margin: 5px;
  padding: 5px;
  background-color: #000000b3;
  color: #ffffff;
  border-radius: 5px;
`;
