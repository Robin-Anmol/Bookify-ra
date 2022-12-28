import React, { useContext, useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { db } from '../../../Fire'
import Motiondiv from '../Motiondiv'
import './Settings.css'
import SettingsLink from './SettingsLink'
import Settingslinks from './Settingslinks'
import Settingsroutes from './Settingsroutes'
import firebase from 'firebase'
import { CSSTransition } from 'react-transition-group'
import Notification from '../../Notification/Notification'
import { ContextApp } from '../../../ContextAPI'
function Settings(){ 
   const user = firebase.auth().currentUser
    const {notification, notifibool, setNotifibool, setHide, hide}=useContext(ContextApp)

    return <Motiondiv 
    html={
    <div className='settings'>
     
        <div className="sidepannel">
           <h2>Settings</h2>
           <h2 className='space'></h2>
            <Settingslinks />
        </div>
        <div className="settingspannel">
          <Settingsroutes />
        </div>
        <CSSTransition in={notifibool} timeout={300} classNames='notification' unmountOnExit>
          <Notification notification={notification} setNotifibool={setNotifibool}/>
        </CSSTransition>
    </div>
    }
  />
}
export default Settings