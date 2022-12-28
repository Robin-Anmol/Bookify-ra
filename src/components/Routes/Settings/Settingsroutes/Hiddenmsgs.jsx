import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import { db } from '../../../../Fire'
import Hiddenmsg from './Hiddenmsg/Hiddenmsg'
import Icon from '../../../Icon/Icon'
import Motiondiv from '../../Motiondiv'
import Defaultmsg from '../../../Booksdisplay/Defaultmsg'
function Hiddenmsgs(props){
  const [msgs, setMsgs] = useState([])
  const user = firebase.auth().currentUser
  const hiddenmsgsrow = msgs && msgs.map(msg=>{
    return <Hiddenmsg msg={msg} msgs={msgs}/>
  })
  useEffect(()=>{
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
      const userdata = snap.data()
      setMsgs(userdata.hiddenmsgs)
    })
  },[])

  return <Motiondiv html={
    <div className="hiddenmsgs">
    <h2>Appearance</h2>
    <div className="overflow">
      <h3>Manage Your Hidden Messages</h3>
      <small style={{marginTop: '10px'}} className='flexrow ac'>Note: Click the eye to show message hidden messages.</small>
       {msgs&&msgs.length===0?<Defaultmsg text='No Hidden Messages' icon='fal fa-exclamation-circle' link='/home'/>:<div className="msgs">{hiddenmsgsrow}</div>}
    </div>
  </div>
  }/>
}
export default Hiddenmsgs