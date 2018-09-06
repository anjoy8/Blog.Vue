var obj = {
    data: {
        books: "",
        price: 0,
        bookObj: null
    },
    init: function () {
        this.bind();
        this.popup();
        this.show();

    },
    show: function () {
        $(".content-title").html("");
        $(".content-title").html(this.data.books);
        $(".content-price").html(this.data.price);
    },
    bind() {
        var that = this;
        $(".content .content-list ").hover(function () {
            $(this).find(".see").show();
        }, function () {
            $(this).find(".see").hide();
        });

        $(".see").click(function () {
            $(".bg,.popupbox").show();
            that.data.bookObj = $(this);
        });

        $(".btn3,.cancel").click(function () {
            $(".bg,.popupbox").hide();
        });

        //$(".ok").click(function () {
        //    var bookItem = that.data.bookObj;
        //    var _parice = $(bookItem).data("price");
        //    var _book = $(bookItem).data("book");
        //    that.data.books += _book + ",";
        //    that.data.price += parseInt(_parice);
        //    that.show();
        //});


        $(".ok").click(() => {
            var bookItem = this.data.bookObj;
            var _parice = $(bookItem).data("price");
            var _book = $(bookItem).data("book");
            this.data.books += _book + ",";
            this.data.price += parseInt(_parice);
            this.show();
            $(".bg,.popupbox").hide();

        });
    },
    popup: function () {
        var box = $(".popupbox");
        var _width = document.documentElement.clientWidth;
        var _height = document.documentElement.clientHeight;
        var $width = (_width - box.width()) / 2;
        var $height = (_height - box.height()) / 2;
        box.css({ "left": $width, "top": $height });
    },
    watch: {

    }
};

$(function () {
    obj.init();
});

