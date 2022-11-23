import React from 'react'
import SettingsLink from './SettingsLink'


function Settingslinks(){
 return <> 
  <SettingsLink link='/settings/' text='Account' icon='fal fa-user'/>
  <SettingsLink link='/settings/notifications' text='Notifications' icon='fal fa-bell'/>
  <SettingsLink link='/settings/appearance' text='Appearance' icon='fal fa-eye'/>
  <SettingsLink link='/settings/followers'  text='Followers' icon='fal fa-users'/>
  <SettingsLink link='/settings/about'  text='About' icon='fal fa-question-circle'/>
  <SettingsLink link='/home'  text='Home' icon='fal fa-home'/>
</>
}
export default Settingslinks