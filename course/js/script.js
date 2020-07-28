	var count = 0;
	    correct = 0;
	    incorrect = 0;
	    dropped = false;
		boxCenterXOffset = 5;
		boxCenterYOffset = 10;
	var dropitem;
	var drag;
	$('.answer-line').hide(); 
		 
	$('#iframe2, #iframe3, #showhideContainer1').hide();
	$('#hideContainer').show();
	
	$('#mainStart').click(function(){
		$('#startContainer').hide();	 			
	})
	
	$('.drag-box').mouseover(function(){
	})
		
	$('.dragItem').draggable({ delay: 0, distance: 0 },{
		stack: 	'.dragItem',
		 revert: function(event, ui){
			$('.line').hide();		
			$(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            return !event;			
		} ,		
		containment: '.fix_area', 
		drag: function(event, ui) {
			$('.line').show();
			$('#show').mouseover(function(){ $('#show-img').attr('src','./images/show-2.png');})
			      .mouseout(function(){ $('#show-img').attr('src','./images/show-1.png'); })
				  .css('cursor', 'pointer');
			$('#show').css('opacity', '1');	
			var a = $(this).attr('id');
			var b = $(this).parent('.boxes').attr('id');
			var x1 = $('#' +a).offset().left + boxCenterXOffset;
			var y1 = $('#' +a).offset().top + boxCenterYOffset;
			var x2 = $('#' +b).offset().left + boxCenterXOffset;
			var y2 = $('#' +b).offset().top + boxCenterYOffset;

			var hypotenuse = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
			var angle = Math.atan2((y1-y2), (x1-x2)) *  (180/Math.PI);
			if(angle >= 90 && angle < 180){
				y1 = y1 - (y1-y2);
			}
			if(angle > 0 && angle < 90){
				x1 = x1 - (x1-x2);
				y1 = y1 - (y1-y2);
			}
			if(angle <= 0 && angle > -90){
				x1 = x1 - (x1-x2);
			}

			$(".line").queue(function(){
				$(this).offset({top: y1 + 6, left: x1 + 12});
				$(this).dequeue();
			}).queue(function(){
				$(this).width(hypotenuse);
				$(this).dequeue();
			}).queue(function(){
				$(this).rotate(angle);
				$(this).dequeue();
			});
		}
	});
	
	$('.drop-box').droppable({			
		tolerance: 'pointer', 
		drop: function(ev,ui)
		{
			if($(ui.draggable).hasClass('Vijayawada') && $(this).hasClass('Vijayawada') || $(ui.draggable).hasClass('Mumbai') && $(this).hasClass('Mumbai') || $(ui.draggable).hasClass('Nagpur') && $(this).hasClass('Nagpur') || $(ui.draggable).hasClass('Bhagalpur') && $(this).hasClass('Bhagalpur') || $(ui.draggable).hasClass('Srinagar') && $(this).hasClass('Srinagar') || $(ui.draggable).hasClass('Panipat') && $(this).hasClass('Panipat') || $(ui.draggable).hasClass('Ahmedabad') && $(this).hasClass('Ahmedabad'))
			{
				dropitem = $(ui.draggable);							
					$(this).append(dropitem);
					$(ui.draggable).addClass('dropped');
					$(ui.draggable).css({                
									'top': '0vmin',
									'left': '0vmin',
									'margin': '-5.7vmin -0.7vmin',
									'z-index': '1',
									'background-color': '#13cf13',
									'cursor': 'default'
								});	
					$(ui.draggable).children('.inner-drag-box').css({                
									'background-color': '#2e9b49'
								});	
					ui.draggable.draggable({disabled: true});
					
					var a = $(ui.draggable).attr('id');
					var number = a.substr(a.lastIndexOf('-') + 1);
					$('#answer-'+number).show();
					$('.line').hide();
					
					count++;
					correct++;
					corr();
			}
			else
			{
				$(ui.draggable).draggable('option','revert',function(event, ui){
					$('.line').hide();		
						$(this).data("uiDraggable").originalPosition = {
							top : 0,
							left : 0
						},
						$(this).animate({
							top: '0vmin',
							left: '0vmin'
						}, 800);
					return !event;
				});
				dropped=false;
				incorrect++;
				count++;
				incorr();
			}
		}
	});		
	
	$(audio1).on('ended', function(){     
		$('#hideContainer').hide();
	});
		
	function corr(){		
		$('#hideContainer').show();
		$('#iframe2').show();
		$('#iframe1, #iframe3').hide();
		setTimeout(function(){
			$('#iframe2').hide();
			$('#iframe1').show();
		}, 3500);
		$().on('ended', function(){
			$('#hideContainer').hide();
		});
		if(correct == 6){
			$().on('ended', function(){
				$('#mainContainer').hide();
				$('#resultContainer').show();		
				$('#totalCount').text(count);
				$('#totalCorrect').text(correct);
				$('#totalIncorrect').text(incorrect);
			})
		}
	}	
	
	function incorr(){
		$('#hideContainer').show();
		$('#iframe3').show();
		$('#iframe1, #iframe2').hide();
		setTimeout(function(){
			$('#iframe3').hide();
			$('#iframe1').show();
		}, 3000);
		$().on('ended', function(){     
			$('#hideContainer').hide();		
						
		});  
	}    	

	$('#refresh, #result-refresh').click(function(){
		location.reload();
	});
	
	$('#refresh').mouseover(function(){ $('#refresh-img').attr('src','./images/refresh-2.png');})
			     .mouseout(function(){ $('#refresh-img').attr('src','./images/refresh-1.png'); })	

	$('#refresh1, #result-refresh').click(function(){
		location.reload();
	});
	
	$('#refresh1').mouseover(function(){ $('#refresh-img1').attr('src','./images/refresh-2.png');})
			     .mouseout(function(){ $('#refresh-img1').attr('src','./images/refresh-1.png'); })					 
	
	$('#show').click(function(){
		$('#showhideContainer1').show();
		$('#show').css('opacity', '0.5');
		$('#answer-box1').show();
		$('#answer-box2').show();
		$('#answer-box3').show();
		$('#answer-box4').show();
		$('#answer-box5').show();
		$('#answer-box6').show();
		$('.dragItem').hide();
		$('.drop-boxes').css('background-color', '#2e9b49');
		$('.drop-boxes').css('border', 	'0.2vmin solid #f2f6f7');
		$('.drop-box').css('background-color', '#13cf13');		
	});

