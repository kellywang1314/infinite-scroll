import React from 'react'
import axios from 'axios'
export default class Scroll extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fetching:false, //加载状态锁
            num:1, //第几页
            list:[]
        }
        this.handlescroll = this.handlescroll.bind(this)
    }
    componentDidMount(){
        this.handlefetch()
        window.addEventListener('scroll',this.handlescroll,false)
    }

    async handlescroll(){
        //文档高度
        let doumentHeight = document.body.scrollHeight
        //可见区域高度
        let cilenttheight = document.body.clientHeight
        //卷去部分高度
        let scrolltop = document.body.scrollTop
        if(cilenttheight+scrolltop+50 > doumentHeight){
            await this.handlefetch()
        }
    }
    //判断元素是否在可见区域
    isVisible (id) {
       
    }

    //更新DOM缓存
    updateItemCache (node) {
        
    }

    //ajax请求数据
    async handlefetch(){
        let that = this
        let { num ,fetching} = that.state
        if (fetching) {
            return
        }
        else {
            fetching = true
        }
        let filtered = {
            channel: "H5",
            items: [],
            pageIndex: num,
            pageSize: 10,
            saleCity: 2,
            sort: 8,
            startCity: 2,
        }
        axios.post('https://sec-m.ctrip.com/restapi/soa2/13561/search',
        {contentType:"json",filtered:filtered}).then(
            (res) => {
                that.setState({
                    num:that.num+1
                })
                let products = res.data.products
                let proKeyQuery = products.map(item => {return {id:item.id,buType: "GT", deptCity: 0}})
                let param = {
                    proKeyQuery,
                    //imageOption:{width: 480, height: 320},
                    imageOption:{width: 600, height: 320},
                    contentType:"json",
                    channel: "h5"
                }
                axios.post('https://sec-m.ctrip.com/restapi/soa2/11899/proInfo4static',param).then((resp)=>{
                    let {list:oldlist} = this.state
                    that.setState({list:oldlist.concat(resp.data.items)})
                })
            }

        )
    }

    //懒加载实现
    handleDefer () {
        
    }



    render(){
        const { list } = this.state
        return(
            <div
                style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 680,
                }}
            >
               {list.map(item => (
                   <ul className='item'>
                       <div className = "photo"><img src={item.image} /></div>
	                    <div class="intro">{ item.proName}</div>
                    </ul>
               ))}
            </div>
        )
    }
}
