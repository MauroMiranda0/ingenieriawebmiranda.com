# MethodStack

**Archivo fuente:** `assets/css/theme.css`

Componente interactivo para presentar las fases del método como capas apiladas que se despliegan en cascada. Adaptado de `menuDesplegableAleatorio.html` a la identidad blueprint del sitio.

---

## Estructura

```html
<div class="method-stack" aria-label="Fases del método de ingeniería">
  <ol class="method-stack-list">
    <li class="method-stack-item">
      <span class="material-icons" aria-hidden="true">travel_explore</span>
      <div>
        <h3>Discovery</h3>
        <p>Contexto, objetivos y riesgos. Definimos lo que importa.</p>
      </div>
    </li>
  </ol>
</div>
```

---

## Comportamiento

- En desktop con hover, las fases inician apiladas con profundidad visual y se despliegan verticalmente al pasar el cursor o enfocar un elemento.
- En mobile/tablet, las fases se muestran como lista estática para no depender de hover.
- Cada elemento conserva su descripción para mantener claridad del proceso.

---

## Fases

| Fase           | Icono            | Descripción                                                     |
| -------------- | ---------------- | --------------------------------------------------------------- |
| Discovery      | `travel_explore` | Contexto, objetivos y riesgos. Definimos lo que importa.        |
| Architecture   | `schema`         | Diseñamos estructura y decisiones defendibles.                  |
| Implementation | `code`           | Construcción controlada: calidad, performance y mantenibilidad. |
| Evolution      | `autorenew`      | Optimización continua y preparación para el siguiente nivel.    |

---

## Reglas

- No usar `border-radius`; el componente mantiene esquinas rectas.
- No usar Font Awesome ni fuentes externas adicionales; usar Material Icons y las fuentes del sitio.
- El estado hover individual puede invertir color/fondo, pero debe conservar contraste suficiente.
- La animación es progresiva; el contenido debe seguir visible sin hover en dispositivos táctiles.
