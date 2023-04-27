//This page makes dynamic routes
//Pages that begin with [ and end with ] are dynamic routes
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

//The post page is now using the getPostsData function in getSTaticProps to get the post data and return it as a prop
//getStaticProps can fetch data from any data source
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
  
    return {
      props: {
        postData,
      },
    };
  }
//getStaticPaths can fetch data from any data source
//in development getStaticPaths runs on every request but in production it runs at build time
export async function getStaticPaths() {
    // Paths contain the array of know paths returned by getAllPostsIds() which include the params defined by pages/posts/[id].js
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,
      //If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page
      //IF fallback is true, then the behavior of get static props changes, the paths returned from it will be rendered to HTML at build time, the paths that have not been generated at build time will not be resulted in 404 pages
      //instead next will serve a fallback version of the page on the first request to such a path. In the background next will statically generate a requested path.
    };
  }
//Generate dynamic routes
//Here the postData function works. To try it you can add /posts/ssg-ssr or /pre-rendering behind the url to this page 
//dangerouslySetInnerHTML is a replacement for innerHTML in the browser DOM. Setting an HTML code is risky because it's easy inadvertenrly expose your users to cross site scripting attack. 
export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }