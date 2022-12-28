import React, { useContext, useState } from 'react'
import { ContextApp } from '../../ContextAPI'
import Label from './Label'
import Icon from '../Icon/Icon'
import Labelinput from '../Labelinput/Labelinput'
import Settingslabel from '../Routes/Settings/Settingslabel'
function Morefilters(props) {
  const labels = [
    {icon: 'question', text: 'Mystery'},
    {icon: 'scroll-old', text: 'Historical Fiction'},
    {icon: 'flask', text: 'Science Fiction'},
    {icon: 'book-dead', text: 'Horror Fiction'},
    {icon: 'sticky-note', text: 'Narrative'},
    {icon: 'search', text: 'Non Fiction'},
    {icon: 'book-user', text: 'Biography'},
    {icon: 'laugh', text: 'Comedy'},
    {icon: 'feather-alt', text: 'Poetry'},
    {icon: 'unicorn', text: 'Fantasy'},
    {icon: 'globe-asia', text: 'Adventure'},
    {icon: 'book-spells', text: 'Novel'}
]
const [labelfilter, setLabelfilter] = useState('')
const pattern = new RegExp('\\b' + labelfilter.replace(/[\W_]+/g,""), 'i')
const {keyword, setKeyword, setMorefilters, morefilters} = useContext(ContextApp)
const labelsrow = labels && labels.map(label=>{
  if(pattern.test(label.text.toLowerCase())||labelfilter===''){
  return <Label icon={'fad fa-'+label.icon} text={label.text} keyword={keyword} setKeyword={setKeyword}/>
  }
})
  return (
    <div className={'morefilters'}>
   <h2>More Filters</h2>
   <Settingslabel placeholder='Search' setValue={setLabelfilter} value={labelfilter}/>
   <Icon icon='fal fa-times times' setState={setMorefilters} state={!morefilters}/>
   {labelsrow}
    </div>
    )
}
export default Morefilters