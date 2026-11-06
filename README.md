# Guitar Master AI V1.9.1

## V1.9.1 · Sincronía

- **El audio manda el tiempo:** con un MP3 la pista espera a que el audio arranque de verdad (en el celular tarda) y se mantiene alineada con él.
- **⚙ Sincronía y retraso:** «Retraso del sonido» (audífonos Bluetooth) y «Retraso del micrófono» (detección de notas), guardados en el dispositivo, más un botón **🎯 Calibrar micrófono** que lo mide con 8 notas.

## V1.9

## Novedades de V1.9

- **MP3 → pista (experimental):** «🎵 MP3 → pista» convierte un MP3/WAV de tu galería en notas para la pista con el modelo Basic Pitch de Spotify, que corre en tu navegador (necesita internet la primera vez para descargar el modelo y sus librerías desde esm.sh/jsDelivr). Elige «melodía principal» o «todas las notas». Es una transcripción automática: en mezclas con batería y voz habrá errores. El audio original suena sincronizado y respeta la velocidad elegida; usa audífonos. Procesa hasta los primeros 4 minutos.

## V1.8

## Novedades de V1.8

- **Mis tablaturas:** en la pista, «＋ Agregar tablaturas» acepta varios archivos Guitar Pro a la vez (.gp3, .gp4, .gp5, .gpx, .gp) y los guarda en la misma biblioteca del dispositivo que usa el módulo Biblioteca. Quedan en una lista, sin volver a cargarlos. No se suben a ningún servidor ni a GitHub.
- **Selector de pista:** elige guitarra rítmica, solo, limpia, bajo, etc. del mismo arreglo.

## V1.7.1

## V1.7.1

- **Carga de archivos en el celular:** se quitó el filtro de extensiones de los selectores. Android e iOS atenuaban los `.gp3`/`.gp4`/`.gp5` porque no los reconocen; ahora se pueden elegir y la app valida la extensión al leerlos.

## V1.7

## Novedades de V1.7

- **Diagrama de dedos en la pista:** cada vez que llega una nota o acorde, un diagrama del mástil muestra qué dedo va en qué cuerda y traste.
- **Módulo «Las notas musicales»:** 6 lecciones para aprender Do-Re-Mi-Fa-Sol-La-Si por cuerdas, los sostenidos y Do mayor en dos octavas. La casilla «Nombres de nota» cambia el traste por el nombre de la nota en la pista.
- **Lecciones más largas:** todas duran al menos unos 48 pulsos. Ahora son 11 módulos y 43 lecciones.

## V1.6

## Novedades de V1.6

- **Diapasón y acordes:** 9 tipos de acorde en los 12 tonos con diagrama y dedos sugeridos, mástil con las notas del acorde o de 6 escalas, botón para escucharlo y para practicarlo en la pista.
- **Curso ampliado a 10 módulos y 37 lecciones:** 6 melodías más (La cucaracha, Estrellita, Fray Jacobo, Para Elisa, Noche de paz y una original 8-bit), acordes abiertos, cejilla móvil, bends, slides, vibrato, legato y tres solos largos.
- **Biblioteca de rock con 29 riffs originales**, 13 de ellos «al estilo de» bandas de referencia (con filtro por banda). No copian canciones; los temas exactos se cargan con Guitar Pro.
- **Velocidad del 25 % al 125 %** y logo renovado.
- Tablatura compacta: `2.8b2` = traste 8 con bend de 2 semitonos.

## V1.5

## Novedades de V1.5 (archivo `escuela.js`)

- **Curso práctico:** 6 módulos y 18 lecciones (cuerdas al aire, ritmo, melodías, power chords, riffs y solos). Cada lección se practica en la pista y se completa con 70 % de precisión; el avance se guarda en el dispositivo.
- **Pista estilo Rocksmith:** diapasón en perspectiva con cuerdas de color, trastes numerados, cuerda, traste y dedo en cada nota, cuenta previa, metrónomo, guía sonora y velocidad del 50 al 100 %.
- **Biblioteca de rock:** 16 riffs originales por estilo y nivel (blues rock, rock clásico, hard rock, punk, grunge, metal, balada, surf/rockabilly, sureño, indie). Para añadir más, agrega una línea a la lista `ROCK` de `escuela.js` con la tablatura compacta `cuerda.traste:pulsos` (cuerda 6 = grave, `+` acorde, `r` silencio).
- **Tus canciones:** en la pista, «Abrir Guitar Pro» convierte un `.gp3/.gp4/.gp5/.gpx/.gp` en notas que bajan por el diapasón.
- **Modo dos jugadores:** duelo en la misma canción con entrada propia por jugador (dos interfaces, o canal 1 y canal 2 de una estéreo), puntos, racha, precisión y ganador.
- Las lecciones, la pista y el duelo se verificaron con pruebas simuladas; la captura real del micrófono y la latencia deben probarse en tu dispositivo con HTTPS.

---


Aplicación web progresiva (PWA) en español para Windows y Android, preparada para publicarse en GitHub Pages.

## Correcciones principales de V1.4

- Reproductor MP3/WAV con botones visibles de reproducir y detener, estados de carga/reproducción y mensajes de error del decodificador del navegador.
- Reproducción MIDI con inicio explícito, parada, resaltado de notas y una síntesis electrónica de referencia. No es una grabación real de guitarra.
- Lector Guitar Pro actualizado a alphaTab 1.9.0 mediante el bundle UMD oficial de CDN, con worker/worklet y directorio de fuentes asociados al script. Los botones de reproducción solo se habilitan cuando alphaTab confirma que el motor de audio está listo.
- El modo Dúo puede reproducir MIDI, MP3/WAV y Guitar Pro en una sesión local compartida.
- Dúo local admite dos entradas de audio distintas o dos canales independientes de una interfaz estéreo. Si ambos jugadores eligen el mismo dispositivo, la aplicación intenta separar canal 1 y canal 2; si el dispositivo solo ofrece mono, muestra un error explicativo.
- Frecuencia mínima de detección ampliada para incluir notas graves de bajo.
- La práctica desde MIDI avanza automáticamente a la siguiente nota al reconocer correctamente la nota objetivo.
- El service worker ya no intercepta recursos externos del CDN ni sustituye archivos JavaScript externos por `index.html` cuando falla una descarga.

## Funciones

- Interfaz neón azul y naranja.
- Afinador cromático monofónico.
- Modo práctica con indicación de nota, cuerda, traste y dedo sugerido.
- Diapasón interactivo y lecciones básicas.
- Biblioteca con ejercicios originales de rock, hard rock y metal.
- Importación local de Guitar Pro (`.gp3`, `.gp4`, `.gp5`, `.gpx`, `.gp`), MIDI (`.mid`, `.midi`), MP3 y WAV.
- Almacenamiento de archivos en IndexedDB en el dispositivo, no en GitHub.
- Modo Dúo local: pantalla adaptable y detección de tono por entrada/canal para cada músico.

## Límites importantes (leer antes de probar)

- **MP3/WAV:** se reproducen como pista de acompañamiento. La app no extrae automáticamente la guitarra ni transforma una mezcla comercial en tablatura. Pulsa «Abrir» en la biblioteca y después «Reproducir audio».
- **MIDI:** se interpretan sus eventos de nota y tempo, se sugieren posiciones de guitarra y se reproduce una referencia sintetizada. El timbre es electrónico y no equivale a un amplificador o una guitarra grabada.
- **Guitar Pro:** el lector utiliza alphaTab 1.9.0 desde jsDelivr y necesita conexión a internet para descargar el lector, sus recursos y el SoundFont. La partitura cargada y el reproductor listo son estados distintos; el botón se habilita cuando el motor de audio está preparado. alphaTab admite Guitar Pro 3–8. Documentación: https://docs.alphatab.net/ .
- **Modo Dúo local:** ambos jugadores deben tener señales separadas. Se puede usar una interfaz por jugador, o una interfaz estéreo con canal 1 para el jugador 1 y canal 2 para el jugador 2. Dos micrófonos que capten la misma mezcla no permiten evaluar a cada persona por separado. Se recomienda usar audífonos para evitar que el sonido de los parlantes entre por los micrófonos.
- **Modo Dúo remoto:** dos dispositivos diferentes todavía no pueden emparejarse. Esa función requiere un servicio en línea para crear salas y sincronizar los dispositivos; GitHub Pages por sí solo solo aloja los archivos estáticos. El selector remoto aparece deshabilitado para no ofrecer una función que todavía no existe.
- La detección de audio es principalmente monofónica. No reconoce acordes completos ni separa instrumentos dentro de una mezcla. En Dúo se muestra la nota detectada y un recuento, no una puntuación rítmica de interpretación validada.
- Los archivos se almacenan localmente en el navegador. No se sincronizan entre Windows y Android; borrar los datos del sitio puede borrar la biblioteca.
- Límite de importación: 100 MB por archivo, sujeto a la cuota de almacenamiento que permita el navegador.

## Requisitos

- Chrome o Edge actualizado en Windows; Chrome actualizado en Android.
- HTTPS o `localhost` para usar micrófono/interfaz de audio. GitHub Pages utiliza HTTPS.
- Permisos de micrófono habilitados.
- Conexión a internet para el lector y reproducción Guitar Pro.

## Probar localmente en Windows

1. Extrae el ZIP.
2. Abre PowerShell o Terminal dentro de la carpeta que contiene `index.html`.
3. Ejecuta `py -m http.server 8000` (o `python -m http.server 8000`).
4. Abre `http://localhost:8000` en Chrome o Edge.

## Publicar/actualizar GitHub Pages

1. Extrae el ZIP.
2. Sube el **contenido** de la carpeta a la raíz del repositorio: `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, `.nojekyll`, `README.md`, `THIRD_PARTY_NOTICES.md` y `assets/`.
3. Acepta el reemplazo de los archivos anteriores y haz commit en la rama `main`.
4. En **Settings → Pages**, comprueba que la publicación use `main` y `/ (root)`.
5. Abre la URL de GitHub Pages y fuerza una recarga completa (`Ctrl + F5`). Si la app estaba instalada como PWA y sigue mostrando la versión anterior, cierra las pestañas de la app, vuelve a abrir la URL y espera a que el service worker nuevo tome el control.

## Prueba funcional después de publicar

1. **MP3/WAV:** importa un archivo pequeño que sepas que funciona, pulsa «Abrir» en la fila de biblioteca y luego «Reproducir audio». Confirma que el tiempo del reproductor avanza. Si no, revisa el mensaje de error que aparece debajo de los controles.
2. **MIDI:** importa un `.mid`, pulsa «Abrir» y «Reproducir MIDI». Debes oír la secuencia sintetizada y ver las notas resaltadas.
3. **Guitar Pro:** abre un `.gp5` conocido. Espera el estado «Reproductor listo» y después pulsa «Reproducir tablatura». Este paso requiere internet.
4. **Dúo:** entra en Modo dos jugadores, selecciona una canción, conecta primero el jugador 1 y luego el 2. Usa dos entradas físicas distintas o el canal 1 y canal 2 de una interfaz estéreo. Comprueba que cada panel muestre notas al tocar cada instrumento por separado y pulsa «Iniciar sesión compartida».
5. Prueba en Chrome de escritorio y vuelve a probar el modo adaptable en Android.

## Privacidad y licencias

Los archivos de audio y tablatura se procesan y almacenan en el navegador del usuario. No se suben automáticamente a GitHub ni a un servidor Guitar Master AI. No publiques canciones comerciales o tablaturas protegidas en un repositorio público si no tienes derechos para compartirlas. El lector Guitar Pro usa alphaTab bajo licencia MPL-2.0; consulta `THIRD_PARTY_NOTICES.md`.
