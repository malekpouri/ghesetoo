import Link from "@/components/Link";
import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

const MAX_DISPLAY = 10

export default function Home() {
  const [stories, setStories] = useState(null)
  useEffect(() => {
    const getStoriesData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStories`)
      const data = await response.json()
      setStories(data)
    }
    getStoriesData()
  }, [])

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            آخرین قصه ها
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        {!stories ||
          (stories.length === 0 && (
            <div className="text-center">
              <h1>فعلا هیچ داستانی نداریم !</h1>
            </div>
          ))}
        {stories &&
          stories.length > 0 &&
          stories.slice(0, MAX_DISPLAY).map((story, index) => {
            return (
              <Card
                key={index}
                id={story.id}
                title={story.nickname}
                nickName={story.nickName}
                imgProfileURL={
                  process.env.NEXT_PUBLIC_API_URL + '/api/getImageByName/' + story.profilePicture
                }
                shortStory={story.shortStory}
                tags={story.jobTitle}
              />
            )
          })}
      </div>
      {stories &&
        stories.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/stories"
            className="mt-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all stories"
          >
            تمام داستانها &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
