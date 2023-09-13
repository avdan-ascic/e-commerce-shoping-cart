import express from 'express'
import passport from 'passport'

import orderCtrl from '../controllers/order.controller'

const userMiddleware = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!user) return res.status(200).json({ message: 'Unauthorized!' })
    req.user = user
    return next()
  })(req, res, next)
}

const managerMiddleware = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!user) return res.status(200).json({ message: 'Unauthorized!' })
    if (!user.manager) return res.status(200).json({ message: 'Unauthorized!' })
    req.user = user
    return next()
  })(req, res, next)
}

const router = express.Router()

router.route('/api/order/create')
  .post(userMiddleware, orderCtrl.create)
router.route('/api/order/read-all')
  .get(managerMiddleware, orderCtrl.readAll)

export default router