import {useEffect, useState} from "react";

function TextAreComponent(props) {
    const {textareaLabel, textareaId, placeholder, refElement, max_char = 1000} = props
    const [characterLeft, setCharacterLeft] = useState(max_char);
    const [charCSS, setCharCSS] = useState('');

    function handleWordCount(e) {
        const charCount = e.target.value.length;
        const charLength = max_char - charCount;
        setCharacterLeft(charLength)
    }

    useEffect(() => {
        const charLength = refElement.current.value.length
        const currentLength = max_char - charLength
        setCharacterLeft(currentLength)
        if (currentLength < 100)
            setCharCSS('-red-700')
        else
            setCharCSS('-green-700')
    }),[];

    return (
        <>
            <label
                htmlFor={textareaId}
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-400 sm:text-lg sm:leading-8 md:text-xl md:leading-10"
            >
                {textareaLabel}
            </label>
            <textarea
                id={textareaId}
                rows="4"
                className="mb-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-lg sm:leading-8 md:text-xl md:leading-10"
                placeholder={placeholder}
                maxLength={max_char}
                ref={refElement}
                onChange={handleWordCount}
                aria-describedby={'textAreaHelp'}
            ></textarea>
            <span className={`text-xs text${charCSS}`} id="textAreaHelp">( {characterLeft} حرف مانده )</span>
        </>
    )
}

export default TextAreComponent
