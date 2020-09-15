function is_IE() {
  return (window.navigator.userAgent.match(/MSIE|Trident/) !== null);
}

/* https://stackoverflow.com/questions/49986720/how-to-detect-internet-explorer-11-and-below-versions*/

if (is_IE()==false){
/*jshint esversion: 6 */
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
	var zoomoutSelect=document.querySelector("#zoomoutSelect");
	var man=document.querySelector("#man-pic");
	var manCont=document.querySelector("#man");
	var manZoom=document.querySelector(".manZoom");
	var containMan=document.querySelector("#containMan");

	/* variables for page*/
	var rot=false;
	var transforming=false;
	var transTimeout=600;
	var activated=false;

	var zoomMin=1.3;
	var zoomAmt=1.5;
	var zoomMax=3;
	var pan=[0,0,0,0];
	var transStep=0.3;
	var panStep=10;

	var container1=document.querySelector(".container1");
	var clickHover=document.querySelector("#clickHover");

	var xPanLim=[];
	var yPanLim=[];


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
			var xdisp=-(this.xpos-(wd/2))*2+200;

			/*console.log(xdisp);
			console.log(ydisp);*/
			manZoom.style.webkitTransform="scale(2)";
			manCont.style.webkitTransform="translateX(" + xdisp.toString() + "px) translateY(" + ydisp.toString() + "px)";
			zoomAmt=2;
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

	function getPanLims(){
			xPanLim=container1.offsetWidth/2-10;
			yPanLim=container1.offsetHeight/2-10;
	}
	getPanLims();


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
				manZoom.style.webkitTransform="scale("+ zoomAmt.toString() + ")";
				//console.log(manCont);
				zoomed=true;
			}
		}
	}

	function zoomOutToggle(){
		if(!transforming){
			if(zoomAmt>zoomMin){
				//zoomed=false;
				//manCont.classList.remove("zoomedIn");
				zoomAmt=zoomAmt-transStep;
				manZoom.style.webkitTransform="scale(" + zoomAmt.toString() + ")";
				//console.log(zoomed);
			}	
		}
	}

	function panToggle(dir){
		if(!transforming){
			transforming=true;
			console.log(dir);
			//console.log("in pantoggle");
			transMat=getTransform(manCont);
			let dPan=100;

			getPanLims();
			switch(dir){
				case 0:
					if(Math.abs(transMat[1]-dPan)<yPanLim){
						manCont.style.webkitTransform="translateX(" + transMat[0] + "px) translateY(" + (transMat[1]-dPan) + "px)";
					}
					break;
				case 1: 
					if(Math.abs(transMat[0]-dPan)<xPanLim){
						manCont.style.webkitTransform="translateX(" + (transMat[0]-dPan) + "px) translateY(" + transMat[1] + "px)";
					}
					break;
				case 2: 
					if(Math.abs(transMat[1]+dPan)<yPanLim){
						manCont.style.webkitTransform="translateX(" + transMat[0] + "px) translateY(" + (transMat[1]+dPan) + "px)";
					}
					break;
				case 3: 
					if(Math.abs(transMat[0]+dPan)<xPanLim){
						manCont.style.webkitTransform="translateX(" + (transMat[0]+dPan) + "px) translateY(" + transMat[1] + "px)";
					}
					break;
			}
		
			//console.log(manCont.style.webkitTransform);
			setTimeout(function(){transforming=false;},transTimeout);
			//manCont.style.webkitTransform="translateX(0px) translateY(0px) scale (1)";
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

	container1.style.display="block";
	let bg1=document.querySelector(".bg1");
	bg1.style.height="1000px";
	let bg3=document.querySelector(".bg3");
	bg3.style.height="1000px";
	let partnerslabel=document.querySelector("#partnerslabel");
	partnerslabel.style.marginTop="-1000px";

	let map=document.querySelector(".map-div-overlay-full");
	map.style.display="block";

	const imageUrl = "http://apsc-bionics.sites.olt.ubc.ca/files/2020/09/output4s.png";
	let bgElement = document.querySelector(".bg-lazy");
	let loadingElement=document.querySelector("#loading");
	loadingElement.innerHTML = "<h1>Loading</h1>";
	//bgElement.classList.add("bg-loading");
	let preloaderImg = document.createElement("img");
	preloaderImg.src = imageUrl;

	preloaderImg.addEventListener('load', (event) => {
	  bgElement.classList.remove("bg-loading");
	  bgElement.style.backgroundImage = `url(${imageUrl})`;
	  preloaderImg = null;
	  loadingElement.classList.add("inactive");
	  
	});

	var wd=manCont.offsetWidth;
	var ht=manCont.offsetHeight;

	var xlim=wd/2;
	var ylim=ht/2;
	console.log(xlim);
	console.log(ylim);
	/*Control Click Hover over man*/
	container1.addEventListener("mouseenter",function(event){clickHover.style.opacity="0";
		clickHover.style.zIndex="-2";console.log("enter");clickHover.style.webkitTransform="scale(1.5)";});
	/*	
	for (let step=0;step<hotspots.length;step++){
		hotspots[step].addEventListener("mouseenter",function(event){clickHover.style.opacity="0";
		clickHover.style.zIndex="-2";console.log("enter");clickHover.style.webkitTransform="scale(1.5)";});}
	
	popupCont.addEventListener("mouseenter",function(event){clickHover.style.opacity="0";
		clickHover.style.zIndex="-2";console.log("enter");clickHover.style.webkitTransform="scale(1.5)";});
	container1.addEventListener("mouseleave",function(event){setTimeout(function(){clickHover.style.opacity="1";
		clickHover.style.zIndex="10";console.log("exit");clickHover.style.webkitTransform="scale(1)";},3000);});*/

	/* For mobile*/
	/*if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	let isMobile=window.matchMedia("only screen and (max-width: 760px)").matches;
	if(isMobile){*/
	 container1.addEventListener("click",function(event){clickHover.style.opacity="0";
		clickHover.style.zIndex="-2";console.log("click");clickHover.style.webkitTransform="scale(1.5)";});
	/*}*/

	/*End ClickHover*/


	/*Activate hotspots*/

	for (let step=0;step<hotspots.length;step++){
		activators[step]=new activator(step,hotspots[step],popupScreens[step]);
		//console.log(activators[step]);
	/*hotspots[step].addEventListener("click",hotspotToggle);*/
	}

	/*Activates listener for popup exit*/
	exit.addEventListener("click",popUpToggle);

	/*Activates control buttons*/
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

	/*Should check below for cross browser compatibility touch devices also*/

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
		//window.addEventListener('touchmove',preventDefault,wheelOpt);
	}

	function enableWindowScroll(){
		console.log("enable window scroll");
		window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
		window.removeEventListener('DOMMouseScroll',preventDefault,false);
		//window.removeEventListener('touchmove',preventDefault,wheelOpt);
	}
	//document.addEventListener("touchstart",function(){},{passive:false});
	//document.addEventListener("wheel",function(){},{passive:false});
	//document.addEventListener("mouseenter",function(){},{passive:false});
	//document.addEventListener("mouseout",function(){},{passive:false});
	function reHomeMan(elmnt){
		console.log("rehome");
		elmnt.style.webkitTransform="translateX(0) translateY(0)";
	}

	man.addEventListener("wheel",function(event){ if(event.deltaY<0) zoomInToggle(); else if(event.deltaY>0) zoomOutToggle();}, {passive:false});
	manCont.addEventListener("mouseenter",disableWindowScroll);
	manCont.addEventListener("mouseleave",enableWindowScroll);
	for (let step=0;step<hotspots.length;step++){
		hotspots[step].addEventListener("wheel",function(event){ if(event.deltaY<0) zoomInToggle(); else if(event.deltaY>0) zoomOutToggle();});
		hotspots[step].addEventListener("mouseenter",disableWindowScroll);
	}
	window.addEventListener("resize",function(event){console.log('calling rehome'); reHomeMan(manCont);}, false);


	/* get transform values of element*/
	function getTransform(obj){
	 const transArr = [];
		 if(!window.getComputedStyle) return;
		 const style = getComputedStyle(obj),
		     transform = style.transform || style.webkitTransform || style.mozTransform;
		 let mat = transform.match(/^matrix3d\((.+)\)$/);    
		 if(mat) return parseFloat(mat[1].split(', ')[13]);
		 mat = transform.match(/^matrix\((.+)\)$/);
		 mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : transArr.push(0);
		 mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : transArr.push(0);
		 return transArr;
	}

	/*something about add drag man*/
	dragElement(manCont);
	function dragElement(elmnt){
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		elmnt.addEventListener("mousedown",dragMouseDown);
		//elmnt.addEventListener("touchstart",dragMouseDown);
	
		//elmnt.onmousedown = dragMouseDown;
		function dragMouseDown(e) {
		getPanLims();
		 e = e || window.event;
		 e.preventDefault();
		 // get the mouse cursor position at startup:
		 pos3 = e.clientX;
		 pos4 = e.clientY;
		 console.log(pos3);
		 console.log(pos4);
		 document.addEventListener("mouseup",closeDragElement);
		 document.addEventListener("mousemove",elementDrag);
		 //document.addEventListener("touchend",closeDragElement);
		 //document.addEventListener("touchmove",elementDrag);
		 //alert('inside dragMouseDown');
		 //document.onmouseup = closeDragElement;
		 // call a function whenever the cursor moves:
		 //document.onmousemove = elementDrag;
	  }

	  function elementDrag(e) {
	  //alert('inside element drag'); 
	  
	  	 elmnt.classList.add('notransition');
	  	 console.log('calling element drag');
		 e = e || window.event;
		 e.preventDefault();
		 transMat=getTransform(elmnt);
		 console.log(transMat);
		 // calculate the new cursor position:
		 pos1 = pos3 - e.clientX;//mouse change in position
		 pos2 = pos4 - e.clientY;
		 pos3 = e.clientX;
		 pos4 = e.clientY;
		 console.log("Mouse change pos X:" + pos1 + " new pos X:" + pos3);
		 // set the element's new position:
		 //elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		 //elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		 if( (Math.abs(transMat[0]-pos1)<xPanLim) && (Math.abs(transMat[1]-pos2)<yPanLim) ){//if within limits
			elmnt.style.webkitTransform="translateX(" + (transMat[0] - pos1) + "px) translateY(" + (transMat[1] - pos2) + "px)";
			}

		 else if((transMat[0]-pos1)>=xPanLim){
				manCont.style.webkitTransform="translateX(" + xPanLim + "px) translateY(" + transMat[1] + "px)";
			}
		else if ((transMat[0]-pos1)<=-xPanLim){
				manCont.style.webkitTransform="translateX(" + -xPanLim + "px) translateY(" + transMat[1] + "px)";
			}
		else if ((transMat[1]-pos2)<=-yPanLim){
				manCont.style.webkitTransform="translateX(" + transMat[0] + "px) translateY(" + -yPanLim + "px)";
			}
		else if ((transMat[1]-pos2)>=yPanLim){
				manCont.style.webkitTransform="translateX(" + transMat[0] + "px) translateY(" + yPanLim + "px)";
			}

	  }

	  function closeDragElement() {
		 // stop moving when mouse button is released:
		// document.onmouseup = null;
		 //document.onmousemove = null;
		 document.removeEventListener("mouseup",closeDragElement);
		 document.removeEventListener("mousemove",elementDrag);
		 //document.removeEventListener("touchend",closeDragElement);
		 //document.removeEventListener("touchmove",elementDrag);
		 
		 elmnt.classList.remove('notransition');
	  }
	}

}

