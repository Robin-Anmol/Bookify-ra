import React from 'react'
import Icon from '../Icon/Icon'
import './Socialicon.css'
function Socialicon(props) {
  const {icon, link} = props

  return <a target='__blank' href={link} className='socialicon'>
   <Icon icon={icon}/>
    </a>
}
export default Socialicon