$(function () {
    //设置查询参数对象
    let q = {
        pagenum: 1,
        pagesize: 3,
        cate_id: '',
        state: ''
    }

    let layer = layui.layer
    let form = layui.form

    //功能1 请求数据,渲染表格
    getData()

    function getData() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取列表失败!')
                }
                // layer.msg('获取列表成功!')
                let htmlStr = template('tpl_cont', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //功能2 实现筛选功能
    //-----------------------2.1 渲染下拉列表
    initThis()
    function initThis() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败!')
                }
                // layer.msg('获取文章分类成功!')
                let htmlStr = template('tpl_liebiao', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    //-----------------------2.1 实现筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        getData()
    })


    //功能3 页码相关模块
    //定义渲染分页的方法
    let laypage = layui.laypage
    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            limits: [2, 4, 6, 8, 10],
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(first); //得到每页显示的条数
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    getData()
                }
            }
        })
    }


    //功能4 删除文章操作
    $('tbody').on('click', '.btn_delete', function () {
        let id = $(this).data('id')
        layer.confirm('确认删除文章?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败!')
                    }
                    layer.msg('删除文章成功!')
                    getData()
                }
            })
            layer.close(index);
        });
    })
})


