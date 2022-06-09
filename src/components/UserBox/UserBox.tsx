import React from 'react'
import "./userbox.scss"
const UserBox = () => {
  return (
    <div className='user-box'>
        <img src="https://pbs.twimg.com/profile_images/1508490390902607872/XuyWc9hU_400x400.png" alt="Profile" />
        <div className='user-info'>
            <div className='name'>
                Oktay Çabik
            </div>
            <div className='username'>
                @oktaycabik
            </div>
        </div>
        <div className='dot-icon'>
            <div className='dot1'></div>
            <div className='dot2'></div>
            <div className='dot3'></div>
        </div>
    </div>
  )
}

export default UserBox