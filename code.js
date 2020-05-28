/* ID's interactive objects*/
var activators=[];
var panners=[];
var hotspots=document.querySelectorAll(".hotspot");
var popupCont=document.querySelector(".popup");
var popupScreens=document.querySelectorAll(".popup_contents");
var panButtons=document.querySelectorAll(".panButton");
var exit=document.querySelector(".exit");
var rotateSelect=document.querySelector("#rotateSelect");
var zoominSelect=document.querySelector("#zoominSelect");
var man=document.querySelector("#man-pic");
var manCont=document.querySelector("#man");
var containMan=document.querySelector("#containMan");

/* variables for page*/
var rot=false;
var zoomed=false;
var transforming=false;
var transTimeout=600;
var activated=false;

var zoomMin=1;
var zoomAmt=1;
var zoomMax=3;
var pan=[0,0,0,0];
var wd=manCont.offsetWidth;
var ht=manCont.offsetHeight;
var xlim=wd/2;
var ylim=ht/2;
var transStep=0.3;
var panStep=10;

class activator{
	activate(){
		for (let step1=0;step1<hotspots.length;step1++){
				hotspots[step1].classList.remove("active");
				popupScreens[step1].classList.remove("active");
		}
		this.hotspot.classList.add("active");
		popupCont.classList.add("active");
		/*console.log(popupCont);*/
		this.popup_cont.classList.add("active");
		//console.log(this.popup_cont);

		//console.log(this.xpos);
		//console.log(this.ypos);
		/*console.log(wd);
		console.log(ht);*/
		this.xpos=this.hotspot.offsetLeft;
		this.ypos=this.hotspot.offsetTop;
		//var xdisp=-(this.xpos-(wd/2))*2;
		//var ydisp=-(this.ypos-(ht/2))*2;
		var ydisp=-(this.ypos-(ht/2))*2-50;
		var xdisp=-(this.xpos-(wd/2))*2+100;

		/*console.log(xdisp);
		console.log(ydisp);*/
		manCont.style.webkitTransform="translateX(" + xdisp.toString() + "px) translateY(" + ydisp.toString() + "px) scale(2)";
		zoomAmt=2;
		zoomed=true;
		//manCont.style.webkitTransform="translateX(-50px) translateY(70px) scale(2)";
		//console.log(manCont.style.webkitTransform);
	}
		constructor(step,hotspot,popup_contents){
		this.index=step;
		this.popup_cont=popup_contents;
		this.hotspot=hotspot;
		var self=this;
		this.hotspot.addEventListener("click",function(evt) {self.activate();});

	}
	/*deactivate(){
	for (let step1=0;step1<hotspots.length;step1++){
				hotspots[step1].classList.remove("active");
				popupScreens[step1].classList.remove("active");
				popupToggle();
				zoomoutToggle();
		}
	}*/
}

class panner{
	constructor(step3,pandir){
		this.index=step3;
		this.pandir=pandir;
		console.log(pandir);
		console.log(this);
		var self=this;//panning button is this
		this.pandir.addEventListener("click",function(evt){self.pan();});/*pass id or direction*/
		//execute pan on panning button, where panning button is this
	}
	pan(){
		console.log(this);
		console.log("calling pan");
		var dir=this.index;
		console.log(dir);
		panToggle(dir);
	}
}





function popUpToggle(){
	console.log(this);
	popupCont.classList.remove("active");
	for (let step1=0;step1<hotspots.length;step1++){
			hotspots[step1].classList.remove("active");
			popupScreens[step1].classList.remove("active");
	}
	zoomOutToggle();
}


function rotateToggle(){
	if(!transforming){
		if(rot==true){
		/* rotate*/
			man.classList.remove("rotated");	
			/*alert("unrotating");	*/
			for (let step=0;step<hotspots.length;step++){
				hotspots[step].classList.remove("rotated");
			}
			rot=false;
			transforming=true;
			setTimeout(function(){transforming=false;},transTimeout);
		} else{
		/*rotate back*/
			man.classList.add("rotated");	
			for (let step=0;step<hotspots.length;step++){
				hotspots[step].classList.add("rotated");
			}
			rot=true;
			transforming=true;
			setTimeout(function(){transforming=false;},transTimeout);
		}
	}
}


function zoomInToggle(){
	if(!transforming){
		//if(!zoomed){
		if(zoomAmt<zoomMax){
			//manCont.classList.add("zoomedIn");
			zoomAmt=zoomAmt+transStep;
			manCont.style.webkitTransform="scale("+ zoomAmt.toString() + ")";
			//console.log(manCont);
			zoomed=true;
		}
	}
}

function zoomOutToggle(){
	if(!transforming){
		if(zoomed && zoomAmt>zoomMin){
			//zoomed=false;
			//manCont.classList.remove("zoomedIn");
			zoomAmt=zoomAmt-transStep;
			manCont.style.webkitTransform="translateX(0) translateY(0) scale(" + zoomAmt.toString() + ")";

			//console.log(zoomed);
		}
		else if(zoomAmt==zoomMin){
			zoomed=false;
			manCont.classList.remove("zoomedIn");
		}
		
	}
}

function panToggle(dir){
	if(!transforming){
		transforming=true;
		console.log(dir);
		//console.log("in pantoggle");
		if(zoomed){
			zoomAmt=2;
			console.log("dir in panToggle function:");
			switch(dir){
				case 0:
					manCont.style.webkitTransform="translateY(200px) scale(2)";
					break;
				case 1: 
					manCont.style.webkitTransform="translateX(100px) scale(2)";
					break;
				case 2: 
					manCont.style.webkitTransform="translateY(-200px) scale(2)";
					break;
				case 3: 
					manCont.style.webkitTransform="translateX(-100px) scale(2)";
					break;
			}
			//console.log(manCont.style.webkitTransform);
			zoomed=true;
			setTimeout(function(){transforming=false;},transTimeout);
		}
		else{
			console.log("dir in panToggle function unzoomed:");
			zoomAmt=1;
			switch(dir){
				case 0:
					manCont.style.webkitTransform="translateY(20px) scale(1)";
					break;
				case 1: 
					manCont.style.webkitTransform="translateX(10px) scale(1)";
					break;
				case 2: 
					manCont.style.webkitTransform="translateY(-20px) scale(1)";
					break;
				case 3: 
					manCont.style.webkitTransform="translateX(-10px) scale(1)";
					break;
			}
			//console.log(manCont.style.webkitTransform);
			setTimeout(function(){transforming=false;},transTimeout);
			//manCont.style.webkitTransform="translateX(0px) translateY(0px) scale (1)";

		}
	}
}
/*var stepnum=0;
function cycle(){
 if(stepnum<2){
 	activators[stepnum].activate();
	setTimeout(activators[stepnum].deactivate,1000);
 	stepnum=stepnum+1;
 }
 else{
 stepnum=0;
 
 }
}*/





for (let step=0;step<hotspots.length;step++){
	activators[step]=new activator(step,hotspots[step],popupScreens[step]);
	//console.log(activators[step]);
/*hotspots[step].addEventListener("click",hotspotToggle);*/
}

exit.addEventListener("click",popUpToggle);
rotateSelect.addEventListener("click",rotateToggle);
zoominSelect.addEventListener("click",zoomInToggle);
zoomoutSelect.addEventListener("click",zoomOutToggle);
for (let step3=0;step3<panButtons.length;step3++){
	panners[step3]=new panner(step3, panButtons[step3]);
	//console.log(panners[step3]);
}

function preventDefault(e){
	//e = e || window.event;
	//if(e.preventDefault)
	//	e.preventDefault();
	//e.returnValue=false;
	e.preventDefault();
}

/*setInterval(cycle,5000);*/

var supportsPassive = false;
try {
	window.addEventListener("test",null,Object.defineProperty({},'passive', {
		get: function () { supportsPassive = true;}
	}));
} catch(e){}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableWindowScroll(){
	console.log("disable window scroll");
//	if (window.addEventListener)
//		window.addEventListener("DOMMouseScroll",preventDefault,false);
//	window.onwheel = preventDefault();
//	window.onmousewheel = document.onmousewheel = preventDefault;
	window.addEventListener(wheelEvent, preventDefault,wheelOpt);
	window.addEventListener('DOMMouseScroll',preventDefault,false);
	window.addEventListener('touchmove',preventDefault,wheelOpt);
}

function enableWindowScroll(){
	console.log("enable window scroll");
	window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
	window.removeEventListener('DOMMouseScroll',preventDefault,false);
	window.removeEventListener('touchmove',preventDefault,wheelOpt);
}
//document.addEventListener("touchstart",function(){},{passive:false});
//document.addEventListener("wheel",function(){},{passive:false});
//document.addEventListener("mouseenter",function(){},{passive:false});
//document.addEventListener("mouseout",function(){},{passive:false});

man.addEventListener("wheel",function(event){ if(event.deltaY<0) zoomInToggle(); else if(event.deltaY>0) zoomOutToggle();}, {passive:false});
//containMan.addEventListener("mouseenter",disableWindowScroll);
//containMan.addEventListener("mouseleave",enableWindowScroll);
manCont.addEventListener("mouseenter",disableWindowScroll);
manCont.addEventListener("mouseleave",enableWindowScroll);
for (let step=0;step<hotspots.length;step++){
	hotspots[step].addEventListener("wheel",function(event){ if(event.deltaY<0) zoomInToggle(); else if(event.deltaY>0) zoomOutToggle();});
	hotspots[step].addEventListener("mouseenter",disableWindowScroll);
//	hotspots[step].addEventListener("mouseout",enableWindowScroll);
}


/*
man.addEventListener("mouseover",function (event)
{ 
	console.log("mouseenter");
    // Get the current page scroll position 
    scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 
  
        // if any scroll is attempted, set this to the previous value 
        window.onscroll = function() { 
            window.scrollTo(scrollLeft, scrollTop); 
             console.log("reset");
        }; 
} );

man.addEventListener("mouseout", function (event) { 
    window.onscroll = function() {}; console.log("mouseout");/*alert("mouseout");    } );*/



//add something here about reading in content from articles on each item

