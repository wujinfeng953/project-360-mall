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


    $.ajax({
        url: 'http://10.31.161.50/dashboard/360mall-porject/php/listdata.php',
    })
}(jQuery);