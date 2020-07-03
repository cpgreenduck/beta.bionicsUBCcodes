function is_IE() {
  return (window.navigator.userAgent.match(/MSIE|Trident/) !== null);
}

if (is_IE()==false){

	/*jshint esversion: 6 */
	let postCatNav=document.querySelector(".postCatNav");
	var postCats=document.querySelectorAll(".postCatContainer");
	var postCatHeadlines=document.querySelectorAll(".postCatHeadline");
	var postCatActivators=[];

	postCatNav.style.display="block";

	var link = document.createElement( "link" );
	link.href = "https://unpkg.com/aos@2.3.1/dist/aos.css";
	link.type = "text/css";
	link.rel = "stylesheet";
	link.media = "screen,print";
	document.getElementsByTagName( "head" )[0].appendChild( link );
	console.log(link);

	class postCatActivator{
		activate(){
			for (let step1=0;step1<postCats.length;step1++){
					postCats[step1].classList.remove("expanded");
		   		postCatHeadlines[step1].classList.remove("active");
			}
			this.postCat.classList.add("expanded");
		 	this.postCatHeadline.classList.add("active");
		 	setTimeout(AOS.init,1000);
		}
			constructor(step,postCat,postCatHeadline){
			this.index=step;
			this.postCat=postCat;
			this.postCatHeadline=postCatHeadline;
			var self=this;
			this.postCatHeadline.addEventListener("click",function(evt) {self.activate();});

		}
	}

	function getQueryVariable(variable)
	{
		 var query = window.location.search.substring(1);
		 var vars = query.split("&");
		 for (var i=0;i<vars.length;i++) {
		         var pair = vars[i].split("=");
		         if(pair[0] == variable){return pair[1];}
		 }
		 return(false);
	}

	for (let step=0;step<postCats.length;step++){
		postCatActivators[step]=new postCatActivator(step,postCats[step],postCatHeadlines[step]);
	}
	var v1=getQueryVariable("activate");
	var n1=parseInt(v1);
	console.log(n1);
	window.onload=function(){
		console.log(v1);
		if(postCatActivators[0]){
			if (n1&&postCatActivators[n1]) { //if id not empty
				postCatActivators[n1].activate();
			}
			else{
				postCatActivators[0].activate();
			}
		}
	};
	AOS.init();
	
}
