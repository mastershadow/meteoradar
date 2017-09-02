# meteoradar
Meteoradar aggregato personale basato su leaflet e tre sorgenti meteo (ARPAV, ARPAE e CML).

Per farlo funzionare serve un host con PHP 5.x e php-curl.
La geolocalizzazione necessita di un host con HTTPS.

La georeferenziazione dei raster è basata su QGIS e realizzata senza alcuna velleità di accuratezza, quindi c'è un po' di offset nei bounds. Per lo scopo del progetto è sufficiente.

WARN: this is a very unstructured prototype, but it works.
WARN2: initial position is hardcoded on the north of Italy