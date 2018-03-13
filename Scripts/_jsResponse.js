
var _fncCallback = function () { };
var ResponseType =
       {
           Success: 1,
           Warning: 2,
           Error: 3,
           NoData: 4
       }

var State = {
    None: 0,
    Insert: 1,
    Update: 2,
    Delete: 3,
    Executed: 4,
    Selected: 5,
    Flag1: 6,
    Flag2: 7,
    Flag3: 8
}

$(function () {

    $.ajaxSetup({
        beforeSend: function (hxr) {
            _ShowLoading();
        },
        complete: function (hxr) {
            _HideLoading();
        },
        error: function (hxr) {
            _HideLoading();
            _MessageShow(hxr.responseJSON.Message, ResponseType.Error)
        }
    });

    __getUrlApi = function () {
        var urlapi = "";
        if (location.hostname == "localhost") {
            urlapi = $("#apiUrlDes").val();
        } else if (location.hostname.indexOf("www") > -1) {
            urlapi = $("#apiUrlExt").val();
        } else {
            urlapi = $("#apiUrlProd").val();
        }
        return urlapi;
    }

    __getUrlReport = function () {
        var urlrpt = "";
        if (location.hostname == "localhost") {
            urlrpt = $("#rptUrlDes").val();
        } else if (location.hostname.indexOf("www") > -1) {
            urlrpt = $("#rptUrlExt").val();
        } else {
            urlrpt = $("#rptUrlProd").val();
        }
        return urlrpt;
    }

    __getUrlApiSEG = function () {
        var urlapi = "";
        if (location.hostname == "localhost") {
            urlapi = $("#apiUrlDesSEG").val();
        } else if (location.hostname.indexOf("www") > -1) {
            urlapi = $("#apiUrlExtSEG").val();
        } else {
            urlapi = $("#apiUrlProdSEG").val();
        }
        return urlapi;
    }

    _GetSegResponse = function (controlador, accion, usuario, contraseña, objParams) {
        return $.ajax
         ({
             type: "GET",
             url: __getUrlApiSEG() + controlador + "/" + accion,
             dataType: 'json',
             data: objParams,
             async: true,
             headers: {
                 "Authorization": "Basic " + btoa(usuario + ":" + contraseña)
             }
         });
    }

    ___GetSegResponseExt = function (controlador, accion, key, objParams) {
        return $.ajax
         ({
             type: "GET",
             url: __getUrlApiSEG() + controlador + "/" + accion,
             dataType: 'json',
             data: objParams,
             async: true,
             headers: {
                 "Authorization": "Basic " + key
             }
         });
    }

    _PostSegResponse = function (controlador, accion, usuario, contraseña, fncCallback, objParams) {
        _fncCallback = null;
        _fncCallback = fncCallback;

        $.ajax
        ({
            type: "POST",
            url: __getUrlApiSEG() + controlador + "/" + accion,
            dataType: 'json',
            data: objParams,
            headers: {
                "Authorization": "Basic " + btoa(usuario + ":" + contraseña),
            },
            success: function (e) {
                if (typeof (fncCallback) == "function") {
                    _fncCallback(e);
                } else {
                    hideLoading();
                }
            }
        });
    }

    _GetResponse = function (controlador, accion, objParams) {
        return $.ajax
        ({
            type: "GET",
            url: __getUrlApi() + controlador + "/" + accion,
            dataType: 'json',
            async: true,
            data: objParams,
            headers: {
                "Passport": localStorage.Passport
            }
        });
    }

    _GetResponseSEG = function (controlador, accion, objParams) {
        return $.ajax
        ({
            type: "GET",
            url: __getUrlApiSEG() + controlador + "/" + accion,
            dataType: 'json',
            async: true,
            data: objParams,
            headers: {
                "Passport": localStorage.Passport
            }
        });
    }

    _PostResponse = function (controlador, accion, objParams) {

        if (typeof (objParams) == "object") {
            objParams = JSON.stringify(objParams);
        }

        return $.ajax
          ({
              type: "POST",
              url: __getUrlApi() + controlador + "/" + accion,
              dataType: 'json',
              data: objParams,
              async: true,
              headers: {
                  "Passport": localStorage.Passport,
              },
              contentType: 'application/json; charset=utf-8'
          });
    }

    _GoPage = function (Controlador, accion) {
        var url = location.protocol + "//" + location.host + "/" + Controlador + "/" + accion

        _GetResponseSEG('Formulario', 'GetAccesoFormulario', { pIDSEG_PERFIL: DATOS_USUARIO.IDSEG_PERFIL, pURL_FORMULARIO: (Controlador + "/" + accion), pIDSEG_SISTEMA: DATOS_USUARIO.IDSEG_SISTEMA })
        .done(function (resp) {
            if (resp.Respuesta == ResponseType.Success) {
                localStorage.removeItem("CONTROL");
                localStorage.removeItem("frmAcces");
                if (resp.ObjectEntity.SEGV_CONTROLES_PERFIL != null) {
                    localStorage.setItem("CONTROL", JSON.stringify(resp.ObjectEntity));
                }
                localStorage.setItem("frmAcces", resp.ObjectEntity.URL_FORMULARIO);

                var cookieName = 'frmAcces';
                var cookieValue = resp.ObjectEntity.URL_FORMULARIO;
                var myDate = new Date();
                myDate.setMonth(myDate.getMonth() + 12);
                document.cookie = cookieName + "=" + cookieValue + ";expires=" + myDate + ";path=/";

                location = url;

            } else {
                alert("Acceso Denegado");
            }
        })
    }
   
    $.fn._CargaReporte = function (urlReport, objParam) {
        var urlConfig = "_flowId=viewReportFlow&standAlone=true&decorate=no&";
        var urlHost = __getUrlReport();        
        var urlRender = "&j_username=fps&j_password=123456789&theme=jasper_embedded";
        urlReport = "reportUnit=" + urlReport.replace(/['/']/gi, '%2F');

        var urlParam = '';
        var urlFinal = '';

        if (typeof (objParam) != "undefined" && typeof (objParam) == "object") {
            var vObj = Object.getOwnPropertyNames(objParam);
            for (var i = 0; i < vObj.length; i++) {
                urlParam = urlParam + '&' + vObj[i] + '=' + objParam[vObj[i]];
            }
        }

        urlFinal = urlHost + urlConfig + urlReport +  urlParam + urlRender;

        $(this).children().remove();
        var iframe = '<iframe id="framReport" src="'+ urlFinal +'" height="850" width="100%"></iframe>';
        $(this).append(iframe);

    }

    ____PostResponseSEG = function (controlador, accion, objParams) {

        if (typeof (objParams) == "object") {
            objParams = JSON.stringify(objParams);
        }

        return $.ajax
            ({
                type: "POST",
                url: __getUrlApiSEG() + controlador + "/" + accion,
                dataType: 'json',
                data: objParams,
                async: true,
                headers: {
                    "Passport": localStorage.Passport,
                },
                contentType: 'application/json; charset=utf-8'
            });
    }

});