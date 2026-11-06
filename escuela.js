(() => {
"use strict";
const $ = id => document.getElementById(id);
const ABIERTA = {1:64,2:59,3:55,4:50,5:45,6:40};            // cuerda 1 = la más aguda
const NOM = ["Do","Do#","Re","Re#","Mi","Fa","Fa#","Sol","Sol#","La","La#","Si"];
const nom = m => NOM[((m % 12) + 12) % 12] + (Math.floor(m / 12) - 1);
const CUERDA_NOM = {1:"Mi",2:"Si",3:"Sol",4:"Re",5:"La",6:"Mi"};
const RS = ["#e5483d","#f2c230","#3b8fe8","#f08a2e","#3fc46b","#b45be0"];
const DEDO = ["al aire","1 (índice)","2 (medio)","3 (anular)","4 (meñique)"];
const R = (t, n) => Array(n).fill(t).join(" ");
const ARANA = [6,5,4,3,2,1].map(s => [1,2,3,4].map(f => `${s}.${f}:.5`).join(" ")).join(" ");
const toast = m => { const e = $("toast"); if (!e) return; e.textContent = m; e.classList.add("show"); setTimeout(() => e.classList.remove("show"), 2800); };

/* ================= CONTENIDO =================
   Tablatura compacta: cuerda.traste:pulsos  (cuerda 6 = grave, 1 = aguda; "+" = acorde; r = silencio) */
const CURSO = [
 {n:"1 · Primeros pasos", d:"Postura, cuerdas al aire y trastes con un dedo por traste.", l:[
  {t:"Las seis cuerdas al aire", b:60, x:"De la más gruesa a la más fina: Mi, La, Re, Sol, Si, Mi. Toca con la púa y deja sonar cada cuerda completa. Espalda recta, muñeca izquierda relajada y el pulgar detrás del mástil.", tab:"6.0:1 5.0:1 4.0:1 3.0:1 2.0:1 1.0:1 1.0:1 2.0:1 3.0:1 4.0:1 5.0:1 6.0:1"},
  {t:"Un dedo por traste", b:60, x:"En la cuerda 1 usa un dedo por traste: índice en el 1, medio en el 2, anular en el 3, meñique en el 4. Presiona cerca del traste (no encima) con la yema del dedo.", tab:"1.0:1 1.1:1 1.2:1 1.3:1 1.4:1 1.3:1 1.2:1 1.1:1 1.0:2"},
  {t:"Ejercicio de araña 1-2-3-4", b:70, x:"El ejercicio clásico para coordinar ambas manos: los trastes 1-2-3-4 en cada cuerda, de la 6 a la 1. Mantén los dedos cerca del mástil y toca siempre alternando púa abajo-arriba.", tab:ARANA}]},
 {n:"2 · Ritmo y púa", d:"Pulso constante, alternar la púa y silencios.", l:[
  {t:"Negras y silencios", b:70, x:"El ritmo importa más que las notas. Cuenta 1-2-3-4 en voz alta; toca en los tiempos y deja que el silencio también dure su tiempo.", tab:R("6.0:1 r:1",6)},
  {t:"Corcheas con púa alternada", b:80, x:"Dos notas por pulso: abajo en el tiempo, arriba en el 'y'. La muñeca se mueve como un péndulo, sin parar, aunque no toques una cuerda.", tab:R("5.0:.5",16)},
  {t:"Palm mute en cuerda grave", b:90, x:"Apoya el canto de la mano derecha sobre las cuerdas junto al puente para apagar el sonido. Es la base del rock y el metal.", tab:R("6.0:.5",8)+" "+R("5.0:.5",8)}]},
 {n:"3 · Primeras melodías", d:"Melodías conocidas de dominio público y la pentatónica.", l:[
  {t:"Oda a la alegría", b:80, x:"Melodía de Beethoven (dominio público) en las cuerdas 1 y 2. Tócala despacio y suave: sirve para dominar cambios de cuerda.", tab:"1.0:1 1.0:1 1.1:1 1.3:1 1.3:1 1.1:1 1.0:1 2.3:1 2.1:1 2.1:1 2.3:1 1.0:1 1.0:1.5 2.3:.5 2.3:2"},
  {t:"Jingle Bells", b:100, x:"Otra melodía tradicional. Practica repetir la misma nota con púa alternada.", tab:"1.0:1 1.0:1 1.0:2 1.0:1 1.0:1 1.0:2 1.0:1 1.3:1 2.1:1.5 2.3:.5 1.0:4"},
  {t:"Pentatónica menor de Mi", b:80, x:"La escala base del rock y el blues: Mi, Sol, La, Si, Re. Sube y baja sin mirar el mástil cuando la tengas memorizada.", tab:"6.0:.5 6.3:.5 5.0:.5 5.2:.5 4.0:.5 4.2:.5 3.0:.5 3.2:.5 2.0:.5 2.3:.5 1.0:.5 1.3:.5 1.0:.5 2.3:.5 2.0:.5 3.2:.5 3.0:.5 4.2:.5 4.0:.5 5.2:.5 5.0:.5 6.3:.5 6.0:2"}]},
 {n:"4 · Power chords y acordes", d:"Los acordes del rock: quintas, blues de 12 compases y arpegios.", l:[
  {t:"Power chords en Mi, La y Re", b:80, x:"Un power chord usa dos cuerdas: la fundamental con el índice y la quinta dos trastes más adelante con el anular. Cambia de forma sin levantar la mano del mástil.", tab:"6.0+5.2:2 5.0+4.2:2 4.0+3.2:2 5.0+4.2:2"},
  {t:"Blues de 12 compases en La", b:90, x:"La estructura de miles de canciones: La (4 compases), Re (2), La (2), Mi, Re, La, Mi. Cuenta los compases mientras tocas.", tab:"5.0+4.2:4 5.0+4.2:4 5.0+4.2:4 5.0+4.2:4 4.0+3.2:4 4.0+3.2:4 5.0+4.2:4 5.0+4.2:4 6.0+5.2:4 4.0+3.2:4 5.0+4.2:4 6.0+5.2:4"},
  {t:"Arpegio en Mi menor", b:70, x:"Toca las cuerdas del acorde una por una, de abajo hacia arriba y de regreso. Deja que las notas suenen juntas.", tab:R("6.0:.5 5.2:.5 4.2:.5 3.0:.5 2.0:.5 1.0:.5 2.0:.5 3.0:.5",3)}]},
 {n:"5 · Riffs y técnica", d:"Riffs, boogie y la caja 1 de la pentatónica.", l:[
  {t:"Riff de blues rock", b:100, x:"Alterna la quinta con la sexta moviendo el meñique dos trastes: el sonido del boogie y del blues rock.", tab:R("5.0+4.2:.5 5.0+4.4:.5",4)+" "+R("4.0+3.2:.5 4.0+3.4:.5",2)+" "+R("5.0+4.2:.5 5.0+4.4:.5",2)},
  {t:"Caja 1 de La menor pentatónica", b:90, x:"La posición más usada en solos, en el traste 5. Memoriza el dibujo: dos notas por cuerda.", tab:"6.5:.5 6.8:.5 5.5:.5 5.7:.5 4.5:.5 4.7:.5 3.5:.5 3.7:.5 2.5:.5 2.8:.5 1.5:.5 1.8:.5 1.5:.5 2.8:.5 2.5:.5 3.7:.5 3.5:.5 4.7:.5 4.5:.5 5.7:.5 5.5:.5 6.8:.5 6.5:2"},
  {t:"Riff cromático", b:100, x:"Cuatro dedos, cuatro trastes seguidos: ideal para ganar independencia y fuerza.", tab:R("6.0:.5 6.1:.5 6.2:.5 6.3:.5 6.2:.5 6.1:.5",3)+" 6.0:2"}]},
 {n:"6 · Solos y velocidad", d:"Galope, frases de solo y velocidad progresiva.", l:[
  {t:"Galope de metal", b:110, x:"Dos semicorcheas y una corchea: el ritmo de caballo del heavy metal. Púa abajo-abajo-arriba.", tab:R("6.0:.25 6.0:.25 6.0:.5",8)+" "+R("6.3:.25 6.3:.25 6.3:.5",4)},
  {t:"Frase de solo en La menor", b:90, x:"Una frase original con la pentatónica: busca darle emoción con vibrato en la última nota larga.", tab:"2.5:.5 2.8:.5 1.5:1 1.8:.5 1.5:.5 2.8:1 2.5:2"},
  {t:"Pentatónica a toda velocidad", b:120, x:"La misma caja 1, pero a 120 BPM. Si fallas, baja la velocidad al 70% y sube de a poco.", tab:R("6.5:.25 6.8:.25 5.5:.25 5.7:.25 4.5:.25 4.7:.25 3.5:.25 3.7:.25",3)+" 6.5:2"}]}
];
const ROCK = [
 ["Shuffle de blues en La","Blues rock",1,90,R("5.0+4.2:.5 5.0+4.4:.5",4)+" "+R("4.0+3.2:.5 4.0+3.4:.5",2)+" "+R("5.0+4.2:.5 5.0+4.4:.5",2)+" 6.0+5.2:1 4.0+3.2:1 5.0+4.2:2"],
 ["Boogie en Mi","Rock clásico",1,110,R("6.0:.5 6.4:.5 5.2:.5 5.4:.5 5.2:.5 6.4:.5",4)],
 ["Rock and roll de los 50","Rock clásico",2,130,R("5.0+4.2:.5 5.0+4.4:.5",2)+" "+R("4.0+3.2:.5 4.0+3.4:.5",1)+" "+R("5.0+4.2:.5 5.0+4.4:.5",1)+" 6.0+5.2:1 4.0+3.2:1 5.0+4.2:2"],
 ["Power chords I–IV–V en Re","Hard rock",2,110,"4.0+3.2:1 4.0+3.2:.5 4.0+3.2:.5 5.0+4.2:1 5.0+4.2:1 6.0+5.2:1 6.0+5.2:.5 6.0+5.2:.5 5.0+4.2:2 4.0+3.2:2"],
 ["Riff pentatónico de hard rock","Hard rock",3,130,"5.0:.5 5.0:.5 4.2:.5 5.0:.5 4.0:.5 5.0:.5 4.2:.5 3.0:.5 5.0:.5 5.0:.5 4.2:.5 5.0:.5 4.0:.5 4.2:.5 3.0:.5 4.2:.5"],
 ["Riff cromático pesado","Hard rock",3,120,R("6.0:.5 6.1:.5 6.2:.5 6.1:.5",3)+" 6.0:1 6.3:1 6.0:1 5.2:1"],
 ["Punk a toda velocidad","Punk",1,160,R("6.0+5.2:.5",4)+" "+R("5.0+4.2:.5",4)+" "+R("6.0+5.2:.5",4)+" "+R("5.2+4.4:.5",4)],
 ["Punk de tres acordes","Punk",1,150,R("5.0+4.2:.5",4)+" "+R("4.0+3.2:.5",4)+" "+R("6.0+5.2:.5",4)+" "+R("5.0+4.2:.5",4)],
 ["Grunge lento en Mi","Grunge",2,80,"6.0+5.2:2 6.3+5.5:1 6.5+5.7:1 6.3+5.5:2 6.0+5.2:2 6.0+5.2:1 r:1 6.3+5.5:2 6.0+5.2:2"],
 ["Galope metal en Mi","Metal",2,140,R("6.0:.25 6.0:.25 6.0:.5",8)+" "+R("6.3:.25 6.3:.25 6.3:.5",4)+" "+R("6.5:.25 6.5:.25 6.5:.5",4)],
 ["Metal con power chords cromáticos","Metal",3,150,R("6.0+5.2:.25",4)+" 6.1+5.3:.5 6.2+5.4:.5 "+R("6.0+5.2:.25",4)+" 6.3+5.5:.5 6.2+5.4:.5 "+R("6.0+5.2:.25",4)+" 6.5+5.7:1 6.3+5.5:1"],
 ["Balada: arpegio Em–C–G–D","Balada rock",1,72,R("6.0:.5 5.2:.5 4.2:.5 3.0:.5 2.0:.5 1.0:.5",1)+" "+"5.3:.5 4.2:.5 3.0:.5 2.1:.5 1.0:.5 2.1:.5 "+"6.3:.5 4.0:.5 3.0:.5 2.0:.5 1.3:.5 2.0:.5 "+"4.0:.5 3.2:.5 2.3:.5 1.2:.5 2.3:.5 3.2:.5"],
 ["Surf con trémolo","Surf y rockabilly",3,150,R("2.0:.25",8)+" "+R("2.3:.25",8)+" "+R("1.0:.25",8)+" "+R("2.3:.25",8)],
 ["Rockabilly con bajo caminante","Surf y rockabilly",2,120,R("5.0:.5 5.4:.5 4.2:.5 4.4:.5 4.5:.5 4.4:.5 4.2:.5 5.4:.5",2)],
 ["Lick de rock sureño en Sol","Rock sureño",2,100,R("2.0:.5 2.3:.5 1.0:1 2.3:.5 2.0:.5 3.2:.5 3.0:1",2)],
 ["Indie con octavas","Indie y alternativo",2,110,R("6.0+4.2:.5",2)+" 6.3+4.5:.5 6.5+4.7:.5 "+R("6.0+4.2:.5",2)+" 6.3+4.5:.5 5.0+3.2:.5"]
];


/* ---- ampliación: más melodías, acordes, cejilla, técnicas y solos ---- */
CURSO[2].l.push(
 {t:"La cucaracha (tradicional)", b:100, x:"Folclor mexicano de dominio público. Practica el ritmo saltarín y los saltos de cuerda.", tab:"2.1:.5 2.1:.5 2.1:.5 1.1:1 1.5:2 2.1:.5 2.1:.5 2.1:.5 1.1:1 1.5:2 1.1:.5 1.1:.5 1.0:.5 1.0:.5 2.3:.5 2.3:.5 2.1:2"},
 {t:"Estrellita", b:90, x:"Canción infantil tradicional: ideal para repetir notas con púa alternada.", tab:"2.1:1 2.1:1 1.3:1 1.3:1 1.5:1 1.5:1 1.3:2 1.1:1 1.1:1 1.0:1 1.0:1 2.3:1 2.3:1 2.1:2"},
 {t:"Fray Jacobo", b:90, x:"Melodía tradicional en canon: tócala con un amigo empezando dos compases después.", tab:R("2.1:1 2.3:1 1.0:1 2.1:1",2)+" "+R("1.0:1 1.1:1 1.3:2",2)+" "+R("1.3:.5 1.5:.5 1.3:.5 1.1:.5 1.0:1 2.1:1",2)+" "+R("2.1:1 3.0:1 2.1:2",2)},
 {t:"Para Elisa (inicio)", b:90, x:"Beethoven, dominio público. El vaivén entre Mi y Re sostenido pide dedos ágiles y relajados.", tab:"1.0:.5 2.4:.5 1.0:.5 2.4:.5 1.0:.5 2.0:.5 2.3:.5 2.1:.5 3.2:1.5 5.0:.5 4.2:.5 3.2:.5 2.0:1.5 4.2:.5 3.1:.5 2.0:.5 2.1:1.5"},
 {t:"Noche de paz", b:70, x:"Villancico tradicional. Toca suave y sostén cada nota hasta el siguiente pulso.", tab:"1.3:1.5 1.5:.5 1.3:1 1.0:3 1.3:1.5 1.5:.5 1.3:1 1.0:3 1.10:2 1.10:1 1.7:3 1.8:2 1.8:1 1.3:3"},
 {t:"Aventura 8-bit (original)", b:140, x:"Melodía original con aire de videojuego clásico: notas cortas, silencios y saltos. (El tema de Mario es de Nintendo y no se puede reproducir.)", tab:"1.0:.25 1.0:.25 r:.25 1.0:.25 r:.25 1.1:.25 1.3:.5 r:.5 3.0:.5 r:.5 1.3:.25 1.0:.25 2.0:.25 2.3:.25 1.0:1"}
);
CURSO.push(
 {n:"7 · Todos los acordes", d:"Abiertos, menores y séptimas. En «Diapasón» tienes los 12 tonos con 9 tipos de acorde.", l:[
  {t:"Acordes mayores abiertos", b:60, x:"Do, Re, Mi, Sol y La. Mira cada forma en el módulo Diapasón y toca de grave a aguda para comprobar que todas las cuerdas suenen limpias.", tab:"5.3+4.2+3.0+2.1+1.0:2 4.0+3.2+2.3+1.2:2 6.0+5.2+4.2+3.1+2.0+1.0:2 6.3+5.2+4.0+3.0+2.0+1.3:2 5.0+4.2+3.2+2.2+1.0:2"},
  {t:"Menores y de séptima", b:60, x:"Am, Em, Dm, E7 y A7: los acordes de la tristeza, la tensión y el blues.", tab:"5.0+4.2+3.2+2.1+1.0:2 6.0+5.2+4.2+3.0+2.0+1.0:2 4.0+3.2+2.3+1.1:2 6.0+5.2+4.0+3.1+2.0+1.0:2 5.0+4.2+3.0+2.2+1.0:2"},
  {t:"Cambios: Do–Sol–Lam–Fa", b:70, x:"La progresión de miles de canciones. Prepara el siguiente acorde durante el último pulso para cambiar sin parar el ritmo.", tab:R("5.3+4.2+3.0+2.1+1.0:2 6.3+5.2+4.0+3.0+2.0+1.3:2 5.0+4.2+3.2+2.1+1.0:2 4.3+3.2+2.1+1.0:2",2)}]},
 {n:"8 · Cejilla", d:"Acordes móviles: aprende una forma y tendrás los doce tonos.", l:[
  {t:"Cejilla en Fa mayor", b:60, x:"El índice presiona las seis cuerdas en el traste 1 y los otros dedos arman la forma de Mi. Presiona con el lado del dedo, no con la yema.", tab:R("6.1+5.3+4.3+3.2+2.1+1.1:4",3)},
  {t:"Forma de Mi móvil: Fa, Sol, La, Si", b:60, x:"La misma forma se desliza por el mástil: el traste de la cejilla da el nombre del acorde.", tab:"6.1+5.3+4.3+3.2+2.1+1.1:2 6.3+5.5+4.5+3.4+2.3+1.3:2 6.5+5.7+4.7+3.6+2.5+1.5:2 6.7+5.9+4.9+3.8+2.7+1.7:2"},
  {t:"Forma de La móvil: Si♭, Do, Re, Mi", b:60, x:"Otra forma, con la raíz en la quinta cuerda. Con las dos formas tocas cualquier acorde mayor.", tab:"5.1+4.3+3.3+2.3+1.1:2 5.3+4.5+3.5+2.5+1.3:2 5.5+4.7+3.7+2.7+1.5:2 5.7+4.9+3.9+2.9+1.7:2"}]},
 {n:"9 · Técnicas expresivas", d:"Bends, slides, vibrato y legato: lo que hace que la guitarra «cante».", l:[
  {t:"Bend de un tono", b:70, x:"Empuja la cuerda hacia arriba con tres dedos hasta llegar a la nota dos trastes más aguda. En la pista, 8↑ es el traste 8 con bend: la app espera la nota de destino. Compruébala con el afinador.", tab:R("2.8:1 2.8b2:2 r:1",3)},
  {t:"Bend de medio tono", b:70, x:"Un bend corto, de un solo traste de diferencia. Es el «lamento» típico del blues.", tab:R("1.5:1 1.5b1:2 r:1",3)},
  {t:"Slides", b:80, x:"Pulsa la nota, no sueltes y desliza el dedo hasta la siguiente manteniendo la presión.", tab:R("4.5:.5 4.7:1.5",2)+" "+R("4.7:.5 4.5:1.5",2)+" "+R("3.5:.5 3.9:1.5",2)},
  {t:"Vibrato y legato", b:70, x:"Vibrato: mueve el dedo y la muñeca como abanicando sobre notas largas. Legato: sube (hammer-on) y baja (pull-off) con los dedos sin volver a tocar con la púa.", tab:"2.8:2 1.5:2 1.8:4 "+R("3.5:.5 3.7:.5",4)+" "+R("2.5:.5 2.8:.5",4)}]},
 {n:"10 · Solos largos", d:"Frases completas para improvisar con sentido.", l:[
  {t:"Solo en La menor", b:90, x:"Ocho compases de pregunta y respuesta. Cuando lo domines, cambia el orden y el ritmo de las frases para hacerlo tuyo.", tab:"1.5:.5 1.8:.5 1.5:.5 2.8:.5 2.5:1 2.8:.5 2.5:.5 3.7:1 3.5:1 3.5:.5 3.7:.5 2.5:.5 2.8:.5 1.5:1 1.8:1 2.8b2:2 r:1 1.8:.5 1.5:.5 2.8:.5 2.5:.5 3.7:.5 3.5:.5 4.7:.5 4.5:.5 5.7:.5 5.5:.5 6.8:.5 6.5:3"},
  {t:"Solo de blues en Mi", b:80, x:"Escala de blues arriba en el mástil. Respira entre frases: los silencios también son música.", tab:"1.12:1 1.10:.5 1.7:.5 1.5:1 1.6:.5 1.5:.5 1.3:1 1.0:1 r:1 2.3:.5 2.0:.5 3.2:1 3.0:1 2.0:.5 2.3:.5 1.0:1 1.3:.5 1.5:.5 1.6:.5 1.5:.5 1.3:1 1.0:2"},
  {t:"Solo melódico con bends", b:80, x:"Mezcla pentatónica, bends y slides en una sola frase cantable.", tab:"2.5:1 2.8b2:2 r:1 1.5:.5 1.8:.5 1.5:1 2.8:.5 2.5:.5 3.7:1 3.5:2"}]}
);
/* Riffs originales «al estilo de» cada banda: no copian sus canciones; para temas exactos usa tu archivo Guitar Pro. */
ROCK.push(
 ["Estadio melódico en La","Hard rock",1,100,R("5.0:.5 4.2:.5 3.2:.5 2.0:.5 3.2:.5 4.2:.5",2)+" "+R("4.0:.5 3.2:.5 2.3:.5 1.2:.5 2.3:.5 3.2:.5",2)+" 6.0+5.2:1 5.0+4.2:1 4.0+3.2:2","Def Leppard"],
 ["Funk metal sincopado","Metal",3,110,R("6.0:.25 6.0:.25 r:.5 6.0:.25 6.0:.25 6.3:.5 6.2:.5",4)+" 6.0+5.2:1","Extreme"],
 ["Riff callejero en Re","Hard rock",2,110,R("4.0:.5 4.3:.5 3.0:.5 3.2:.5 3.0:.5 4.3:.5",2)+" 4.0:2","Guns N' Roses"],
 ["Swing blusero en Mi","Blues rock",2,95,R("6.0:1 6.3:.5 6.0:.5 5.2:1 6.3:.5 6.0:.5 6.5:.5 6.3:.5 6.0:1",2),"Aerosmith"],
 ["Punk metal en Mi","Punk",2,150,R("6.0+5.2:.5",4)+" "+R("6.3+5.5:.5",2)+" "+R("6.5+5.7:.5",2)+" "+R("6.3+5.5:.5",2)+" "+R("6.0+5.2:.5",4),"Skid Row"],
 ["Thrash con palm mute","Metal",3,140,R(R("6.0:.25",6)+" 6.1:.25 6.0:.25",3)+" "+R("6.3+5.5:.25",4)+" "+R("6.2+5.4:.25",4)+" 6.0+5.2:1","Metallica"],
 ["Stomp teatral de estadio","Rock clásico",1,110,R("5.0+4.2:1 5.0+4.2:1 5.0+4.2:.5 r:.5 5.0+4.2:1",2)+" "+"4.0+3.2:1 4.0+3.2:1 4.0+3.2:.5 r:.5 4.0+3.2:1 "+"6.0+5.2:1 6.0+5.2:1 6.0+5.2:.5 r:.5 6.0+5.2:1","Queen"],
 ["Blues pesado sincopado en La","Blues rock",2,100,R("5.0:.5 5.0:.5 r:.5 5.3:.5 5.0:.5 4.2:.5 4.0:.5 5.3:.5 5.0:1",2),"Led Zeppelin"],
 ["Rock de estadio en Re","Hard rock",1,115,"4.0+3.2:1 4.0+3.2:.5 4.0+3.2:.5 5.0+4.2:1 5.0+4.2:1 6.3+5.5:1 6.3+5.5:.5 6.3+5.5:.5 5.0+4.2:2 "+R("4.0+3.2:.5",4),"Bon Jovi"],
 ["Riff blusero con slides","Blues rock",2,90,R("6.0:.5 6.3:.5 6.5:.5 6.6:.5 6.5:.5 6.3:.5 6.0:1",2)+" "+"5.0:.5 5.3:.5 5.5:.5 5.6:.5 5.5:.5 5.3:.5 5.0:1","Cinderella"],
 ["Balada acústica sureña","Balada rock",1,76,"6.3:.5 4.0:.5 3.0:.5 2.0:.5 1.3:.5 2.0:.5 5.3:.5 4.2:.5 3.0:.5 2.1:.5 1.0:.5 2.1:.5 4.0:.5 3.2:.5 2.3:.5 1.2:.5 2.3:.5 3.2:.5 6.0:.5 5.2:.5 4.2:.5 3.0:.5 2.0:.5 1.0:.5","Tesla"],
 ["Glam de fiesta","Glam y hair metal",1,125,R("5.0+4.2:.5 5.0+4.2:.5 4.0+3.2:.5 4.0+3.2:.5 6.0+5.2:1",2)+" "+R("5.0+4.2:.5",4),"Poison"],
 ["Blues metal lento en Mi","Hard rock",2,75,"6.0+5.2:2 6.3+5.5:1 6.0+5.2:1 6.5+5.7:2 6.3+5.5:1 6.0+5.2:1 3.0:.5 3.2:.5 2.0:.5 2.3:.5 1.0:2","Whitesnake"]
);


/* ---- módulo de las notas musicales y lecciones más largas ---- */
const UPDOWN = (a, d = 1) => a.map(t => t + ":" + d).join(" ") + " " + [...a].reverse().slice(1).map(t => t + ":" + d).join(" ");
CURSO.forEach((m, i) => { m.k = i; });                       // clave fija: el progreso guardado no cambia
CURSO.unshift({k:"n", n:"0 · Las notas musicales", d:"Aprende los nombres Do, Re, Mi, Fa, Sol, La, Si en el mástil.", l:[
  {t:"Las 7 notas: Do Re Mi Fa Sol La Si", b:60, x:"Las notas se llaman Do, Re, Mi, Fa, Sol, La, Si y luego vuelve a empezar. Toca de abajo hacia arriba diciendo cada nombre en voz alta: la pista lo muestra en «Pide».", tab:UPDOWN(["5.3","4.0","4.2","4.3","3.0","3.2","2.0","2.1"])},
  {t:"Notas en la cuerda 1 (Mi aguda)", b:60, x:"Mi, Fa, Sol, La, Si, Do, Re, Mi. Entre Mi–Fa y Si–Do hay un solo traste; en las demás, dos. Es la regla que ordena todo el mástil.", tab:UPDOWN(["1.0","1.1","1.3","1.5","1.7","1.8","1.10","1.12"])},
  {t:"Notas en la cuerda 5 (La)", b:60, x:"La, Si, Do, Re, Mi, Fa, Sol, La. Misma regla en otra cuerda: así se aprende dónde está cada nota.", tab:UPDOWN(["5.0","5.2","5.3","5.5","5.7","5.8","5.10","5.12"])},
  {t:"Notas en la cuerda 6 (Mi grave)", b:60, x:"Mi, Fa, Sol, La, Si, Do, Re, Mi con las notas graves. Memoriza la cuerda 6: de ahí salen los acordes con cejilla.", tab:UPDOWN(["6.0","6.1","6.3","6.5","6.7","6.8","6.10","6.12"])},
  {t:"Sostenidos: las 12 notas", b:70, x:"Entre casi todas las notas hay otra intermedia (sostenido #). Un traste = medio tono: Mi, Fa, Fa#, Sol, Sol#, La, La#, Si, Do, Do#, Re, Re#, Mi.", tab:UPDOWN(Array.from({length:13}, (_, i) => "6." + i), .5)},
  {t:"Do mayor en dos octavas", b:70, x:"Junta todo: Do Re Mi Fa Sol La Si Do Re Mi Fa Sol La Si Do, subiendo y bajando por las seis cuerdas.", tab:UPDOWN(["5.3","4.0","4.2","4.3","3.0","3.2","2.0","2.1","2.3","1.0","1.1","1.3","1.5","1.7","1.8"], .5)}]});
const beatsTab = t => t.trim().split(/\s+/).reduce((s, k) => s + (+k.split(":")[1] || 1), 0);
CURSO.forEach(m => m.l.forEach(l => { const b = beatsTab(l.tab); if (b < 48) l.tab = R(l.tab, Math.min(8, Math.ceil(48 / b))); }));   // mínimo ≈ 48 pulsos

/* ================= DIAPASÓN Y ACORDES ================= */
const AFIN = [40,45,50,55,59,64];                          // cuerdas 6→1
const LET = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const TIPOS = {"":"Mayor","m":"Menor","7":"Séptima","m7":"Menor 7","maj7":"Mayor 7","sus4":"Sus4","sus2":"Sus2","5":"Power chord","dim":"Disminuido"};
const ESC = {acorde:null, mayor:[0,2,4,5,7,9,11], menor:[0,2,3,5,7,8,10], pentm:[0,3,5,7,10], pentM:[0,2,4,7,9], blues:[0,3,5,6,7,10], todas:[0,1,2,3,4,5,6,7,8,9,10,11]};
const FORMAS = {"":[[0,2,2,1,0,0],[-1,0,2,2,2,0]],"m":[[0,2,2,0,0,0],[-1,0,2,2,1,0]],"7":[[0,2,0,1,0,0],[-1,0,2,0,2,0]],"m7":[[0,2,0,0,0,0],[-1,0,2,0,1,0]],"maj7":[[0,2,1,1,0,0],[-1,0,2,1,2,0]],"sus4":[[0,2,2,2,0,0],[-1,0,2,2,3,0]],"sus2":[null,[-1,0,2,2,0,0]],"5":[[0,2,2,-1,-1,-1],[-1,0,2,2,-1,-1]],"dim":[null,[-1,0,1,2,1,-1]]};
const ABIERTOS = {C:[-1,3,2,0,1,0],D:[-1,-1,0,2,3,2],E:[0,2,2,1,0,0],G:[3,2,0,0,0,3],A:[-1,0,2,2,2,0],Am:[-1,0,2,2,1,0],Em:[0,2,2,0,0,0],Dm:[-1,-1,0,2,3,1],A7:[-1,0,2,0,2,0],E7:[0,2,0,1,0,0],D7:[-1,-1,0,2,1,2],G7:[3,2,0,0,0,1],C7:[-1,3,2,3,1,0],B7:[-1,2,1,2,0,2],Cmaj7:[-1,3,2,0,0,0],Fmaj7:[-1,-1,3,2,1,0],Am7:[-1,0,2,0,1,0],Em7:[0,2,0,0,0,0],Dmaj7:[-1,-1,0,2,2,2],Asus2:[-1,0,2,2,0,0],Asus4:[-1,0,2,2,3,0],Dsus4:[-1,-1,0,2,3,3],Dsus2:[-1,-1,0,2,3,0],Esus4:[0,2,2,2,0,0]};
const DIF = {raiz:9, tipo:"", modo:"acorde"};
function acorde(r, tipo){
  const k = LET[r] + tipo; if (ABIERTOS[k]) return {f:ABIERTOS[k], base:0};
  const sh = FORMAS[tipo], c = []; if (!sh) return null;
  if (sh[0]) c.push([(r + 8) % 12, sh[0]]);                 // forma de Mi (raíz en la 6ª cuerda)
  if (sh[1]) c.push([(r + 3) % 12, sh[1]]);                 // forma de La (raíz en la 5ª cuerda)
  if (!c.length) return null; c.sort((a, b) => a[0] - b[0]);
  const [base, f] = c[0]; return {f:f.map(x => x < 0 ? -1 : x + base), base};
}
function dedosAc(a){
  const idx = []; a.f.forEach((f, i) => { if (f > 0) idx.push([f, i]); }); idx.sort((x, y) => x[0] - y[0] || x[1] - y[1]);
  const d = Array(6).fill(0); let n = a.base > 0 ? 2 : 1;
  idx.forEach(([f, i]) => { d[i] = (a.base > 0 && f === a.base) ? 1 : Math.min(4, n++); }); return d;
}
function dibujarDiag(cv, items, mudas, cw, ch, ns = 6){
  const c = cv.getContext("2d"), d = devicePixelRatio || 1, W = 220, H = 250, k = cw / W;
  cv.width = cw * d; cv.height = ch * d; cv.style.width = cw + "px"; cv.style.height = ch + "px"; c.setTransform(d * k, 0, 0, d * k, 0, 0); c.clearRect(0, 0, W, ch / k);
  c.textAlign = "center"; c.textBaseline = "middle"; c.font = "600 14px Segoe UI, system-ui, sans-serif";
  if (!items.length){ c.fillStyle = "#8da3b8"; c.fillText("Sin notas", W / 2, H / 2); return; }
  const x0 = 40, dx = 140 / (ns - 1), y0 = 50, dy = 36, fr = items.filter(i => i.f > 0).map(i => i.f);
  let ini = fr.length && Math.min(...fr) > 1 ? Math.min(...fr) : 1; if (fr.length && Math.max(...fr) - ini > 4) ini = Math.max(...fr) - 4;
  for (let s = 0; s < ns; s++){ const x = x0 + s * dx; c.fillStyle = "#cfe0f0"; if (mudas.has(s)) c.fillText("×", x, 30); else if (items.some(i => i.s === s && i.f === 0)){ c.strokeStyle = "#cfe0f0"; c.lineWidth = 2; c.beginPath(); c.arc(x, 30, 6, 0, 6.3); c.stroke(); } }
  c.strokeStyle = "#4b6178";
  for (let r = 0; r <= 5; r++){ c.lineWidth = (r === 0 && ini === 1) ? 5 : 1.5; c.beginPath(); c.moveTo(x0, y0 + r * dy); c.lineTo(x0 + (ns - 1) * dx, y0 + r * dy); c.stroke(); }
  c.lineWidth = 1.5; for (let s = 0; s < ns; s++){ c.beginPath(); c.moveTo(x0 + s * dx, y0); c.lineTo(x0 + s * dx, y0 + 5 * dy); c.stroke(); }
  if (ini > 1){ c.fillStyle = "#ff9638"; c.textAlign = "right"; c.fillText("traste " + ini, x0 + (ns - 1) * dx, y0 - 22); c.textAlign = "center"; }
  const bar = new Set();                                    // cejilla: varias cuerdas con el dedo 1 en el mismo traste
  Object.entries(items.filter(i => i.f > 0 && i.d === 1).reduce((m, i) => ((m[i.f] = m[i.f] || []).push(i.s), m), {})).forEach(([f, ss]) => {
    if (ss.length < 2) return; ss.sort((p, q) => p - q); const y = y0 + (+f - ini + .5) * dy;
    c.strokeStyle = "#ff9638"; c.lineWidth = 16; c.lineCap = "round"; c.beginPath(); c.moveTo(x0 + ss[0] * dx, y); c.lineTo(x0 + ss[ss.length - 1] * dx, y); c.stroke(); c.lineCap = "butt";
    ss.forEach((s, j) => { if (j) bar.add(f + ":" + s); });
  });
  items.forEach(i => {
    if (i.f <= 0 || bar.has(i.f + ":" + i.s)) return; const x = x0 + i.s * dx, y = y0 + (i.f - ini + .5) * dy, barre = i.d === 1 && items.some(o => o !== i && o.f === i.f && o.d === 1);
    if (!barre){ c.fillStyle = RS[i.s % 6]; c.beginPath(); c.arc(x, y, 11, 0, 6.3); c.fill(); }
    c.fillStyle = "#0b1016"; c.fillText(i.d >= 1 ? String(i.d) : "", x, y + 1);
  });
}
function dibujarAcorde(a){
  const cv = $("dCh");
  if (!a){ dibujarDiag(cv, [], new Set(), 220, 250); const c = cv.getContext("2d"); c.fillStyle = "#8da3b8"; c.textAlign = "center"; c.font = "600 13px Segoe UI, system-ui, sans-serif"; c.fillText("Esta forma no existe para este acorde", cv.width / (devicePixelRatio || 1) / 2, 125); return; }
  const dd = dedosAc(a);
  dibujarDiag(cv, a.f.map((f, s) => f >= 0 ? {s, f, d:dd[s]} : null).filter(Boolean), new Set(a.f.map((f, s) => f < 0 ? s : -1).filter(s => s >= 0)), 220, 250);
}
function diag(J, obj){
  const key = obj.map(n => n.gid + "/" + n.cuerda + "/" + n.fret).join(); if (key === J.dk) return; J.dk = key;
  const ns = S.cancion.carriles; dibujarDiag($("dg" + J.i), obj.map(n => ({s:ns - n.cuerda, f:n.fret, d:n.dedo})), new Set(), 150, 172, ns);
}
function dibujarMastil(pcs, raiz){
  const cv = $("dNeck"), c = cv.getContext("2d"), d = devicePixelRatio || 1, r = cv.getBoundingClientRect(), W = r.width || 640, H = r.height || 210;
  cv.width = W * d; cv.height = H * d; c.setTransform(d, 0, 0, d, 0, 0); c.clearRect(0, 0, W, H);
  const L = 36, Wd = W - L - 10, top = 22, gap = (H - top - 34) / 5, N = 15, pf = f => 1 - Math.pow(2, -f / 12), wx = f => L + pf(f) / pf(N) * Wd;
  c.fillStyle = "#1c1510"; c.fillRect(L, top - 10, Wd, gap * 5 + 20);
  for (let f = 0; f <= N; f++){ c.strokeStyle = f === 0 ? "#d7dbe0" : "#6f7883"; c.lineWidth = f === 0 ? 5 : 1.5; c.beginPath(); c.moveTo(wx(f), top - 10); c.lineTo(wx(f), top + gap * 5 + 10); c.stroke(); }
  c.textAlign = "center"; c.textBaseline = "middle";
  for (let row = 0; row < 6; row++){
    const y = top + row * gap; c.strokeStyle = RS[row]; c.lineWidth = Math.max(1.2, 3.2 - row * .45); c.beginPath(); c.moveTo(L, y); c.lineTo(L + Wd, y); c.stroke();
    c.fillStyle = "#9fb3c6"; c.font = "12px Segoe UI, system-ui, sans-serif"; c.fillText(CUERDA_NOM[6 - row], 12, y);
    for (let f = 0; f <= N; f++){
      const pc = (AFIN[row] + f) % 12; if (!pcs.has(pc)) continue;
      const x = f === 0 ? L - 12 : (wx(f - 1) + wx(f)) / 2;
      c.fillStyle = pc === raiz ? "#ff9638" : "#36b9ff"; c.beginPath(); c.arc(x, y, 10, 0, 6.3); c.fill();
      c.fillStyle = "#0b1016"; c.font = "700 9.5px Segoe UI, system-ui, sans-serif"; c.fillText(NOM[pc], x, y + 1);
    }
  }
  c.fillStyle = "#6f7c8c"; c.font = "12px Segoe UI, system-ui, sans-serif";
  for (const f of [3,5,7,9,12,15]) c.fillText(String(f), (wx(f - 1) + wx(f)) / 2, H - 10);
}
function difPintar(){
  const r = DIF.raiz, a = acorde(r, DIF.tipo);
  $("dTitulo").textContent = NOM[r] + DIF.tipo + " · " + TIPOS[DIF.tipo];
  dibujarAcorde(a);
  const pcs = DIF.modo === "acorde" ? new Set(a ? a.f.map((f, i) => f >= 0 ? (AFIN[i] + f) % 12 : -1).filter(x => x >= 0) : []) : new Set(ESC[DIF.modo].map(i => (r + i) % 12));
  dibujarMastil(pcs, r);
  $("dNotas").textContent = DIF.modo === "acorde" ? (a ? "Notas del acorde: " + [...new Set(a.f.map((f, i) => f >= 0 ? NOM[(AFIN[i] + f) % 12] : null).filter(Boolean))].join(" · ") : "") : "Notas de la escala: " + [...pcs].map(p => NOM[p]).join(" · ");
  const dd = a ? dedosAc(a) : [];
  $("dDedos").textContent = a ? "Cuerdas 6→1: " + a.f.map((f, i) => f < 0 ? "×" : f === 0 ? "0" : f + " (dedo " + dd[i] + ")").join("   ") + (a.base > 0 ? "\nCejilla con el índice en el traste " + a.base : "") : "";
  $("dRaices").querySelectorAll("button").forEach(b => b.classList.toggle("on", +b.dataset.r === r));
  $("dTipos").querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.t === DIF.tipo));
}
function construirDif(){
  const host = $("difHost"); if (!host) return;
  host.innerHTML = `<div class="dif-bar"><label>Vista del mástil<select id="dModo"><option value="acorde">Notas del acorde</option><option value="mayor">Escala mayor</option><option value="menor">Escala menor natural</option><option value="pentm">Pentatónica menor</option><option value="pentM">Pentatónica mayor</option><option value="blues">Escala de blues</option><option value="todas">Todas las notas</option></select></label>
    <button class="btn btn-secondary btn-small" id="dOir">🔊 Escuchar acorde</button><button class="btn btn-primary btn-small" id="dPrac">Practicar en la pista</button></div>
    <p class="muted">1) Elige la nota raíz. 2) Elige el tipo de acorde. El diagrama muestra dónde poner cada dedo; el mástil de abajo marca esas mismas notas en toda la guitarra (naranja = raíz).</p>
    <div class="chips" id="dRaices">${NOM.map((n, i) => `<button data-r="${i}">${n}</button>`).join("")}</div>
    <div class="chips" id="dTipos">${Object.keys(TIPOS).map(t => `<button data-t="${t}">${TIPOS[t]}</button>`).join("")}</div>
    <div class="dif-main"><div class="dif-card"><h3 id="dTitulo"></h3><canvas id="dCh"></canvas><p id="dNotas" class="dif-txt"></p><p id="dDedos" class="dif-txt"></p></div><div class="dif-card wide"><canvas id="dNeck"></canvas></div></div>`;
  host.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.r !== undefined) DIF.raiz = +b.dataset.r; else if (b.dataset.t !== undefined) DIF.tipo = b.dataset.t; else return; difPintar();
  });
  $("dModo").onchange = e => { DIF.modo = e.target.value; difPintar(); };
  $("dOir").onclick = () => { const a = acorde(DIF.raiz, DIF.tipo); if (!a) return; S.ctx = S.ctx || new (window.AudioContext || window.webkitAudioContext)(); S.ctx.resume(); a.f.forEach((f, i) => { if (f >= 0) setTimeout(() => pluck(AFIN[i] + f, 1200), i * 45); }); };
  $("dPrac").onclick = () => {
    const a = acorde(DIF.raiz, DIF.tipo); if (!a) return; const tok = a.f.map((f, i) => f >= 0 ? `${6 - i}.${f}` : null).filter(Boolean).join("+");
    const c = {id:"dif", grupo:"Diapasón", nombre:"Acorde " + NOM[DIF.raiz] + DIF.tipo, bpm:60, tab:R(tok + ":2", 4)}, k = CAN.findIndex(x => x.id === "dif");
    if (k >= 0) CAN[k] = c; else { CAN.push(c); $("pSong").insertAdjacentHTML("beforeend", `<optgroup label="Diapasón"><option value="dif"></option></optgroup>`); }
    $("pSong").querySelector('option[value="dif"]').textContent = c.nombre; cargar("dif"); ponerModo(1); ver("pista");
  };
  if (window.ResizeObserver) new ResizeObserver(() => difPintar()).observe($("dNeck"));
  difPintar();
}

/* ================= PARSEO ================= */
const mk = (ini, dur, c, f, bend = 0) => ({bend, ini, dur:Math.max(dur,240), midi:ABIERTA[c] + f + bend, fret:f, traste:f, carril:c - 1, cuerda:c, dedo:null, real:false, gid:ini});
function cerrar(notas, total, nombre, carriles, tempos){
  notas.sort((a, b) => a.ini - b.ini);
  const num = t => typeof t === "number" && t > 0;
  notas.forEach((n, i) => {
    if (n.dedo !== null) return;
    if (n.traste === "x") { n.dedo = -1; return; }
    if (n.traste === 0) { n.dedo = 0; return; }
    let base = n.traste;
    for (let j = i; j >= 0 && n.ini - notas[j].ini <= 1920; j--) if (num(notas[j].traste) && notas[j].traste < base) base = notas[j].traste;
    for (let j = i + 1; j < notas.length && notas[j].ini - n.ini <= 1920; j++) if (num(notas[j].traste) && notas[j].traste < base) base = notas[j].traste;
    if (n.traste - base > 3) base = n.traste - 3;
    n.dedo = n.traste - base + 1;
  });
  const grupos = new Map(); notas.forEach(n => { if (!grupos.has(n.gid)) grupos.set(n.gid, []); grupos.get(n.gid).push(n); });
  const lineas = []; for (let t = 0; t < total; t += 3840) lineas.push(t);
  return {nombre, notas, grupos, lineas, total, carriles, tempos};
}
function parseTab(tab, bpm, nombre){
  const notas = []; let t = 0;
  for (const tok of tab.trim().split(/\s+/)){
    const [a, d] = tok.split(":"), dur = Math.round((+d || 1) * 960);
    if (a !== "r") for (const p of a.split("+")){ const m = /^(\d)\.(\d+)(?:b(\d))?$/.exec(p); notas.push(mk(t, dur, +m[1], +m[2], +(m[3] || 0))); }
    t += dur;
  }
  return cerrar(notas, t, nombre, 6, [[0, bpm]]);
}
function desdeGP(bytes, nombre, pista){
  const score = alphaTab.importer.ScoreLoader.loadScoreFromBytes(bytes, new alphaTab.Settings());
  let idx = pista !== undefined ? pista : score.tracks.findIndex(t => !t.isPercussion && t.playbackInfo && t.playbackInfo.program >= 24 && t.playbackInfo.program <= 31); if (idx < 0) idx = score.tracks.findIndex(t => !t.isPercussion); if (idx < 0) idx = 0;
  const st = score.tracks[idx].staves[0], tun = st.tuning || (st.stringTuning && st.stringTuning.tunings) || [64,59,55,50,45,40], notas = [];
  for (const bar of st.bars) for (const beat of bar.voices[0].beats){
    if (beat.isRest) continue;
    for (const n of beat.notes){
      if (n.isTieDestination) continue;
      const c = tun.length - n.string + 1, dg = n.leftHandFinger;
      notas.push({ini:beat.absolutePlaybackStart, dur:Math.max(beat.playbackDuration, 240), midi:n.realValue, fret:n.fret, traste:n.isDead ? "x" : n.fret,
        carril:c - 1, cuerda:c, dedo:(dg >= 1 && dg <= 4) ? dg : null, real:dg >= 1 && dg <= 4, gid:beat.absolutePlaybackStart});
    }
  }
  const tempos = []; let tp = score.tempo, total = 0;
  for (const mb of score.masterBars){ if (mb.tempoAutomation) tp = mb.tempoAutomation.value; tempos.push([mb.start, tp]); total = mb.start + mb.calculateDuration(); }
  const s = cerrar(notas, total, (score.title || nombre) + " · " + score.tracks[idx].name, tun.length, tempos);
  s.idx = idx; s.pistas = score.tracks.map((t, i) => ({i, n:(t.name || "Pista " + (i + 1)) + (t.isPercussion ? " (batería)" : "")}));
  return s;
}
const tempoEn = (tempos, t) => { let v = tempos[0][1]; for (const [s, b] of tempos){ if (s <= t) v = b; else break; } return v; };
const primero = (notas, tk) => { let lo = 0, hi = notas.length; while (lo < hi){ const m = (lo + hi) >> 1; if (notas[m].ini < tk) lo = m + 1; else hi = m; } return lo; };

/* ================= PISTA EN PERSPECTIVA ================= */
const VEN = 7, ADE = 4800, K = 3.5, posF = f => 1 - Math.pow(2, -f / 12);
function rr(c, x, y, w, h, r){ if (c.roundRect){ c.roundRect(x, y, w, h, r); return; } c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
class Pista{
  constructor(cv){ this.cv = cv; this.c = cv.getContext("2d"); this.s = {notas:[], lineas:[], carriles:6, grupos:new Map()}; this.f0 = 0; this.ok = false; this.tg = 0; this.nombres = false; this.resize(); if (window.ResizeObserver) new ResizeObserver(() => this.resize()).observe(cv); }
  set(s){ this.s = s; this.ok = false; }
  resize(){ const d = devicePixelRatio || 1, r = this.cv.getBoundingClientRect(); this.W = r.width; this.H = r.height; this.cv.width = r.width * d; this.cv.height = r.height * d; this.c.setTransform(d, 0, 0, d, 0, 0); }
  draw(tick, J){
    const c = this.c, W = this.W, H = this.H, {notas, lineas, carriles} = this.s; c.clearRect(0, 0, W, H);
    const nC = Math.max(carriles, 2), L = W * .05, Wd = W * .9, ny = H * .6, nh = H * .24, gap = nh / (nC - 1), yc = ny + nh / 2, yT = ny - gap * .6, yB = ny + nh + gap * .6, vx = W / 2, vy = H * .02;
    const Sc = t => 1 / (1 + K * t), P = (x, y, t) => { const s = Sc(t); return [vx + (x - vx) * s, vy + (y - vy) * s]; };
    let i = primero(notas, tick - 120), mn = 99, mx = 0;
    const o0 = notas[i], obj = o0 ? this.s.grupos.get(o0.gid) : [];
    for (; i < notas.length && notas[i].ini <= tick + 2880; i++){ const f = notas[i].fret; if (f > 0){ mn = Math.min(mn, f); mx = Math.max(mx, f); } }
    if (mx){ let tg = Math.max(0, mn - 2); if (mx - tg > VEN) tg = mx - VEN; this.tg = tg; }
    if (!this.ok){ this.f0 = this.tg; this.ok = true; } else this.f0 += (this.tg - this.f0) * .07;
    const f0 = this.f0, fa = posF(f0), fb = posF(f0 + VEN), wx = f => L + (posF(f) - fa) / (fb - fa) * Wd;
    const g = c.createLinearGradient(0, vy, 0, yB); g.addColorStop(0, "#0a121a"); g.addColorStop(1, "#13222f");
    c.fillStyle = g; c.beginPath(); let q = P(L, yc, 1); c.moveTo(L, yB); c.lineTo(L, yc); c.lineTo(q[0], q[1]); q = P(L + Wd, yc, 1); c.lineTo(q[0], q[1]); c.lineTo(L + Wd, yc); c.lineTo(L + Wd, yB); c.closePath(); c.fill();
    c.lineWidth = 1;
    for (let n = Math.floor(f0); n <= Math.ceil(f0 + VEN); n++){ const x = wx(n); if (x < L - 1 || x > L + Wd + 1) continue; const e = P(x, yc, 1); c.strokeStyle = "rgba(150,180,210,.22)"; c.beginPath(); c.moveTo(x, yc); c.lineTo(e[0], e[1]); c.stroke(); }
    for (const l of lineas){ const dt = l - tick; if (dt < 0 || dt > ADE) continue; const t = dt / ADE, a = P(L, yc, t), b = P(L + Wd, yc, t); c.strokeStyle = "rgba(210,225,240," + (.35 * (1 - t) + .06) + ")"; c.lineWidth = 2 * Sc(t); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
    c.fillStyle = "#1c1510"; c.fillRect(L, yT, Wd, yB - yT);
    for (const n of [3,5,7,9,12,15,17,19,21,24]){ const x = (wx(n - 1) + wx(n)) / 2; if (x < L || x > L + Wd) continue; c.fillStyle = "rgba(255,255,255,.10)"; for (const yy of (n % 12 === 0 ? [yc - gap * 1.1, yc + gap * 1.1] : [yc])){ c.beginPath(); c.arc(x, yy, Math.max(3, gap * .22), 0, 6.3); c.fill(); } }
    for (let n = Math.floor(f0); n <= Math.ceil(f0 + VEN); n++){ const x = wx(n); if (x < L - 1 || x > L + Wd + 1) continue; c.strokeStyle = n === 0 ? "#d7dbe0" : "#8b929c"; c.lineWidth = n === 0 ? 5 : 2; c.beginPath(); c.moveTo(x, yT); c.lineTo(x, yB); c.stroke(); }
    for (let r = 0; r < nC; r++){ const y = ny + r * gap; c.strokeStyle = RS[r % RS.length]; c.lineWidth = Math.max(1.2, 3.2 - r * .45); c.beginPath(); c.moveTo(L, y); c.lineTo(L + Wd, y); c.stroke(); }
    c.textAlign = "center"; c.textBaseline = "middle";
    const res = new Set(obj.map(n => n.fret));
    for (let n = Math.floor(f0) + 1; n <= Math.ceil(f0 + VEN) + 1; n++){ const xc = (wx(n - 1) + wx(n)) / 2; if (xc < L || xc > L + Wd) continue; const on = res.has(n); c.font = (on ? "700 18px" : "500 14px") + " Segoe UI, system-ui, sans-serif"; c.fillStyle = on ? "#ff9638" : "#6f7c8c"; c.fillText(String(n), xc, yB + 16); }
    for (let k = primero(notas, tick + ADE + 1) - 1; k >= 0; k--){
      const n = notas[k]; if (n.ini < tick - 15360) break;
      const fin = n.ini + n.dur; if (fin < tick - 60) continue;
      const t0 = Math.max(0, (n.ini - tick) / ADE), t1 = Math.min(1, (fin - tick) / ADE), s0 = Sc(t0);
      const row = carriles - 1 - n.carril, y = ny + row * gap, col = RS[row % RS.length], abierta = n.fret === 0;
      let xc, sw; if (abierta){ xc = L + Wd / 2; sw = Wd; } else { const a = wx(n.fret - 1), b = wx(n.fret); xc = (a + b) / 2; sw = b - a; }
      if (xc < -60 || xc > W + 60) continue;
      const activa = n.ini <= tick + 30 && tick <= fin, hit = J && J.hit.has(n.gid), miss = J && J.miss.has(n.gid);
      c.globalAlpha = miss ? .3 : hit && n.ini <= tick ? .45 : 1;
      if (!abierta && t1 - t0 > .04){ const tw = Math.min(sw * .12, 6), p1 = P(xc - tw, y, t0), p2 = P(xc + tw, y, t0), p3 = P(xc + tw, y, t1), p4 = P(xc - tw, y, t1); c.fillStyle = col + "88"; c.beginPath(); c.moveTo(p1[0], p1[1]); c.lineTo(p2[0], p2[1]); c.lineTo(p3[0], p3[1]); c.lineTo(p4[0], p4[1]); c.closePath(); c.fill(); }
      const w = (abierta ? Wd : Math.max(sw * .82, this.nombres ? 40 : 22)) * s0, hh = Math.min(gap * .74, 28) * s0, pp = P(xc, y, t0);
      c.fillStyle = miss ? "#59616b" : col; c.beginPath(); rr(c, pp[0] - w / 2, pp[1] - hh / 2, w, hh, 4 * s0); c.fill();
      if (hit && n.ini <= tick + 400 || activa){ c.strokeStyle = hit ? "#3fe08f" : "#fff"; c.lineWidth = 3; c.stroke(); }
      c.font = "700 " + Math.max(9, Math.round(hh * .64)) + "px Segoe UI, system-ui, sans-serif"; c.fillStyle = "#0b1016"; c.fillText(this.nombres ? NOM[((n.midi % 12) + 12) % 12] : n.traste + (n.bend ? "↑" : ""), pp[0], pp[1] + 1);
      if (n.dedo >= 1 && s0 > .5){ const bx = pp[0] + (abierta ? 0 : w / 2) - 2, by = pp[1] - hh / 2 - 2; c.fillStyle = "#0b1016"; c.beginPath(); c.arc(bx, by, 8 * s0, 0, 6.3); c.fill(); c.fillStyle = "#fff"; c.font = "700 " + Math.round(11 * s0) + "px Segoe UI, system-ui, sans-serif"; c.fillText(String(n.dedo), bx, by + 1); }
      c.globalAlpha = 1;
    }
    return obj;
  }
}

/* ================= AUDIO: detección de tono (YIN) ================= */
function yin(b, sr){
  const W2 = b.length >> 1, tauMax = Math.min(W2 - 1, Math.floor(sr / 60)), tauMin = Math.floor(sr / 1400);
  let rms = 0; for (let i = 0; i < b.length; i++) rms += b[i] * b[i]; if (Math.sqrt(rms / b.length) < .012) return -1;
  const d = new Float32Array(tauMax + 1);
  for (let tau = 1; tau <= tauMax; tau++){ let s = 0; for (let i = 0; i < W2; i++){ const x = b[i] - b[i + tau]; s += x * x; } d[tau] = s; }
  let acc = 0; d[0] = 1; for (let tau = 1; tau <= tauMax; tau++){ acc += d[tau]; d[tau] = d[tau] * tau / (acc || 1); }
  let tau = tauMin; while (tau < tauMax){ if (d[tau] < .15){ while (tau + 1 < tauMax && d[tau + 1] < d[tau]) tau++; break; } tau++; }
  if (tau >= tauMax) return -1;
  const a = d[tau - 1], c = d[tau + 1], m = d[tau], den = a + c - 2 * m; return sr / (den ? tau + (a - c) / (2 * den) : tau);
}

/* ================= SESIÓN DE JUEGO ================= */
const CAN = [];                                   // todas las canciones disponibles
CURSO.forEach((m, mi) => m.l.forEach((l, li) => CAN.push({id:`c:${m.k}.${li}`, grupo:"Curso · " + m.n, nombre:l.t, bpm:l.b, tab:l.tab})));
ROCK.forEach((r, i) => CAN.push({id:`r:${i}`, grupo:"Rock · " + r[1], nombre:r[0], bpm:r[3], tab:r[4]}));
const SYNC = JSON.parse(localStorage.getItem("gm_sync") || "{}");
const S = {lat:SYNC.lat ?? 0, mic:SYNC.mic ?? 150, audOn:false, aud:null, audIni:false, audioUrl:null, todos:[], cancion:null, id:"", jug:[], corriendo:false, tick:0, ult:0, vel:1, ctx:null, gi:0, beat:0, modo:1, raf:0};
const prog = JSON.parse(localStorage.getItem("gm_curso") || "{}");
const guardarProg = () => localStorage.setItem("gm_curso", JSON.stringify(prog));

const tpms = () => tempoEn(S.cancion.tempos, S.tick) * 960 / 60000 * S.vel;      // ticks por milisegundo real
function cargar(id){
  const c = CAN.find(x => x.id === id); if (!c) return;
  limpiarAudio(); S.id = id; S.gp = null; S.cancion = parseTab(c.tab, c.bpm, c.nombre); reiniciar(); if ($("pTrack")) $("pTrack").style.display = "none";
  if ($("pSong")) $("pSong").value = id;
  if ($("pNom") && id.startsWith("c:n.")) $("pNom").checked = true;
  if ($("pNom")) S.todos.forEach(J => { J.pista.nombres = $("pNom").checked; });
}
function reiniciar(){
  if (S.aud) S.aud.pause(); S.audIni = false; S.audOn = false; S.corriendo = false; S.tick = -3840;
  S.jug.forEach(J => { J.dk = null; J.hit = new Set(); J.miss = new Set(); J.pts = 0; J.racha = 0; J.ac = 0; J.fa = 0; J.pista.set(S.cancion); });
  $("pStart").textContent = "▶ Jugar"; $("pRes").textContent = "";
}
function pluck(m, ms){
  const c = S.ctx; if (!c) return; const o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
  o.type = "triangle"; o.frequency.value = 440 * Math.pow(2, (m - 69) / 12);
  g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.22, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + Math.min(1.2, ms / 1000 + .2));
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + 1.3);
}
function click(fuerte){ const c = S.ctx; if (!c) return; const o = c.createOscillator(), g = c.createGain(), t = c.currentTime; o.frequency.value = fuerte ? 1500 : 1000; g.gain.setValueAtTime(.15, t); g.gain.exponentialRampToValueAtTime(.0001, t + .05); o.connect(g).connect(c.destination); o.start(t); o.stop(t + .06); }

function detectar(J, now){
  if (!J.an || !S.ctx || now - J.t < 40) return; J.t = now; J.an.getFloatTimeDomainData(J.buf);
  const f = yin(J.buf, S.ctx.sampleRate);
  if (f > 0){ J.h.push(69 + 12 * Math.log2(f / 440)); if (J.h.length > 3) J.h.shift(); J.det = [...J.h].sort((a, b) => a - b)[J.h.length >> 1]; J.ult = now; }
  else { J.h.length = 0; if (now - J.ult > 160) J.det = null; }
}
function evaluar(J){
  if (!S.corriendo || !J.an) return;
  const nt = S.cancion.notas, tk = S.tick - (Math.max(S.lat, 0) + S.mic) * tpms(), gr = S.cancion.grupos;
  for (let i = primero(nt, tk - 1700); i < nt.length && nt[i].ini <= tk + 220; i++){
    const g = nt[i].gid; if (J.hit.has(g) || J.miss.has(g)) continue;
    const fin = nt[i].ini + Math.min(Math.max(nt[i].dur * .6, 360), 1500);
    if (tk >= nt[i].ini - 220 && tk <= fin && J.det !== null && gr.get(g).some(n => n.midi === Math.round(J.det))){ J.hit.add(g); J.pts += 100 + Math.min(J.racha, 10) * 10; J.racha++; J.ac++; }
    else if (tk > fin){ J.miss.add(g); J.racha = 0; J.fa++; }
  }
}
function hud(J, obj){
  const i = J.i, t = J.ac + J.fa;
  $("pd" + i).textContent = J.det !== null ? nom(Math.round(J.det)) : "—";
  $("po" + i).textContent = obj.length ? [...new Set(obj.map(n => nom(n.midi)))].join(" + ") : "—";
  $("pp" + i).textContent = J.pts; $("pr" + i).textContent = J.racha; $("pa" + i).textContent = t ? Math.round(J.ac / t * 100) + "%" : "—";
  $("pf" + i).textContent = obj.map(n => `Cuerda ${n.cuerda}${S.cancion.carriles === 6 ? " (" + CUERDA_NOM[n.cuerda] + ")" : ""} · Traste ${n.traste === 0 ? "0 (al aire)" : n.traste}${n.bend ? " con bend de " + (n.bend === 1 ? "medio tono" : n.bend / 2 + " tono") : ""} · Dedo ${DEDO[n.dedo] || "silenciada"}`).join("   |   ");
  diag(J, obj);
}
function bucle(now){
  S.raf = requestAnimationFrame(bucle);
  const dt = Math.min(100, now - S.ult); S.ult = now;
  try{
    if (S.corriendo){
      const espera = S.audioUrl && $("pAud").checked && S.tick >= 0 && !S.audOn;
      if (espera){
        if (!S.audIni){ S.aud = S.aud || Object.assign(new Audio(S.audioUrl), {preservesPitch:true}); S.aud.currentTime = 0; S.aud.playbackRate = S.vel; S.aud.play().catch(() => {}); S.audIni = true; }
        S.tick = 0; if (S.aud.currentTime > .02) S.audOn = true;                    // espera a que el audio arranque de verdad
      } else {
        S.tick += dt * tpms();
        if (S.audOn && !S.aud.paused){ const d = S.aud.currentTime * 1920 - S.tick; S.tick += Math.abs(d) > 1500 ? d : d * .2; }   // el audio manda: la pista no se desfasa
      }
      const b = Math.floor(S.tick / 960); if (b !== S.beat){ S.beat = b; if ($("pMet").checked) click(((b % 4) + 4) % 4 === 0); }
      const nt = S.cancion.notas; while (S.gi < nt.length && nt[S.gi].ini <= S.tick){ if ($("pGuia").checked) pluck(nt[S.gi].midi, nt[S.gi].dur * 60000 / (960 * tempoEn(S.cancion.tempos, S.tick))); S.gi++; }
      if (S.tick > S.cancion.total + 480) terminar();
    }
    S.jug.forEach(J => { detectar(J, now); evaluar(J); hud(J, J.pista.draw(S.tick - S.lat * tpms(), J)); });
  } catch (e){ $("pRes").textContent = "Error: " + e.message; }
}
function terminar(){
  S.corriendo = false; if (S.aud) S.aud.pause(); $("pStart").textContent = "▶ Jugar otra vez";
  const r = S.jug.map(J => { const t = J.ac + J.fa; return {i:J.i, pts:J.pts, pre:t ? Math.round(J.ac / t * 100) : 0, mic:!!J.an}; });
  if (S.jug.length === 2){
    const [a, b] = r; $("pRes").textContent = !a.mic && !b.mic ? "Conecta los micrófonos para puntuar." : a.pts === b.pts ? `¡Empate! ${a.pts} puntos cada uno.` : `🏆 Gana el jugador ${a.pts > b.pts ? 1 : 2}: ${Math.max(a.pts, b.pts)} contra ${Math.min(a.pts, b.pts)} puntos (precisión ${a.pre}% y ${b.pre}%).`;
  } else if (!r[0].mic) $("pRes").textContent = "Terminó. Conecta tu micrófono para obtener puntos y precisión.";
  else {
    $("pRes").textContent = `Terminaste: ${r[0].pts} puntos · precisión ${r[0].pre}%.`;
    if (S.id.startsWith("c:") && r[0].pre >= 70){ const k = S.id.slice(2); if (!prog[k] || prog[k] < r[0].pre) prog[k] = r[0].pre; guardarProg(); pintarCurso(); toast("¡Lección completada!"); }
  }
}
async function jugar(){
  if (S.corriendo){ S.corriendo = false; if (S.aud) S.aud.pause(); $("pStart").textContent = "▶ Jugar"; return; }
  S.ctx = S.ctx || new (window.AudioContext || window.webkitAudioContext)(); await S.ctx.resume();
  reiniciar(); S.vel = +$("pVel").value; S.gi = 0; S.beat = -5; S.corriendo = true; $("pStart").textContent = "■ Detener";
}
async function listarDispositivos(){
  const d = (await navigator.mediaDevices.enumerateDevices()).filter(x => x.kind === "audioinput");
  [1, 2].forEach(i => { const s = $("pDev" + i), v = s.value; s.innerHTML = '<option value="">Predeterminado</option>' + d.map((x, k) => `<option value="${x.deviceId}">${x.label || "Entrada " + (k + 1)}</option>`).join(""); s.value = v; });
}
async function conectar(){
  try{
    S.ctx = S.ctx || new (window.AudioContext || window.webkitAudioContext)(); await S.ctx.resume();
    for (const J of S.jug){
      const dev = $("pDev" + J.i).value, ch = $("pCh" + J.i).value;
      if (J.st) J.st.getTracks().forEach(t => t.stop());
      J.st = await navigator.mediaDevices.getUserMedia({audio:{deviceId:dev ? {exact:dev} : undefined, echoCancellation:false, noiseSuppression:false, autoGainControl:false, channelCount:2}});
      const src = S.ctx.createMediaStreamSource(J.st), an = S.ctx.createAnalyser(); an.fftSize = 4096;
      if (ch === "0") src.connect(an); else { const sp = S.ctx.createChannelSplitter(2); src.connect(sp); sp.connect(an, +ch - 1); }
      J.an = an; J.buf = new Float32Array(4096);
    }
    await listarDispositivos(); toast("Micrófono conectado. Usa audífonos si activas la guía.");
  } catch (e){ toast("No se pudo abrir el micrófono (¿permiso o HTTPS?): " + e.message); }
}
function ponerModo(n){
  S.modo = n; S.jug = S.todos.slice(0, n);
  $("pj2").style.display = n === 2 ? "" : "none"; $("pModo").value = String(n);
  $("pPlayers").className = "pj-grid p" + n;
  S.todos.forEach(J => J.pista.resize()); if (S.cancion) reiniciar();
}


/* ================= MIS TABLATURAS (misma base de datos que la Biblioteca) ================= */
const DBN = "guitar-master-ai-library", DBS = "songs";
const abrirDb = () => new Promise((ok, no) => { const q = indexedDB.open(DBN, 1); q.onupgradeneeded = () => { if (!q.result.objectStoreNames.contains(DBS)) q.result.createObjectStore(DBS, {keyPath:"id"}); }; q.onsuccess = () => ok(q.result); q.onerror = () => no(q.error); });
const dbTodas = async () => { const db = await abrirDb(); return new Promise((ok, no) => { const r = db.transaction(DBS).objectStore(DBS).getAll(); r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error); }); };
const dbGuardar = async rec => { const db = await abrirDb(); return new Promise((ok, no) => { const t = db.transaction(DBS, "readwrite"); t.objectStore(DBS).put(rec); t.oncomplete = ok; t.onerror = () => no(t.error); }); };
let MIS = [];
async function pintarMis(){
  try{ MIS = (await dbTodas()).filter(r => /^gp[345x]?$/.test(r.ext)).sort((a, b) => a.name.localeCompare(b.name)); } catch (e){ MIS = []; }
  const v = $("pMis").value;
  $("pMis").innerHTML = `<option value="">Mis tablaturas (${MIS.length})</option>` + MIS.map(r => `<option value="${r.id}">${r.name.replace(/\.[^.]+$/, "")}</option>`).join(""); $("pMis").value = v;
}
function cargarGP(bytes, nombre, pista){
  limpiarAudio(); S.gp = {bytes, nombre}; S.cancion = desdeGP(bytes, nombre, pista); S.id = "gp"; reiniciar();
  $("pTrack").innerHTML = S.cancion.pistas.filter(p => !/batería/.test(p.n)).map(p => `<option value="${p.i}">${p.n}</option>`).join(""); $("pTrack").value = S.cancion.idx; $("pTrack").style.display = "";
  $("pRes").textContent = "Cargado: " + S.cancion.nombre + " · elige otra pista (rítmica, solo, bajo…) en el selector.";
}
async function agregarGP(files){
  let ult = null, n = 0; const ya = new Set(MIS.map(r => r.name + "|" + r.size));
  for (const f of files){
    if (!/\.(gp|gp3|gp4|gp5|gpx)$/i.test(f.name)){ toast("«" + f.name + "» no es Guitar Pro (.gp, .gp3, .gp4, .gp5 o .gpx)"); continue; }
    if (ya.has(f.name + "|" + f.size)) continue;
    try{
      desdeGP(new Uint8Array(await f.arrayBuffer()), f.name);                               // comprueba que se pueda leer
      const ext = f.name.split(".").pop().toLowerCase(), rec = {id:(crypto.randomUUID ? crypto.randomUUID() : Date.now() + "" + Math.random()), name:f.name, ext, type:"guitarpro", size:f.size, addedAt:Date.now(), blob:f};
      await dbGuardar(rec); ult = rec; n++;
    } catch (e){ toast("No se pudo leer " + f.name + ": " + e.message); }
  }
  await pintarMis(); if (n) toast(n === 1 ? "Agregada a Mis tablaturas" : n + " tablaturas agregadas a Mis tablaturas");
  if (n === 1 && ult){ $("pMis").value = ult.id; cargarGP(new Uint8Array(await ult.blob.arrayBuffer()), ult.name); }
}


/* ================= MP3 → PISTA (experimental · Basic Pitch de Spotify, corre en tu navegador) ================= */
const BP_ESM = ["https://esm.sh/@spotify/basic-pitch@1.0.1", "https://cdn.jsdelivr.net/npm/@spotify/basic-pitch@1.0.1/+esm"];
const BP_MODEL = "https://cdn.jsdelivr.net/npm/@spotify/basic-pitch@1.0.1/model/model.json";
let BPLIB = null;
async function cargarBP(){ if (BPLIB) return BPLIB; let err; for (const u of BP_ESM){ try{ BPLIB = await import(u); return BPLIB; } catch (e){ err = e; } } throw err; }
async function audioA22k(f){
  const buf = await S.ctx.decodeAudioData(await f.arrayBuffer()), dur = Math.min(buf.duration, 240), off = new OfflineAudioContext(1, Math.ceil(dur * 22050), 22050), src = off.createBufferSource();
  src.buffer = buf; src.connect(off.destination); src.start();
  return {mono:(await off.startRendering()).getChannelData(0), dur, cortado:buf.duration > 240};
}
function mp3ASong(notasT, modo, nombre, dur){
  const ns = notasT.filter(n => n.pitchMidi >= 40 && n.pitchMidi <= 83 && n.amplitude >= .25).map(n => ({t:n.startTimeSeconds, d:n.durationSeconds, m:n.pitchMidi})).sort((a, b) => a.t - b.t);
  const grupos = []; for (const n of ns){ const g = grupos[grupos.length - 1]; if (g && n.t - g.t < .06) g.n.push(n); else grupos.push({t:n.t, n:[n]}); }
  const out = []; let mano = 5;                                                   // mano = traste medio donde está la mano izquierda
  for (const g of grupos){
    const ord = g.n.sort((a, b) => b.m - a.m), sel = modo === "melodia" ? [ord[0]] : ord.slice(0, 4), usadas = new Set();
    for (const n of sel){
      let mejor = null;
      for (let c = 1; c <= 6; c++){ const f = n.m - ABIERTA[c]; if (f < 0 || f > 19 || usadas.has(c)) continue; const costo = Math.abs(f - mano) + f * .05; if (!mejor || costo < mejor.costo) mejor = {c, f, costo}; }
      if (!mejor) continue; usadas.add(mejor.c); if (mejor.f > 0) mano = mano * .6 + mejor.f * .4;
      out.push(mk(Math.round(g.t * 1920), Math.max(240, Math.round(n.d * 1920)), mejor.c, mejor.f));
    }
  }
  return cerrar(out, Math.round(dur * 1920), nombre, 6, [[0, 120]]);                // 120 BPM fijos = 1920 ticks por segundo de audio
}
function limpiarAudio(){ if (S.aud) S.aud.pause(); S.aud = null; S.audIni = false; S.audOn = false; if (S.audioUrl) URL.revokeObjectURL(S.audioUrl); S.audioUrl = null; }
async function mp3APista(f){
  const msg = t => { $("pRes").textContent = t; };
  try{
    S.ctx = S.ctx || new (window.AudioContext || window.webkitAudioContext)(); await S.ctx.resume();
    msg("1/4 Cargando el modelo de IA (la primera vez descarga unos MB; necesita internet)…"); const L = await cargarBP();
    msg("2/4 Leyendo el audio…"); const {mono, dur, cortado} = await audioA22k(f);
    const bp = new L.BasicPitch(BP_MODEL), fr = [], on = [];
    await bp.evaluateModel(mono, (a, b) => { for (const x of a) fr.push(x); for (const x of b) on.push(x); }, p => msg("3/4 Detectando notas… " + Math.round(p * 100) + "%"));
    msg("4/4 Armando la pista…");
    const s = mp3ASong(L.noteFramesToTime(L.outputToNotesPoly(fr, on, .5, .3, 5)), $("pMp3Modo").value, f.name.replace(/\.[^.]+$/, ""), dur);
    if (!s.notas.length) throw new Error("no se detectaron notas de guitarra en el rango 'Mi grave a Re agudo'");
    limpiarAudio(); S.gp = null; S.id = "mp3"; S.cancion = s; S.audioUrl = URL.createObjectURL(f); $("pGuia").checked = false; $("pTrack").style.display = "none"; reiniciar();
    msg(`Borrador listo: ${s.notas.length} notas${cortado ? " (solo los primeros 4 minutos)" : ""}. Es una transcripción automática y puede tener errores; sonará el audio original. Usa audífonos.`);
  } catch (err){ msg("No se pudo convertir el MP3: " + err.message); }
}


/* ================= SINCRONÍA ================= */
function guardarSync(){ localStorage.setItem("gm_sync", JSON.stringify({lat:S.lat, mic:S.mic})); $("pLat").value = S.lat; $("pMic").value = S.mic; $("pLatV").textContent = S.lat; $("pMicV").textContent = S.mic; }
async function calibrar(){
  const J = S.jug[0]; if (!J.an) return toast("Primero conecta el micrófono"); if (S.corriendo) return toast("Detén la canción antes de calibrar");
  const res = $("pRes"), N = 8, P = 700, t0 = performance.now() + 2000, ons = []; let prev = 0;
  res.textContent = "Cuando la franja se ponga naranja, toca una nota y apágala con la mano. Son 8 veces.";
  await new Promise(ok => { const paso = () => {
    const now = performance.now();
    res.style.background = now >= t0 && (now - t0) % P < 160 ? "#ff9638" : ""; res.style.color = res.style.background ? "#1a1405" : "";
    J.an.getFloatTimeDomainData(J.buf); let s = 0; for (let i = J.buf.length - 512; i < J.buf.length; i++) s += J.buf[i] * J.buf[i];
    const r = Math.sqrt(s / 512), k = Math.round((now - t0) / P);
    if (r > .04 && prev < .02 && k >= 0 && k < N) ons.push(now - (t0 + k * P));
    prev = r; if (now > t0 + N * P) return ok(); requestAnimationFrame(paso); }; paso(); });
  res.style.background = res.style.color = "";
  if (ons.length < 4){ res.textContent = "No pude medirlo (solo " + ons.length + " notas). Toca más fuerte, apaga la cuerda entre notas o ajusta el retraso a mano."; return; }
  ons.sort((a, b) => a - b); S.mic = Math.max(0, Math.min(500, Math.round(ons[ons.length >> 1] + 100)));   // +100 ms: lo que tarda el detector de tono en estabilizarse
  guardarSync(); res.textContent = "Listo: retraso del micrófono " + S.mic + " ms (guardado). Puedes afinarlo con el control si hace falta.";
}


/* ================= PANTALLA COMPLETA ================= */
async function pantallaCompleta(on){
  const v = $("view-pista"); if (on === undefined) on = !v.classList.contains("pj-full");
  v.classList.toggle("pj-full", on); if (!on) v.classList.remove("pj-ocultar");
  if (on){ try{ await (v.requestFullscreen || v.webkitRequestFullscreen).call(v); } catch (e){} try{ await screen.orientation.lock("landscape"); } catch (e){} }
  else { if (document.fullscreenElement) try{ await document.exitFullscreen(); } catch (e){} try{ screen.orientation.unlock(); } catch (e){} }
  $("pFull").textContent = on ? "⛶ Salir de pantalla completa" : "⛶ Pantalla completa";
  setTimeout(() => S.todos.forEach(J => J.pista.resize()), 150);
}

/* ================= INTERFAZ ================= */
function ver(nombre){
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + nombre));
  window.scrollTo({top:0, behavior:"smooth"});
  if (nombre === "pista") pintarMis();
  if (nombre === "pista") setTimeout(() => S.todos.forEach(J => J.pista.resize()), 30);
}
function pintarCurso(){
  const hechas = Object.keys(prog).length, total = CURSO.reduce((s, m) => s + m.l.length, 0);
  $("cursoProg").textContent = `${hechas} de ${total} lecciones completadas (precisión mínima 70%)`;
  $("cursoBarra").style.width = Math.round(hechas / total * 100) + "%";
  $("cursoLista").innerHTML = CURSO.map((m, mi) => `<details class="mod" ${mi === 0 ? "open" : ""}><summary><b>${m.n}</b><small>${m.d}</small></summary>` +
    m.l.map((l, li) => `<article class="lec"><div><h4>${prog[m.k + "." + li] ? "✓ " : ""}${l.t}</h4><p>${l.x}</p><span class="tag">${l.b} BPM</span>${prog[m.k + "." + li] ? `<span class="tag ok">Mejor: ${prog[m.k + "." + li]}%</span>` : ""}</div><button class="btn btn-primary btn-small" data-play="c:${m.k}.${li}">Practicar →</button></article>`).join("") + "</details>").join("");
}
function pintarRock(){
  const est = $("rockFiltro").value, ban = $("rockBanda").value;
  $("rockLista").innerHTML = ROCK.map((r, i) => ({r, i})).filter(x => (!est || x.r[1] === est) && (!ban || x.r[5] === ban)).map(({r, i}) =>
    `<article class="lec"><div><h4>${r[0]}</h4><span class="tag">${r[1]}</span><span class="tag">${"★".repeat(r[2])}${"☆".repeat(3 - r[2])}</span><span class="tag">${r[3]} BPM</span>${r[5] ? `<span class="tag">Estilo ${r[5]}</span>` : ""}</div><div class="acc"><button class="btn btn-primary btn-small" data-play="r:${i}">Tocar</button><button class="btn btn-secondary btn-small" data-duo="r:${i}">Duelo 1 vs 1</button></div></article>`).join("");
}
function construirUI(){
  const jugador = i => `<div class="pj" id="pj${i}"><div class="pj-top"><b>${i === 1 ? "Jugador 1" : "Jugador 2"}</b><select id="pDev${i}"><option value="">Predeterminado</option></select><select id="pCh${i}"><option value="0">Mono / mezcla</option><option value="1">Canal 1 (izq.)</option><option value="2">Canal 2 (der.)</option></select></div>
    <canvas id="cv${i}"></canvas><div class="pj-hud"><div><small>Tocas</small><strong id="pd${i}">—</strong></div><div><small>Pide</small><strong id="po${i}">—</strong></div><div><small>Puntos</small><strong id="pp${i}">0</strong></div><div><small>Racha</small><strong id="pr${i}">0</strong></div><div><small>Precisión</small><strong id="pa${i}">—</strong></div></div><div class="pj-diag"><canvas id="dg${i}"></canvas><div><small>Posición de los dedos</small><p class="pj-info" id="pf${i}"></p></div></div></div>`;
  const estilos = [...new Set(ROCK.map(r => r[1]))];
  const grupos = [...new Set(CAN.map(c => c.grupo))].map(g => `<optgroup label="${g}">${CAN.filter(c => c.grupo === g).map(c => `<option value="${c.id}">${c.nombre}</option>`).join("")}</optgroup>`).join("");
  $("view-lessons").insertAdjacentHTML("afterend", `
  <section id="view-escuela" class="view"><div class="page-heading"><div><p class="eyebrow">ESCUELA GUITAR MASTER</p><h1>Curso <span>práctico</span> de guitarra</h1><p class="lead">${CURSO.length} módulos, ${CURSO.reduce((s, m) => s + m.l.length, 0)} lecciones: de las cuerdas al aire a solos de rock. Cada lección se practica en la pista, con puntaje; con 70% de precisión se completa.</p></div><button class="btn btn-secondary" data-ir="home">← Inicio</button></div>
    <div class="progress-track"><span id="cursoBarra"></span></div><p class="muted" id="cursoProg"></p><div id="cursoLista"></div></section>
  <section id="view-rock" class="view"><div class="page-heading"><div><p class="eyebrow">BIBLIOTECA</p><h1>Rock <span>en la pista</span></h1><p class="lead">Riffs originales por estilo y nivel, algunos «al estilo de» grandes bandas del rock. No copian sus canciones: para un tema exacto, abre tu propio archivo Guitar Pro en la pista.</p></div><button class="btn btn-secondary" data-ir="home">← Inicio</button></div>
    <div class="inline-actions"><select id="rockFiltro"><option value="">Todos los estilos</option>${estilos.map(e => `<option>${e}</option>`).join("")}</select><select id="rockBanda"><option value="">Todas las bandas de referencia</option>${[...new Set(ROCK.map(r => r[5]).filter(Boolean))].map(b => `<option>${b}</option>`).join("")}</select></div><div id="rockLista"></div></section>
  <section id="view-pista" class="view"><div class="page-heading"><div><p class="eyebrow">PISTA ESTILO ROCKSMITH</p><h1>Toca <span>y puntúa</span></h1><p class="lead">Las notas bajan por el diapasón hasta su cuerda y traste. Hay una cuenta previa de 4 pulsos. Con dos jugadores, cada uno usa su propia entrada o canal.</p></div><button class="btn btn-secondary" data-ir="home">← Inicio</button></div>
    <div class="pj-bar"><select id="pSong">${grupos}</select><select id="pVel">${[.25,.3,.4,.5,.6,.7,.75,.8,.85,.9,.95,1,1.1,1.25].map(v => `<option value="${v}"${v === 1 ? " selected" : ""}>${Math.round(v * 100)}%</option>`).join("")}</select>
      <select id="pModo"><option value="1">1 jugador</option><option value="2">2 jugadores</option></select>
      <label><input type="checkbox" id="pGuia" checked> Guía sonora</label><label><input type="checkbox" id="pMet" checked> Metrónomo</label><label><input type="checkbox" id="pNom"> Nombres de nota</label>
      <button class="btn btn-secondary btn-small" id="pConn">Conectar micrófonos</button><select id="pMis"><option value="">Mis tablaturas (0)</option></select><select id="pTrack" style="display:none" title="Pista del arreglo"></select><label class="btn btn-secondary btn-small" for="pGP">＋ Agregar tablaturas</label><input type="file" id="pGP" multiple hidden><select id="pMp3Modo" title="Qué notas extraer del MP3"><option value="melodia">MP3: melodía principal</option><option value="todas">MP3: todas las notas</option></select><label class="btn btn-secondary btn-small" for="pMp3">🎵 MP3 → pista</label><input type="file" id="pMp3" hidden><label><input type="checkbox" id="pAud" checked> Audio original</label>
      <button class="btn btn-secondary btn-small" id="pFull">⛶ Pantalla completa</button><button class="btn btn-primary" id="pStart">▶ Jugar</button></div>
    <details class="pj-sync"><summary>⚙ Sincronía y retraso</summary>
      <label>Retraso del sonido: <b id="pLatV">0</b> ms <input type="range" id="pLat" min="-2000" max="3000" step="10" value="0"></label><div class="pj-step"><span>Ajuste fino:</span><button class="btn btn-secondary btn-small" data-lat="-100">−100</button><button class="btn btn-secondary btn-small" data-lat="-10">−10</button><button class="btn btn-secondary btn-small" data-lat="10">+10</button><button class="btn btn-secondary btn-small" data-lat="100">+100</button></div>
      <small>Rango de −2000 a 3000 ms. Si oyes la música DESPUÉS de que la nota llega a la línea (audífonos Bluetooth), pon un valor positivo. Si ves la imagen DESPUÉS de oír el sonido (pantalla duplicada en una TV), pon un valor negativo.</small>
      <label>Retraso del micrófono: <b id="pMicV">150</b> ms <input type="range" id="pMic" min="0" max="1000" step="10" value="150"></label>
      <small>Si tus aciertos se marcan tarde o fallas notas que tocaste a tiempo, sube este valor. «Calibrar» lo mide por ti.</small>
      <button class="btn btn-secondary btn-small" id="pCal">🎯 Calibrar micrófono</button><small>Calibra mirando la pantalla del celular o del computador, no la de la TV.</small></details>
    <p class="pj-res" id="pRes"></p><div class="pj-grid p1" id="pPlayers">${jugador(1)}${jugador(2)}</div>
    <p class="muted">Dos jugadores: usa dos interfaces, o una estéreo con canal 1 para uno y canal 2 para el otro. Con audífonos la guía no entra en el micrófono.</p>
    <div class="pj-fab"><button id="fabPlay">▶ / ■</button><button id="fabModo">👥 1 / 2</button><button id="fabMenu">☰ Controles</button><button id="fabExit">✕ Salir</button></div></section>`);
  S.todos = [1, 2].map(i => ({i, pista:new Pista($("cv" + i)), hit:new Set(), miss:new Set(), pts:0, racha:0, ac:0, fa:0, det:null, h:[], t:0, ult:0, an:null}));
  S.jug = S.todos.slice(0, 1);
  document.body.addEventListener("click", e => {
    const b = e.target.closest("[data-play],[data-duo],[data-ir]"); if (!b) return;
    if (b.dataset.ir) return ver(b.dataset.ir);
    cargar(b.dataset.play || b.dataset.duo); ponerModo(b.dataset.duo ? 2 : 1); ver("pista");
  });
  $("pSong").onchange = e => cargar(e.target.value);
  $("pModo").onchange = e => ponerModo(+e.target.value);
  $("pVel").onchange = () => { S.vel = +$("pVel").value; };
  $("pNom").onchange = () => S.todos.forEach(J => { J.pista.nombres = $("pNom").checked; }); $("pConn").onclick = conectar; $("pStart").onclick = jugar;
  $("pFull").onclick = () => pantallaCompleta(); $("fabExit").onclick = () => pantallaCompleta(false); $("fabPlay").onclick = () => $("pStart").click(); $("fabMenu").onclick = () => $("view-pista").classList.toggle("pj-ocultar"); $("fabModo").onclick = () => ponerModo(S.modo === 1 ? 2 : 1);
  document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && $("view-pista").classList.contains("pj-full")) pantallaCompleta(false); }); $("rockFiltro").onchange = pintarRock; $("rockBanda").onchange = pintarRock;
  $("pGP").onchange = async e => { const fs = [...e.target.files]; e.target.value = ""; if (fs.length) await agregarGP(fs); };
  $("pLat").oninput = e => { S.lat = +e.target.value; guardarSync(); }; document.querySelector(".pj-step").onclick = e => { const b = e.target.closest("button"); if (!b) return; S.lat = Math.max(-2000, Math.min(3000, S.lat + +b.dataset.lat)); guardarSync(); }; $("pMic").oninput = e => { S.mic = +e.target.value; guardarSync(); }; $("pCal").onclick = calibrar; guardarSync();
  $("pMp3").onchange = async e => { const f = e.target.files[0]; e.target.value = ""; if (f) await mp3APista(f); };
  $("pMis").onchange = async e => { const r = MIS.find(x => x.id === e.target.value); if (!r) return; try{ cargarGP(new Uint8Array(await r.blob.arrayBuffer()), r.name); } catch (err){ toast("No se pudo abrir " + r.name + ": " + err.message); } };
  $("pTrack").onchange = e => { if (S.gp) try{ cargarGP(S.gp.bytes, S.gp.nombre, +e.target.value); } catch (err){ toast(err.message); } };
  window.addEventListener("resize", () => S.todos.forEach(J => J.pista.resize()));
  const duelo = $("goDuelo"); if (duelo) duelo.onclick = () => { cargar(S.id || "r:3"); ponerModo(2); ver("pista"); };
  pintarCurso(); pintarRock(); cargar("c:n.0"); ponerModo(1); construirDif(); pintarMis();
  S.ult = performance.now(); S.raf = requestAnimationFrame(bucle);
}
construirUI();
})();
