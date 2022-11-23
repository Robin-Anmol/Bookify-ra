import React from 'react'

function Settingslabel(props){
  const {placeholder, value, setValue, num} = props

  return <label className='settingslabel'>
      <input min='0' type={num?'number':"text"} value={value} required onChange={(e)=>setValue(e.target.value)}/>
      <span>{placeholder}</span>
  </label>
}
export default Settingslabel