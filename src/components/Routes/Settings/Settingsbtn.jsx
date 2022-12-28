import React from 'react'

function Settingsbtn(props) {
  const {text, clickEvnt, icon} = props
  
  return <button className={(text==='Remove'||text==='Clear')?'settingsbtn red':'settingsbtn'} onClick={()=>clickEvnt()}>
      <span>{text}</span>
      <i className={icon}></i>
  </button>
}
export default Settingsbtn