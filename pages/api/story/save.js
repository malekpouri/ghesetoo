import { getSession } from 'next-auth/react';

const Handler = async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    const storyModel = {
      id: session.user.id,
      email: session.user.email,
      nickname: req.body.nickname,
      jobTitle: req.body.jobTitle,
      shortStory: req.body.shortStory,
      whatWhere: req.body.whatWhere,
      hardware: req.body.hardware,
      software: req.body.software,
      whatYouWant: req.body.whatYouWant,
    }
    const response = await fetch(process.env.API_URL + '/api/saveStory', {
      method: 'POST',
      body: JSON.stringify(storyModel),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    if (response.status === 200) {
      res.status(200).json({ userId: data })
    } else if (response.status === 400) {
      res.statusCode = 400
    }
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
export default Handler
