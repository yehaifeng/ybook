// function ct(){
//     return document.compatMode == "BackCompat"? document.body.clientHeight:document.documentElement.clientHeight;
//   }
//   var f=document.getElementById('footer');
//   (window.onresize=function(){
//     f.style.position=document.body.scrollHeight>ct()?'':'absolute';
//   })();


$(function (){
    function footerPosition(){
        $("footer").removeClass("fixed-bodataom");
        var contentHeight = document.body.scrollHeight,//网页正文全文高度
            winHeight = window.innerHeight;//可视窗口高度，不包括浏览器顶部工具栏
        if(!(contentHeight > winHeight)){
            //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bodataom
            $("footer").addClass("fixed-bodataom");
        } else {
            $("footer").removeClass("fixed-bodataom");
        }
    }
    footerPosition();
    $(window).resize(footerPosition);


    // $('#qbook').click(function queryf() {
    //     var bookname = $('#bookname').val();
    //     var author = $('#author').val();
    //     console.log(bookname, author);
    //     $.ajax({
    //         url: '/query/',
    //         type: 'POST',
    //         // headers: {'X-CSRFTOKEN': '{{ csrf_token }}' },
    //         data: {'querybookname':bookname, 'queryauthor':author},
    //         dataType: "json",
    //         success: function (data) {
    //             $(".displayinfo").remove();
    //             for (index in data) {
    //                 var tr = $("<tr></tr>");
    //                 tr.addClass("displayinfo");
    //                 var info = data[index];
    //                 var td_bookname = $("<td></td>").text(info.book_name);
    //                 var td_bookauthor = $("<td></td>").text(info.book_author);
    //                 var td_booktraslator = $("<td></td>").text(info.book_translator);
    //                 var td_bookpulisher = $("<td></td>").text(info.book_publisher);
    //                 var td_update = $("<td></td>").text("");
    //                 tr.append(td_bookname);
    //                 tr.append(td_bookauthor);
    //                 tr.append(td_booktraslator);
    //                 tr.append(td_bookpulisher);
    //                 tr.append(td_update);
    //                 $("#displaytable").append(tr);
    //             }
    //             console.log(data);
    //         }
    //     });
    // });

    $("#qbook").click(function () {queryf();});
    $(window).keydown(function (e) {
        if(e.which == 13){
            queryf();
        }
    });
});

    var queryf = function () {
        var bookname = $('#bookname').val();
        var author = $('#author').val();
        console.log(bookname, author);
        $.ajax({
            url: '/query/',
            type: 'POST',
            // headers: {'X-CSRFTOKEN': {{ csrf_token }} },
            headers: { "X-CSRFToken": getCookie("csrftoken") },
            data: {'querybookname': bookname, 'queryauthor': author},
            dataType: "json",
            success: function (data) {
                $(".displayinfo").remove();
                for (index in data) {
                    var tr = $("<tr></tr>");
                    tr.addClass("displayinfo");
                    var info = data[index];
                    var td_bookname = $("<td></td>").text(info.book_name);
                    var td_bookauthor = $("<td></td>").text(info.book_author);
                    var td_booktraslator = $("<td></td>").text(info.book_translator);
                    var td_bookpulisher = $("<td></td>").text(info.book_publisher);
                    var td_update = $("<td></td>").text("");
                    tr.append(td_bookname);
                    tr.append(td_bookauthor);
                    tr.append(td_booktraslator);
                    tr.append(td_bookpulisher);
                    tr.append(td_update);
                    $("#displaytable").append(tr);
                }
                console.log(data);
            }
        });
    };

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}