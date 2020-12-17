define([], () => {
    return {
        init: function() {
            const $username = $('#username');
            const $password = $('#password');
            const $span = $('.main-form-span');
            const $border = $('.main-form-input');
            const $form = $('form');
            let $userflag = null;
            let $pwdflag = null;


            $username.on('focus', function() {
                $span.eq(0).css('color', 'green').html('中英文数字均可，最长14个数字英文或7个汉字');
                $border.eq(0).css('border', '1px solid green')
            })

            $username.on('blur', function() {
                let $_this = $(this);
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.161.50/dashboard/360mall-porject/php/reg.php',
                    data: {
                        xingming: $username.val()
                    }
                }).done(function(data) { //data就是后端返回的结果
                    console.log(data);
                    if (!data) { //不存在
                        if ($_this.val() !== '') {
                            let $strleng = $_this.val().replace(/[\u4e00-\u9fa5]/g, '**').length;

                            if ($strleng > 0 && $strleng <= 14) {

                                let $reg = /^[a-zA-Z\d\u4e00-\u9fa5]+$/;
                                if ($reg.test($_this.val())) {
                                    $span.eq(0).css('color', 'green').html('√');
                                    $border.eq(0).css('border', '1px solid #999')
                                    $userflag = true;

                                } else {
                                    $span.eq(0).css('color', 'red').html('请输入正确的格式')
                                    $border.eq(0).css('border', '1px solid red')
                                    $userflag = false;
                                }
                            } else {
                                $span.eq(0).css('color', 'red').html('请输入正确的长度')
                                $border.eq(0).css('border', '1px solid red')
                                $userflag = false;
                            }
                        } else {
                            $span.eq(0).css('color', 'red').html('用户名不能为空');
                            $border.eq(0).css('border', '1px solid red')
                            $userflag = false;

                        }
                    } else { //存在
                        $span.eq(0).css('color', 'red').html('该用户名已存在');
                        $border.eq(0).css('border', '1px solid red')
                        $userflag = false;


                    }
                });


            });
            // 密码得到焦点
            $password.on('focus', function() {
                $span.eq(1).css('color', 'green').html('请输入密码');
                $border.eq(1).css('border', '1px solid green')
            });
            $password.on('input', function() {
                let $_this = $(this).val();
                if ($_this.length > 7 && $_this.length < 20) {
                    let $regnum = /\d+/;
                    let $regUpperCase = /[A-Z]+/;
                    let $regLowerCase = /[a-z]+/;
                    let $other = /[\W_]+/;
                    let $num = 0;
                    if ($regnum.test($_this)) {
                        $num++;
                    }
                    if ($regLowerCase.test($_this)) {
                        $num++;
                    }
                    if ($regUpperCase.test($_this)) {
                        $num++;
                    }
                    if ($other.test($_this)) {
                        $num++;
                    }
                    switch ($num) {
                        case 1:
                            $span.eq(1).css('color', 'red').html('弱');
                            $pwdflag = false;
                            break;
                        case 2:
                        case 3:
                            $span.eq(1).css('color', 'blue').html('中');
                            $pwdflag = true;
                            break;
                        case 4:
                            $span.eq(1).css('color', 'green').html('强');
                            $pwdflag = true;
                            break;

                    }
                } else {
                    $span.eq(1).css('color', 'red').html('请输入8-20位的密码');
                    $pwdflag = false;
                }
            })



            // 密码框失去焦点
            $password.on('blur', function() {

                let $_this = $(this).val();
                if ($_this !== '') {
                    if ($pwdflag) {
                        $span.eq(1).css('color', 'green').html('√');
                        $pwdflag = true;
                    }
                } else {
                    $span.eq(1).css('color', 'red').html('密码不能为空')
                    $border.eq(1).css('border', '1px solid red')
                    $pwdflag = false;
                }
            })

            $form.on('submit', function() {
                if ($username.val() === '') {
                    $span.eq(0).css('color', 'red').html('用户名不能为空');
                    $userflag = false;
                }
                if ($password.val() === '') {
                    $span.eq(1).css('color', 'red').html('密码不能为空')
                    $pwdflag = false;
                }
                if (!$userflag || !$pwdflag) {
                    return false;
                }
            })


        }
    }
});