(function($){
		var timer=null;
		var index=0;
		var moveWidth=$("#box2").width();
		//console.log(moveWidth)
		var uLength=$("#topnav li").length;
		//定时器自动轮播图片
		timer=setInterval(moveT,1000);
		function moveT(){
			if(index==uLength){
				index=0;
				creatU()
			}else{
				picMove(index);
				index++;
			};
			
		};
		
		//改变scrollUl的left值以及更换topnav li的背景图；
		function picMove(index){
			$("#scrollUl").stop(true,false).animate({
				left:-index*moveWidth
				
			});
			$("#topnav li").removeClass().eq(index).addClass("backColor");
			//console.log(left)
		};
		//添加已及移除创建的LI
		function creatU(){
			$("#scrollUl li").slice(0,4).clone().appendTo("#scrollUl");
			$("#scrollUl").stop(true).animate({
				left:-moveWidth*uLength
			},300,function(){
				$("#scrollUl").css("left",0)
				$("#scrollUl li").slice(12,16).remove()
			})
		};
		//放在IUPUT box2上清除定时器
		$("#box1 input").add("#box2").add("#topnav").mouseover(function(){
			clearInterval(timer);
		}).mouseout(function(){
			clearInterval(timer);
			timer=setInterval(moveT,1000);
		})
		//点击左右按钮切换图片;
		$("#leftbtn").click(function(){
			index--;
			if(index<1){
				index=0;
				//creatU()
			}
			picMove(index);
		})
		$("#rightbtn").click(function(){
			//index=1
			index++;
			if(index>2){
				index=2;
				//creatU()
			}
			//num++;
				picMove(index);
				
			console.log(index)
		})
		$("#topnav li").mouseover(function(){
			index=$(this).index();
			 picMove(index)
		})
		/**
		 * AJAX调取JSON文件的数据
		 */
		//AJAX处理调取数据；
		$.ajax({
		type:"get",
		url:"js/json.json",
		async:true,
		success:function(data,status){
			//alert(1)
			var arrE=data.data;
			//console.log(arrE)
			dealArray(arrE);
		},
		error:function(xhr,status,error){
			alert(status)
		}
	});
	//AJAX处理数据，并对其行出来
	function dealArray(arr){
		//alert(1);
		//遍历得到的数据，对其进行处理；
		var arrS=arr[0].src;
		$.each(arrS, function(i) {
			var src=arr[0].src[i];
			var cot=arr[1].conter[i];
			var sal=arr[2].sale[i];
			$("#scrollUl li").eq(i).append("<img src="+src+"/>")
			$("#scrollUl li").eq(i).append("<p>"+cot+"</p>")
			$("#scrollUl li").eq(i).append("<p>"+sal+"</p>")
			$("#scrollUl li").eq(i).css("height","340px")
			$("#box2").css("height","380px")
			$("#scrollUl").css("height","340px")
		});
	}
		
		






		
})(jQuery)
