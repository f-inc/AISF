import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";

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
export default function Home() {
  const postMetadata = getPostMetadata();

  const postPreviews = postMetadata.map((post) => (
    <Link href={`/posts/${post.slug}`} key={post.slug}>
      <div className="bg-gray-300 rounded-lg px-4 py-8 m-5 text-black hover:bg-blue-100 transition-colors duration-500 mx-20">
        <a className="text-xl font-bold">{post.title}</a>
        <br />
        <a class="font-thin text-gray-600">{post.subtitle}</a>
      </div>
    </Link>
  ));

  return (
    <div>
      <p className="text-3xl text-center">All posts</p>

      {postPreviews}
    </div>
  );
}
