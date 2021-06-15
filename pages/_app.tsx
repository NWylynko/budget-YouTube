import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Layout } from "../components/layout"
import Head from "next/head"
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "js-cookie"
import SelectDemoUser from "../components/SelectDemoUser";
import { useState, useEffect } from 'react';

const GlobalStyle = createGlobalStyle`
  * {
    transition: all 125ms ease-in-out;
    font-family: 'Noto Sans KR', sans-serif;
  }

  body {
    margin: 16px;
  }
`;
 
const theme = {
  colors: {
    brand: "#f00",
    darkBrand: "#cc0000",
    secondary: "#065fd4",
    greyButtons: "#606060",
    background: "#ffffff",
    foreground: "#f9f9f9",
    lightText: "#606060",
    darkText: "#030303"
  },
};
 
function MyApp({ Component, pageProps }) {

  const [showSelect, setShowSelect] = useState(false)

  useEffect(() => {
    setShowSelect(Cookies.get("userId") === undefined)
  }, [])

  const handleSelectUser = (userId: string) => {
    Cookies.set("userId", userId);
    setShowSelect(false)
  }

  if (showSelect) {
    return (
      <SelectDemoUser onClick={handleSelectUser} />
    )
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
 
export default MyApp;