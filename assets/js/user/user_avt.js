$(function(){

  let layer = layui.layer


  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)


  //功能1 实现点击按钮弹出选择图片的对话框
  $('#btn-file').on('click',function(){
      $('#file').click();
  })

  //功能2 实现图片的剪裁
  $('#file').on('change',function(e){
    let fileList = e.target.files;
    if(fileList.length === 0){
      return layer.msg('请选择文件!')
    }
    // 1. 拿到用户选择的文件
    var file = e.target.files[0]
    // 2. 将文件，转化为路径
    var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  //功能3 提交头像并渲染
  $('#btn_file').on('click',function(){
    var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar:dataURL
      },
      success: function(res){
        if(res.status !== 0){
          return layer.msg('修改头像失败!')
        }
        layer.msg('修改头像成功!')
        window.parent.getUserInfo()
      } 
    })
  })
})