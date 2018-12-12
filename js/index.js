var $pre_Scr_Pos_ = window.pageYOffset;

function appbar_Control(){
    var $curr_scr_pos_ = window.pageYOffset;
  //  console.log($pre_Scr_Pos_+" "+$curr_scr_pos_);
//	console.log("scrolling");
    if($pre_Scr_Pos_ < $curr_scr_pos_ || $curr_scr_pos_ > 5){
		$addClass($get('.appbar'),'scroll_down');
	}
	
	if($curr_scr_pos_ < 5){
		$removeClass($get('.appbar'),'scroll_down');
	}
}

window.onscroll = function(){
	appbar_Control();
}

ready(
function(){
 appbar_Control()
});