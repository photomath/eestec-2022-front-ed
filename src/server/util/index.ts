import { Request, Response } from 'express'
import { scrypt } from 'crypto'

import { Config } from '../Config'
import { logger } from '../logger'

export const protect = (req: Request, res: Response, next: () => void) => {
  if (req.session.authorized) {
    return next()
  }
  res.status(403).json({ message: 'Not authorized' })
  logger.error('[403] Not authorized')
}

export const calculateUserPasswordHash = async (username: string, password: string) => {
  const hash = await new Promise((resolve, reject) =>
    scrypt(password + username, Config.security.secret, 64, (err, hash) => {
      if (err != null) {
        reject(err)
      }
      resolve(hash.toString('hex'))
    })
  )

  return hash
}