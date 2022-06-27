import { TagSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import StoryLayout from "@/layouts/StoryLayout";

export async function getServerSideProps(context) {
  const { params, req, res } = context
  const { tag } = params
  const response = await fetch(`${process.env.API_URL}/api/getStoryByTag?tag=${tag}`)
  const data = await response.json()
  const stories = data
  return {
    props: {
      stories,
      tag,
    },
  }
}

export default function Tag({ stories, tag }) {
  // Capitalize first letter and convert space to dash
  const title = tag
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <StoryLayout stories={stories} title={title} />
    </>
  )
}
