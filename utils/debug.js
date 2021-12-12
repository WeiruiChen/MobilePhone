export default function(content){
    uni.showModal({
        content:  content,
        showCancel:false,
        success: function (res) {
            if (res.confirm) {
                // console.log('用户点击确定');
            } else if (res.cancel) {
                // console.log('用户点击取消');
            }
        }
});
}