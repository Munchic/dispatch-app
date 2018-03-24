import React from 'react'
import './MessageBubble.css'

const messageBubble = (props) => {
  return (
    <div className="MessageBubble">
      <p>{props.msg}</p>
    </div>
  )
}

export default messageBubble
