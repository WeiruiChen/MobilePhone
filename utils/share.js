export default{
    data(){
        return {
           //设置默认的分享参数
           //如果页面不设置share，就触发这个默认的分享
            share:{
                title:'同城预约维修',
                path:'/pages/first/first',
                imageUrl:'',
                desc:'',
                content:''
            }
        }
    },
    onShareAppMessage(res) {
        return {
            title:this.share.title,
            path:this.share.path,
            imageUrl:this.share.imageUrl,
            desc:this.share.desc,
            content:this.share.content,
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    }
}