import Image from 'next/image'
import Tags from '@/data/image/tags.svg'
import Link from 'next/link'
const Card = ({ id ,title, shortStory, nickName, imgProfileURL, tags }) => (
  <div className="pt-2 md:h-64 max-w-sm w-full sm:max-w-full md:max-w-full lg:max-w-full  md:flex lg:flex shadow-lg ">
    <div
      className="object-cover w-full h-64 sm:h-96 md:h-auto md:w-48 lg:h-auto relative lg:w-48 flex-none bg-cover rounded-t md:rounded-l-none lg:rounded-t-none lg:rounded-r text-center overflow-hidden"
      title={title}
    >
      <Image src={imgProfileURL} alt={title} layout="fill" objectFit="cover"></Image>
    </div>
    <div className="flex flex-col justify-between rounded-b border-l border-b border-r border-gray-100 bg-white p-4 leading-normal md:rounded-r-none lg:rounded-l lg:rounded-b-none lg:rounded-l md:border-r-0 lg:border-r-0 md:border-t lg:border-t lg:border-gray-100 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-8">
        <div className="text-sm text-gray-600 flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none dark:text-gray-200">{nickName}</p>
          </div>
        </div>
        <a href={`/stories/${id}`}>
          <div className="mb-2 text-xl font-bold text-gray-900  dark:text-white"> یک {tags}</div>
        </a>
        <p className="line-clamp-3 lg:line-clamp-5 text-gray-700 text-base dark:text-gray-400 md:line-clamp-4 "> {shortStory}
        </p>
      </div>
      <div className="flex items-center dark:text-gray-400 ">
        <Tags className="mr-2 h-3 w-3  fill-current text-gray-500 dark:text-white " />
        &nbsp;&nbsp;
        <span className={'line-clamp-1 text-xs no-underline hover:underline'}>
          <Link href={`/tags/${tags}`}>{tags}</Link>
        </span>
      </div>
    </div>
  </div>
)

export default Card
