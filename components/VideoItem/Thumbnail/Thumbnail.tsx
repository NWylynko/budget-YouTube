import styled from "styled-components";
// import Image from "next/image";

export const Thumbnail = () => {
  return (
    <Container>
      <StyledProfilePic
        src="https://via.placeholder.com/320x180"
      />
      <TimeStampContainer>
        <TimeStamp>
          4:56
        </TimeStamp>
      </TimeStampContainer>
    </Container>
  );
};

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
