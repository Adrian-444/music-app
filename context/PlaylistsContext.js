import { createContext, useContext, useState } from "react";

const PlaylistsContext = createContext(null);

export function PlaylistsProvider({ children }) {
    const [playlists, setPlaylists] = useState([]);

    const crearPlaylist = nombre => {
        const id = Date.now().toString();
        setPlaylists(prev => [...prev, { id, nombre: nombre.trim(), canciones: [] }]);
        return id;
    };

    const agregarCancion = (playlistId, cancionId) => {
        setPlaylists(prev =>
            prev.map(p =>
                p.id === playlistId && !p.canciones.includes(cancionId)
                    ? { ...p, canciones: [...p.canciones, cancionId] }
                    : p
            )
        );
    };

    const quitarCancion = (playlistId, cancionId) => {
        setPlaylists(prev =>
            prev.map(p => (p.id === playlistId ? { ...p, canciones: p.canciones.filter(c => c !== cancionId) } : p))
        );
    };

    const eliminarPlaylist = id => {
        setPlaylists(prev => prev.filter(p => p.id !== id));
    };

    return (
        <PlaylistsContext.Provider value={{ playlists, crearPlaylist, agregarCancion, quitarCancion, eliminarPlaylist }}>
            {children}
        </PlaylistsContext.Provider>
    );
}

export function usePlaylists() {
    return useContext(PlaylistsContext);
}
