import {useEffect, useState} from "react";

function HeartLikeButton(props) {
    const {likeCount = 0, storyId} = props
    const [svgCss, setSvgCss] = useState("");
    const [likeCountState, setLikeCountState] = useState(likeCount);
    const [buttonCss, setButtonCss] = useState("");
    const [storageLiked, setStorageLiked] = useState(localStorage.getItem(storyId));

    const increaseStoryLike = async (storyId) => {
        localStorage.setItem(storyId, "true")
        setStorageLiked("true")
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/increaseStoryLike/${storyId}`)
        setLikeCountState(likeCountState+1)
    }
    const decreaseStoryLike = async (storyId) => {
        localStorage.setItem(storyId, "false")
        setStorageLiked("false")
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/decreaseStoryLike/${storyId}`)
        setLikeCountState(likeCountState-1)
    }
    function likeClickHandler() {
        (storageLiked === "true") ? decreaseStoryLike(storyId) : increaseStoryLike(storyId)
    }

    useEffect(() => {
        const checkStorageLiked = () => {
            if (storageLiked === "true") {
                setSvgCss("w-6 h-6 fill-current fill-amber-50 duration-200 transform group-hover:scale-75")
                setButtonCss(" border-orange-700 bg-orange-700 group-hover:border-orange-700 group-hover:bg-orange-700 ")
            } else {
                setSvgCss("w-4 h-4 fill-current transition duration-200 transform group-hover:fill-orange-700 group-hover:scale-125")
                setButtonCss(" border-gray-400 group-hover:border-orange-700 group-hover:bg-transparent")
            }
        }
        checkStorageLiked()
    }, [storageLiked]);

    return (<div className={"grid justify-items-center"}>
        <div className={"group"}>
            <button
                className={` mt-2 inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150  border rounded-full focus:shadow-outline ${buttonCss}`}
                onClick={likeClickHandler}>
                <svg className={svgCss} viewBox="0 0 20 20">
                    <path
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
            </button>

        </div>
        <span className={"mt-1 pr-2"}>{likeCountState}</span>
    </div>)
}

export default HeartLikeButton;
