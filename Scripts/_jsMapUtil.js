var mymap;
var basemaps;
var path

$(function () {

    $.fn._MapCrea = function () {

        mymap = new L.Map($(this).attr('id'), { center: new L.LatLng(-16.1899083, -67.7152266), zoom: 16 });
        basemaps = {
            Satelite: L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }),
            Terran: L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }),
            Mapa: L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            })
        }
        L.control.layers(basemaps).addTo(mymap);
        basemaps.Satelite.addTo(mymap);

    }

    $.fn._MapClear = function () {
        for (i in mymap._layers) {
            if (mymap._layers[i]._path != undefined) {
                try {
                    mymap.removeLayer(mymap._layers[i]);
                }
                catch (e) {
                    console.log("problem with " + e + this._layers[i]);
                }
            }
        }
    }

    $.fn._MapPath = function (objList) {

        $(this)._MapClear();
        $(".leaflet-marker-icon").remove();
        var markers = new L.FeatureGroup();

        for (var i = 0, latlngs = [], len = objList.length; i < len; i++) {

            if (i == 0) {
                var marker = L.marker([objList[i].LAT, objList[i].LON]);
                markers.addLayer(marker)
                mymap.addLayer(markers)
            }

            latlngs.push(new L.LatLng(objList[i].LAT, objList[i].LON));

            if (i == len - 1) {
                var marker = L.marker([objList[i].LAT, objList[i].LON]);
                markers.addLayer(marker)
                mymap.addLayer(markers)
            }
        }

        path = new L.Polyline(latlngs);
        mymap.addLayer(path);
        mymap.fitBounds(new L.LatLngBounds(latlngs));
        path.snakeIn();
    }

    $.fn._MapResize = function () {
        mymap.invalidateSize();
    }
})