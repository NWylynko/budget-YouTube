import styled from "styled-components";
import { Button } from "./Button"

export const SubscribeButton = styled(Button)`
  background-color: ${props => props.theme.colors.darkBrand};
  color: white;
`;