define(['jcookie'], () => {
    return {
        init: function() {
            //1.通过地址栏获取列表页面传入的sid。
            let $sid = location.search.substring(1).split('=')[1];
            if (!$sid) {
                $sid = 1;
            }
            //2.将sid传给后端，后端根据对应的sid返回不同的数据。
            $.ajax({
                url: 'http://10.31.161.50/dashboard/360mall-porject/php/detail.php',
                data: {
                    sid: $sid
                },
                dataType: 'json'
            }).done(function(data) {
                //获取数据，将数据放入对应的结构中。
                $('#smallpic').attr('src', data.url);
                $('.loadtitle').html(data.title);
                $('.loadpcp').html(data.price);
                $('#bpic').attr('src', data.url);

                //渲染放大镜下面的小图
                let $picurl = data.urls.split(','); //将数据转换成数组。
                let $strhtml = '<ul>';
                const $list = $('#list');
                console.log($picurl);
                $.each($picurl, function(index, value) {
                    $strhtml += `
                <li>
                    <img src="${value}"/>
                </li>
            `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);
            });
            //放大镜效果
            const $spic = $('#spic');
            const $bpic = $('#bpic');
            const $sf = $('#sf'); //小放
            const $bf = $('#bf'); //大放
            const $left = $('#left'); //左箭头
            const $right = $('#right'); //右箭头
            const $list = $('#list'); //小图列表

            $sf.width($spic.width() * $bf.width() / $bpic.width());
            $sf.height($spic.height() * $bf.height() / $bpic.height());
            let $bili = $bpic.width() / $spic.width(); //比例大于1 放大效果
            $spic.hover(function() {
                $sf.css('visibility', 'visible');
                $bf.css('visibility', 'visible');
                $(this).on('mousemove', function(ev) {
                    let $leftvalue = ev.pageX - $('.goodsinfo').offset().left - $sf.width() / 2;
                    let $topvalue = ev.pageY - $('.goodsinfo').offset().top - $sf.height() / 2;
                    if ($leftvalue < 0) {
                        $leftvalue = 0;
                    } else if ($leftvalue >= $spic.width() - $sf.width()) {
                        $leftvalue = $spic.width() - $sf.width()
                    }

                    if ($topvalue < 0) {
                        $topvalue = 0;
                    } else if ($topvalue >= $spic.height() - $sf.height()) {
                        $topvalue = $spic.height() - $sf.height()
                    }

                    $sf.css({
                        left: $leftvalue,
                        top: $topvalue
                    });

                    $bpic.css({
                        left: -$leftvalue * $bili,
                        top: -$topvalue * $bili
                    });

                });
            }, function() {
                $sf.css('visibility', 'hidden');
                $bf.css('visibility', 'hidden');
            });

            //小图切换 - 小图是渲染出来的，找不到li。
            $('#list').on('mouseover', 'li', function() { //事件委托,ul元素没有高度不可见，委托#list
                let imgurl = $(this).find('img').attr('src'); //获取当前图片的地址
                $('#smallpic').attr('src', imgurl);
                $('#bpic').attr('src', imgurl);
                $(this).find('img').css('border-bottom', '3px solid #666')
            });
            $('#list').on('mouseout', 'li', function() { //事件委托,ul元素没有高度不可见，委托#list

                $(this).find('img').css('border-bottom', '')
            });


            //左右箭头事件
            let $num = 5; //列表显示的图片个数,重要的信息
            $right.on('click', function() {
                let $lists = $('#list ul li');
                if ($lists.size() > $num) { //限制点击的条件，如果$num值小于li的长度，继续点击右键头
                    $num++;
                    $left.css('color', '#333');
                    if ($lists.size() == $num) {
                        $right.css('color', '#fff');
                    }

                    //列表运动
                    $('#list ul').animate({
                        left: -($num - 5) * $lists.eq(0).outerWidth(true)
                    });
                }
            });
            $left.on('click', function() {
                let $lists = $('#list ul li');
                if ($num > 5) { //限制点击的条件
                    $num--;
                    $right.css('color', '#333');
                    if ($num <= 5) {
                        $left.css('color', '#fff');
                    }
                    $('#list ul').animate({
                        left: -($num - 5) * $lists.eq(0).outerWidth(true)
                    });
                }
            });



            //.购物车：商品sid、商品数量

            let arrsid = []; //存储商品的sid
            let arrnum = []; //存储商品的数量
            //提前预判cookie设置时的key值(cookiesid/cookienum)进行获取cookie
            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                }
            }
            $('.p-btn-shop a').on('click', function() {
                getcookietoarray(); //获取cookie，变成数组，判断是否存在。
                if ($.inArray($sid, arrsid) === -1) { //不存在
                    arrsid.push($sid);
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                    arrnum.push($('#count').val());
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                } else { //存着
                    //通过$sid获取商品的数量所在的位置。
                    let $index = $.inArray($sid, arrsid);
                    // arrnum[$index]//原来的数组
                    // $('#count').val()//新添加的数量
                    arrnum[$index] = parseInt(arrnum[$index]) + parseInt($('#count').val()); //重新赋值
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                }
            });
        }
    }
});