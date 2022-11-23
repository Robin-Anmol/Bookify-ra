import React from 'react'
import { NavHashLink } from 'react-router-hash-link'


function SettingsLink(props){
  const {text, link} = props

  return  <NavHashLink className='settingslink' to={link} activeClassName='activesettingslink' isActive={(match, location)=>{return match?.url===location.pathname}}>
      <i className={props.icon}></i>
      <span>{text}</span>
  </NavHashLink>
}
export default SettingsLink