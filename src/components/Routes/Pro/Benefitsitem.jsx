import React from 'react'

function Benefitsitem(props) {
  const {title, benefit, icon, description} = props


  return <div className='bene'>
    <div className="benefititem">
    <div className="upper">
      <i className={icon}></i>
    </div>
  </div>
  <div className="benefitsdescription">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
  </div>
  
}
export default Benefitsitem