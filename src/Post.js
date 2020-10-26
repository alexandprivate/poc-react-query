import React from "react";
import { gql } from "graphql-request";

import { client } from "./client";
import { useQuery, useQueryCache } from "react-query";

const postsQuery = (postId) => gql`
    query {
        post(id: ${postId}) {
            id
            title
            body
        }
    }
`;

const usePostQuery = (postId, cache) =>
    useQuery(["post", postId], async () => client.request(postsQuery(postId)), {
        initialData: () => {
            const post = cache
                .getQueryData("posts")
                ?.posts.data.find((i) => i.id === postId);
            return { post };
        },
        initialStale: true,
    });

export default function Post({ postId, setPostId }) {
    const cache = useQueryCache();
    const { data } = usePostQuery(postId, cache);
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-75 flex items-center justify-center">
            <div className="h-auto w-full md:w-10/12 lg:w-6/12 p-10 rounded bg-black text-white shadow-xl">
                <button
                    className="bg-gray-700 text-white h-8 px-3 cursor-pointer inline-block mb-4"
                    onClick={() => setPostId("")}
                >
                    Close
                </button>
                <p className="text-2xl font-bold">{data?.post?.title}</p>
                <p className="text-lg">
                    {!data?.post?.body ? "..." : data?.post?.body}
                </p>
            </div>
        </div>
    );
}
