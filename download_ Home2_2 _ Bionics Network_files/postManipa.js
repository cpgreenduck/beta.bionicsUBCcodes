/*var postCats=document.querySelectorAll(".postCatContainer:not(.l2)");
var postCatHeadlines=document.querySelectorAll(".postCatHeadline:not(.l2)");
var postCatActivators=[];
*/


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

var l1=new postCatSeries(".postCatContainer:not(.l2)",".postCatHeadline:not(.l2)");
var l2=new postCatSeries(".postCatContainer.l2",".postCatHeadline.l2");


AOS.init();

