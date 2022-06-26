import { PageSEO } from '@/components/SEO'
import Image from 'next/image'
import PlaceHolder from '@/data/image/placeholder.svg'
import Hardware from '@/data/image/hardware4.svg'
import Software from '@/data/image/software.svg'
import Environment from '@/data/image/environment3.svg'

export async function getServerSideProps(context) {
  const {
    params: { storyId },
  } = context
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getStoryById/${storyId}`)
  if (response.status !== 200) {
    return {
      props: {
        story: null,
      },
    }
  }
  const story = await response.json()

  return {
    props: {
      story,
    },
  }
}
function storyById(props) {
  const { story } = props
  if (!story) {
    return <>Not Found...</>
  }
  return (
    <>
      <PageSEO title={`داستان ${story.nickname}`} description={`داستان ${story.nickname}`} />
      <div className="divide-y">
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className={'xs:border flex flex-col items-center pt-8 '}>
            <div className="relative h-48 w-48 ">
              <Image
                src={
                  process.env.NEXT_PUBLIC_API_URL + '/api/getImageByName/' + story.profilePicture
                }
                alt="avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              {story.nickname}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">{story.jobTitle}</div>
            <div className="flex space-x-3 pt-6">{story.email}</div>
          </div>
          <div className="prose max-w-none pt-8 pb-8 text-justify dark:prose-dark xl:col-span-2">
            {story.shortStory}
            <div className="mt-10 opacity-100">
              <ol className="relative border-r border-gray-200 dark:border-gray-700">
                <li className="mb-10 ml-6">
                  <span className="absolute -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                    <PlaceHolder />
                  </span>
                  <h3 className="mb-1 flex items-center pr-5 text-lg font-semibold text-gray-900 dark:text-white">
                    کجا و چیکار میکنی ؟
                  </h3>
                  <time className="mb-2 mr-3 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    در حال حاظر کجا و مشغول به چه کاری هستی ؟
                  </time>
                  <p className="mb-4 mr-3 text-base font-normal text-gray-500 dark:text-gray-400">
                    {story.whatWhere}
                  </p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                    <Hardware />
                  </span>
                  <h3 className="mb-1 mr-6 text-lg font-semibold text-gray-900 dark:text-white">
                    از چه ابزار و سخت افزاری استفاده میکنی ؟
                  </h3>
                  <time className="mb-2 mr-3 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    در کارت چه سخت افزاری بیشتیرن کارایی رو برات داره و احتمالا کنفیگش چیه ؟
                  </time>
                  <p className="mr-3 text-base font-normal text-gray-500 dark:text-gray-400">
                    A{story.hardware}
                  </p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                    <Software />
                  </span>
                  <h3 className="mb-1 mr-6 text-lg font-semibold text-gray-900 dark:text-white">
                    از چه نرم افزاری بیشتر استفاده میکنی ؟
                  </h3>
                  <time className="mb-2 mr-3 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    نرم افزارهایی که بیشترین استفاده رو در کارت دارن چی هست ؟
                  </time>
                  <p className="mr-3 text-base font-normal text-gray-500 dark:text-gray-400">
                    {story.software}
                  </p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                    <Environment />
                  </span>
                  <h3 className="mb-1 mr-6 text-lg font-semibold text-gray-900 dark:text-white">
                    دوست داری محیط کاریت چه طور باشه ؟
                  </h3>
                  <time className="mb-2 mr-3 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    دوست داری محیط کار رویاییت چه شکلی و یا چه خصوصیاتی داشته باشه ؟
                  </time>
                  <p className="mr-3 text-base font-normal text-gray-500 dark:text-gray-400">
                    {story.whatYouWant}
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default storyById
