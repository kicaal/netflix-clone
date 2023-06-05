import {NextApiRequest, NextApiResponse} from 'next'

import primsadb from '@/lib/prismadb'
import serveAuth from '@/lib/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  try {
    await serveAuth(req, res)
    const movieCount = await primsadb.movie.count()
    const randomIndex = Math.floor(Math.random() * movieCount)

    const randomMovies = await primsadb.movie.findMany({
      take: 1,
      skip: randomIndex
    })

    return res.status(200).json(randomMovies[0])

  } catch(error) {
    console.log(error)
    return res.status(400).end()
  }
}