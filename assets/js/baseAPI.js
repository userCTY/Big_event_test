$.ajaxPrefilter(function(options) {
    //拼接域名
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //判断是否需要传递请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization : localStorage.getItem('token') || ''
        }
    }
    
    //禁止用户在不登录的情况下访问后台主页
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})