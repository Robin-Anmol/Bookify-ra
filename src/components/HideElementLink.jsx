import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ContextApp } from '../ContextAPI'

function HideElementLink(props){
  const {link, html} = props
  const {hide} = useContext(ContextApp)
  return <div className={hide?'hide':''}  style={{cursor: 'auto'}}>
      {html} 
  </div>
}
export default HideElementLink