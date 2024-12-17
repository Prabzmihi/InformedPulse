import React from 'react'
import { Link } from 'react-router-dom'
import './alink.css'

const ALink = (props) => {
  return (
    <div>
      <Link className='aLink' to={props.url}>{props.displayText}</Link>
    </div>
  )
}

export default ALink
