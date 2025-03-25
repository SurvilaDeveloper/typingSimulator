# TypingSimulator

TypingSimulator es un componente de React que simula la escritura de un texto con efectos de sonido de teclado y un cursor parpadeante.

## 🚀 Características
- Simulación de escritura con velocidad configurable.
- Efectos de sonido realistas para cada tecla.
- Cursor parpadeante dinámico.
- Soporte para formato tipo terminal (`bash`).
- Permite agregar texto dinámico.

## 📦 Instalación

```sh
npm install
```

Asegúrate de incluir los archivos de audio necesarios en `./sounds/`.

## 📌 Uso

```tsx
import TypingSimulator from "./TypingSimulator";

function App() {
    return (
        <TypingSimulator
            id="typing-box"
            text="Hello, this is a typing simulation!"
            eject={1}
            bash={true}
            velocity={5}
            handleClick={() => console.log("Clicked!")}
        />
    );
}

export default App;
```

## ⚙️ Props

| Prop          | Tipo                  | Descripción |
|--------------|----------------------|-------------|
| `id`         | `string`              | ID del componente. |
| `style`      | `React.CSSProperties` | Estilos personalizados. |
| `text`       | `string`              | Texto a escribir. |
| `eject`      | `number`              | Activa la simulación (0 = desactivado). |
| `bash`       | `boolean`             | Estilo terminal (agrega `>` al inicio de cada línea). |
| `addedHtml`  | `boolean`             | Permite HTML en el texto. |
| `handleClick` | `function`           | Callback al hacer clic. |
| `velocity`   | `1-10`                | Velocidad de escritura. |
| `children`   | `React.ReactNode`     | Contenido adicional. |

## 🎵 Sonidos

Los archivos de sonido deben estar en `./sounds/` y pueden incluir:
- `typing0.mp3`
- `typing2.mp3`
- `typing3.mp3`
- `typing4.mp3`
- `typing5.mp3`
- `typingSpace.mp3`
- `typingEnter.mp3`

## 🛠 Contribuir

¡Las contribuciones son bienvenidas! Si encuentras un error o quieres mejorar algo, abre un issue o pull request. 😊

## 📄 Licencia

MIT License. ¡Úsalo como quieras! 🚀


