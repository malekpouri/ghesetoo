function PageViewCount(props) {
    const {pageCount = 0} = props
    return (<> <div className={'text-xs md:text-sm text-gray-400 dark:text-gray-600 pt-3'}>{pageCount} بار بازدید شده</div></>)
}

export default PageViewCount;
