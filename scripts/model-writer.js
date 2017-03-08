$(document).ready(function(){
    $("#form-model-writer").on('submit', function(e){
        e.preventDefault();
        $.ajax({
            url: 'model-writer-ajax.php', 
            method: 'post',
            data: $("#form-model-writer").serialize(),
            success: function(result){
                $("#result").html(result);
            }
        });
    });
    
    $("#btn-add-model-property").on('click', function(){
        var ele = $(".args").first().clone();
        $(".args-container").append(ele);
    });
});
var ModelWriter = {};
ModelWriter.readForm = function() {
    var formArray = $("#form-model-writer").serialize().split("&");
    var formObject = {};
    var args = {};
    for (var i in formArray) {
        i = parseInt(i);
        var name = formArray[i].match(/^[^=]*/)[0]; //regex finds everything before the =.
        var value = formArray[i].match(/[^=]*$/)[0]; //regex finds everything after the =.
        if (name == "arg_name%5B%5D") {
            args[value] = {"type":formArray[i+1].match(/[^=]*$/)[0]};
            i++;
            continue;
        }
        formObject[name] = value;
    }
    var returnObject = {};
    returnObject.language = formObject.language;
    returnObject.company = formObject.company;
    returnObject.model = formObject.namespace;
    returnObject.namespace = formObject.model;
    returnObject.args = args;
    return returnObject;
}

function remove_model_property(ele){
    if ($(".args").length > 1){
        ele.remove();
    } else {
        modal_errors('You must have at least one model property!');
    }
}

function modal_errors(html){
    var modal_width = 340;
    if($(window).width() > 650){
        modal_width = 600;
    }
    $("#modal_errors").html(html).dialog({
        modal: true,
        title: 'Errors',
        width: modal_width,
        buttons: {
            Ok: function(){
                $(this).dialog("close");
            }
        }
    });
}