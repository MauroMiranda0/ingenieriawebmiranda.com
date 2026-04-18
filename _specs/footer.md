# Footer

**Archivo fuente:** `_includes/partials/footer.njk`

Footer corporativo global. Presente en las 18 páginas a través del layout `_includes/layouts/base.njk`.
No tiene variantes — es un componente único y estático.

---

## Estructura HTML

```html
<footer class="bg-primary text-white pt-16 pb-10">
  <div class="max-w-7xl mx-auto px-6">

    <!-- Grid principal: 4 columnas en desktop -->
    <div class="grid md:grid-cols-4 gap-12 mb-12">

      <!-- Columna 1-2: Marca + descripción -->
      <div class="md:col-span-2">
        <p class="text-xs tracking-[0.3em] uppercase opacity-60 mb-4">Ingeniería Web Miranda</p>
        <p class="font-display text-3xl mb-4">Soluciones digitales desde la ingeniería.</p>
        <p class="text-white/70 max-w-lg leading-relaxed">
          Transformación digital con claridad técnica: modernización progresiva, performance
          y construcción de sistemas web sostenibles.
        </p>
      </div>

      <!-- Columna 3: Explorar -->
      <div>
        <p class="text-xs tracking-[0.3em] uppercase opacity-60 mb-4">Explorar</p>
        <ul class="space-y-2 text-sm text-white/80">
          <li><a class="hover:text-white" href="/servicios/">Servicios</a></li>
          <li><a class="hover:text-white" href="/casos/">Casos</a></li>
          <li><a class="hover:text-white" href="/metodo/">Método</a></li>
          <li><a class="hover:text-white" href="/recursos/">Recursos</a></li>
          <li><a class="hover:text-white" href="/proyectos/">Proyectos</a></li>
        </ul>
      </div>

      <!-- Columna 4: Contacto -->
      <div>
        <p class="text-xs tracking-[0.3em] uppercase opacity-60 mb-4">Contacto</p>
        <ul class="space-y-2 text-sm text-white/80">
          <li><a class="hover:text-white" href="/contacto/">Solicitar diagnóstico</a></li>
        </ul>
      </div>
    </div>

    <!-- Barra legal -->
    <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="flex gap-6 text-xs tracking-widest uppercase opacity-70">
        <a class="hover:opacity-100" href="/legal/privacidad/">Privacidad</a>
        <a class="hover:opacity-100" href="/legal/terminos/">Términos</a>
      </div>
      <p class="text-xs opacity-60">
        © <span id="y"></span> Ingeniería Web Miranda. México · Remoto.
      </p>
    </div>

  </div>
</footer>
```

---

## Comportamiento JS

`<span id="y"></span>` es rellenado por `assets/js/ui.js` con el año actual (`new Date().getFullYear()`).
No modificar el `id="y"` — es un selector del JS.

---

## Tokens de diseño usados

| Token | Aplicación |
|-------|-----------|
| `primary` | `bg-primary` (fondo del footer) |
| `font-display` | tagline principal (`font-display text-3xl`) |
| `font-sans` | links y textos menores (default) |

---

## Secciones de contenido

| Sección | Contenido | Actualizar cuando... |
|---------|-----------|----------------------|
| Columna marca | Nombre, tagline, descripción | Cambia el posicionamiento o tagline |
| Explorar | Links de nav principales | Se agrega/elimina una sección del sitio |
| Contacto | Link a `/contacto/` | Cambia la ruta de contacto |
| Legal | Privacidad y Términos | Se agrega una nueva página legal |
| Copyright | Año (dinámico) + texto | Cambia el texto de ubicación o marca |

---

## Reglas de uso

- Los links de "Explorar" deben ser idénticos a los items del nav principal (mismas rutas, mismo orden).
- No agregar `border-radius` al footer ni a ningún contenedor interno — mantener la estética de bordes rectos.
- Si se añade una red social, agregarla en la columna 4 (Contacto) como nuevo `<li>`, no crear una columna nueva.
