import styled from "styled-components";
import { Button } from "./Button"

interface SubscibeButtonProps {
  isSubscribed?: boolean;
}

export const SubscribeButton = styled(Button)<SubscibeButtonProps>`
  background-color: ${({theme, isSubscribed}) => isSubscribed ? theme.colors.darkGrey : theme.colors.darkBrand};
  color: ${({theme, isSubscribed}) => isSubscribed ? theme.colors.greyButtons : "white"};
  
`;