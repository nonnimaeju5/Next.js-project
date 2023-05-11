import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';

//Fetching external data from filesystem and this page is pre rendered with that data
//getStaticProps can only be exported from a 'page' file not none page files
//Returning allPostsData into the props object in getStaticProps the blog post will be passed to the Home components as a prop

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home ({ allPostsData }) {
  return (
  
    <Layout home>
      <Head>
        <title>{siteTitle}</title>  
        </Head>
        <section className={utilStyles.headingMd}>
          {/* The link component is similar to <a href=""> but instead you're using Link component that's imported here above */}
          {/* The Link component enables client-side navigation between two pages in nextjs. Client-side navigation means that the page transition happens using javascript which isfaster than the default navigation done by the browser */}
          {/* To link to another page in Next you'll only have to make a file into the pages directory and the path/name of the file becomes the URL path. That means that there's no need for routing libriaries */}
          <span className={utilStyles.linktext}>I was supposed to delete <Link href="/posts/first-post">this page</Link> but I didn't because I commented into the code</span>

          <p>Hi, my name is Jón Ólafur and I'm a Full Stack Developer studying Web Development at Vefskólinn. I followed a {' '}
             <a href="https://nextjs.org/learn">Next.js tutorial</a> for this project.</p>

          </section>
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}