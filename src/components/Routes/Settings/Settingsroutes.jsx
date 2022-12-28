import React from 'react'
import { Route, Switch } from 'react-router-dom'
import About from './Settingsroutes/About'
import Account from './Settingsroutes/Account'
import Followers from './Settingsroutes/Followers'
import Hiddenmsgs from './Settingsroutes/Hiddenmsgs'
import Notifications from './Settingsroutes/Notifications'

function Settingsroutes(props){
  const {userdata, hiddenmsgs} = props
  return <>
     <Switch>
     <Route exact  path='/settings/'>
           <Account userdata={userdata}/>
          </Route>
          <Route path='/settings/notifications'>
            <Notifications />
          </Route>
          <Route path='/settings/appearance'>
            <Hiddenmsgs />
          </Route>
          <Route  path='/settings/followers'>
            <Followers />
          </Route>
          <Route path='/settings/about'>
           <About />
         </Route>
     </Switch>
  </>
}
export default Settingsroutes