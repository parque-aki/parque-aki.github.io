$(document).ready(function(){
    //브라우저 버전 html에 class로 추가하기
    if(BrowserDetect.browser == "Explorer"){
        $("html").addClass("ie"+BrowserDetect.version);
    }else{
        $("html").addClass(BrowserDetect.browser);
    }

    //재배시뮬레이션 게임형
    /*$(".gnb__inner .gnb__item").eq(2).on("click",function () {
        window.open('/html/ctvtsmlt/index.html','cultivationSimulation',"width=1445, height=781, location=no,menubar=no,resizable=no,status=no,titlebar=no,toolbar=no,scrollbars=no")
    })*/

    //토글 active 이벤트 버튼
    $("[data-toggle='button']").on("click",function(){
        var $this = $(this);
        var aria = $this.attr("aria-pressed"); //값이 string 으로 반환된다.
        $this.toggleClass("-active");
        if(aria == 'true') {
            $this.attr("aria-pressed",'false');
        }else{
            $this.attr("aria-pressed",'true');
        }
    });

    //토글 리스트,썸네일 타입
    $("[data-toggle='listType']").on("click",function(){
        var $tar = $(".toggleTarget");
        var aria = $(this).data("target");
        if(aria == "list"){
            $tar.addClass("-listType")
        }else{
            $tar.removeClass("-listType")
        }
    });

    //사이트맵 보기/닫기
    $(".topUtil .iconMenuBtn").on('click', function (e) {
        e.preventDefault();
        $("body").addClass("-activeLayerPopup");
        $('.siteMap').addClass('-open');
        $('.mainBanner, .mainContent ').css('opacity','.9');
    });
    $(".siteMap__btnClose").on('click', function (e) {
        e.preventDefault();
        $("body").removeClass("-activeLayerPopup");
        $('.siteMap').removeClass('-open');
        $('.mainBanner, .mainContent').css('opacity','1');
    });

});
//레이어 팝업띄우기
function openLayerPop(target) {
    target.preventdefault = false;
    var $body = $("body");
    var $this = $(target);
    var setZindex = parseInt($this.css("z-index")) + 10;
    $(".layerPopup.-active").css("z-index", 1000);
    $this.css("z-index", setZindex).addClass("-active");
    $body.addClass("-activeLayerPopup");
    $body.css('padding-right',getScrollWidth());
}


function closeLayerPop(e){
    e.preventdefault = false;
    var $tar = $(e);
    var $body = $("body");
    $tar.removeClass("-active");
    //비디오 영상이 있을경우
    if($tar.find("video").hasClass("moviePopup__video")){
        var $video = $tar.find(".moviePopup__video").get(0);
        $video.pause();
        $video.currentTime  = 0;
    }
    if(!$body.find(".layerPopup").hasClass("-active")){
        $body.removeClass("-activeLayerPopup");
        $body.css('padding-right','0');
    };
}

//레이어 팝업 스크롤 제거하기위한 함수
function getScrollWidth(){
    var body = document.querySelector('body');
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'fakeWidth';
    body.appendChild(scrollDiv);
    var scrollbarWidth = $(document).height() > $(window).height() ? scrollDiv.offsetWidth - scrollDiv.clientWidth : 0;

    body.removeChild(scrollDiv);
    return scrollbarWidth;
}

//전체화면
function toggleFullscreen(e) {
    var elem = document.querySelector(e);
    if (!document.fullscreenElement) {
        elem.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

//텝
function tabs(e){
    var $tar = $("#"+$(e).attr("aria-controls"));
    $(e).prop("aria-selected",true).addClass("-active").siblings().prop("aria-selected",false).removeClass("-active");
    $(e).closest(".tabs").find(".tabPanel > div").hide();
    $tar.show();
    //getThis.find("id").
}






//로딩이미지 호출
function loading(type){
    setTimeout(function(){
        var loadingHtml =
            '<aside class="loading">\n' +
            '        <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>\n' +
            '</aside>';
        var $chkTar = $("body");
        if($chkTar.hasClass("-activeLoading")){
            $chkTar.find(".loading").remove();
            $chkTar.removeClass("-activeLoading");
        }else{
            $chkTar.append(loadingHtml);
            $chkTar.addClass("-activeLoading");
        }
    }, 0);
}

//디스플레이 확대 체크
//확대체크만 가능함, 브라우저확대,디스플레이확대
//125% 이상 확대할경우 비정상적으로 작아짐
function chkZoom() {
    var device = detectZoom.device();
    var result = 1;
    var body = $("body");
    var url = '/se/support/tec.do#chkZoom';
    var html =
        '<aside class="zoomChk">\n' +
        '        <div class="zoomChk__box">\n' +
        '            <h1 class="zoomChk__tit">디스플레이 설정 안내</h1>\n' +
        '            <p class="zoomChk__txt">\n' +
        '                디스플레이 설정에 텍스트 크기가 100% 이상입니다.<br>\n' +
        '                <strong>설정>디스플레이>텍스트,앱 기타 항목의 크기 변경</strong>에서<br>\n' +
        '                100%로 변경해 주시길 바랍니다.\n' +
        '            </p>\n' +
        '            <div class="zoomChk__btnGroup">\n' +
        '                <a href="#this" class="zoomChk__btn">취소</a>\n' +
        '                <a href=' + url + ' target="_blank" class="zoomChk__btn -guide">안내화면 이동</a>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </aside>';

    if (device > 1) {
        result = 0.75;
        if (!$(".zoomChk").hasClass("-active")) {
            resultSize(result);
            /*body.addClass("-chkedZoom").append(html);*/
            body.find(".zoomChk").addClass("-active");
        }
    }
    if (device == 1 && body.hasClass("-chkedZoom")) {
        body.css("zoom", 1);
        /*body.removeClass("-chkedZoom");*/
        body.find(".zoomChk").remove();
    }
    $(".zoomChk .zoomChk__btn").on("click", function () {
        body.find(".zoomChk").remove();
    });
    //확대버튼
    $(".sizeBtn__zoomIn").on('click',function(){
        result+=0.05;
        resultSize(result);
    });
    $(".sizeBtn__zoomOut").on('click',function(){
        result-=0.05;
        resultSize(result);
    });

    function resultSize(result){
        if(result >= 2){
            result = 2;
            alert("더 이상 확대할 수 없습니다.");
        };
        if(result <= 0.4){
            result = 0.4
            alert("더 이상 축소할 수 없습니다.");
        };
        body.css('zoom',result);
    }
}

//브라우저 체크
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;
            if (dataString.indexOf(data[i].subString) !== -1) {
                if (data[i].subString === "Chrome") {
                    if (dataString.toLowerCase().indexOf("edge") !== -1 || dataString.toLowerCase().indexOf("edg/") !== -1) {
                        return "Edge";
                    }else{
                        return data[i].identity;
                    }
                }else{
                    return data[i].identity;
                }
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [
        {string: navigator.userAgent, subString: "Edge", identity: "Edge"},
        {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
        {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
        {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
        {string: navigator.userAgent, subString: "OPR", identity: "Opera"},

        {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
        {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
    ]
};
BrowserDetect.init();

