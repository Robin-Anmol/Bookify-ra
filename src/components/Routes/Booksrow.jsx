import React, { useContext } from 'react'
import { ContextApp } from '../../ContextAPI'
import Label from '../Booksdisplay/Label'
import Filtericons from './Filtericons'


function Booksrow (props) {
  const {title, booksrow} = props
  const {keyword} = useContext(ContextApp)

  return  (
    <div className="library">
    <div className="title">
    <h2 style={{marginBottom: '5px',textTransform: 'capitalize'}} >{keyword===''?'All':keyword}</h2>   
    <div className="filtericons">
     <Filtericons saved={true}/>
    </div>
 
    </div>
    <div className="books">
      {booksrow}
    </div>
    <div className="spacer1"></div>
  </div>
  )
}
export default Booksrow