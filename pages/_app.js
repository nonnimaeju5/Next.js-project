//This is the only page you can import and use Global CSS styles. It cannot be used in any other js folder. 
//Global CSS means that it's loaded into every file
//The reason is that it cannot be used anywhere else is that Global css affects all elements on the page
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}