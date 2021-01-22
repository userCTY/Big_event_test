$(function(){
    //功能1 校验表单数据
    let form = layui.form;
    form.verify({
        nickname: function(value){
            if(value.length > 6){
                return '昵称长度必须在1~6个字符之间!'
            }
        }
    })

    initUserInfo();
})

let layer = layui.layer;
let form = layui.form
//功能2 获取用户基本信息
function initUserInfo(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res){
            if(res.status !== 0){
                return layer.msg('获取用户信息失败!');
            }
            form.val('formUserInfo',res.data);
        }
    })
}

//功能3 实现表单的重置
$('#btnReset').on('click',function(e){
    e.preventDefault();
    initUserInfo();
})

//功能4 实现提交信息更新
$('.layui-form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function(res){
            if(res.status !== 0){
                return layer.msg('更新信息失败!')
            }
            layer.msg('更新用户信息成功!')
            window.parent.getUserInfo()
        }
    })
})
