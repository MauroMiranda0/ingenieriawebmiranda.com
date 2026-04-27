# Footer

**Archivo fuente:** `_includes/partials/footer.njk`

Footer corporativo global. Presente en las 18 páginas a través del layout `_includes/layouts/base.njk`.
No tiene variantes — es un componente único y estático.

---

## Estructura HTML

```html
<footer class="bg-primary text-white pt-16 pb-10">
  <div class="max-w-7xl mx-auto px-6">

    <!-- Grid principal: 5 columnas en desktop -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 mb-12">

      <!-- Columna 1: Marca -->
      <div class="col-span-full sm:col-span-2 md:col-span-1">
        <a href="/" class="inline-block mb-3">
          <img src="/assets/img/logo.png" alt="Ingeniería Web Miranda" class="h-10 w-auto brightness-0 invert"/>
        </a>
        <p class="text-white/60 text-sm leading-relaxed">Soluciones digitales desde la ingeniería.</p>
      </div>

      <!-- Columna 2: Nuestros Servicios -->
      <div>
        <p class="text-xs tracking-[0.3em] uppercase opacity-60 mb-4">Nuestros Servicios</p>
        <ul class="space-y-2 text-sm text-white/80">
          <li><a class="hover:text-white transition-colors" href="/servicios/">Desarrollo Web</a></li>
          <li><a class="hover:text-white transition-colors" href="/servicios/sistemas-web/">Aplicaciones</a></li>
          <li><a class="hover:text-white transition-colors" href="/servicios/arquitectura/">Infraestructura</a></li>
          <li><a class="hover:text-white transition-colors" href="/servicios/sistemas-web/">Integración de Sistemas</a></li>
        </ul>
      </div>

      <!-- Columna 3: La Agencia -->
      <div>
        <p class="text-xs tracking-[0.3em] uppercase opacity-60 mb-4">La Agencia</p>
        <ul class="space-y-2 text-sm text-white/80">
          <li><a class="hover:text-white transition-colors" href="/metodo/">Nuestra Misión</a></li>
          <li><a class="hover:text-white transition-colors" href="/contacto/">Contáctanos</a></li>
        </ul>
      </div>

      <!-- Columna 4: Comunidad -->
      <div>
        <p class="text-xs tracking-[0.3em] uppercase opacity-60 mb-4">Comunidad</p>
        <ul class="space-y-2 text-sm text-white/80">
          <li><a class="hover:text-white transition-colors" href="/contacto/">Soporte</a></li>
          <li><a class="hover:text-white transition-colors" href="/recursos/">Preguntas Frecuentes</a></li>
          <li><a class="hover:text-white transition-colors" href="/recursos/">Ayuda</a></li>
        </ul>
      </div>

      <!-- Columna 5: Redes sociales (SVG inline, sin dependencias externas) -->
      <div>
        <p class="text-xs tracking-[0.3em] uppercase opacity-60 mb-4">Síguenos</p>
        <div class="flex gap-4">
          <!-- Facebook, Threads, Instagram, GitHub -->
        </div>
      </div>
    </div>

    <!-- Barra legal -->
    <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="flex gap-6 text-xs tracking-widest uppercase opacity-70">
        <a class="hover:opacity-100" href="/legal/privacidad/">Privacidad</a>
        <a class="hover:opacity-100" href="/legal/terminos/">Términos</a>
      </div>
      <p class="text-xs opacity-60">
        © <span id="copyright-year"></span> Ingeniería Web Miranda. Todos los derechos reservados.
      </p>
    </div>

  </div>
</footer>
```

---

## Comportamiento JS

`<span id="copyright-year"></span>` es rellenado por `assets/js/ui.js` con el año actual (`new Date().getFullYear()`).
No modificar el `id="copyright-year"` — es un selector del JS.

---

## Tokens de diseño usados

| Token | Aplicación |
|-------|-----------|
| `primary` | `bg-primary` (fondo del footer) |
| `font-display` | nombre de marca en columna 1 (`font-display text-xl`) |
| `font-sans` | links y textos menores (default) |

---

## Columnas de contenido

| Columna | Heading | Contenido | Actualizar cuando... |
|---------|---------|-----------|----------------------|
| 1 — Marca | — | Nombre y tagline corto | Cambia el posicionamiento o tagline |
| 2 — Nuestros Servicios | `Nuestros Servicios` | Links a 4 servicios | Se agrega/modifica un servicio |
| 3 — La Agencia | `La Agencia` | Misión, Contacto | Cambia la estructura institucional |
| 4 — Comunidad | `Comunidad` | Soporte, FAQ, Ayuda | Se agrega un recurso de comunidad |
| 5 — Redes sociales | `Síguenos` | 4 iconos SVG inline | Se agrega/elimina una red social |

---

## Iconos de redes sociales

Implementados con SVG inline (`fill="currentColor"`, `width="20" height="20"`).
Sin dependencias de fuentes de iconos externas.

| Red | `aria-label` | `href` |
|-----|-------------|--------|
| Facebook | `Facebook` | `#` (reemplazar con URL real) |
| Threads | `Threads` | `#` (reemplazar con URL real) |
| Instagram | `Instagram` | `#` (reemplazar con URL real) |
| GitHub | `GitHub` | `#` (reemplazar con URL real) |

---

## Reglas de uso

- No agregar `border-radius` al footer ni a ningún contenedor interno — estética de bordes rectos.
- Los iconos sociales van siempre en la columna 5, en fila horizontal (`flex gap-4`).
- Para añadir una red social: agregar un `<a>` con SVG en la columna 5 y una fila en la tabla de iconos de esta spec.
- Los `href="#"` de redes sociales deben reemplazarse con las URLs reales cuando estén disponibles.
