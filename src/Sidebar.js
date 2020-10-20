import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect } from 'react'
import "./Sidebar.css"
import SearchIcon from '@material-ui/icons/Search'
import { RateReviewOutlined } from '@material-ui/icons'
import { Sidebarchat } from './SidebarChat'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import { auth } from "./firebase"

export function Sidebar(props) {
    const user = useSelector(selectUser);
    // const [chats, setChats] = useState([])

    // useEffect(() => {

    // }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar onClick={() => auth.signOut()} src={user.photo} className='sidebar__avatar'/>
                <div className="sidebar__input">
                    <SearchIcon />
                    <input placeholder="Search"/>
                </div>
                  <IconButton variant='outlined' className='sidebar__inputButton'>
                    <RateReviewOutlined />
                  </IconButton>
            </div>

            <div className="sidebar__chats">
              <Sidebarchat />
              <Sidebarchat />
              <Sidebarchat />
            </div>
        </div>
    )
}
