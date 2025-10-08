# 🎥 Configuración de Video con YouTube

## ¿Por qué YouTube?
- **Tamaño**: Reduce el build de 47MB a ~15MB
- **Velocidad**: Carga instantánea con lazy loading
- **CDN**: YouTube tiene servidores globales súper rápidos
- **Calidad**: Múltiples resoluciones automáticas
- **Móvil**: Optimizado para todos los dispositivos

## 📋 Pasos para configurar:

### 1. Subir video a YouTube
1. Ve a https://studio.youtube.com
2. Haz clic en "Crear" → "Subir video"
3. Sube tu video `video_demostracion.mp4`
4. Configura:
   - **Título**: "Soluciones Mike - Demo de Proyectos Web"
   - **Descripción**: "Demostración de nuestros proyectos web y servicios de desarrollo"
   - **Visibilidad**: "Público" o "No listado" (recomendado)

### 2. Obtener ID del video
1. Una vez subido, copia la URL: `https://www.youtube.com/watch?v=ABC123XYZ`
2. El ID es la parte después de `v=`: `ABC123XYZ`

### 3. Actualizar el código
En `frontend/src/pages/Home.jsx`, línea ~587:
```jsx
<VideoPlayer
  youtubeId="ABC123XYZ" // ← Reemplaza con tu ID real
  title="Soluciones Mike - Demo de Proyectos"
  thumbnail="URL_DE_TU_THUMBNAIL" // Opcional
  className="relative z-10"
/>
```

### 4. Crear thumbnail personalizado (Opcional)
- Tamaño: 1280x720px
- Formato: JPG o PNG
- Sube a tu hosting o usa un servicio como Imgur
- Actualiza la URL en el código

## 🚀 Beneficios obtenidos:

### Antes (Video local):
- ❌ Build: 50MB
- ❌ Carga inicial: 5-10 segundos
- ❌ Consume ancho de banda del hosting
- ❌ No optimizado para móviles

### Después (YouTube embed):
- ✅ Build: 15MB (-70%)
- ✅ Carga inicial: <2 segundos
- ✅ Ancho de banda gratis de YouTube
- ✅ Optimización automática para todos los dispositivos
- ✅ Múltiples calidades (360p, 720p, 1080p)
- ✅ Controles nativos del navegador

## 🔧 Alternativas si no quieres YouTube:

### Opción 1: Vimeo
- Más profesional
- Sin anuncios
- Mejor para empresas
- Mismo proceso, solo cambia el embed

### Opción 2: Comprimir video local
```bash
# Con FFmpeg (si quieres mantenerlo local)
ffmpeg -i video_demostracion.mp4 -vcodec h264 -acodec mp2 -crf 28 -preset slow video_optimizado.mp4
```

### Opción 3: Convertir a WebM
```bash
ffmpeg -i video_demostracion.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 video.webm
```

## 📊 Comparación de tamaños:
- **Original MP4**: 47MB
- **YouTube embed**: 0MB (se carga bajo demanda)
- **MP4 comprimido**: ~8-12MB
- **WebM optimizado**: ~5-8MB

## ✅ Recomendación:
**Usa YouTube** - Es la opción más profesional y eficiente para sitios web comerciales.