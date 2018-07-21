const minRand = 0;
const maxRand = 5;
const animationQuantity = 3;
const technologyTab = ["css", "html", "js", "ps", "jq", "php", "mysql", "cpp", "git", "ajax"];
var TechBoxIntervals = [];
var techBoxSemafor = true;

$(window).ready(function() {
    
    $("#page4").mousemove(function(event) {
        
        let toCenterWidth = parseInt($('#page4 > .stage > .chose-tech-box').css("width")) / 2
        let toCenterHeight = parseInt($('#page4 > .stage > .chose-tech-box').css("height")) / 2
        let toLeft = $('#page4 > .stage > .chose-tech-box').position().left;
        let toTop = $('#page4 > .stage > .chose-tech-box').offset().top;
        let toCenterHorizontal = event.pageX - toCenterWidth - toLeft;
        let toCenterVertical = event.pageY - toCenterHeight - toTop;
        
        let rotateX = toCenterVertical / -45;
        let rotateY = toCenterHorizontal / 45;
        
        $('#page4 > .stage > .chose-tech-box >  .moving-shape').css("transform", "rotateX("+ rotateX +"deg) rotateY("+ rotateY + "deg) translate(-"+ (50 + rotateY * 0.6)+"%, -"+(50 - rotateX * 0.6)+"%)");
    }); 
    
    setTechBoxIntervals();
    techBoxsliding();
    
    $('.technology-box').click(function() {
        
        if(techBoxSemafor) {
            
            techBoxSemafor = false;
            shakePrezentTechnology(this);
            techBoxAnimation(this);
            techDescriptionChange(this);
        }
        
    });
});

async function techDescriptionChange(t) {
    
    let objClass = $(t).attr('class');
    
    for(let i = 0; i < technologyTab.length; i++) {
        
        if(objClass.search(technologyTab[i]) != -1) {
            
            $('.tech-description-container > .description-box').css('display', 'none');
            $('.tech-description-container > .description-box.'+technologyTab[i]).css('display', 'block');
            break;
        }
    }
}

async function techBoxsliding() {
     
    let toggle = true;
    let hoverDetection;
    let delay;
    let down = false;
    let clickCursorPositionX = 0;
    let techList =  $('#page4 > .stage > .technology-list');

    techList.hover(function() {
        hoverDetection = true;
        $(this).stop();
    });
    techList.mouseleave(function() {
        hoverDetection = false;
    });
    
    techList.mousedown(function(event) {
        down = true;
        clickCursorPositionX = event.pageX;
    });
    
    $(document).mouseup(function() {
        down = false;
    });
    
    techList.mousemove(function(event) {
        if(down) {
            flgDelay = false;
            let distance = (clickCursorPositionX - event.pageX) / 25;
            let actualScroll = techList.scrollLeft();
            let x = actualScroll + distance;
            techList.scrollLeft(x);
        }
    });
    
    while(true) {
          
        if(toggle) {
        
            delay = technologyListScroll('right');
        } else {

            delay = technologyListScroll('left'); 
        }
        
        for(let i = 0; i < delay + 50; i += (delay + 50) / 80) {
            
            await sleep((delay + 50) / 80);
            
            if(hoverDetection) {
                
                toggle = !toggle;
                while(hoverDetection || down) {

                    await sleep(30);
                }
                break;
            } 
        }
        
        toggle = !toggle;
    }
    
}

function technologyListScroll(dir) {
    
    let obj = $('#page4 > .stage > .technology-list');  
    let maxScrollLeft = obj.get(0).scrollWidth - obj.get(0).clientWidth;
    let time;
    if(dir == 'right') {
        
        time = (maxScrollLeft - $(obj).scrollLeft()) * 20;
        obj.animate({

            scrollLeft: maxScrollLeft
        }, time, "linear");
    } else { 
        
        time = $(obj).scrollLeft() * 20;
        obj.animate({

                scrollLeft: 0
        }, time, "linear");
    }
    
    return time;
}

async function techBoxAnimation(t) {
    
    clearTechBoxIntervals();
    
    $(t).addClass('animate-destruction');
    
    await sleep(500);
    $(t).removeClass('animate-destruction');
    setTechBoxIntervals();
    
    techBoxSemafor = true;
}

async function shakePrezentTechnology(t) {
    
    let delay = 50; //in ms
    let oscylation = 2; //in %
    let secondChild = $(t).children()[1];
    let animateObj = $('#page4 > .stage > .chose-tech-box > .prezent-technology');
    
    $(animateObj).css('transform', 'translate(-'+ (50 - oscylation) +'%, -50%)');
    $(animateObj).css("background-image", $(secondChild).css('background-image'));
    await sleep(delay);
    $(animateObj).css('transform', 'translate(-'+ (50 + oscylation) +'%, -50%)');
    await sleep(delay);
    $(animateObj).css('transform', 'translate(-'+ (50 - oscylation) +'%, -50%)');
    await sleep(delay);
    $(animateObj).css('transform', 'translate(-'+ (50 + oscylation) +'%, -50%)');
    await sleep(delay);
    $(animateObj).css('transform', 'translate(-'+ (50 - oscylation) +'%, -50%)');
    await sleep(delay);
    $(animateObj).css('transform', 'translate(-'+ (50 + oscylation) +'%, -50%)');
}

async function animateTechBox(i) {
    
    let delayMin = 300;
    let delayMax = 500;
    let animationNum = Math.floor(Math.random()*(animationQuantity)+1);
    if(Math.floor(Math.random()*(maxRand-minRand+1)+minRand)) {
        $('.technology-box.' + technologyTab[i] + '-box').addClass('animate' + animationNum);
        
        await sleep(Math.floor(Math.random()*(800-400+1)+300));
        $('.technology-box.' + technologyTab[i] + '-box').removeClass('animate'+ animationNum);
    }
}

async function setTechBoxIntervals() {
    
    for(let i = 0; i < technologyTab.length; i++) {
        
        TechBoxIntervals[i] = setInterval(function() {
            
            animateTechBox(i);            
        }, 2100);
        await sleep(200);
    }
}

function clearTechBoxIntervals() {
    
    for (let i = 0; i < TechBoxIntervals.length; i++)
        window.clearInterval(TechBoxIntervals[i]);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}