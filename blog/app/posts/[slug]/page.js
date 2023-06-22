import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";


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

  return (
    <div className="flex items-center">
      <p className="text-3xl text-white">{post.data.title}</p>
      <a className="text-xl text-white">{post.data.subtitle}</a>
      
      <article className="prose lg:prose-lg">
        <Markdown>{post.content}</Markdown> 
      </article>
    </div>
  );
};

export default PostPage;