import React, { useEffect, useState } from 'react'
import { db } from '../../../Fire'
import Defaultmsg from '../../Booksdisplay/Defaultmsg'
import Book from '../Book/Book'

function Usersfavs(props) {
  const {currentuser,user, followers, following} = props
  const [usersfavs, setUsersfavs] = useState([])
  const usersfavsrow = usersfavs && usersfavs.map(book=>{
    return <Book book={book} hidebtns={true}/>
  })
  useEffect(()=>{
    db.collection('favorites').doc(user.uid).onSnapshot(snap=>{
      setUsersfavs(snap.data().favorites)
    })
    },[user])
  return <div className='allposts'>
   {
     ( following && following.includes(user.uid) )
     &&
     (followers && followers.includes(currentuser.uid))
     ||(user.uid === currentuser.uid)
     ? 
     usersfavsrow:
     <div style={{textAlign: 'center'}}>
        <Defaultmsg text='You must both be following each other to see this content!' icon='fal fa-exclamation-circle'/>
     </div>
   }
  </div>

}
export default Usersfavs