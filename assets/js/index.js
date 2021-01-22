$(function(){
    //调用函数
    getUserInfo()

    //功能3 实现退出功能
    $('#goOn').on('click',function(){
        layer.confirm('确认要退出登录嘛?', {icon: 3, title:'提示'}, function(index){
            //do something
            //1.删除浏览器内存里面的token
            localStorage.removeItem('token');
            //2.跳转到登录界面
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

let layer = layui.layer;

//功能1 获取用户数据
function getUserInfo(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res){
            if(res.status !== 0){
                return layer.msg('获取用户信息失败!')
            }
            // layer.msg('获取用户信息成功!')
            renderAvatar(res.data);
        }
    })
}

//功能2 将数据渲染到页面上去
function renderAvatar(user){
    let name = user.nickname || user.username;
    $('#text_con').html('欢迎 &nbsp;' + name);
    //如果用户又头像就渲染头像,没有就显示默认头像
    if(user.user_pic !== null){
        $('.text_tou').hide();
        $('.layui-nav-img').attr('src',user.user_pic);
    }else{
        $('.layui-nav-img').hide();
        let pic = name[0].toUpperCase();
        $('.text_tou').html(pic).show()
    }
}
