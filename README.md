## Prompts utilizados

**Modo Plan**:

En esta app de música hecha con Expo Router y React Native Paper, el usuario quiere poder crear una lista de reproducción personalizada. Implementa una funcionalidad que permita:

1.  Crear una nueva playlist.
2.  Asignarle un nombre a la playlist.
3.  Agregar canciones (las de `data/musica.json`) a las playlists.
4.  Visualizar las playlists creadas.
5.  Mostrar las canciones que contiene cada playlist.
6.  Usar React Native Paper para toda la interfaz y reutilizar componentes existentes.

No uses ninguna API externa, no instales librerías nuevas, reutiliza los componentes y datos que ya existen (`CancionCard`, `Seccion`, `musica.json`, el tema), no elimines ninguna funcionalidad actual y haz que la playlist se conserve mientras el usuario navega por la app. Primero genera un plan de implementación para revisarlo; los cambios deben ir en una rama nueva y subirse como Pull Request.

**Modo Agent**: aprobó el plan y lo implementó en la rama `feature/playlists-personalizadas`.

## Plan propuesto por el agente

Contexto

Implementar que el usuario pueda crear una lista de reproducción personalizada en la app de música (Expo Router + React Native Paper). Requisitos: crear playlist, asignarle nombre, agregar canciones existentes, visualizar la playlist creada y sus canciones, todo con React Native Paper. Restricciones: sin API externa, sin instalar librerías, reutilizar componentes/datos existentes, no eliminar funcionalidad actual, y la playlist debe conservarse mientras se navega por la app.

El trabajo va en una rama nueva con un Pull Request

Enfoque

1. Estado global: `context/PlaylistsContext.js` (nuevo)

- `PlaylistsProvider` con `useState` + React Context (sin librerías nuevas).
- Estado: `playlists = [{ id, nombre, canciones: [idCancion, ...] }]`.
- Acciones: `crearPlaylist(nombre)` → devuelve el id, `agregarCancion(playlistId, cancionId)` (sin duplicados), `quitarCancion(playlistId, cancionId)`, `eliminarPlaylist(id)`.
- Hook `usePlaylists()`.
- Se monta en `app/_layout.js` envolviendo el `<Stack>` dentro de `PaperProvider` → el estado vive mientras la app esté abierta y se conserva al cambiar de tab/pantalla (requisito "conservarse mientras navega"; sin AsyncStorage porque no está instalado).

2. Componente `components/CrearPlaylistDialog.js` (nuevo)

- `Portal` + `Dialog` + `TextInput` (mode outlined) + botones "Cancelar"/"Crear". Valida nombre no vacío.
- Reutilizable desde la pestaña de playlists y desde el player.

3. Nueva pestaña `app/(tabs)/playlists.js` ("Mis Playlists")

- Registrar en `app/(tabs)/_layout.js`: `Tabs.Screen name="playlists"` con título "Playlists" e icono `playlist-music` en `ICONOS`.
- Reutiliza `Seccion` para el título. Lista de playlists con `List.Item` (nombre, "N canciones", `Avatar.Icon` o `Avatar.Image` de la primera canción).
- Estado vacío con `Text` y `FAB` "Nueva playlist" que abre `CrearPlaylistDialog`; al crear navega a la pantalla de detalle.

4. Detalle `app/playlist/[id].js` (nuevo)

- Registrar en `app/_layout.js` como `Stack.Screen name="playlist/[id]"`.
- Header con `IconButton` volver (mismo estilo que el player), nombre de la playlist y conteo.
- Carrusel horizontal reutilizando `CancionCard` para las canciones de la playlist (tap → `/player/{id}`), más lista `List.Item` con `IconButton` para quitar canción.
- Botón `Button` "Agregar canciones" → `Portal` + `Modal` con todas las canciones de `data/musica.json` como `List.Item` + `Checkbox` para agregar/quitar.
- `IconButton` eliminar playlist.

5. Integraciones con pantallas existentes (sin quitar nada)

- `app/(tabs)/index.js`: en la sección "Playlists" mostrar primero las playlists del usuario (del contexto) y luego las de `musica.playlists` como ya está; las del usuario navegan a su detalle.
- `app/player/[id].js`: el `IconButton` `dots-vertical` abre un `Menu` de Paper con "Agregar a <playlist>" por cada playlist y "Nueva playlist…" (abre `CrearPlaylistDialog` y agrega la canción). Mostrar `Snackbar` de confirmación.

6. Entrega

- Rama `feature/playlists-personalizadas` desde `main`.
- Commit, push y Pull Request hacia `main`.

Archivos

- Nuevos: `context/PlaylistsContext.js`, `components/CrearPlaylistDialog.js`, `app/(tabs)/playlists.js`, `app/playlist/[id].js`, `README.md`
- Modificados: `app/_layout.js`, `app/(tabs)/_layout.js`, `app/(tabs)/index.js`, `app/player/[id].js`
- Reutilizados: `components/CancionCard.js`, `components/Seccion.js`, `data/musica.json`, tema de `app/_layout.js`

Verificación

- `npx expo export --platform web` para confirmar que el bundle compila sin errores.
- Manual (`npm run web`): crear playlist en la pestaña Playlists → agregar canciones desde el modal → ver detalle → cambiar a Inicio/Buscar y volver: la playlist sigue ahí → desde el player, menú ⋮ → agregar a la playlist → aparece en el detalle.
