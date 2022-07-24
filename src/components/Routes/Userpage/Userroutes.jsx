import React, { useEffect, useState } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { HashLink as Link} from 'react-router-hash-link'
import Allposts from './Allposts'
import Profile from './Profile'
import Usersfavs from './Usersfavs'
import firebase from 'firebase'
import { db } from '../../../Fire'
function Userroutes(props) {
  const {user, usersinfo, usersbooks,followers, setFollowers,following, setFollowing, userisfollowing} =props
  const currentuser = firebase.auth().currentUser
  const [userispro, setUserispro] = useState(false)
  useEffect(()=>{
    db.collection('users').doc(currentuser.uid).onSnapshot(snap=>{
      setUserispro(snap.data().pro)
    })
  },[])
  return <div className="userroutes">
      <div className="linkstab">
        <NavLink exact to={`/${user.uid}/`} activeClassName='activelinktab'><i className='fal fa-portrait'></i><span>Profile</span></NavLink>
        <NavLink to={`/${user.uid}/posts`} activeClassName='activelinktab'><i className="fal fa-pen-square"></i><span>Posts</span></NavLink>
        <NavLink to={`/${user.uid}/favorites`} activeClassName='activelinktab'><i className="fal fa-bookmark"></i><span>Favorites</span></NavLink>
      </div>
      <div className="routestab">
      <Route exact path={`/${user.uid}/`}>
        <Profile userispro={userispro} userisfollowing={userisfollowing}  user={user} currentuser={currentuser} usersinfo={usersinfo} usersbooks={usersbooks} followers={followers} following={following}/>
      </Route>  
      <Route path={`/${user.uid}/posts`}>
            <Allposts userispro={userispro} currentuser={currentuser} usersinfo={usersinfo} usersbooks={usersbooks}/>
      </Route>
      <Route path={`/${user.uid}/favorites`}>
        <Usersfavs userispro={userispro} usersbooks={usersbooks} currentuser={currentuser} user={user} following={following} followers={followers}/>
      </Route>
       </div>
       </div>
}
export default Userroutes