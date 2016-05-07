$(function() {
    var banner = $(".banner"); //获取主轮播页面
    var bnImg = $(".banner .img"); //获取所有轮播图
    var btn_l = $(".banner .btn_l"); //获取轮播左按钮
    var btn_r = $(".banner .btn_r"); //获取轮播右按钮
    var clone = $(".banner .img li").first().clone(); //克隆第一张图
    var size = $(".banner .img li").size(); //获取图片个数
    var autoMoveTime = 3000 //自动切换时间
    var moveTime = 300; //点击切换时间
    var i = 0;
    //添加小圆点ul
    $(banner).append("<ul id='num'></ul>");
    //添加最后张克隆图
    $(bnImg).append(clone);
    //更具图片添加小圆焦点
    for (var j = 0; j < size; j++) {
        $("#num").append("<li></li>");
    }
    $("#num li").eq(0).addClass("on");
    //设置按钮
    $(btn_l).on("click", function() {
        moveL()
    })

    $(btn_r).on("click", function() {
        moveR()

    })

    function moveL() {
        i--;
        if (i == -1) {
            $(bnImg).css("left", -size * 550 + "px");
            i = size - 1;
        }
        $(bnImg).stop().animate({ left: -i * 550 }, moveTime);
        $("#num li").eq(i).addClass("on").siblings().removeClass("on");
    }

    function moveR() {
        i++;
        if (i == size + 1) {
            $(bnImg).css("left", "0");
            i = 1;
        }
        if (i == size) {
            $("#num li").eq(0).addClass("on").siblings().removeClass("on");
        } else {
            $("#num li").eq(i).addClass("on").siblings().removeClass("on");
        }
        $(bnImg).stop().animate({ left: -i * 550 }, moveTime);
    }

    //设置自动播放
    var int = setInterval(function() {
        i++;
        if (i == size) {
            i = 0
        }
        $(bnImg).stop().animate({ left: -i * 550 }, moveTime);
        $("#num li").eq(i).addClass("on").siblings().removeClass("on");
    }, autoMoveTime)

    //移入图片消除自动播放,移除继续播放
    $(banner).on("mouseover", function() {
        clearInterval(int);
    }).on("mouseleave", function() {
        int = setInterval(function() {
            moveR()
        }, autoMoveTime);
    })

    //移入小圆焦点
    $("#num li").on("mouseover", function() {
        var index = $(this).index();
        i = index;
        $(bnImg).stop().animate({ left: -index * 550 }, moveTime);
        $(this).addClass("on").siblings().removeClass("on");
    })
})
