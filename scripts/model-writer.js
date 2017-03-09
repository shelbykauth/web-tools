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

ModelWriter.formGetter = function()
{
    var form = $("form#form-model-writer");
    var returnObject = {};
    returnObject.language = form.find("#language").val();
    returnObject.company = form.find("#company").val();
    returnObject.namespace = form.find("#namespace").val();
    returnObject.model = form.find("#model").val();
    returnObject.args = [];
    var args = $(".form-group.args");
    var names = $("[name='arg_name[]'");
    var types = $("[name='arg_type[]'");
    console.log(args);
    for (var i=0; i < args.length; i++) {
        var newArg = {};
        newArg.name = names[i].value;
        newArg.type = types[i].value;
        returnObject.args.push(newArg);
    }
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