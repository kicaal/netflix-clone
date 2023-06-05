
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";


import prismadb from '@/lib/prismadb'

export default async function handler(req: NextApiRequest, res:NextApiResponse) {

  if(req.method !== 'GET') {
    return res.status(405).end()
  }


  try {

    await serverAuth(req,res)

    const {movieId} = req.query

    if (typeof movieId !== 'string' || !movieId) throw new Error('invalid id')

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId
      }
    })

    if (!movie) throw new Error('invalid id')


    return res.status(200).json(movie)

  } catch(error) {
    console.log(error)

    return res.status(400).end()
  }
} 