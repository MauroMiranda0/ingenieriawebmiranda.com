# CTA Evolution

**Archivo fuente:** `index.njk`, `servicios/index.njk`, `assets/css/theme.css`, `assets/img/logo-sphere.png`

Banner promocional para convertir visitas en solicitudes de diagnostico.
Replica el lenguaje visual de una pieza tipo anuncio: contenedor oscuro, recorte superior semicircular, esfera del logotipo flotante y contenido centrado.

## Uso

- **Home** (`index.njk`): seccion `#cta-final` al final de la pagina, con titulo generico de conversion.
- **Servicios** (`servicios/index.njk`): seccion "Próximo paso" al final del listado de servicios, con contenido especifico del contexto de servicios.

---

## Estructura

```html
<section id="cta-final">
  <div class="cta-evolution-card">
    <img class="cta-evolution-sphere" src="/assets/img/logo-sphere.png" alt="" aria-hidden="true" />
    <div class="cta-evolution-content">...</div>
  </div>
</section>
```

## Reglas visuales

- Fondo principal `primary` con gradiente sutil dentro del sistema cromatico.
- Recorte superior centrado usando `::after` del color de fondo de pagina.
- Esfera del logotipo centrada sobre el recorte, decorativa y no informativa.
- Texto centrado en blanco, con H2 en `font-display` y copy en `font-sans`.
- Una accion primaria visible: boton blanco para solicitar diagnostico.
- Accion secundaria como enlace fantasma, si existe, con menor peso visual.

## Radio y bordes

El banner usa `border-radius: 0` en el contenedor principal y en los botones dentro del CTA.
La composicion replica la referencia mediante el recorte superior y la esfera decorativa del logotipo, sin romper la restriccion permanente de no redondear cards o contenedores tipo card.

## Accesibilidad

- La esfera del logotipo y el recorte son decorativos: `aria-hidden="true"` y `alt=""`.
- El texto mantiene contraste alto sobre fondo oscuro.
- Los enlaces conservan estados `:focus-visible` heredados de `.btn`.

## Responsive

- En movil, la esfera baja de escala y el contenido reduce padding.
- El recorte conserva el centro visual sin bloquear contenido.
- Los CTAs se apilan en pantallas angostas.
