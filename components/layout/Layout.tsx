import styled from "styled-components"

import { Header } from "./Header"

export interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }) => {
  return (
    <>
    <Header />
    <main>{children}</main>
    {/* <footer></footer> */}
    </>
  )
}