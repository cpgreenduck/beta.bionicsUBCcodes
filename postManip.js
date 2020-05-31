var postCats=document.querySelectorAll(".postCatContainer");
var postCatHeadlines=document.querySelectorAll(".postCatHeadline");
var postCatActivators=[];


class postCatActivator{
	activate(){
		for (let step1=0;step1<postCats.length;step1++){
				postCats[step1].classList.remove("expanded");
      		postCatHeadlines[step1].classList.remove("active");
		}
		this.postCat.classList.add("expanded");
    	this.postCatHeadline.classList.add("active");
    	setTimeout(function(){ AOS.refresh();}, 500);
    	console.log('refreshed Aos');
	}
		constructor(step,postCat,postCatHeadline){
		this.index=step;
		this.postCat=postCat;
		this.postCatHeadline=postCatHeadline;
		var self=this;
		this.postCatHeadline.addEventListener("click",function(evt) {self.activate();});

	}
}




for (let step=0;step<postCats.length;step++){
	postCatActivators[step]=new postCatActivator(step,postCats[step],postCatHeadlines[step]);

}

AOS.init();

