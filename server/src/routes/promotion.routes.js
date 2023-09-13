import express from 'express'
import passport from 'passport'

import promCtrl from '../controllers/promotion.controller'

const memberMiddleware = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) return res.status(400).json({ error: err.message })
    if (!user) return res.status(200).json({ message: 'Unauthorized!' })
    if (!user.member) return res.status(200).json({ message: 'Unauthorized!' })
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

router.route('/api/promotion/create')
  .post(managerMiddleware, promCtrl.create)
router.route('/api/promotion/get-promotion/:code')
  .get(memberMiddleware, promCtrl.getPromotion)

export default router