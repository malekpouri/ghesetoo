import { PageSEO } from '@/components/SEO'
import StoryLayout from '@/layouts/StoryLayout'
import { useEffect, useState } from 'react'

export const STORIES_PER_PAGE = 5

function storiesList() {
  /* eslint-disable */
  const [stories, setStories] = useState([])
  const [initialDisplayStories, setInitialDisplayStories] = useState(0)
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    const fetchStories = async () => {
      const response = await fetch(`${process.env.public_url}/api/getStories`)
      const data = await response.json()
      setStories(data)
      setInitialDisplayStories(data.slice(0, STORIES_PER_PAGE))
      setPagination({
        currentPage: 1,
        totalPages: Math.ceil(data.length / STORIES_PER_PAGE),
      })
    }
    fetchStories()
  }, []);

  return (
    <>
      <PageSEO title={`تمامی داستانها`} />
      <StoryLayout
        stories={stories}
        initialDisplayStories={initialDisplayStories}
        pagination={pagination}
        title="همه قصه ها"
      />
    </>
  )
}

export default storiesList
