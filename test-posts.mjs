// 测试 getSortedPostsData 函数
import { getSortedPostsData } from './lib/posts.js';

console.log('Testing getSortedPostsData:');
const posts = getSortedPostsData();
console.log('Found posts:', posts.length);
posts.forEach(post => {
  console.log(`- ID: ${post.id}, Title: ${post.title}, Date: ${post.date}`);
});
