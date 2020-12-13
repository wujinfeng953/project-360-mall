! function($) {
    //头部广告
    const $top = $('.top');
    const $header = $('.header');
    const $topbtn = $('.inner-btn');
    const $topImg = $('.top-img img')
    $topbtn.on('click', function() {
        $top.css('margin-top', -90)
        $header.css('margin-top', 40)
        $topImg.hide()
    });

    //轮播图
    const $banner = $('.banner');
    const $ullist = $('.banner ul'); //运动的盒子
    const $piclist = $('.banner ul li'); //6个图片
    const $btnlist = $('.banner ol li'); //5个圈圈
    const $lbtn = $('.banner-lbtn');
    const $rbtn = $('.banner-rbtn');
    let timer = null;
    let $num = 0; //存储索引值

    //计算$ullist的宽度
    const $liwidth = $piclist.eq(0).width(); //一张图片的宽度
    // console.log($liwidth);//1920
    $ullist.width($liwidth * $piclist.size());

    //2.5个按钮添加点击事件。让$ullist进行运动。
    $btnlist.on('click', function() {
        $num = $(this).index() - 1; //获取当前的圈圈的索引，赋值给$num -1因为下面封装的函数里面有个$num++;
        tabSwitch();
    });
    //3.显示左右箭头。
    $banner.hover(function() {
        clearInterval(timer); //鼠标移入停止自动轮播

    }, function() {
        timer = setInterval(function() { //鼠标移出继续自动轮播。
            $rbtn.click();
        }, 3000);
    });


    //4.左右箭头添加点击事件
    $rbtn.on('click', function() {
        tabSwitch();
    })
    $lbtn.on('click', function() {
        $num -= 2; //-1:$ulist迁移一张图片，但是封装函数里面又有++,达到-1的效果，需要-2.
        tabSwitch();
    });

    function tabSwitch() {
        $num++; //将索引封装进函数，方便后续的左右箭头对索引的判断。
        if ($num === $btnlist.size() + 1) {
            $ullist.css('left', 0);
            $num = 1;
        }
        //判断左箭头
        if ($num === -1) {
            $ullist.css('left', -$liwidth * $btnlist.size());
            $num = $btnlist.size() - 1;
        }

        //判断小圈圈
        if ($num === $btnlist.size()) {
            $btnlist.eq(0).addClass('active').siblings('li').removeClass('active');
        } else {
            $btnlist.eq($num).addClass('active').siblings('li').removeClass('active');
        }


        $ullist.stop(true).animate({
            left: -$liwidth * $num
        });

    }
    //自动播放
    timer = setInterval(function() {
        $rbtn.click();
    }, 3000);


    //二级侧边栏效果
    let $headLi = $('.header-list-ul li');
    let $headBox = $('.header-ul-box');
    let $headItem = $('.header-ul-box .item');
    $headLi.hover(function() {
        $headBox.show();
        $headItem.eq($(this).index()).show().siblings('.item').hide();
        $(this).css('backgroundColor', "rgba(51,51,51,0.7)");

    }, function() {
        $headBox.hide();
        $(this).css('backgroundColor', ""); //鼠标移出 背景色消失  盒子也消失
    })

    $headBox.hover(function() {
        $headBox.show();
    }, function() {
        $headBox.hide();
    })

    //楼梯效果
    let $loutinav = $('.index-elecator-box') //左侧楼梯
    let $loutibom = $('.index-right-bottom')
    let $louti = $('.index-elecator-box a') //获取11个a
    var $louceng1 = $('.a1'); //前三层
    var $louceng2 = $('.b1'); //后面8层

    //显示隐藏左侧的楼梯：触发滚轮 根据对应的scrollTop值确定是否显示左侧的楼梯。
    // console.log($('.main-cnt-activity').offset().top); //760px
    // 第一层楼梯的top值

    function scroll() {
        let $scrolltop = $(window).scrollTop();
        if ($scrolltop >= 760 - 100) {
            $loutinav.show();
            $loutibom.show();

        } else {
            $loutinav.hide();
            $loutibom.hide();

        }

    }
    scroll();
    $(window).on('scroll', function() {
        scroll();
    });
    //第二步：点击左侧的楼梯，楼层运动到对应的位置
    $louti.on('click', function() {
        //点击楼梯，触发滚轮事件
        $(window).off('scroll');
        $(this).addClass('active1').siblings('li').removeClass('active1'); //当前点击的添加类名。
        var $loucengtop = $louceng1.eq($(this).index()).offset().top; //每个楼层的top

        $('html').animate({
            scrollTop: $loucengtop - 80 //每个楼层的top值求出，然后给滚动条的top值
        }, function() {
            $(window).on('scroll', function() {
                scroll();
            });
        });
    })


    //渲染
    const $list = $('.main-b-list-ul')
    $.ajax({
        url: 'http://10.31.161.50/dashboard/360mall-porject/php/listdata.php',
        dataType: 'json',
    }).done(function(data) {
        let $strhtml = '';
        // console.log(data)
        $.each(data, function(index, value) {
            // console.log(value);
            $strhtml += `
            <a href="detail.html?sid=${value.sid}">
                    <li>
                    <img class="lazy" data-original="${value.url}" width="180" height="180"/>
                    <p>${value.title}</p>
                    <span>${value.price}</span>
                    <i>直降</i>
                    </li>
                </a>
            
            `;
        })
        $list.html($strhtml);
        $(function() { //页面加载完成
            $("img.lazy").lazyload({
                effect: "fadeIn" //显示方法：谈入
            });
        });
    })
}(jQuery);