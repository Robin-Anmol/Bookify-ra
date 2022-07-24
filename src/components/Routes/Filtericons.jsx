import React, { useContext } from 'react'
import { ContextApp } from '../../ContextAPI'
import Label from '../Booksdisplay/Label'


export default function Filtericons(props){
  const {fnct,state2} = props
  const {keyword, setKeyword} = useContext(ContextApp)


  return <> 
    <Label icon='fal fa-circle' state2={state2} text='All' keyword={keyword} setKeyword={setKeyword} fnct={fnct}/> 
    <Label icon='fal fa-theater-masks' state2={state2} text='Drama' keyword={keyword} setKeyword={setKeyword}fnct={fnct}/> 
    <Label icon='fal fa-space-station-moon-alt'state2={state2} text='Fiction' keyword={keyword} setKeyword={setKeyword}fnct={fnct}/> 
    <Label icon='fal fa-heart-circle' state2={state2} text='Romance' keyword={keyword} setKeyword={setKeyword}fnct={fnct}/> 
</>
}