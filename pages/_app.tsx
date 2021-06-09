import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Layout } from "../components/layout"

const GlobalStyle = createGlobalStyle`
  body{

  }
`;
 
const theme = {
  colors: {
    brand: "#f00",
    darkBrand: "#cc0000",
    greyButtons: "#606060",
    background: "#ffffff",
    foreground: "#f9f9f9",
    lightText: "#606060",
    darkText: "#030303"
  },
};
 
function MyApp({ Component, pageProps }) {
  return (
    <>
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