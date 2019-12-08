$('body').append('<div id="rtEditBS" class="position-absolute border p-2" style="background:purple;display:none;">'+
'<input id="rtEditBS_input" type="text" class="form-control m-1" value=""/>'+
'<button id="rtEditBS_update" type="button" class="btn btn-sm btn-success m-1">Update</button>'+
'<button id="rtEditBS_close" type="button" class="btn btn-sm btn-warning m-1">Close</button>'+
'</div>');
var mouseX;
var mouseY;
var $target;

$(document).mousemove( function(e) {
   mouseX = e.pageX; 
   mouseY = e.pageY;
});  

$(document).on('contextmenu',function(e){
    $target = $(e.target) 
    var classList = $target.attr('class');
    $('#rtEditBS').css({'top':mouseY,'left':mouseX}).show().find('#rtEditBS_input').val(classList);
    e.preventDefault();
})

$('#rtEditBS_update').off('click').on('click',function(){
    $target.attr('class', $('#rtEditBS_input').val());
});

$('#rtEditBS_close').off('click').on('click',function(){
    $('#rtEditBS').hide();
});

$('#rtEditBS_input').on('keypress',function(e) {
    if(e.which == 13) {
        $('#rtEditBS_update').trigger('click');
    }
});