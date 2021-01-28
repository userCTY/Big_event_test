$(function(){

    initArtCateList()
    //功能2 实现添加类别的相关功能
    let formAdd = null
    $('#btnAddCate').on('click',function(){
        formAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#tpl_init').html()
        })
    })

    $('body').on('submit','#form',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('新增分类失败!')
                }
                layer.msg('新增分类成功!')
                initArtCateList()
                layer.close(formAdd)
            }
        })
    })

    //功能3 实现编辑功能
    let formReAdd = null
    $('tbody').on('click','.btn_bianji',function(){
        let id = $(this).data('id')
        formReAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: $('#tpl_reAdd').html()
        })
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res){
                console.log(res);
                form.val('form-edit',res.data)
            }
        })
    })

    $('body').on('submit','#form_re',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('编辑失败!')
                }
                layer.msg('编辑成功!')
                initArtCateList()
                layer.close(formReAdd)
            }
        })
    })

    //功能4 实现删除功能
    $('tbody').on('click','.layui-btn-danger',function(){
        let id = $(this).data('id')
        layer.confirm('确认删除该类别?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res){
                    if(res.status !== 0){
                        return layer.msg('删除失败!')
                    }
                    layer.msg('删除成功!')
                    initArtCateList()
                }
            })
            layer.close(index);
        });
    })
   
})

let layer = layui.layer
let form = layui.form

//功能1 获取分类列表并渲染到页面上
function initArtCateList(){
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res){
            if(res.status !== 0){
                return layer.msg('获取文章分类失败!')
            }
            let htmlSrt = template('tpl_con',res)
            $('tbody').html(htmlSrt)
        }
    })
}






