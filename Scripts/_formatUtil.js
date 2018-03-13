String.prototype.stripNonNumeric = function () {
    var str = this + '';
    var rgx = /^\d|\.|-$/;
    var out = '';
    for (var i = 0; i < str.length; i++) {
        if (rgx.test(str.charAt(i))) {
            if (!((str.charAt(i) == '.' && out.indexOf('.') != -1) ||
                (str.charAt(i) == '-' && out.length != 0))) {
                out += str.charAt(i);
            }
        }
    }
    return out;
};

/**
 *        Ejemplo (123456.789):
 *          '0' - (123456) show only digits, no precision
 *          '0.00' - (123456.78) show only digits, 2 precision
 *          '0.0000' - (123456.7890) show only digits, 4 precision
 *          '0,000' - (123,456) show comma and digits, no precision
 *          '0,000.00' - (123,456.78) show comma and digits, 2 precision
 *          '0,0.00' - (123,456.78) shortcut method, show comma and digits, 2 precision
 *
 * @method format
 * @param format {string} 
 * @return {string} 
 * @public
 */
Number.prototype.format = function (format) {
    if (!(typeof format == "string")) { return ''; }

    var hasComma = -1 < format.indexOf(','),
        psplit = format.stripNonNumeric().split('.'),
        that = this;
    if (1 < psplit.length) {
        that = that.toFixed(psplit[1].length);
    }
    else if (2 < psplit.length) {
        throw ('ErrorFormatoNunero: formato invalido, formato no admintido: ' + format);
    }
    else {
        that = that.toFixed(0);
    }
    var fnum = that.toString();
    if (hasComma) {
        psplit = fnum.split('.');

        var cnum = psplit[0],
            parr = [],
            j = cnum.length,
            m = Math.floor(j / 3),
            n = cnum.length % 3 || 3;

        for (var i = 0; i < j; i += n) {
            if (i != 0) { n = 3; }
            parr[parr.length] = cnum.substr(i, n);
            m -= 1;
        }

        fnum = parr.join(',');

        if (psplit[1]) { fnum += '.' + psplit[1]; }
    }
    return format.replace(/[\d,?\.?]+/, fnum);
};


$(function () {

    $(".inputNumber").on('keypress', function (e) {
        var value = $(this).attr("toValue");
        if (value.toUpperCase() == "FLOAT") {
            if ((e.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57) || ($(this).val().indexOf('.') == 0)) {
                e.preventDefault();
            }
        } else if (value.toUpperCase() == "INT") {
            if ((e.which != 46 || $(this).val().indexOf('.') != 0) && (e.which < 48 || e.which > 57) || ($(this).val().indexOf('.') == 0)) {
                e.preventDefault();
            }
        }
    })


})