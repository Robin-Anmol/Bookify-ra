import React, { useEffect, useState } from 'react'
import { db } from '../../../../Fire'
import firebase from 'firebase'
import Userfollowing from '../../Userpage/Userfollowing'
import { NavLink, Link } from 'react-router-dom'
import Defaultmsg from '../../../Booksdisplay/Defaultmsg'

function Followers(props) {
  const user = firebase.auth().currentUser
  const [following, setFollowing] = useState([])  
  const [followers, setFollowers] = useState([])
  const [tab, setTab] = useState('followers')
  const followingrow = following && following.map(user=>{
    return <Userfollowing user={user} following={true}/>
  })
  const followerrow = followers && followers.map(user=>{
    return <Userfollowing user={user} follower={true}/>
  })
  useEffect(()=>{
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
     setFollowers(snap.data().followers)
     setFollowing(snap.data().following) 
    })
  },[])

  return <>
    <div className="followers">
     <div className="linkstab">
       <Link onClick={()=>setTab('followers')} className={tab==='followers'&&'activelinktab'}>
        <i className="fal fa-user"></i>  
        Followers
       </Link>
       <Link onClick={()=>setTab('following')} className={tab==='following'&&'activelinktab'}>
          <i className="fal fa-user"></i>
          Following
       </Link>
     </div>
     <div className="routestab followerstab">
        {
      tab==='followers'?
       followerrow.length===0?<Defaultmsg text='No followers!' icon='fal fa-exclamation-circle'/>:followerrow
       :tab==='following'?
       followingrow.length===0?<Defaultmsg icon='fal fa-exclamation-circle' text='You are not following anyone'/>:followingrow
       :'' 
      }
     </div>
    </div>
  </>
}
export default Followers