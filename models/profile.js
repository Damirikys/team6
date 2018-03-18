'use strict'

const ProfileInfo = require('./profileInfo');

class Profile extends ProfileInfo {
    constructor({ gid, name, phone, avatar, chats, contacts }) {
        super({ gid, name, phone, avatar });

        this.chats = chats;
        this.contacts = contacts;
    }
}

module.exports = Profile;
