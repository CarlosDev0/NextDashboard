import Link from "next/link";

//getStaticProps
export async function getServerSideProps() {
  const res = await fetch("https://api.vercel.app/blog"); // Replace with your API
  const posts = await res.json();

  return {
    props: {
      posts: posts || [], // Ensure posts is always an array
    },
  };
}
export default function postprop({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/post/${post.id}`}>
            <a>{post.titulo}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

//export default function Posts({ posts }) {
//    return (
//        <ul>
//            {posts.map((post) => (
//                <li key={post.id}>
//                    <Link
//                        href={{
//                            pathname: "/blog/post/[id]",
//                            query: { id: post.id },
//                        }}
//                    >
//                        <a>{post.titulo}</a>
//                    </Link>
//                </li>
//            ))}
//        </ul>
//    );
//}
