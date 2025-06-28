import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get all markdown files recursively from /posts directory
  const allPostsData = [];
  
  function getAllMarkdownFiles(dirPath, currentPath = []) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    items.forEach(item => {
      if (item.isDirectory()) {
        // 递归处理子目录
        getAllMarkdownFiles(path.join(dirPath, item.name), [...currentPath, item.name]);
      } else if (item.name.endsWith('.md')) {
        // 处理 markdown 文件
        const fileName = item.name.replace(/\.md$/, '');
        const relativePath = [...currentPath, fileName];
        const id = relativePath.join('/'); // 创建完整的路径作为 id
        
        // Read markdown file as string
        const fullPath = path.join(dirPath, item.name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        allPostsData.push({
          id,
          ...matterResult.data,
        });
      }
    });
  }
  
  getAllMarkdownFiles(postsDirectory);
  
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: true });

  // For catch-all routes [...id], id should be an array
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: ['ssg-ssr']
  //     }
  //   },
  //   {
  //     params: {
  //       id: ['pre-rendering']
  //     }
  //   }
  // ]
  const paths = [];
  
  function getAllPaths(dirPath, currentPath = []) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    items.forEach(item => {
      if (item.isDirectory()) {
        // 递归处理子目录
        getAllPaths(path.join(dirPath, item.name), [...currentPath, item.name]);
      } else if (item.name.endsWith('.md')) {
        // 添加 markdown 文件路径
        const fileName = item.name.replace(/\.md$/, '');
        paths.push({
          params: {
            id: [...currentPath, fileName]
          }
        });
      }
    });
  }
  
  getAllPaths(postsDirectory);
  return paths;
}

export async function getPostData(id) {
  // id is now an array for catch-all routes
  const filePath = Array.isArray(id) ? id.join('/') : id;
  const fullPath = path.join(postsDirectory, `${filePath}.md`);
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
    id: filePath,
    contentHtml,
    ...matterResult.data,
  };
}