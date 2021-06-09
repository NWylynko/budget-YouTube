import styled from "styled-components";
// import Image from "next/image";

export const Details = () => {
  return (
    <Container>
      <ImageContainer>
        <StyledImage
          src="https://via.placeholder.com/36x36"
        />
      </ImageContainer>
      <TextContainer>
        <span>Video Name</span>
        <SubText>User Name</SubText>
        <SubText>666K views • 13 hours ago</SubText>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: calc(36px + 10px + 5px) auto;
  margin: 5px;
`;

const ImageContainer = styled.div`
  margin: 5px;
  min-height: 36px;
  min-width: 36px;
`;

const StyledImage = styled.StyledProfilePic`
  border-radius: 50%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  color: ${props => props.theme.colors.darkText};
`;

const SubText = styled.span`
  font-size: 14px;
  color: ${props => props.theme.colors.lightText};
`;