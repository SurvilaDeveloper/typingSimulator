(Este es un archivo generado por chatGPT para el proceso de desarrollo y puede contener imprecisiones.
En futuros commits será corregido)

# Typing Simulator

Este proyecto es un simulador de tipeo que reproduce sonidos al escribir y permite visualizar texto de manera dinámica, ideal para interfaces interactivas, simulaciones de terminal o efectos visuales en páginas web.

## Características
- Simulación realista de escritura con efectos de sonido.
- Soporte para texto plano y formato HTML.
- Control de velocidad de escritura.
- Cursor animado tipo terminal.
- Funcionalidad configurable para iniciar y detener la simulación.
- Compatible con eventos de usuario como clics y teclas.
- Control adicional con `TypingSimulatorControl` para manejar el simulador dinámicamente.

## Uso
Para ejecutar el proyecto en un entorno de desarrollo:
```sh
npm run dev
```
Luego, abre en el navegador `http://localhost:3000/`.

Para compilar el proyecto para producción:
```sh
npm run build
```

## Archivos principales
- `index.tsx`: Implementación del simulador de tipeo.
- `TypingSimulator.tsx`: Componente principal del simulador.
- `TypingSimulatorControl.tsx`: Componente que permite controlar dinámicamente el simulador de tipeo.
- `sounds/`: Carpeta con los efectos de sonido.
- `public/`: Archivos estáticos del proyecto.
- `package.json`: Dependencias y configuración del proyecto.

## Personalización
Puedes ajustar la velocidad de tipeo, los sonidos y otros efectos modificando los parámetros en `TypingSimulatorControl`.

Ejemplo de uso del componente:
```tsx
<TypingSimulator 
    id="typing-box" 
    text="Bienvenido al simulador de tipeo..." 
    run={true} 
    velocity={5} 
    handleClick={() => console.log("Clic en el simulador")} 
/>
```

Para un control más avanzado, puedes usar `TypingSimulatorControl` para iniciar, detener o cambiar dinámicamente el texto sin necesidad de anidar un `TypingSimulator` dentro de otro:
```tsx
<TypingSimulatorControl />
```

## Contribución
Si deseas mejorar el proyecto, sigue estos pasos:
1. Haz un **fork** del repositorio.
2. Crea una nueva rama para tu característica:
   ```sh
   git checkout -b feature-nueva
   ```
3. Realiza los cambios y haz un commit:
   ```sh
   git commit -m "Agregada nueva característica"
   ```
4. Sube los cambios a tu fork y abre un **pull request**.

## Roadmap
- [ ] Agregar más efectos de sonido.
- [ ] Permitir personalización del cursor.
- [ ] Incluir soporte para distintos temas visuales.
- [ ] Implementar una API para controlar el simulador desde otros componentes.

## Licencia
Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente bajo esta licencia.

---
### Autor
Desarrollado por [Gabriel Survila](https://github.com/tu-usuario). ¡Si te gusta el proyecto, dale una estrella ⭐ en GitHub!




