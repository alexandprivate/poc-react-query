import React from "react";
import { useMutation, useQueryCache } from "react-query";
import { client } from "./client";
import { gql } from "graphql-request";

// create post mutation
const createPostMutation = gql`
    mutation($input: CreatePostInput!) {
        createPost(input: $input) {
            id
            title
            body
        }
    }
`;

function createPost(vars) {
    return client.request(createPostMutation, vars);
}

const useCreatePost = (cache) =>
    useMutation(createPost, {
        onSuccess: (post) => {
            // cache.setQueryData("posts", post.createPost);
            cache.invalidateQueries("posts");
            console.log({ newPost: post });
        },
    });

export default function CreatePost() {
    const cache = useQueryCache();
    const [createPost, createPostStatus] = useCreatePost(cache);
    const [open, setOpen] = React.useState(false);
    const titleRef = React.useRef(null);
    const contentRef = React.useRef(null);

    function cleanUpForm() {
        titleRef.current.value = "";
        contentRef.current.value = "";
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await createPost({
            input: {
                title: titleRef.current.value,
                body: contentRef.current.value,
            },
        });
        cleanUpForm();
        setOpen(false);
    }

    return (
        <>
            <button
                className="fixed text-white text-2xl h-12 w-12 rounded-full bg-black bottom-0 right-0 mr-5 mb-5 hover:bg-gray-800"
                onClick={() => setOpen(!open)}
            >
                +
            </button>
            {open && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-200 bg-opacity-75 flex items-center justify-center">
                    <div className="h-auto w-full md:w-8/12 lg:w-6/12 p-10 rounded bg-black text-white shadow-xl">
                        <button
                            className="bg-gray-700 text-white h-8 px-3 cursor-pointer inline-block mb-4"
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </button>
                        <div>
                            <form
                                className="flex space-y-4 flex-col text-black"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="text"
                                    autoFocus={true}
                                    ref={titleRef}
                                    placeholder="Title"
                                    className="h-12 w-full bg-gray-500 rounded px-5 placeholder-gray-700"
                                />
                                <textarea
                                    ref={contentRef}
                                    placeholder="Content"
                                    className="bg-gray-500 h-32 rounded w-full p-5 placeholder-gray-700"
                                />
                                <button className="bg-teal-500 text-white h-12 px-4 rounded">
                                    {createPostStatus.isLoading && "loading..."}
                                    {createPostStatus.isError && "Error"}
                                    {!createPostStatus.isLoading &&
                                        !createPostStatus.isError &&
                                        "Save"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
