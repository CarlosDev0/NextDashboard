import { notFound } from "next/navigation";
import "server-only";

interface Post {
  id: string;
  title: string;
  content: string;
}

async function getPost(id: string) {
  const res = await fetch(`https://api.vercel.app/blog/${id}`, {
    cache: "force-cache",
  });
  const post: Post = await res.json();
  if (!post) notFound();
  return post;
}

export async function generateStaticParams() {
  const posts = await fetch("https://api.vercel.app/blog", {
    cache: "force-cache",
  }).then((res) => res.json());

  return posts.map((post: Post) => ({
    id: String(post.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return {
    title: post.title,
  };
}

type postTemplate = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: Date;
  category: string;
};
//FETCHING DATA FROM API:
export default async function Page() {
  const data = await fetch("https://api.vercel.app/blog");
  const posts = await data.json();
  return (
    <ul>
      {posts.map((post: postTemplate) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

//WITH ID:
//export default async function Page({
//    params,
//}: {
//    params: Promise<{ id: string }>
//}) {
//    const { id } = await params
//    const post = await getPost(id)

//    return (
//        <article>
//            <h1>{post.title}</h1>
//            <p>{post.content}</p>
//        </article>
//    )
//}
