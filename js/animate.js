$(document).ready(function() {
    
    loadHelloText();
    loadWatchMyWorksButton();
    
    var boxCenterPositionX = parseInt($('#page2 > div > div > div').css("width")) / 2;
    var boxCenterPositionY = parseInt($('#page2 > div > div > div').css("height")) / 2;
    $('#page2 > div > div > div').mousemove(function(event) {
        let translateX = 50 - (boxCenterPositionX - (event.pageX - $(this).offset().left - boxCenterPositionX)) / 17;
        let translateY = 50 - (boxCenterPositionY - (event.pageY - $(this).offset().top - boxCenterPositionY)) / 17;
    
        $('#page2 > div > div > div').css("background-position", translateX + "%" + translateY + "%");
    });
});

var loadHelloTextSemafor = 1;
async function loadHelloText() {
    
    if(loadHelloTextSemafor != 1) {return false;}
    loadHelloTextSemafor = 0;
    
    const helloText = $("#page1 > span").text();
    $("#page1 > span").text("");
    
    await sleep(700);
    
    $("#page1 > span").css("left","53%");
    loadText(1,6, 50, helloText, "#page1 > span");
    $("#page1 > span").animate({
        left: "50%",
    },300);

    await sleep(1300);
    $("#page1 > span").animate({
        left: "48%",
    },2650);
    loadText(7,32, 100, helloText, "#page1 > span");
    $("#page1 > span").animate({
        left: "50%",
    },300);
    await sleep(3000);
    
    loadHelloTextSemafor = 1;
}

async function loadText(from, to, fast, text, way) { //służy do pisywania dowolnego textu w dowoną ścieżkę z określoną prędkością

    from--;
    to--;
    let actualyText = "";
    for (let i = from; i <= to; i++) {
        
        actualyText = $(way).text();
        $(way).text(actualyText + text[i]);
        await sleep(fast);
    }   
}

async function loadMyWorks(pageNum) {
    
    /*przycisk*/
    let buttonOpacity = $("#page2 > button").css("opacity");
    $("#page2 > button").css("opacity", 0);
    /*kafelki*/
    let site;
    if(pageNum < 2) {site = "top"}
    else {site = "bottom"}
    $("#page2 > div > div").addClass("page-2-animate-box-"+site); //przesunięcie kontentu poza ekran
    await sleep(400);
    
    $("#page2 > div > div:nth-of-type(1)").removeClass("page-2-animate-box-"+site);
    await sleep(90);
    $("#page2 > div > div:nth-of-type(2)").removeClass("page-2-animate-box-"+site);
    
    await sleep(400);
    $("#page2 > button").animate({
        opacity: buttonOpacity
    }, 300);
}

async function loadaAboutMe() {
    
    $("#page3 > .page3-img-me-container > .page3-img-me").addClass("animate");
    $("#page3 > .page3-introduce-container > h1").addClass("animate");
    $("#page3 > .page3-introduce-container > span").addClass("animate");
    
    await sleep(400);
    $("#page3 > .page3-img-me-container > .page3-img-me").removeClass("animate");
    await sleep(60);
    $("#page3 > .page3-introduce-container > h1").removeClass("animate");
    await sleep(100);
    $("#page3 > .page3-introduce-container > .page3-span1").removeClass("animate");
    await sleep(50);
    $("#page3 > .page3-introduce-container > .page3-span2").removeClass("animate");
    await sleep(30);
    $("#page3 > .page3-introduce-container > .page3-span3").removeClass("animate");

}

async function loadWatchMyWorksButton() {
    
    $('#page1 > div').css("opacity", "0");
    await sleep(5000);
    $('#page1 > div').animate({
        opacity: "1"
    }, 2000);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}