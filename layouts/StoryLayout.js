import {useState} from 'react'
import Card from '@/components/Card'
import StoriesPagination from '@/components/StoriesPagination'

function StoryLayout({ stories, title, initialDisplayStories = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredStories = stories.filter((story) => {
    const searchContent =
      story.name.toLowerCase() + story.nickName + story.summary + story.shortStory + story.jobTitle
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayStories =
    initialDisplayStories.length > 0 && !searchValue ? initialDisplayStories : filteredStories
  return (
    <>
      <div className="divide-y">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="جستجو در قصه ها"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="جستجو در قصه ها"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {!filteredStories.length && 'داستانی یافت نشد'}
        {displayStories.map((story) => {
          return (
            <Card
              key={story.id}
              id={story.id}
              title={story.name}
              shortStory={story.shortStory}
              nickName={story.nickName}
              imgProfileURL={
                process.env.public_url + '/api/getImageByName/' + story.profilePicture
              }
              tags={story.jobTitle}
            />
          )
        })}
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <StoriesPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  )
}

export default StoryLayout
