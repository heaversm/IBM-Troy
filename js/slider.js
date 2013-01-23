$(function() {
	
	var optSize = $('.option').size() -1;
	var optValArr = []; //stores the different positions at which the slider should stop
	
	$(".option").each(function (i) {
		var optVal = (parseInt($(this).attr('data-count'))/optSize)*100;
		optValArr.push(optVal);
	});
	
	var slider = $( ".slider" ).slider({
		value:0,
		min: 0,
		max: 100,
		animate: true,
		stop: slideStop
	});
	
	function slideStop( event, ui ) {
		var stopVal = ui.value;
		var diff=101;
	    var optVal =0;
	    var optValIndex = 0;

	    for(var i =0; i < optValArr.length; i++){
	        var tmpDiff = Math.abs(stopVal - optValArr[i]);
	        if(tmpDiff < diff){
	           diff=tmpDiff;
	           optVal = optValArr[i];
	           optValIndex = i;
	        }
	    }
        
		animateSlider(optVal, optValIndex);
	}
	
	$('.option').click(function(){
		var optVal = (parseInt($(this).attr('data-count'))/optSize)*100;
		animateSlider(optVal, $(this).attr('data-count'));
	})
	
	function animateSlider(optVal, optValIndex){
	    
	    slider.trigger({
	        type: "stop.constrained",
	        constrainedPosition: parseInt(optVal),
	        constrainedIndex: parseInt(optValIndex)
	    });
		slider.slider('value', optVal);
		    return false;
	}
	
});
