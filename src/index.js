import React from 'react'
import ReactDOM from 'react-dom'
import NativeScroll from "./NativeScroll"
import ReactScroll from './ReactScroll'
import './index.css'
//react
if(location.href.indexOf('react')!==-1){
    ReactDOM.render(<ReactScroll />,document.getElementById('root'))
//原生js
}else{
    let scroll = new NativeScroll()
    console.log(scroll)
    let data = scroll.list 
    /* let fragment=document.createDocumentFragment()
    appendDataToElement(fragment,data)
    document.getElementById('expList').appendChild(fragment)

    function appendDataToElement(appendToElement,data){
        let divimg,li,span
        for (let i = 0,max=data.length; i < max; i++) {
            divimg = document.createElement('img')
            divimg.src = data[i].image 

            span= document.createElement('span')
            span.appendChild(document.createTextNode(data[i].proName))
            li=document.createElement('li')
            li.appendChild(a);
            li.appendChild(span)
            appendToElement.appendChild(li)
        }
    } */
}

