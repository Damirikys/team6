// @flow

import { OK, NOT_MODIFIED, NOT_FOUND } from 'http-status-codes'

import UserAPI from '../api/user'
import UserInfo from '../../models/UserInfo'
import UserProfile from '../../models/UserProfile'
import ChatInfo from '../../models/ChatInfo'

const _updateKey = async (key: string, data: any, user: Object, res: Object) => {
    try {
        await UserAPI.update({ ...user, [key]: data })

        user[key] = data

        return res.status(OK).json(user)
    } catch (e) {
        return res.sendStatus(NOT_MODIFIED)
    }
}

export const fetchUser = async ({ params: { gid } }: {
    params: { gid: string }
}, res: Object) => {
    try {
        const profile: UserProfile = await UserAPI.fetch(Number(gid))
        const user: UserInfo = profile.user

        return res.status(OK).json(user)
    } catch (e) {
        return res.sendStatus(NOT_FOUND)
    }
}

export const updateUser = async ({ user, body }: {
    user: UserProfile,
    body: UserInfo
}, res: Object) => _updateKey('user', body, user, res)

export const updateContacts = async ({ user, body }: {
    user: UserProfile,
    body: Array<UserInfo>
}, res: Object) => _updateKey('contacts', body, user, res)

export const updateChats = async ({ user, body }: {
    user: UserProfile,
    body: Array<ChatInfo>
}, res: Object) => _updateKey('chats', body, user, res)

