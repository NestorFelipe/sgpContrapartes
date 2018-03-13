var vFunction = function () { }

///tipo de datos para los fields grillas
var _type = {
    integer: "int",
    float: "float",
    string: "string",
    datetime: "date",
    bool: "bool",
    number: "number"
}

//tipo de dato para alineacion de celdas o cabeceras de columnas
var _aling = {
    center: "center",
    right: "right",
    left: "left"
}

//tipo de formatos permitos en la grilla
var _format = {
    dateTimeShort: "dd/MM/yyyy  hh:mm:ss tt",
    datetime: "dd-MMMM-yyyy  hh:mm:ss tt",
    dateShort: "dd/MM/yyyy",
    date: "dd-MMMM-yyyy",
    numDecimal: "d2",
    numFloat: "f4",
    numInteger: "n",
    numMoney: "c2",
    numPorcent: "p"
}

///formato de grilla jqwidgets cambio a español
var getLocalization = function () {
    var localizationobj = {
        percentsymbol: "%",
        currencysymbol: " ",
        currencysymbolposition: "before",
        decimalseparator: ',',
        thousandsseparator: '.',
        pagergotopagestring: "Ir a Página:",
        pagershowrowsstring: "Nro. Filas:",
        pagerrangestring: " de ",
        pagerpreviousbuttonstring: "anterior",
        pagernextbuttonstring: "siguiente",
        groupsheaderstring: "Arrastre la columna para ser agrupada",
        sortascendingstring: "Ascendente",
        sortdescendingstring: "Descendente",
        sortremovestring: "Remover Orden",
        groupbystring: "Agrupar por esta columna",
        groupremovestring: "Remover grupos",
        filterclearstring: "Limpiar",
        filterstring: "Filtro",
        filtershowrowstring: "Mostrar filas donde 'where':",
        filterorconditionstring: " O ",
        filterandconditionstring: " Y ",
        filterselectallstring: "(Seleccionar Todo)",
        filterchoosestring: "Seleccione un registro:",
        filterstringcomparisonoperators: ['vacio', 'no vacio', 'contiene', 'contiene(mas casos)', 'no contiene', 'no contiene(mas casos)', 'inciar con', 'iniciar con(mas casos)', 'finaliza con', 'finaliza con(mas casos)', 'igual', 'igual(mas casos)', 'nulo', 'no nulo'],
        filternumericcomparisonoperators: ['igual', 'no igual', 'mayor que', 'mayor o igual que', 'menor que', 'menor o igual que', 'nulo', 'no nulo'],
        filterdatecomparisonoperators: ['igual', 'no igual', 'mayor que', 'mayor o igual que ', 'menor que', 'menor o igual que', 'nulo', 'no nulo'],
        filterbooleancomparisonoperators: ['igual', 'no igual'],
        validationstring: "El valor ingreso no es valido",
        emptydatastring: "No existen registros",
        filterselectstring: "Selección de filtro",
        loadtext: "Cargando...",
        clearstring: "Limpiar",
        todaystring: "Hoy",
        firstDay: 0,
        days: {
            names: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"],
            namesAbbr: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            namesShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
        },
        months: {
            names: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", ""],
            namesAbbr: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic", ""]
        },
        // separator of parts of a date (e.g. '/' in 11/05/1955)
        '/': "/",
        // separator of parts of a time (e.g. ':' in 05:44 PM)
        ':': ":",
        AM: ["am", "am", "am"],
        PM: ["pm", "pm", "pm"],
        eras: [
            { "name": "A.D.", "start": null, "offset": 0 }
        ],
        twoDigitYearMax: 2029,
        patterns: {
            // short date pattern
            d: "M/d/yyyy",
            // long date pattern
            D: "dddd, MMMM dd, yyyy",
            // short time pattern
            t: "h:mm tt",
            // long time pattern
            T: "h:mm:ss tt",
            // long date, short time pattern
            f: "dddd, MMMM dd, yyyy h:mm tt",
            // long date, long time pattern
            F: "dddd, MMMM dd, yyyy h:mm:ss tt",
            // month/day pattern
            M: "MMMM dd",
            // month/year pattern
            Y: "yyyy MMMM",
            // S is a sortable format that does not vary by culture
            S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss"
        }
    };
    return localizationobj;
}

var exportInfo;

function CargarArbol(arbol, opcionData, opcionArbol) {
    var setDataInit = {
        datatype: "json",
    }

    var source = $.extend({}, setDataInit, opcionData);

    var dataAdapter = new $.jqx.dataAdapter(source);

    var AttrDefault = {
        theme: 'custom_ISAP',
        enablehover: false,
        autorowheight: true,
        source: dataAdapter,
        sortable: true,
        localization: getLocalization(),
        enableBrowserSelection: true
    };
    var opciones = $.extend({}, AttrDefault, opcionArbol);
    $(arbol).jqxTreeGrid(opciones);
    return source;
}

function traverseTreeGrid(treeGrid, action) {
    function traverseRows(rows) {
        var idValue;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].records) {
                idValue = rows[i][idColumn];
                treeGrid.jqxTreeGrid(action + 'Row', idValue);
                traverseRows(rows[i].records);
            };
        };
    };

    var idColumn = treeGrid.jqxTreeGrid('source')._source.id;
    traverseRows(treeGrid.jqxTreeGrid('getRows'));
};

_SumaTotal =
    {
        Total: function (g, c, e) {
            var grid = $("#" + this.element.id).parent();
            var grid = grid[0].id.replace("columntable", "");
            var summaryData = $("#" + grid).jqxGrid('getcolumnaggregateddata', c.datafield, ['sum'])
            var renderstring = "";
            if (typeof (summaryData.sum) != "undefined")
                renderstring = '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: right; margin-right: 2px; margin-left: 4px; margin-top: 4px;"> <strong>' + summaryData.sum.format("c2") + '</strong></div>';
            return renderstring;
        },

        Caption: function (g, c, e) {
            var renderstring = '<div style="overflow: hidden; text-overflow: ellipsis; padding-bottom: 2px; text-align: lefth; margin-right: 2px; margin-left: 4px; margin-top: 4px;"> <strong>TOTAL</strong></div>';
            return renderstring;
        }
    }


$(function () {

    ///Funcion helper que crea una grilla jqxgrid a partir de un div
    $.fn._CreaGrilla = function (columns, idpk, options, vAdapter) {

        var fields = new Array();

        for (var i = 0; i < columns.length; i++) {
            var fild = new Object;
            fild.name = columns[i].datafield;
            if (typeof (columns[i].type) == "undefined") {
                fild.type = "string";
            } else {
                fild.type = columns[i].type;
            }
            fields.push(fild);
            fild = null;
        }

        var setDataInit = {
            datatype: "json",
            id: idpk,
            localdata: null,
            datafields: fields
        }

        var vNewAdapter = $.extend({}, setDataInit, vAdapter)

        var dataAdapter = new $.jqx.dataAdapter(vNewAdapter)

        var AttrDefault = {
            theme: 'custom_ISAP',
            altrows: true,
            filterable: true,
            enablehover: false,
            sortable: true,
            pageable: true,
            showfilterrow: true,
            groupable: true,
            autoheight: true,
            autorowheight: true,
            rowsheight: 22,
            columnsresize: true,
            source: dataAdapter,
            columns: columns,
            localization: getLocalization(),
            width: '100%',
            showtoolbar: false
        };

        var opciones = $.extend({}, AttrDefault, options);
        this.jqxGrid(opciones);

        this.before("<div id='divConten" + this.attr('id') + "'></div>");
        this.appendTo($('#divConten' + this.attr('id')));
        this.before("<div id='gridExport" + this.attr('id') + "' class='dxgvTitlePanel text-center' style='height: 28px; padding-top: 7px; padding-left: 4px;margin-top:-2px; border-radius: 14px 14px 0px 0px; -moz-border-radius: 14px 14px 0px 0px; -webkit-border-radius: 5px 5px 0px 0px; margin-right: -2px;'>");
        $("#gridExport" + this.attr('id')).append('<span class="text-center gridTitulo" style="color: white">' + this.attr('titulo') + '</span>')
        $('<div class="btnExportar" idgrid="' + this.attr('id') + '" title="Exportar a Excel" style="background-image: url(' + $("#__urlImageExcel").val() + ');padding: 11px 0px 5px 16px;width: 1px;margin-left: 5px;margin-top: -16px;cursor: pointer;"></div>').appendTo($("#gridExport" + this.attr('id')));

    }

    ///Funcion helper que crea una treeGrid jqxTreeGrid a partir de un div
    $.fn._CreaArbol = function (columns, options) {

        var fields = new Array();
        var self = this;
        var root =
            {
                keyDataField: { name: '' },
                parentDataField: { name: '' }
            }

        for (var i = 0; i < columns.length; i++) {
            var fild = new Object;
            fild.name = columns[i].dataField;
            if (typeof (columns[i].type) == "undefined") {
                fild.type = "string";
            } else {
                fild.type = columns[i].type;
            }
            fields.push(fild);
            fild = null;
        }

        var keyField = Enumerable.From(columns).Where("$.keyField == true").FirstOrDefault();
        var keyParent = Enumerable.From(columns).Where("$.keyParent == true").FirstOrDefault();

        root.keyDataField.name = keyField.dataField;
        root.parentDataField.name = keyParent.dataField;

        var setDataInit = {
            datatype: "json",
            id: root.keyDataField.name,
            localdata: null,
            datafields: fields,
            hierarchy: root,
        }

        var dataAdapter = new $.jqx.dataAdapter(setDataInit)

        var AttrDefault = {
            source: dataAdapter,
            sortable: true,
            theme: 'custom_ISAP',
            enableHover: false,
            enableBrowserSelection: true,
            filterable: true,
            width: '100%',
            filterMode: 'advanced',
            ready: function () {
                self.jqxTreeGrid('expandAll');
            },
            columns: columns,
            localization: getLocalization(),
        };

        var opciones = $.extend({}, AttrDefault, options);
        self.jqxTreeGrid(opciones);

        self.before("<div id='divConten" + self.attr('id') + "'></div>");
        self.appendTo($('#divConten' + self.attr('id')));
        self.before("<div id='gridExport" + self.attr('id') + "' class='dxgvTitlePanel text-center' style='height: 28px; padding-top: 7px; padding-left: 4px;margin-top:-2px; border-radius: 14px 14px 0px 0px; -moz-border-radius: 14px 14px 0px 0px; -webkit-border-radius: 5px 5px 0px 0px; margin-right: -2px;'>");
        $("#gridExport" + self.attr('id')).append('<span class="text-center gridTitulo" style="color: white">' + self.attr('titulo') + '</span>')
        $('<div class="btnExportar" idgrid="' + self.attr('id') + '" title="Exportar a Excel" style="background-image: url(' + $("#__urlImageExcel").val() + ');padding: 11px 0px 5px 16px;width: 1px;margin-left: 5px;margin-top: -16px;cursor: pointer;"></div>').appendTo($("#gridExport" + self.attr('id')));
    }

    $.fn._ExpandAll = function () {
        var self = this;
        self.jqxTreeGrid('expandAll');
    }

    $._ColapseAll = function () {
        var self = this;
        self.jqxTreeGrid('collapseAll');
    }

    $(document).on('click', '.btnExportar', function () {

        exportInfo = null;
        var vGridName = $(this).attr('idgrid');
        var datainformation = $("#" + vGridName + "").jqxGrid('getdatainformation');
        if (datainformation.rowscount > 0) {

        }
    })

    $.fn._TreeClearSelect = function () {
        var self = this;
        self.jqxTreeGrid('clearSelection');
    }

    //Funcion que retorna un listado de todas las filas seleccionadas del jqxgrid
    $.fn._GetRowsSelected = function () {

        var rowIndexs = this.jqxGrid('getselectedrowindexes');
        var rowBound = this.jqxGrid("getboundrows");
        var selectedrows = new Array();

        if (typeof (rowIndexs) != "undefined" && typeof (rowBound) != "undefined") {
            for (var i = 0; i < rowIndexs.length; i++) {
                if (rowIndexs[i] >= 0) {
                    var row = rowBound[rowIndexs[i]];
                    selectedrows.push(row);
                }
            }
        } else {
            console.log("la funcion es apta para elemento jqxgrid")
        }
        return selectedrows;
    }

    //Obtiene la fila seleccionada
    $.fn._GetRowSelect = function () {
        var rowindex = this.jqxGrid('getselectedrowindex');
        var data = $.extend({}, this.jqxGrid('getrowdata', rowindex));
        var allData = $.extend({}, this.jqxGrid('source')._source);
        var val = false;
        if (typeof (allData.id) != "undefined" && allData.id != null && allData.id.trim() != "" && rowindex >= 0) {
            val = true;
        }
        if (val && typeof (data) != "undefined" && typeof (allData) != "undefined" && allData.localdata.length > 0) {
            data = $.extend(data, Enumerable.From(allData.localdata).Where("$." + allData.id + " == " + data.uid + " ").ToArray()[0]);
        }
        return data;
    }

    $.fn._TreeGetRowSelect = function () {
        var self = this;
        var selection = self.jqxTreeGrid('getSelection')

        if (selection.length > 0) {

            var allData = $.extend({}, self.jqxTreeGrid('source')._source);
            var data = $.extend({}, Enumerable.From(allData.localdata).Where("$." + allData.id + " == '" + selection[0].uid + "' ").FirstOrDefault());
            return data
        } else { return {} }
    }

    //Obtiene todas las filas cargadas a la grilla, si la grilla se encuentra filtrada solo deveolvera la lista filtrada
    $.fn._GetRows = function () {
        var rows = this.jqxGrid('getrows');
        return rows;
    }

    //Obtiene todas las filas cargadas a la grilla, este resultado no es afectado por el filtrado 
    $.fn._GetRowsAll = function () {
        var rows = $.extend({}, this.jqxGrid('source'));
        return rows._source.localdata;
    }

    //Funcion que carga datos a la jqxgrid a partir de un objeto
    $.fn._SetData = function (data) {

        var self = this;
        var source = self.jqxGrid('source')
        source = source._source;

        if (data != null) {
            source.localdata = data
        }
        self.jqxGrid('updatebounddata', 'cells');
        self.jqxGrid('updatebounddata');
        self.jqxGrid('clearselection');
        self.jqxGrid('deleterow', 0);
        _HideLoading();
    }

    //Funcion que carga datos a la jqxgrid a partir de un objeto
    $.fn._SetDataArbol = function (data) {

        var self = this;
        self.jqxTreeGrid('clear');
        var source = self.jqxTreeGrid('source')
        source = source._source;

        if (data != null) {
            source.localdata = data
        }
        self.jqxTreeGrid('updateBoundData', 'cells');
        self.jqxTreeGrid('updateBoundData');
        self.jqxTreeGrid('clearSelection');
        _HideLoading();
    }

    ///evento de la grilla al seleccionar una fila comoparametro de salida la fila seleccionada y el source cargado en ella
    $.fn._OnRowSelect = function (vParam) {
        var grid = this;
        vFunction = null;
        vFunction = vParam;
        grid.on('rowselect', function (event) {
            var args = event.args;
            var rowBoundIndex = args.rowindex;
            var rowData = args.row;
            var source = grid.jqxGrid('source');
            source = source._source;
            vFunction(rowData, source);
        })
    }

    //Cambia el titulo de la grilla
    $.fn._SetTitulo = function (vTitulo) {
        this.parent().find('.gridTitulo').text(vTitulo)
    }

    //obtiene el titulo de la grilla
    $.fn._GetTitulo = function () {
        return this.parent().find('.gridTitulo').text()
    }

    $.fn._WinInit = function (vParam) {
        var AttrDefault = {
            resizable: true,
            isModal: true,
            modalZIndex: 18100,
            autoOpen: false,
            minWidth: 450,
            minHeight: 250,
            showCloseButton: false,
            theme: 'custom_ISAP'
        }
        var opciones = $.extend({}, AttrDefault, vParam);
        this.jqxWindow(opciones);
    }

    $.fn._WinClose = function () {
        this.jqxWindow('close')
    }

    $.fn._WinOpen = function () {
        this.jqxWindow({ position: 'center' });
        this.jqxWindow('open')
        //this._center();

    }

    //Metodo que muestra bloqueo loading en pantalla
    _ShowLoading = function () {

        $('#jqxLoader').jqxLoader('open');
    };

    //Metodo que oculta el bloqueo loading en pantalla
    _HideLoading = function () {

        $('#jqxLoader').jqxLoader('close');

    };

    $.fn._CreaGauge = function (vOptions) {
        var labels = { visible: true, position: 'inside', interval: 10, offset: [0, -12] };
        var AttrDefault = {
            ranges: [{ startValue: 0, endValue: 70, style: { fill: '#d02841', stroke: '#d02841' }, startDistance: '5%', endDistance: '5%', endWidth: 13, startWidth: 13 },
            { startValue: 70, endValue: 90, style: { fill: '#FCF06A', stroke: '#FCF06A' }, startDistance: '5%', endDistance: '5%', endWidth: 13, startWidth: 13 },
            { startValue: 90, endValue: 100, style: { fill: 'rgb(127, 209, 59)', stroke: 'rgb(127, 209, 59)' }, startDistance: '5%', endDistance: '5%', endWidth: 13, startWidth: 13 },
            { startValue: 100, endValue: 110, style: { fill: 'rgb(48, 125, 215)', stroke: 'rgb(48, 125, 215)' }, startDistance: '5%', endDistance: '5%', endWidth: 13, startWidth: 13 }
            ],
            cap: { radius: 0.04 },
            caption: { offset: [0, -80], value: 'Inaceptable', position: 'bottom' },
            value: 0,
            style: { stroke: 'none', 'stroke-width': '1px', fill: 'none' },
            animationDuration: 1500,
            colorScheme: 'scheme04',
            labels: labels,
            ticksMinor: { interval: 1, size: '5%' },
            ticksMajor: { interval: 5, size: '10%' },
            border: { visible: false },
            max: 110,
            min: 0,
            ticksDistance: '22%',
            width: 250,
            height: 250
        }
        var opciones = $.extend({}, AttrDefault, vOptions);
        this.jqxGauge(opciones);
    }

    $.fn._SetDataGauge = function (vPorcentaje, vEtiqueta) {
        var vValuePorcentace = '<span class="gaugePorcentaje">' + vPorcentaje + '%</span>'
        this.jqxGauge({
            caption: {
                offset: [0, -80],
                value: vEtiqueta,
                position: 'bottom'
            }
        });
        this.jqxGauge('setValue', vPorcentaje);
        this.find('table').find('.chartContainer').find('svg').before(vValuePorcentace);
    }

    ///Inicializacion de tabs
    $.fn._InitTab = function (vOpciones) {
        var vAttDefault = {
            width: '100%',
            height: 440,
            theme: 'custom_ISAP',
            animationType: 'fade',
            selectionTracker: true
        }
        var opciones = $.extend({}, vAttDefault, vOpciones);
        $(this).jqxTabs(opciones);
    }
    ///Inicializa el uso de un control jqwigets de tipo datepicker
    $.fn._InitDate = function (vOpciones) {
        var vAttrDefault = {
            formatString: 'dd/MM/yyyy',
            theme: 'custom_ISAP',
            height: '20px',
            width: '130px',
            readonly: true
        }
        var opciones = $.extend({}, vAttrDefault, vOpciones);
        this.jqxDateTimeInput(opciones);
    }
    //Obtener la fecha seleccionada
    $.fn._GetDate = function () {
        return this.jqxDateTimeInput('getDate')
    }
    //Setear un nuevo valor fecha en el control
    $.fn._SetDate = function (vstrFecha) {
        this.jqxDateTimeInput({ value: new Date(vstrFecha) });
    }

})

$(document).on("click", ".btnExportar", function () {

    var strId = "#" + $(this).attr("idgrid")
    var data = $(strId).jqxGrid('exportdata', 'xls');
    var sp = data.split('<Row>')
    var otro = '        <Row>   ' +
        '            <Cell> <Data ss:Type="String">' + $(this).siblings().text() + '</Data></Cell> ' +
        '        </Row> '
    data = sp[0] + otro;

    for (var i = 1; i < sp.length; i++) {
        data = data + "<Row>" + sp[i];
    }

    var blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });


    var fileName = $(this).siblings().text().replace(/^\s+/g, '').replace(/\s+$/g, '') + ".xls";
    saveAs(blob, fileName);
})