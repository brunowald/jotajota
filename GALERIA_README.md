# Galería de Imágenes Dinámica - Quiénes Somos

Este sistema permite que la galería de imágenes en la página "¿Quiénes Somos?" se actualice automáticamente cuando agregues nuevas imágenes a la carpeta.

## Cómo agregar nuevas imágenes

### Opción 1: Manual
1. Agrega tus imágenes a la carpeta `src/app/quienes-somos/imagenes/`
2. Edita el archivo `src/app/quienes-somos/page.tsx`
3. En la lista `possibleImages`, agrega el nombre de tu nueva imagen

```javascript
const possibleImages = [
  'quienes-somos-1.jpeg',
  'quienes-somos-2.jpeg',
  // ... imágenes existentes
  'tu-nueva-imagen.jpeg',  // ← Agrega aquí
];
```

### Opción 2: Automática (Recomendada)
1. Agrega tus imágenes a la carpeta `src/app/quienes-somos/imagenes/`
2. Ejecuta el script de actualización:
   ```bash
   npm run update-gallery
   ```

Este script:
- Escanea la carpeta `imagenes/`
- Encuentra todas las imágenes (jpg, jpeg, png, gif)
- Actualiza automáticamente el archivo `page.tsx`

## Formatos soportados
- `.jpg` / `.jpeg`
- `.png`
- `.gif`

## Convención de nombres
Para mejores resultados, nombra tus imágenes siguiendo el patrón:
- `quienes-somos-1.jpeg`
- `quienes-somos-2.jpeg`
- etc.

Pero cualquier nombre funcionará.

## Características del lazy loading
- Las imágenes se cargan solo cuando están cerca del viewport
- Optimización automática de Next.js
- Placeholder blur mientras se cargan
- Responsive design (1-3 columnas según dispositivo)
- Efectos hover suaves

## Troubleshooting
Si una imagen no aparece:
1. Verifica que esté en la carpeta correcta
2. Asegúrate de que el formato sea compatible
3. Ejecuta `npm run update-gallery` para regenerar la lista
4. Recarga la página del navegador
