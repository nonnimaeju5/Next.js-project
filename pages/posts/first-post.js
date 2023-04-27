import Link from 'next/link';
import Head from 'next/head'
import Script from 'next/script';
import Layout from '../../components/layout';

// This is a page component - it's a function that returns a React element
export default function FirstPost() {
  return (
    <>
    {/* This Head component is imported above. It's a component that allows you to modify the regular head  */}
    <Layout>
    <Head>
     <title>First post</title>
    </Head>
    {/* Script is a component imported above - the link is a third party script */}
    {/* Strategy controls when a third party script should load. lazyOnLoad tells next to load this script lazily during browser idle time */}
    {/* onLoad is run just after the script has finished loading - the console log then tells us if it has been run */}
    <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
    
      <h1>First Post</h1>
      <p>Website made with a tutorial from Next.js. It was simply set up but i feel i learned a lot from doing it.</p>
      <p>
        I really like Next.js and a lot of what it offers!</p>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
      </Layout>
    </>
  );
}