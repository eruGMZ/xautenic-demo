# Xautenic / Carlos (xautenic-demo)

## Tipo de negocio

Hotel + salón de eventos ubicado en Xico, Veracruz, México.

## Situación actual

Actualmente utilizan:

* Zavia ERP
* PMS
* Booking Engine (BE)
* Integraciones con OTAs (Airbnb y otros)

El ecosistema actual ya cubre relativamente bien:

* gestión hotelera,
* habitaciones,
* reservas,
* PMS,
* operación hotelera básica,
* y parte financiera.

## Problema principal detectado

La parte hotelera ya funciona, pero la gestión de eventos y el control interno están separados o fuera del ecosistema actual.

El lead NO busca reemplazar Zavia.

Busca:

* complementar,
* integrar,
* centralizar,
* y extender operación.

## Necesidades detectadas

### Control interno

Necesitan mayor visibilidad y organización operativa:

* tareas,
* responsables,
* incidencias,
* seguimiento,
* flujo operativo,
* control de personal,
* checklists,
* supervisión de operación.

### Gestión de eventos

Necesitan centralizar:

* reservaciones de salones,
* logística,
* coordinación,
* personal,
* habitaciones relacionadas a eventos,
* flujo operativo del evento,
* seguimiento interno.

### Integración

Desean conectar gestión de eventos con:

* Zavia ERP,
* PMS,
* reservas,
* habitaciones,
* OTAs,
* y posiblemente finanzas.

La lógica es:

* una reserva o evento puede impactar habitaciones,
* personal,
* operación,
* y flujo financiero.

## Objetivo estratégico del sistema

NO crear otro PMS.

NO reemplazar Zavia.

SÍ crear:

* una capa operativa encima del ecosistema actual,
* enfocada en eventos + control interno,
* integrada al flujo hotelero existente.

## Tipo de demo requerida

El lead necesita una demo conceptual funcional.

NO backend.

NO APIs reales.

NO autenticación real.

NO lógica compleja.

## Stack pensado para demo

Frontend únicamente:

* HTML
* CSS
* JS básico
* navegación/ruteo simple entre vistas

Objetivo:

* simular flujo operativo,
* visualizar integración conceptual,
* demostrar entendimiento del negocio.

## Enfoque de la demo

La demo debe sentirse como:
“así podría operar su negocio centralizado”.

No como producto terminado.

## Lo mínimo que debe incluir

### 1. Dashboard principal

Objetivo:
mostrar control operativo centralizado.

Contenido sugerido:

* eventos próximos,
* ocupación,
* tareas pendientes,
* alertas,
* actividad reciente,
* resumen financiero básico.

Datos mockeados.

## 2. Gestión de eventos

Módulo principal.

Debe mostrar:

* lista/calendario de eventos,
* cliente,
* salón asignado,
* fechas,
* estado,
* habitaciones relacionadas,
* personal asignado,
* checklist operativo.

Ideal:
botón tipo:
“Ver operación del evento”.

## 3. Control interno

Vista orientada a operación.

Mostrar:

* tareas,
* responsables,
* incidencias,
* seguimiento,
* estados,
* pendientes,
* checklists.

Objetivo:
transmitir supervisión operativa centralizada.

## 4. Integración conceptual con Zavia

NO integración real.

Solo lógica visual.

Ejemplo conceptual:

Reserva en Zavia
↓
Evento relacionado
↓
Asignación de salón
↓
Asignación de personal
↓
Impacto financiero

Objetivo:
demostrar cómo conviviría el sistema con el ecosistema actual.

## 5. Vista financiera básica

NO ERP completo.

Solo lógica:

* ingresos por evento,
* ingresos por habitaciones relacionadas,
* gastos operativos,
* resumen general.

## Filosofía de la reunión

Discovery first.

No vender agresivamente.

La estrategia es:

* entender dolores,
* detectar fricción operativa,
* traducir dolores a módulos,
* y mostrar cómo podría centralizarse la operación.

## Consideraciones importantes

* El cliente ya usa software y entiende tecnología.
* Ya cree en automatización.
* No quiere empezar desde cero.
* No conviene proponer reemplazo total.
* Conviene proponer integración y extensión operativa.
* El sistema debe verse modular y escalable.
* Debe sentirse como solución personalizada.
* No debe verse gigantesco ni imposible de implementar.

## Limitantes importantes

* Tiempo corto.
* Demo rápida.
* Sin backend.
* Sin lógica compleja.
* Sin sobreingeniería.
* Evitar hacer demasiados módulos.
* Enfocarse en flujo operativo y visualización de negocio.
* El objetivo no es impresionar técnicamente.
* El objetivo es demostrar entendimiento operativo y visión clara.

## Ejecutable en Ubuntu (Electron)

Para que esta demo funcione como app de escritorio ejecutable (no web), necesitas:

1. Node.js 20+ (recomendado 22 LTS).
2. Dependencias del sistema para empaquetar .deb y .rpm.
3. Instalar dependencias del proyecto y correr Electron Forge.

### 1) Version de Node

Electron 42 no es compatible con Node 12.

Verifica tu version:

```bash
node -v
npm -v
```

Si usas nvm:

```bash
nvm install 22
nvm use 22
nvm alias default 22
```

### 2) Dependencias de Ubuntu para empaquetado

```bash
sudo apt update
sudo apt install -y dpkg fakeroot rpm
```

### 3) Instalar y ejecutar

```bash
npm install
npm run start
```

### 4) Generar ejecutables

```bash
npm run make
```

Salida esperada:

* `out/make/deb/.../*.deb`
* `out/make/rpm/.../*.rpm`

Estos archivos se instalan en Ubuntu con `sudo dpkg -i archivo.deb`.
