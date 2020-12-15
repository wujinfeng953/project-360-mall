define(['jlazyload'], () => {
    return {
        init: function() {
            //头部广告
            const $top = $('.top');
            const $header = $('.header');
            const $topbtn = $('.inner-btn');
            const $topImg = $('.top-img img');
            $topbtn.on('click', function() {
                $top.css('margin-top', -90)
                $header.css('margin-top', 40)
                $topImg.hide()
            });
            //点击去掉页面最大的广告
            const $bannerBtn = $('.t-banner-btn');
            $bannerBtn.on('click', function() {
                    $('.t-banner').hide();
                })
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
            let $loutibom = $('.index-right-bottom') //右侧浏览器窗口的回到顶层按钮
            let $louti = $('.index-elecator-box a') //获取11个a
            var $louceng = $('.a1');

            function scroll() {
                let $scrolltop = $(window).scrollTop(); //滚轮的初始值为-140
                $scrolltop = $scrolltop - 140 //header加了margin-top为140px
                if ($scrolltop >= 487) {
                    $loutinav.show();
                    $loutibom.show(); //浏览器最右侧的回到顶部按钮

                } else {
                    $loutinav.hide();
                    $loutibom.hide(); //浏览器最右侧的回到顶部按钮

                }

                // 第四步：通过触发滚动条，通过楼层将对应的楼梯添加激活的样式。
                // 如果楼层的top值>滚动条的top值,给楼层对应的楼梯添加激活状态。
                $louceng.each(function(index, element) {
                    let $loucengTop1 = $(element).offset().top; //每一个楼层的top值。
                    $loucengTop1 = $loucengTop1 - 130
                    if ($loucengTop1 >= $scrolltop) {
                        //每次触发滚动条，滚动条的top值都会发生变化。
                        $louti.removeClass('active2'); //移除前面所有的激活状态
                        $louti.eq(index).addClass('active2'); //给满足条件的添加状态\;
                        return false; //终止循环

                    }
                });
            }
            scroll(); //触发滚轮事件
            $(window).on('scroll', function() { //每次滚轮再次触发滚轮事件
                scroll();

            });
            //第二步：点击左侧的楼梯，楼层运动到对应的位置
            $louti.on('click', function() {
                //点击楼梯，触发滚轮事件
                $(window).off('scroll');
                $(this).addClass('active2').siblings('li').removeClass('active2'); //当前点击的添加类名。
                var $loucengtop1 = $louceng.eq($(this).index()).offset().top; //每个楼层的top


                // console.log($header.css('marginTop'));
                if ($header.css('marginTop') === (40 + "px")) { //如果头部的margin-top值为40的时候每个楼层的top就加上90
                    $loucengtop1 = $loucengtop1 - 40

                } else {
                    $loucengtop1 = $loucengtop1 - 130
                }

                $('html').stop(true).animate({
                    scrollTop: $loucengtop1 //每个楼层的top值求出，然后给滚动条的top值
                }, function() {
                    $(window).on('scroll', function() {
                        scroll();
                    });
                });
            });

            //倒计时效果

            function double(n) {
                return n < 10 ? '0' + n : n;
            };

            function futuer() {
                let timer = document.querySelectorAll('.countdown-time')

                let futureTime = new Date('2020.12.31 0:0:0'); //未来的时间
                let currentTime = new Date(); //当前的时间 ‘实时’

                let time = Math.round((futureTime - currentTime) / 1000); //得到的剩余的秒数
                let day = parseInt(time / 60 / 60 / 24); //总秒数除以60*60*24=86400
                let hours = parseInt(time % 86400 / 24 / 60); //小时
                let min = parseInt(time % 3600 / 60); //分钟
                let sec = time % 60; //秒

                return timer[0].innerHTML = double(hours),
                    timer[1].innerHTML = double(min),
                    timer[2].innerHTML = double(sec)

            }
            futuer();
            window.setInterval(function() {
                futuer();
            }, 1000)


            //渲染
            const $list = $('.main-b-list-ul')
            $.ajax({
                url: 'http://10.31.161.50/dashboard/360mall-porject/php/indexdata.php',
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
                                    <span>￥${value.price}</span>
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
        }
    }
});