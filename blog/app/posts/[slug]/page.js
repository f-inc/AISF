import fs from "fs";
import ReactMarkdown from 'react-markdown'
import matter from "gray-matter";
import React from "react";

const getPostMetadata = () => {
  const folder = "./posts";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));
  const slugs = markdownPosts.map((file) => file.replace(".md", ""));

  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`${folder}/${fileName}`, "utf-8");
    const matterResult = matter(fileContents);

    return {
      title: matterResult.data.title,
      subtitle: matterResult.data.subtitle,
      slug: fileName.replace(".md", ""),
    };
  });

  return posts;
};

const getPostContent = (slug) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const PostPage = (props) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  var isDark = true;

  const setIsDark = (value) => {
    isDark = value
  }

  return (
    <div>
      <p className="text-3xl text-white">{post.data.title}</p>
      <a className="text-xl text-white">{post.data.subtitle}</a>
      
      <article class="prose mt-20">
        <ReactMarkdown className="text-white">{post.content}</ReactMarkdown>
      </article>
    </div>
  );
};

export default PostPage;