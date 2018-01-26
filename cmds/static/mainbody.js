//for URL '/query/'
$(function (){
    //控制页脚位置的函数
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
    //执行页脚位置的函数
    footerPosition();
    $(window).resize(footerPosition);

    // 查询书信息的操作
    $("#qbook").click(function () {queryf();});
    $(window).keydown(function (e) {
        if(e.which = 13){
            queryf();
        }
    });

    // 添加书信息的操作
    $("#addbook").click(function () {

        var params = $("#addbook-form").serializeArray();
        var values = {};
        for( x in params ){
            values[params[x].name] = params[x].value;
        }
        values["flag"] = 2;

        // var idata = JSON.stringify(values);
        // alert(idata);
        $.post("/query/", values, function (data) {
            // alert(data);
            $('#myModal').modal('hide');
            $("#addbook-form")[0].reset();
            queryf();
        });

    });

    // $(".del-button").click(function () {
    //     var a = $(this).text();
    //     var b = $(this).parent().siblings(".book-id").text();
    //     console.log("OK");
    //     alert(b);
    // });

    // 使用ajax发送查询书信息请求的函数
    function queryf() {
        var bookname = $('#bookname').val();
        var author = $('#author').val();
        console.log(bookname, author);
        $.ajax({
            url: '/query/',
            type: 'POST',
            // headers: {'X-CSRFTOKEN': {{ csrf_token }} },
            headers: { "X-CSRFToken": getCookie("csrftoken") },
            data: {'querybookname': bookname, 'queryauthor': author, 'flag': 1},
            dataType: "json",
            success: function (data) {
                $(".displayinfo").remove();
                for (index in data) {
                    var tr = $("<tr></tr>");
                    var info = data[index];
                    var book_pub_date = dateConvert(info.book_publish_date);
                    var td_id = $("<td class='book-id'></td>").text(info.book_id).hide();
                    var td_bookname = $("<td></td>").text(info.book_name);
                    var td_bookauthor = $("<td></td>").text(info.book_author);
                    var td_booktraslator = $("<td></td>").text(info.book_translator);
                    var td_bookpulisher = $("<td></td>").text(info.book_publisher);
                    var td_update = $("<td></td>").text(book_pub_date);
                    var del_button = $("<button type='button'></button>");
                    // del_button.type('button');
                    del_button.addClass('btn btn-danger del-button');
                    del_button.attr('onclick', 'delBook(' + info.book_id + ');');
                    del_button.text("删除");
                    var td_options = $("<td></td>").append(del_button);
                    tr.append(td_id);
                    tr.append(td_bookname);
                    tr.append(td_bookauthor);
                    tr.append(td_booktraslator);
                    tr.append(td_bookpulisher);
                    tr.append(td_update);
                    tr.append(td_options);
                    tr.attr('id', 'bookid_' + info.book_id);
                    tr.addClass("displayinfo");
                    $("#displaytable").append(tr);
                }
                console.log(data);
            }
        });
    }

});

// 删除书信息请求
function delBook(id) {
    // alert(id);
    var bookid = "bookid_" + id;
    // $("#" + bookid).hide();
    $.ajax({
        url: '/query/',
        type: 'POST',
        headers: { "X-CSRFToken": getCookie("csrftoken") },
        data: {'id': id, 'flag': 3},
        dataType: "json",
        success: function (ret) {
            if (ret == 0) {
                // alert("SUCCESS");
                // var bookid = "bookid_" + id;
                $("#" + bookid).hide();
            } else {
                alert("FAILED");
            }
        },
        error: function (err) {
            alert("err");
        }
    });
}

//获取csrf的cookie信息
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//时间格式转换函数
function dateConvert(dt) {
    var dt = dt * 1000;
    var da = new Date(dt);
    var year = da.getFullYear();
    var month = da.getMonth()+1;
    var date = da.getDate();
    var rda = [year,month,date].join('-');
    return rda
}

