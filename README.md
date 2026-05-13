# Control de Acuerdos Comerciales CRESIO 2026

Aplicacion web estatica para gestionar la matriz de acuerdos comerciales. Esta version toma como base la estructura del Excel y aplica los comentarios del documento de maquetado:

- Compras registra y edita acuerdos, seguimiento mensual, pronto pago y adjuntos PDF.
- Contabilidad trabaja en modo consulta para revisar convenios, saldos, NC y reportes.
- El dashboard reemplaza "Pronto Pago Pend." por "Acuerdos en peligro de cumplimiento".
- La linea de laboratorio aparece en el resumen, seguimiento y reportes.
- El campo de distribuidores/proveedores permite multiples valores.
- Los PDF se guardan en IndexedDB del navegador; la metadata queda asociada al acuerdo.

## Uso

Opcion directa: abrir `index.html` en el navegador.

Mockup de revision: abrir `mockup-pantallas.html` en el navegador.

Opcion con servidor local:

```powershell
node server.mjs
```

Luego abrir `http://127.0.0.1:4173`.

## Compartir en otra maquina de la misma red

1. Ejecuta `node server.mjs`.
2. Busca la IPv4 de tu equipo con `ipconfig`.
3. Comparte la URL `http://TU-IP:4173`, por ejemplo `http://192.168.1.25:4173`.
4. Si Windows Firewall pregunta, permite el acceso en red privada.

Para compartir fuera de la red local, publica estos archivos en un hosting estatico
como SharePoint, Netlify, Vercel, GitHub Pages o un servidor interno.

## Persistencia

Los registros funcionales se guardan en `localStorage` del navegador. Los archivos PDF se guardan como blobs en IndexedDB. El boton `Reiniciar` restaura la data semilla de la matriz.
