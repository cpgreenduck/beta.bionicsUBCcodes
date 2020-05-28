var container1=document.querySelector(".container1");
var clickHover=document.querySelector("#clickHover");
container1.addEventListener("mouseenter",function(event){clickHover.style.opacity="0";
	clickHover.style.zIndex="-2";console.log("enter");clickHover.style.webkitTransform="scale(1.5)";});
container1.addEventListener("mouseleave",function(event){clickHover.style.opacity="1";
	clickHover.style.zIndex="10";console.log("enter");clickHover.style.webkitTransform="scale(1)";});
	

