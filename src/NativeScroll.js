import axios from 'axios'
export default class NativeScroll{
    constructor(){
        this._fetching = false, //加载状态锁
        this._list = []
        this._num = 1

       
        this.handlescroll = this.handlescroll.bind(this)
        this.handlefetch = this.handlefetch.bind(this)
        window.addEventListener('load',this.handlefetch,false)
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
        console.log('wawa')
        let that = this
        let { num ,fetching } = that
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
                this._num++
                let products = res.data.products
                let proKeyQuery = products.map(item => {return {id:item.id,buType: "GT", deptCity: 0}})
                let param = {
                    proKeyQuery,
                    imageOption:{width: 600, height: 320},
                    contentType:"json",
                    channel: "h5"
                }
                axios.post('https://sec-m.ctrip.com/restapi/soa2/11899/proInfo4static',param).then((resp)=>{
                    //return resp
                    //let {list:oldlist} = that
                    that._list = that._list.concat(resp.data.items)
                })
            }

        )
    }

    //懒加载实现
    handleDefer () {
        
    }

}

