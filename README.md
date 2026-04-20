# bnpl-caja-trujillo-prototipo

Prototipo (PoC) para una solución **BNPL (Buy Now, Pay Later)** orientada a **Caja Trujillo**.

[▶ Ver Prototipo BNPL (simulación)](https://treevu-ai.github.io/bnpl-caja-trujillo-prototipo/prototype/)

> Nota: Este demo es una **simulación** (sin integración real con Caja Trujillo / Yape / pasarelas). Sirve para validar UX y flujo.

## ¿Qué debería contener este prototipo?
- **Frontend** (UI) para simular el flujo de compra BNPL.
- **Backend/API** para evaluación simple (reglas) y creación de un plan de cuotas.
- (Opcional) **Base de datos** para guardar clientes/órdenes/cuotas.
- Documentación mínima para correrlo localmente o con Docker.

## Alcance esperado (PoC)
- Simulación de alta/identificación de cliente (mock).
- Simulación de evaluación (aprobación/rechazo) por reglas simples.
- Generación de plan de pagos (número de cuotas, fechas, montos).
- Registro de una orden y su estado.

## Próximos pasos
1. Definir stack (ejemplos):
   - Frontend: React / Next.js
   - Backend: Node.js (Express/Nest) o Python (FastAPI)
   - DB: Postgres / SQLite
2. Crear estructura inicial:
   - `frontend/`
   - `backend/`
   - `docs/`
3. Agregar instrucciones de ejecución:
   - Local (`npm install`, `npm run dev`)
   - Docker (`docker compose up --build`)
4. Documentar variables de entorno y endpoints.

## Licencia
Por definir.