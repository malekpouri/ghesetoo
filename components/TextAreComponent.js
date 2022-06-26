function TextAreComponent(props) {
  const { textareaLabel, textareaId, placeholder, refElement } = props
  return (
    <>
      <label
        htmlFor={textareaId}
        className="mb-2 inline-block text-sm font-medium text-gray-700 dark:text-gray-400 sm:text-lg sm:leading-8 md:text-xl md:leading-10"
      >
        {textareaLabel}
      </label>
      <textarea
        id={textareaId}
        rows="4"
        className="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-lg sm:leading-8 md:text-xl md:leading-10"
        placeholder={placeholder}
        ref={refElement}
      ></textarea>
    </>
  )
}

export default TextAreComponent
