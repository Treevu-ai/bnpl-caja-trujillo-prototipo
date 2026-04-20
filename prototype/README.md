\# Cuotas Norte — Prototipo BNPL



Demo de checkout BNPL (white-label) para Caja Trujillo.



\## Cómo ejecutar

Opción simple:

\- Abre `prototype/index.html` en tu navegador.



Opción recomendada (evita problemas de módulos):

```bash

python -m http.server 8080

```

Luego abre:

\- http://localhost:8080/prototype/index.html



\## Parámetros del demo

\- Monto: editable (S/)

\- Cuotas: 3 / 6 / 12

\- Primera cuota: en 30 días (demo)

\- Fee simple: aplicado según plazo (definido en `prototype/app.js`)

