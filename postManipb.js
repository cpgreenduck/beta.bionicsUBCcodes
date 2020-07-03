function is_IE() {
  return (window.navigator.userAgent.match(/MSIE|Trident/) !== null);
}

if (is_IE()==false){
	/*var postCats=document.querySelectorAll(".postCatContainer:not(.l2)");
	var postCatHeadlines=document.querySelectorAll(".postCatHeadline:not(.l2)");
	var postCatActivators=[];
	*/
	var link = document.createElement( "link" );
	link.href = "https://unpkg.com/aos@2.3.1/dist/aos.css";
	link.type = "text/css";
	link.rel = "stylesheet";
	link.media = "screen,print";
	document.getElementsByTagName( "head" )[0].appendChild( link );
	console.log(link);

	let postCatNav=document.querySelector(".postCatNav");
	postCatNav.style.display="block";


	class postCatActivator{
		activate(){
		
			for (let step1=0;step1<this.postCatSeries.postCats.length;step1++){
					this.postCatSeries.postCats[step1].classList.remove("expanded");
		   		this.postCatSeries.postCatHeadlines[step1].classList.remove("active");
			}
			this.postCat.classList.add("expanded");
		 	this.postCatHeadline.classList.add("active");
		 	setTimeout(function(){ AOS.refresh();}, 500);
		 	console.log('refreshed Aos');
		}
			constructor(postCatSeries,step,postCat,postCatHeadline){
				this.index=step;
				this.postCatSeries=postCatSeries;
				this.postCat=postCat;
				this.postCatHeadline=postCatHeadline;
				var self=this;
				this.postCatHeadline.addEventListener("click",function(evt) {self.activate();});
		}
	}

	class postCatSeries{

		constructor(selectorCont,selectorHeadline){
			this.postCats=document.querySelectorAll(selectorCont);
			this.postCatHeadlines=document.querySelectorAll(selectorHeadline);
			this.postCatActivators=[];
			for (let step=0;step<this.postCats.length;step++){	
				this.postCatActivators[step]=new postCatActivator(this,step,this.postCats[step],this.postCatHeadlines[step]);

			}
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

	var l1=new postCatSeries(".postCatContainer:not(.l2)",".postCatHeadline:not(.l2)");
	var l2=new postCatSeries(".postCatContainer.l2",".postCatHeadline.l2");

	var v1=getQueryVariable("activate");
	var n1=parseInt(v1);
	console.log(n1);
	window.onload=function(){
		console.log(v1);
		if(l1.postCatActivators[0]){
			if (n1&&l1.postCatActivators[n1]){
				l1.postCatActivators[n1].activate();
				console.log('trying to activate number');
			}
			else{
				l1.postCatActivators[0].activate();
			}
		}
	};

	AOS.init();
}
