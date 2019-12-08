$('body').append('<form id="rtEditBS" class="position-absolute border p-2" style="background:purple;display:none;">'+
'<div class="form-row">'+
'<p id="rtEditBS_getPath"></p>'+
'<div class="input-group mb-3 input-group-sm">'+
'<div class="input-group-prepend">'+
'<span class="input-group-text">class=</span>'+
'</div>'+
'<input id="rtEditBS_input_class" type="text" class="form-control m-1" value=""/>'+
'</div>'+
'<div class="input-group mb-3 input-group-sm">'+
'<div class="input-group-prepend">'+
'<span class="input-group-text">style=</span>'+
'</div>'+
'<input id="rtEditBS_input_style" type="text" class="form-control m-1" value=""/>'+
'</div>'+
'<button id="rtEditBS_update" type="button" class="btn btn-sm btn-success m-1 float-right">Update</button>'+
'<button id="rtEditBS_close" type="button" class="btn btn-sm btn-warning m-1 float-right">Close</button>'+
'</div>'+
'<div id="rtEditBS_history" class="form-row"></row>'+
'</form>');
var mouseX;
var mouseY;
var $target;
var changes = [];

$(document).mousemove( function(e) {
   mouseX = e.pageX; 
   mouseY = e.pageY;
});  

$(document).on('contextmenu',function(e){
    $target = $(e.target);
    saveState();
    e.preventDefault();
})

function saveState(){
    var selector = $target.getPath();
    var classList = $target.attr('class') || '';
    var styleList = $target.attr('style') || '';
    $('#rtEditBS_getPath').html(selector);
    $('#rtEditBS_input_class').val(classList);
    $('#rtEditBS_input_style').val(styleList);
    $('#rtEditBS').css({'top':mouseY,'left':mouseX}).show();
    var index = inArray(changes,selector,'selector');
    if(index===-1) {
        changes.push({selector:selector,before:{classList:classList,styleList:styleList}});
    } else {
        changes[index].after={classList:classList,styleList:styleList};
    }
    updateHistory();
}

function updateHistory(){
    var history = '<div class="container">';
    for (let i = 0; i < changes.length; i++) {
        const change = changes[i];
        history += '<div class="row m-3" style="background:pink;">';
        history += '<div class="col-12 text-center" style="background:white;color:black;">'+change.selector+'</div>';
        history += '</div>';
        history += '<div class="row m-3" style="background:pink;">';
        history += '<div class="col">'+change.before.classList+'</div>';
        history += '<div class="col">'+change.before.styleList+'</div>';
        history += '</div>';
        if(change.after) {
            history += '<div class="row m-3" style="background:lightgreen;">';
            history += '<div class="col">'+change.after.classList+'</div>';
            history += '<div class="col">'+change.after.styleList+'</div>';
            history += '</div>';
        }
        history += '</div>';
    }
    history += '</div>';
    $('#rtEditBS_history').html(history);
}

$('#rtEditBS_input_class').on('change',function(){
    $target.attr('class', $('#rtEditBS_input_class').val());
    saveState()
});

$('#rtEditBS_input_style').on('change',function(){
    $target.attr('style', $('#rtEditBS_input_style').val());
    saveState()
});

$('#rtEditBS_close').off('click').on('click',function(){
    $('#rtEditBS').hide();
});

$('#rtEditBS_input').on('keypress',function(e) {
    if(e.which == 13) {
        $('#rtEditBS_update').trigger('click');
    }
});

function inArray(array, search, key) {
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        if(key) element = element[key];
        if(element==search){
            return i;
        } 
    }
    return -1;
}