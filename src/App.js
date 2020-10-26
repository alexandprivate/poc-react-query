import React from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import Posts from "./Posts";
import Post from "./Post";
import CreatePost from "./CreatePost";
import Loader from "./Loader";

const queryCache = new QueryCache();

function App() {
    const [postId, setPostId] = React.useState("");
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <Loader />
            <CreatePost />
            <div className="container mx-auto">
                <Posts setPostId={setPostId} />
                {postId && <Post postId={postId} setPostId={setPostId} />}
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryCacheProvider>
    );
}

export default App;
