import { NextFunction, Request, Response } from "express";

export function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  const auth = { login: 'vs_tech_challenge', password: 'SuperSecurePassword123@' }

  const b64auth = req.headers.authorization?.split('Basic ')[1] ?? ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  if (login === auth.login && password === auth.password) {
    return next()
  }

  res.status(401).send('Authentication required')
  next()
}