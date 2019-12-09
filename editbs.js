$('body').append('<div id="rtEditBS" class="container position-absolute border p-3;" style="background:whitesmoke;display:none;">'+
    '<div class="form-row">'+
        '<p id="rtEditBS_getPath" class="col-12 text-center"></p>'+
        '<div class="input-group mx-3 input-group-sm">'+
            '<div class="input-group-prepend">'+
                '<span class="input-group-text text-right" style="width:50px">class=</span>'+
            '</div>'+
            '<input id="rtEditBS_input_class" type="text" class="form-control m-1" value=""/>'+
        '</div>'+
        '<div class="input-group mx-3 input-group-sm">'+
            '<div class="input-group-prepend">'+
                '<span class="input-group-text text-right" style="width:50px">style=</span>'+
            '</div>'+
            '<input id="rtEditBS_input_style" type="text" class="form-control m-1" value=""/>'+
        '</div>'+
    '</div>'+
    '<div class="row" style="width:100%;">'+
        '<div class="col-12">'+
            '<button id="rtEditBS_update" type="button" class="btn btn-sm btn-success m-1 float-right">Update</button>'+
            '<button id="rtEditBS_close" type="button" class="btn btn-sm btn-warning m-1 float-right">Close</button>'+
        '</div>'+
    '</div>'+
    '<div id="rtEditBS_history" class="row"></div>'+
'</div>');
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
    var classList = $target.attr('class');
    var styleList = $target.attr('style');
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
    var history = '<table class="table table-sm text-center small" style="width:100%;">';
    history += '<thead><tr>';
    history += '<th style="width:10%"></th>';
    history += '<th style="width:45%">before</th>';
    history += '<th style="width:45%">after</th>';
    history += '</tr></thead><tbody>';
    for (let i = 0; i < changes.length; i++) {
        const change = changes[i];
        let changeafterclassList = '';
        let changeafterstyleList = '';
        if(change.after) {
            changeafterclassList = change.after.classList;
            changeafterstyleList = change.after.styleList;
        }
        history += '<tr>';
        history +=  '<td class="text-left font-bold font-italic" colspan="3">'+change.selector+'</td>';
        history += '</tr>';
        history += '<tr>';
        history +=  '<td>class=</td>';
        history +=  '<td style="color:maroon;">'+change.before.classList+'</td>';
        history +=  '<td style="color:darkgreen;">'+changeafterclassList+'</td>';
        history += '</tr>';
        history += '<tr>';
        history +=  '<td>style=</td>';
        history +=  '<td style="color:maroon;">'+change.before.styleList+'</td>';
        history +=  '<td style="color:darkgreen;">'+changeafterstyleList+'</td>';
        history += '</tr>';
    }
    history += '</tbody></table>';
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