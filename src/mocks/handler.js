import { rest } from 'msw';
import posts from './json/posts.json'

export const handlers = [
  rest.get(`${process.env.NEXT_PUBLIC_API_URL}posts`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(posts)
    )
  })
]
