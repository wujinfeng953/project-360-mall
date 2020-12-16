define(['jcookie'], () => {
    return {
        init: function() {

            //1.获取cookie
            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    let $arrsid = $.cookie('cookiesid').split(','); //[1,3,5]
                    let $arrnum = $.cookie('cookienum').split(','); //[10,33,50]
                    $.each($arrsid, function(index, value) {
                        rendergoods($arrsid[index], $arrnum[index]); //index:数组的索引
                    });

                }

            }
            getcookietoarray();
            //2.渲染商品列表
            function rendergoods(sid, num) { //sid:商品的编号    num:商品的数量
                //获取所有的接口数据
                $.ajax({
                    url: 'http://10.31.161.50/dashboard/360mall-porject/php/indexdata.php',
                    dataType: 'json'
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        if (sid === value.sid) { //通过sid的对比找到对应的数据。
                            //:hidden:匹配所有不可见元素，或者type为hidden的元素
                            //clone([Even[,deepEven]]) 克隆匹配的DOM元素并且选中这些克隆的副本。
                            let $clonebox = $('.goods-item:hidden').clone(true, true); //克隆
                            $clonebox.find('.goods-pic img').attr('src', value.url);
                            $clonebox.find('.goods-d-info a').html(value.title);
                            $clonebox.find('.b-price strong').html(value.price);
                            $clonebox.find('.quantity-form input').val(num);
                            $clonebox.find('.b-sum strong').html((value.price * num).toFixed(2));
                            $clonebox.css('display', 'block'); //显示
                            $('.item-list').append($clonebox); //追加
                            calcprice(); //计算总价
                        }
                    });
                });
            }
            //计算总价和总的商品件数
            function calcprice() {
                let $sum = 0; //商品的件数
                let $count = 0; //商品的总价
                $('.goods-item:visible').each(function(index, ele) {
                    if ($(ele).find('.cart-checkbox input').prop('checked')) { //复选框是否勾选
                        $sum += parseInt($(ele).find('.quantity-form input').val());
                        $count += parseFloat($(ele).find('.b-sum strong').html());
                    }
                });
                //赋值
                $('.amount-sum').find('em').html($sum);
                $('.totalprice').html($count.toFixed(2));
            }

            // 4.全选 - 事件委托。

            $('.allsel').on('click', function() {
                $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked')); //将全选的值给下面的几个input
                $('.allsel').prop('checked', $(this).prop('checked')); //将自己的值赋值给自己。2个allsel复选框
                calcprice(); //计算总价
            });

            //获取克隆的商品列表里面的checkbox,添加事件
            //克隆的商品列表里面：选中的复选框的长度等于存在的复选框的长度
            let $inputs = $('.goods-item:visible').find(':checkbox'); //查找复选框
            $('.item-list').on('click', $inputs, function() {
                //$(this):被委托的元素，checkbox
                if ($('.goods-item:visible').find(':checkbox').length === $('.goods-item:visible').find('input:checked').size()) {
                    $('.allsel').prop('checked', true);
                } else {
                    $('.allsel').prop('checked', false);
                }
                calcprice(); //计算总价
            });






        }
    }
});