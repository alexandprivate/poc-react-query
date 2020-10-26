import React from "react";
import { gql } from "graphql-request";

import { client } from "./client";
import { useQuery } from "react-query";

const postsQuery = gql`
    query {
        posts {
            data {
                id
                title
            }
        }
    }
`;

const usePostsQuery = () =>
    useQuery("posts", async () => client.request(postsQuery));

export default function Posts({ setPostId }) {
    const { data } = usePostsQuery();
    return (
        <>
            {data?.posts?.data.map((i, index) => (
                <div
                    className="bg-gray-200 p-5 rounded my-4 cursor-pointer hover:bg-black hover:text-white text-2xl font-bold"
                    key={index}
                    onClick={() => setPostId(i.id)}
                >
                    {i.title}
                </div>
            ))}
        </>
    );
}
