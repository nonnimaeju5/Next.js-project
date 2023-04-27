//Fs is a node.js module that lets you read files from the file system
import fs from 'fs';
//Path is a node.js module that let's you manipulate file paths
import path from 'path';
//matter is a library that lets you parse the metadata in each markdown file
import matter from 'gray-matter';
//Importing remark library, it's a tool that transforms markdown with plugins
import { remark } from 'remark';
import html from 'remark-html';

//This file is in a folder called lib - usual naming conventions for this type of file is lib or utils
// This file was made to use getStaticProps for this project where i'm not using external data source but file system. 
//I made a folder in the root called posts that has two files that helps Next read markdown data from the filesystem
//Each markdown file has metadata like title and date that's used for gray-matter that I installed
//This file is used to create a utility function for parsing data from the file system
//What it does is parse each markdown file and get title, date and filename and then list data on index page will be sorted by date, because this is a blog site
const postsDirectory = path.join(process.cwd(), 'pages/posts');

export function getSortedPostsData() {
  // Get file names under /posts
  console.log('Posts directory:', postsDirectory);
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

//Implementing getStaticPaths
//This is to make dynamic routes, it's used in the case where each page path depends on external data 
//getAllPostsId is used by getStaticPaths 
//getAllPostsId can fetch from an external API endpoint but here it's fetching from the file system
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
//Here we're fetching necessary data to render the posts with the given id
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
