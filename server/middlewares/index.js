import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import generateToken from 'random-token'
import authMiddleware from './authMiddleware'
import passport from '../auth'
import fileUpload from 'express-fileupload'

export default app => app
    .use(express.static('.next'))
    .use('/.well-known', express.static('ssl'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } }))
    .use(cookieParser())
    .use(cookieSession({
        name: 'session',
        secret: generateToken(16)
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(authMiddleware)
