import Link from '/components/Link'
import {PageSEO} from '/components/SEO'
import Tag from '/components/Tag'

export default function Tags({tags}) {
  return (
    <>
      <PageSEO title={`برچسپ ها`} />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            برچسپ ها
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tags.length === 0 && 'هیچ بر چسپی پیدا نشد'}
          {tags.map((tag, index) => {
            return (
              <div key={index} className="mt-2 mb-2 mr-5">
                <Link
                  href={`/tags/${tag.name}`}
                  className="-ml-2 text-sm font-semibold inline-block uppercase text-gray-600 dark:text-gray-300"
                >
                  {` (${tag.count})`}
                </Link>&nbsp;
                <Tag text={tag.name} />

              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.API_URL}/api/getAllTags`)
  const data = await response.json()
  return {
    props: {
      tags: data,
    },
  }
}
