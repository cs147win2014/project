$(document).ready(function(){
    
    $('#backBtn').click(backToCourseInput);
    $('#finishBtn').click(backToIndex);
    
    var next = 1;
    $(".add-more").click(function(e){
        e.preventDefault();
        // the div element selectors
        var addto = "#field" + next;
        var addRemove = "#field" + (next);

        next = next + 1;
        $("#numFields").attr("value", next);
        console.log("just added, " + next);

        var newIn = '<div id="field' + next + '" class="col-xs-9 col-md-4"><br>' + 
                        '<div class="row">' + 
                            '<div class="col-md-6 col-xs-6">' + 
                                '<input autocomplete="off" placeholder="Ex: Homework" class="form-control col-xs-4 col-md-4" name="type' + next + '" type="text"></div>' + 
                            '<div class="col-md-6 col-xs-6">' + 
                                '<input autocomplete="off" placeholder="Ex: 0.25" class="form-control col-xs-4 col-md-4" name="weighting' + next + '" type="text"></div></div>' + 
                    '</div>';
        var newInput = $(newIn);

        var removeBtn = '<div id="remove' + (next - 1) + '" class="col-xs-3 col-md-4 removeButton"><br><button class="btn btn-danger remove-me" ><i class="glyphicon glyphicon-minus"></i></button></div></div><div id="field" class="input-append row">';
        var removeButton = $(removeBtn);

        $(addto).after(newInput);
        $(addRemove).after(removeButton);
        $("#field" + next).attr('data-source',$(addto).attr('data-source'));
        $("#count").val(next);  
        
        $('.remove-me').click(function(e){
            //alert('clicked!');
            e.preventDefault();
            var $divToRemove = $(this).closest('div'); //.find(".disabled");
            var fieldNum = ($divToRemove).attr('id').charAt(($divToRemove).attr('id').length-1);
            var fieldID = "#field" + fieldNum;
            ($divToRemove).remove();
            $(fieldID).remove();
            next = next-1;
            $("#numFields").attr("value", next);
            console.log('just deleted, ' + next);
        });
    });
});


function backToCourseInput(e) {
    e.preventDefault();
    window.location.href = "javascript:history.back();";
}

function backToIndex(e) {
    e.preventDefault();
    window.location.href = "/index";
}
/*function addAssignmentTypesToSyllabus(e) {
    e.preventDefault();
    
    $.post("/editCourse",callBack);
}

function callBack(result) {
    alert("what am i doing");
}*/
