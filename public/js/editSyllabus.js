$(document).ready(function(){
    var next = 1;

    $(".add-more").click(function(e){
        e.preventDefault();
        // the div element selectors
        var addto = "#field" + next;
        var addRemove = "#field" + (next);

        next = next + 1;
        $("#numFields").attr("value", next);

        var newIn = '<div id="field' + next + '" class="col-xs-8 col-md-8"><br><input autocomplete="off" placeholder="Ex: Homework, 0.25" class="form-control" name="field' + next + '" type="text"></div>';
        var newInput = $(newIn);

        var removeBtn = '<div id="remove' + (next - 1) + '" class="col-xs-4 col-md-4 removeButton"><br><button class="btn btn-danger remove-me" ><i class="glyphicon glyphicon-minus"></i></button></div></div><div id="field" class="input-append row">';
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
            });
    });
    

    
});
