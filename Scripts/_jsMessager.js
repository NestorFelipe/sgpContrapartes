var _accionFuntion = function () { };
var iconWarning = '<span class="glyphicon glyphicon-exclamation-sign iconWarning" aria-hidden="true"></span>';
var iconError = '<span class="glyphicon glyphicon-remove-sign iconError" aria-hidden="true"></span>';
var iconSuccess = '<span class="glyphicon glyphicon-ok-sign iconSuccess" aria-hidden="true"></span>';
var iconNoData = '<span class="glyphicon glyphicon-info-sign iconNoData" aria-hidden="true"></span>';

String.prototype._killSpace = function () {
    return this.replace(/\s/g, '').trim().toUpperCase();
};

String.prototype._formatStr = function () {
    var str = this.trim().replace(/\s+/g, ' ').toUpperCase();
    return str
}

$(function () {
    
    if (!localStorage.Passport && location.pathname != "/" && location.pathname != "/SEG/index") {
        location = "http://" + location.host;
        return false;
    }

    //Metodo que muestra un mensaje en pantalla segun tipo de respuesta ResponseType
    _MessageShow = function (Mensaje, Tipo) {

        $("#_divIconMessage").children().remove()
        $(".alert").fadeOut();
        $('#_txtMensajeModal').text('');
        $('#_txtMensajeModal').children().remove();

        if (typeof (Mensaje) == "string") {

            var res = Mensaje.match(/<\/\ul>/g);
            if (res != null) {
                $('#_txtMensajeModal').append(Mensaje);
            } else {
                $('#_txtMensajeModal').text(Mensaje);
            }
        } else {
            $('#_txtMensajeModal').append(Mensaje);
        }

        $("#_dlgInformacion").modal('show');

        if (Tipo == ResponseType.Success) {

            $("#_divIconMessage").append(iconSuccess);
            $("#_dlgInformacion").children('.modal-dialog')
                .children('.modal-content')
                .children('.modal-header').css("-webkit-transition", "all 0.6s ease")
            .css("backgroundColor", "#dff0d8")
            .css("-moz-transition", "all 0.6s ease")
            .css("-o-transition", "all 0.6s ease")
            .css("-ms-transition", "all 0.6s ease");


            $('#msgSucc').css("-webkit-transition", "all 0.6s ease")
                .fadeIn()
            .css("backgroundColor", "#dff0d8")
            .css("-moz-transition", "all 0.6s ease")
            .css("-o-transition", "all 0.6s ease")
            .css("-ms-transition", "all 0.6s ease")
            .css("backgroundColor", '#dff0d8').delay(1000).queue(function () {
                $(this).css("backgroundColor", "#337AB7");
                $(this).dequeue();
            });

        } else if (Tipo == ResponseType.NoData) {

            $("#_divIconMessage").append(iconNoData);

            $("#_dlgInformacion").children('.modal-dialog')
            .children('.modal-content')
            .children('.modal-header').css("-webkit-transition", "all 0.6s ease")
            .css("backgroundColor", "#d9edf7")
            .css("-moz-transition", "all 0.6s ease")
            .css("-o-transition", "all 0.6s ease")
            .css("-ms-transition", "all 0.6s ease");

            $('#msgInfo').css("-webkit-transition", "all 0.6s ease")
                .fadeIn()
            .css("backgroundColor", "#d9edf7")
            .css("-moz-transition", "all 0.6s ease")
            .css("-o-transition", "all 0.6s ease")
            .css("-ms-transition", "all 0.6s ease")
            .css("backgroundColor", '#d9edf7').delay(1000).queue(function () {
                $(this).css("backgroundColor", "#337AB7");
                $(this).dequeue(); //Prevents box from holding color with no fadeOut on second click.
            });

        } else if (Tipo == ResponseType.Error) {

            $("#_divIconMessage").append(iconError);
            $("#_dlgInformacion").children('.modal-dialog')
            .children('.modal-content')
            .children('.modal-header').css("-webkit-transition", "all 0.6s ease")
            .css("backgroundColor", "#f2dede")
            .css("-moz-transition", "all 0.6s ease")
            .css("-o-transition", "all 0.6s ease")
            .css("-ms-transition", "all 0.6s ease");

            $('#msgError').css("-webkit-transition", "all 0.6s ease")
                .fadeIn()
            .css("backgroundColor", "#f2dede")
            .css("-moz-transition", "all 0.6s ease")
            .css("-o-transition", "all 0.6s ease")
            .css("-ms-transition", "all 0.6s ease")
            .css("backgroundColor", '#f2dede').delay(1000).queue(function () {
                $(this).css("backgroundColor", "#337AB7");
                $(this).dequeue(); //Prevents box from holding color with no fadeOut on second click.
            });
        } else if (Tipo = ResponseType.Warning) {

            $("#_divIconMessage").append(iconWarning);
            $("#_dlgInformacion").children('.modal-dialog')
            .children('.modal-content')
            .children('.modal-header').css("-webkit-transition", "all 0.6s ease")
            .css("backgroundColor", "#fcf8e3")
            .css("-moz-transition", "all 0.6s ease")
            .css("-o-transition", "all 0.6s ease")
            .css("-ms-transition", "all 0.6s ease");

            $('#msgWarning').css("-webkit-transition", "all 0.6s ease")
                .fadeIn()
            .css("backgroundColor", "#fcf8e3")
            .css("-moz-transition", "all 0.6s ease")
            .css("-o-transition", "all 0.6s ease")
            .css("-ms-transition", "all 0.6s ease")
            .css("backgroundColor", '#fcf8e3').delay(1000).queue(function () {
                $(this).css("backgroundColor", "#337AB7");
                $(this).dequeue(); //Prevents box from holding color with no fadeOut on second click.
            });
        }
    }

    //Metodo que oculta el mensaje de alerta en la barra superior
    _MessageHide = function () {
        $("._mensajeAlerta").fadeOut();
    }

    //Método que muestra mensaje de confirmación y ejecuta una accion en caso sea afirmativa
    _MessageConfirm = function (Mensaje, Accion) {

        $("#_txtMensajeConfirma").text('');
        $("#_txtMensajeConfirma").text(Mensaje);
        $("#_modalConfirm").modal('show');

        _accionFuntion = null;
        if (typeof (Accion) == "function") {            
            _accionFuntion = Accion;
        }
    }

    //Metodo que valida un formulario en caso de ser error lanza el cuadro de alerta con las validaciones
    $.fn._Valida = function () {

        var form = this;
        form.validator('validate');
        var erros = form.find('.glyphicon-remove').siblings('input, select').length
        if (erros > 0) {
            var messaje = "<ul>";
            form.find('.glyphicon-remove').siblings('input, select').each(function (i) {
                var texto = '';

                if (typeof ($(this).attr("title")) == "undefined") {
                    texto = "El campo <strong>" + $(this).parent().siblings('.DivCeldaEtiqueta').text().trim().replace(':', '').trim() + "</strong> es obligatorio"
                } else {
                    texto = $(this).attr("title")
                }
                messaje = messaje + "<li>" + texto + "</li>";
            });
            messaje = messaje + "</ul>"
            _MessageShow($.parseHTML(messaje), ResponseType.Error)
            return false;
        } else {
            return true;
        }
    }

    $('._msgAlerta').on("click", function () {

        var tipo = $(this).parent('div').attr('tipo');
        var contenido;

        if ($('#_txtMensajeModal').children().length > 0) {
            contenido = $('#_txtMensajeModal').children();
        } else {
            contenido = $('#_txtMensajeModal').text();
        }

        _MessageShow(contenido, parseInt(tipo));


    })

    $(".__mnuActive").each(function (i) {
        $(this).removeClass('active');
        if ($(this).children('a').attr('href').toLowerCase() == location.pathname.toLowerCase()) {
            $(this).addClass('active');
        }
    })

    $("#_btnEjecutaConfirm").on("click", function () {
        if (typeof (_accionFuntion) == "function") {
            $("#_modalConfirm").modal('hide');
            _accionFuntion()
        }
    })

    $('#jqxLoader').jqxLoader({theme: 'energyblue', width: 200, height: 50, text : "Espere por favor...", isModal : true });
    
    $('[data-toggle="tooltip"]').tooltip();

    $.fn._center = function () {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                                    $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                                                    $(window).scrollLeft()) + "px");
        return this;
    }


    

});
