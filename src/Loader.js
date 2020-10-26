import React from "react";
import { useIsFetching } from "react-query";
import "./loader.css";

export default function Loader() {
    const isFetching = useIsFetching();
    if (!isFetching) return null;
    return (
        <div className="fixed top-0 left-0 h-1 bg-gray-200 w-full z-20">
            <div className="h-1 bg-indigo-600 loader" />
        </div>
    );
}
