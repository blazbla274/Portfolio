var pageNum = 1;
var pageSemafor = 1;

$(document).ready(function() {
    
    pageChanger(pageNum);

    var lastSize;
    var lastColor;
    
    $(".position-nav > li").mouseenter(function() {
        if(!$(this).hasClass("checked")) {
            $(this).addClass("onmouseover");
        }
    }).mouseout(function() {
        $(this).removeClass("onmouseover");
    });
    //nasłuchiwanie kliknięcia
    $(".position-nav > li:nth-of-type(1)").click(function() {
        pageChanger(1);
    });
    
    $(".position-nav > li:nth-of-type(2)").click(function() {
        pageChanger(2);
    });
    
    $(".position-nav > li:nth-of-type(3)").click(function() {
        pageChanger(3);
    });
    
    $(".position-nav > li:nth-of-type(4)").click(function() {
        pageChanger(4);
    });
    
    $(".position-nav > li:nth-of-type(5)").click(function() {
        pageChanger(5);
    });
         
    $(".logo").click(function() {
        pageChanger(1);
    });
    
    $("#page1 > div > button").click(function() {
        pageChanger(2);
    });
    
    $('.scroll-arrow.up').click(function() {

        if((pageNum - 1) >= 1) {
            pageChanger(pageNum - 1);
        }
    });
    
    $('.scroll-arrow.down').click(function() {
        if((pageNum + 1) <= 5) {
            pageChanger(pageNum + 1);
        }
    });
    
    $('.scroll-arrow').click(function() {
        
        let backgroudCol = $(this).css("background-color");
        
        $(this).css("background-color", "rgba(0, 111, 212, 0.79)");
        recoverCssProperty(this, "background-color", backgroudCol, 450);
    });
    
    Mousetrap.bind('down', function() { 
        if((pageNum + 1) <= 5) {
            pageChanger(pageNum + 1);
        }
    });
    
    Mousetrap.bind('up', function() { 
        if((pageNum - 1) >= 1) {
            pageChanger(pageNum - 1);
        }
    });
    
    var divs = $('.page');
    var dir = 'up'; // kierunek skrolowania
    $(document.body).on('DOMMouseScroll mousewheel', function (e) {
        if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
            dir = 'down';
        } else {
            dir = 'up';
        }
        
        if(dir == 'down') { 
            if((pageNum + 1) <= 5) {
                pageChanger(pageNum + 1);
            }
        }
    
       if(dir == 'up') {
            if((pageNum - 1) >= 1) {
                pageChanger(pageNum - 1);
            }
        }
    });
});

async function pageChanger(num) {
        
    if((pageSemafor != 1)||(num == pageNum)) {return false}
    if(num == 2) $('.position-nav').css("opacity", "1");
    
    pageSemafor = 0;
    
    //zmiany w arrowBox
    arrowBoxMenager(num);
    //zmiana w position-nav
    $(".position-nav > li").removeClass("checked");
    $(".position-nav > li:nth-of-type("+num+")").addClass("checked");
    //slajd całej strony
    let actualyPosition = (pageNum - 1) * 100;
    let changePosition = (num - 1) * 100;
        
    let done = slidePage(actualyPosition,changePosition);
        
    switch(num) {
               
       case 1: loadHelloText();
           break;
       case 2: loadMyWorks(pageNum);
           break;
       case 3: loadaAboutMe();
           break;
    }
        
    await sleep(540);
    pageNum = num;
    pageSemafor = 1;
} 

async function slidePage(from, to) {
    
    if(from == to) return false;
    
    let distance = (from - to)/100;
    if(distance < 0) distance *= -1;
    
    if(to > from) {
        
        for(let i = from; i <= to; i+=distance) {
            
            $(".page-containter > div").css("transform","translateY(-"+i+"vh)");  
            await sleep(1);
        }
    } else {
        
        for(let i = from; i >= to; i-=distance) {
            
            $(".page-containter > div").css("transform","translateY(-"+i+"vh)");    
            await sleep(1);
        }
    }
    
    return 1;
}

function arrowBoxMenager(num) {
    
    if(num != 1 && num != 5) {
        
        $('.scroll-arrow.up').css("display", "block");
        $('.scroll-arrow.down').css("display", "block");
    } else if(num == 1) {
        
        $('.scroll-arrow.down').css("display", "block");
        $('.scroll-arrow.up').css("display", "none");
    } else if (num == 5){
        
        $('.scroll-arrow.up').css("display", "block");
        $('.scroll-arrow.down').css("display", "none");
    }
}

async function recoverCssProperty(object, property, value, time) {
    
    await sleep(time);
    $(object).css(property, value);
}