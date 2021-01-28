$(function(){
    let form = layui.form
    let layer = layui.layer

    //功能1 添加验证规则
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          somepwd: function(value){
              if(value === $('[name=oldPwd]').val()){
                  return '新旧密码不能相同!'
              }
          },

        repwd: function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次输入密码不一致!'
            }
        }
    })

    //功能2 监听表单的提交事件,并完成修改密码操作
    $('#tpl_form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res){
                console.log(res);
                if(res.status !== 0){
                    return layer.msg('修改密码失败!')
                }
                layer.msg('修改密码成功!')
                $('#tpl_form')[0].reset()
            }
        })
    })
})