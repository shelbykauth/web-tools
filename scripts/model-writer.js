$(document).ready(function(){
    $("#form-model-writer").on('submit', function(e){
        e.preventDefault();
        /*
        $.ajax({
            url: 'model-writer-ajax.php', 
            method: 'post',
            data: $("#form-model-writer").serialize(),
            success: function(result){
                $("#result").html(result);
            }
        });
        */
        $("#result").html(ModelWriter.write());
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

ModelWriter.readForm = function()
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

ModelWriter.ucfirst = function(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

ModelWriter.write = function(isPlainText)
{
    var formData = ModelWriter.readForm();
    var language = formData.language;
    var company = formData.company;
    var model = formData.model;
    var namespace = formData.namespace;
    var args = formData.args;
    var output = "";
    var nl = "<br>";
    var sp = "&nbsp;";
    var tab = sp + sp + sp + sp;
    if (isPlainText) {
        nl = "\n\r";
        sp = " ";
        tab = "    ";
    }
    switch (language) {
        case "php":
            output = "/*" + nl
                   + sp + "* (c) " + company + nl
                   + sp + "*" + nl
                   + sp + "* For the full copyright and license information, please view the LICENSE" + nl
                   + sp + "* file that was distributed with this source code." + nl
                   + sp + "*/<br>" + nl
                   + sp + "namespace " + namespace + ";" + nl
                   + nl
                   + "/**" + nl
                   + sp + "* @author Marie Kauth <marie.kauth@gmail.com>" + nl
                   + sp + "*/" + nl
                   + "class " + model + nl
		           + "{";
            for (var arg of args) {
                var name = arg.name;
                var type = arg.type;
                output += nl
                        + tab + "/** @param " + type + " $" + name + " */" + nl
                        + tab + "private $" + name + ";" + nl
            }
            for (var arg of args) {
                var name = arg.name;
                var type = arg.type;
                output += nl
                        + tab + "/**" + nl
                        + tab + sp + "* @return " + type + nl
                        + tab + sp + "*/" + nl;
                output += tab + "public function"
                        + ((type === 'bool' || type === 'boolean') ? " is" : " get")
                        + ModelWriter.ucfirst(name) + "()" + nl;
                output += tab + "{" + nl
                        + tab + tab + "return $this->" + name + ";" + nl
                        + tab + "}" + nl
                        + nl
                        + tab + "/**" + nl
                        + tab + sp + "* @param " + type + " $" + name + nl
                        + tab + sp + "*/" + nl;
                output += tab + "public function"
                        + " set" 
                        + ModelWriter.ucfirst(name) + "($" + name + ")" + nl;
                output += tab + "{" + nl
                        + tab + tab + "$this->" + name + " = $" + name + ";" + nl
                        + tab + "}" + nl;
            }
            output += "}" + nl 
                    + nl;
        break;
        case "js":
        
        break;
        default:
            output = "Language Not Available!";
    }
    return output;
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

ModelWriter.addPropertyType = function()
{
    var cTypes = ModelWriter.customPropertyTypes;
    var dTypes = ModelWriter.defaultPropertyTypes;
    var name = $("input#add-type").val();
    if (cTypes.indexOf(name) != -1 || dTypes.indexOf(name) != -1) {
        modal_errors("This property type already exists!");
        return;
    }
    cTypes.push(name);
    ModelWriter.populatePropertyTypes();
    $("input#add-type").val("");
}

ModelWriter.removePropertyType = function()
{
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

ModelWriter.populatePropertyTypes = function()
{
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

function modal_errors(html)
{
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