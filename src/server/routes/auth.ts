import { logger } from '../logger'
import { UserModel } from '../models/User'
import { RegisterRoute } from '../types'
import { calculateUserPasswordHash, protect } from '../util'
import { validateConfirmPassword, validateEmail, validatePassword } from '../validation'

export const registerAuthRoutes: RegisterRoute = (app) => {
  app.get('/api/me', protect, async (req, res) => {
    try {
      const me = await UserModel.findById(req.session.userId)

      if (me != null) {
        res.json({
          id: me.id,
          email: me.email,
        })

      } else {
        res.status(403).json({ message: 'Not authorized' })
        logger.error(`[403] Not authorized`)
      }
    } catch (error) {
      res.status(500).send()
      logger.error(`[500] ${error}`)
    }
  })

  app.post('/api/logout', async (req, res) => {
    if (req.session.authorized) {
      req.session.authorized = false
      req.session.destroy((err) => {
        logger.error(err)
      })
    }
    res.json({})
  })

  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email })
      if (user != null) {
        const hashedPwd = await calculateUserPasswordHash(email, password)
        if (user.password === hashedPwd) {
          req.session.authorized = true
          req.session.userId = user.id
          res.json({ id: user.id, email: user.email })
          return
        }
      }
      res.status(403).json({ message: 'Invalid login attempt!' })
      logger.error('Invalid login attempt')
    } catch (error) {
      res.status(500).json({})
      logger.error(`[500] ${error}`)
    }
  })

  app.post('/api/signup', async (req, res) => {
    try {
      const { email, password, confirmPassword } = req.body

      const validationErrors = [
        validateEmail(email),
        validatePassword(password),
        validateConfirmPassword(password, confirmPassword),
      ].filter(Boolean)

      if (validationErrors.length > 0) {
        res.status(400).json({ message: validationErrors.join('\n') })
        return
      }

      const user = await UserModel.findOne({ email })
      if (user == null) {
        const hashedPwd = await calculateUserPasswordHash(email, password)
        const userDocument = new UserModel({
          email,
          password: hashedPwd,
        })
        const savedUser = await userDocument.save()
        if (savedUser != null) {
          req.session.authorized = true
          req.session.userId = savedUser.id
          res.json({ id: savedUser.id, email: savedUser.email })
          return
        }
      }
      res.status(403).json({ message: 'Invalid signup attempt' })
      logger.error('[403] Invalid signup attempt')
    } catch (error) {
      res.status(500).json({})
      logger.error(`[500] ${error}`)
    }
  })
}
