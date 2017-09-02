var map = null;
var layersControl = null;

var addArpae = function() {
    var arpaeDescriptor = "api.php?what=0";
    var arpaeMap = "http://www.arpae.it/sim/external/bollettino/mappa_radar_wp7.php?f=";

    $.getJSON(arpaeDescriptor)
        .done(function(data) {
            var url = arpaeMap + data[0].i;

            var arpaeImageBounds = L.latLngBounds([
                [43.4, 8.5],
                [46.001, 13.2058]
            ]);
            var arpaeImage = L.imageOverlay(url, arpaeImageBounds, {
                opacity: 0.8
            }).addTo(map);
            layersControl.addOverlay(arpaeImage, "Arpa EMR");

        }).fail(function(e) {
            console.log(e);
        });
}

var addArpav = function() {
    var arpavConcordia = "http://www.arpa.veneto.it/previsioni/radar_concordia/LAST_BASE.jpg"
    var imageBounds = L.latLngBounds([
        [44.29171208965413342, 11.09425854686481117],
        [46.91201921954443321, 14.51733379846328376]
    ]);
    var image = L.imageOverlay(arpavConcordia, imageBounds, {
        opacity: 0.8
    });
    layersControl.addOverlay(image, "Arpav Concordia");
}

var addCml = function() {
    var cmlDescriptor = "api.php?what=1";
    var cmlMap = "http://cloud.centrometeolombardo.com/Radar/current/";

    $.getJSON(cmlDescriptor)
        .done(function(data) {
            console.log(data);
            var url = cmlMap + data[data.length - 1] + '?reload=' + new Date().getTime();

            var b = L.latLngBounds([
                [44.26427253368167, 6.468315406359165],
                [46.7970733693776, 11.61527590316751]
            ]);
            var i = L.imageOverlay(url, b, {
                opacity: 0.8
            }).addTo(map);
            layersControl.addOverlay(i, "CML");

        }).fail(function(e) {
            console.log(e);
        });
}

var initMap = function() {
    var mapAttr = 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        mapUrl = 'http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}';

    var streets = L.tileLayer(mapUrl, {
        maxZoom: 20,
        attribution: mapAttr
    });

    var baseLayers = {
        "Streets": streets
    };


    map = L.map('map', {
        center: [45.1, 11.8],
        zoom: 6,
        layers: [
            streets
        ]
    });

    layersControl = L.control.layers(baseLayers, {});
    layersControl.addTo(map);

    function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map);
    }

    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    map.locate({
        setView: true,
        maxZoom: 10
    });

    addArpae();
    addArpav();
    addCml();
};

jQuery(document).ready(function() {
    initMap();
});