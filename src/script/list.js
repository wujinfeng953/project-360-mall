! function($) {
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

}(jQuery)