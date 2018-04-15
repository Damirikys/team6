import React from 'react'
import { connect } from 'react-redux'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import Chat from '../models/Chat'
import ChatItem from '../pages/chat/components/ChatItem'
import UserInfo from '../models/UserInfo'
import ContactItem from '../pages/contact/components/ContactItem'
import Profile from './Profile'
import { SHOW_PROFILE_MODAL } from '../actions/viewActions'

type Props = {
    chats: Chat[],
    contacts: UserInfo[],
    selectedChatId: Number,
    selectChat: Function,
    selectedContactId: Number,
    selectContact: Function,
    onAddChatClick: Function,
    onAddContactClick: Function,
    selectedTab: Number,
    openProfile: Function
}

type State = {
    selectedTab: number
}

export class Menu extends React.Component<Props, State> {
    state = { selectedTab: null }

    componentDidMount() {
        this.selectTab(this.props.selectedTab)
    }

    selectTab = tab => this.setState({ selectedTab: tab })

    onAddClick = () => {
        if (this.state.selectedTab === 0) {
            this.props.onAddChatClick()
        } else {
            this.props.onAddContactClick()
        }
    }

    render() {
        const contactsArray: UserInfo[] = Object.values(this.props.contacts)
        const chatsArray: Chat[] = Object.values(this.props.chats)
        return (
            <div className="menu">
                <Tabs className="menu__tabs" defaultIndex={this.props.selectedTab} onSelect={this.selectTab}>
                    <TabList>
                        <Tab>Диалоги</Tab>
                        <Tab>Контакты</Tab>
                        <button className="menu__tabs_add" onClick={this.onAddClick}>+</button>
                    </TabList>
                    <TabPanel>
                        {chatsArray.map(c => <ChatItem
                            key={c.common.id}
                            select={this.props.selectChat}
                            chat={c}
                            selected={Number(this.props.selectedChatId) === c.common.id}
                        />)}
                    </TabPanel>
                    <TabPanel>
                        {contactsArray.map(c => <ContactItem
                            key={c.gid}
                            contact={c}
                            onClick={() => this.props.openProfile(c)}
                        />)}
                    </TabPanel>
                </Tabs>
                <Profile />
            </div>
        )
    }
}

export default connect(state => ({
    chats: state.chats,
    contacts: state.contacts
}), dispatch => ({
    openProfile: user => dispatch({ type: SHOW_PROFILE_MODAL, payload: { user, isShow: true }})
}))(Menu)