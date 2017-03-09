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
    $("#language").on("change", function() {
        switch ($(this).val()) {
            case "php":
                ModelWriter.defaultPropertyTypes = 
                    ["bool"
                    ,"boolean"
                    ,"int"
                    ,"float"
                    ,"double"
                    ,"long"
                    ,"string"
                    ,"array"
                    ,"object"];
            break;
        }
    }).trigger("change");
    $("#types").on("change", function () {
        $("input#add-type").val($(this).val());
    });
    $("#form-model-writer").on("change", "select[name='arg_type[]']", function () {
        if ($(this).val() != "") return;
        if ($(".args").length > 1){
            $(this).parent().remove();
        } else {
            modal_errors('You must have at least one model property!');
        }
    });
    ModelWriter.populatePropertyTypes();
});
var ModelWriter = {};
function remove_model_property(ele){
    if ($(".args").length > 1){
        ele.remove();
    } else {
        modal_errors('You must have at least one model property!');
    }
}

ModelWriter.defaultPropertyTypes = ["bool"
                                   ,"boolean"
                                   ,"int"
                                   ,"float"
                                   ,"double"
                                   ,"long"
                                   ,"string"
                                   ,"array"
                                   ,"object"];
                                   
ModelWriter.customPropertyTypes = [];

ModelWriter.addPropertyType = function() {
    var cTypes = ModelWriter.customPropertyTypes;
    var dTypes = ModelWriter.defaultPropertyTypes;
    var name = $("input#add-type").val();
    if (cTypes.indexOf(name) != -1 || dTypes.indexOf(name) != -1) {
        modal_errors("This property type already exists!");
        return;
    }
    cTypes.push(name);
    ModelWriter.populatePropertyTypes();
}

ModelWriter.removePropertyType = function() {
    var cTypes = ModelWriter.customPropertyTypes;
    var dTypes = ModelWriter.defaultPropertyTypes;
    var name = $("input#add-type").val();
    if (dTypes.indexOf(name) != -1) {
        modal_errors("Cannot remove default property type!");
        return;
    }
    if (cTypes.indexOf(name) == -1) {
        modal_errors("Cannot remove property type that does not exist.");
        return;
    }
    cTypes.splice(cTypes.indexOf(name),1);
    ModelWriter.populatePropertyTypes();
}

ModelWriter.populatePropertyTypes = function() {
    var selects = $("select[name='types'], select[name='arg_type[]']");
    var mainOption1 = "<option value='' disabled selected>Property Types</option>";
    var otherOption1 = "<option value='' disabled selected>Property Type</option>";
    var typeList = "";
    for (var type of ModelWriter.defaultPropertyTypes) {
        typeList += "<option value='"+type+"'>"+type+"</option>";
    }
    typeList += "<option value='' disabled>-------</option>";
    for (var type of ModelWriter.customPropertyTypes) {
        typeList += "<option value='"+type+"'>"+type+"</option>";
    }
    selects.empty();
    $("select[name='types']").append(mainOption1);
    $("select[name='arg_type[]']").append(otherOption1);
    selects.append(typeList);
    var removeProperty = "<option value='' disabled>-------</option>";
    removeProperty += "<option value=''>Remove Model Property</option>";
    $("select[name='arg_type[]']").append(removeProperty);
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