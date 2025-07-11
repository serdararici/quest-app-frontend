
import React, {useState, useEffect} from "react";
import ReactDom from "react-dom";

function Post() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        fetch("/posts")
        .then(res => res.json())
        .then(
            (result) => {
            setIsLoaded(true);
            setPostList(result);
            },
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, []);

    if(error) {
        return <div>Error: {error.message}</div>;
    } else if(!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <h1>Posts</h1>
                <ul>
                    {postList.map(post => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Post;