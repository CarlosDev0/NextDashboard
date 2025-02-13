import Link from "next/link";
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