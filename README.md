# Okeefe API Buscador

## Pasos para deploy

###Clonar el repo

`$ git clone https://github.com/Lyncros/okeefe.git`

`$ cd okeefe`

`$ git checkout develop`

`$ composer install`

Configurar .env con los datos locales

## Base de datos

La base de datos original fue indexada en varias tablas para mejorar el rendimiento de la busqueda,
por favor descargar para test.

`https://www.dropbox.com/s/hul53adcvr8jepy/okeefe_desarrollo.sql?dl=0`

o bien ver consultas en: `https://github.com/Lyncros/okeefe/wiki/Registro-de-queries-SQL-en-la-base-de-datos`

# Api Docs

## Busqueda de inmuebles segun tipo, operacion, ubicacion

- Los valores por defectos son Departamento en venta

***Busqueda de todos los departamentos en venta.***

`/api/v1/ubicacionpropiedad?operacion=Venta&tipo=12`

***Busqueda de departamentos en venta en Wilde***

`/api/v1/ubicacionpropiedad?q=Wilde&operacion=Venta&tipo=12`

## Busqueda de recidencial

***Rango de valor del inmueble***

`/api/v1/ubicacionpropiedad?valMin=0&valMax=100000`

***Rango Superficie (m2)***

`/api/v1/ubicacionpropiedad?supMin=0&supMax=100`

***Cantidad de ambientes***

`/api/v1/ubicacionpropiedad?amb==5`

***Cantidad de cocheras***

`/api/v1/ubicacionpropiedad?coch==5`

***Antiguedad***

`/api/v1/ubicacionpropiedad?ant==5`

***Tipo de moneda (Default U$D y $)***

*Busqueda disponible para pesos argentinos y dolares americanos*

`/api/v1/ubicacionpropiedad?moneda=$`

***Cantidad de baños***

`/api/v1/ubicacionpropiedad?banos=2`