import React from 'react'
import ReactDOM from 'react-dom'
import NativeScroll from "./NativeScroll"
import ReactScroll from './ReactScroll'
import './index.css'
//react
if(location.href.indexOf('react')!==-1){
    ReactDOM.render(<Scroll />,document.getElementById('root'))
}
//原生js
