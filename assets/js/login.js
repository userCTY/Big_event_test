$(function(){
    let form = layui.form
    let layer = layui.layer;

    //功能1 点击切换注册和登录
    $('#go_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#go_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //功能2 注册的相关验证
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格' ],
        // 验证两次输入密码是否一致
        repwd:function(value){
            let logpwd = $('.reg-box [name=password]').val();
            if(logpwd !== value){
                return '两次输入密码不一致!'
            }
        }
    })

    //功能3 提交表单完成注册操作
    // http://api-breakingnews-web.itheima.net
    $('#reg_form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录',function(){
                    $('#go_login').click();
                })
            }
        })
    })

    //功能4 完成用户的登录操作
    $('#form_log').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                localStorage.setItem('token',res.token);
                location.href = '/index.html';
            }
        })
    })
    
})