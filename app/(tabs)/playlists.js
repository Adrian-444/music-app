import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Avatar, FAB, List, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CrearPlaylistDialog } from "../../components/CrearPlaylistDialog";
import { Seccion } from "../../components/Seccion";
import { usePlaylists } from "../../context/PlaylistsContext";
import musica from "../../data/musica.json";

export default function Playlists() {
    const router = useRouter();
    const { playlists, crearPlaylist } = usePlaylists();
    const [dialogo, setDialogo] = useState(false);

    const portada = playlist => musica.canciones.find(c => c.id === playlist.canciones[0])?.imagen;

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView contentContainerStyle={styles.contenido}>
                <Seccion titulo="Mis Playlists" />
                {playlists.map(p => (
                    <List.Item
                        key={p.id}
                        title={p.nombre}
                        description={`${p.canciones.length} canciones`}
                        onPress={() => router.push(`/playlist/${p.id}`)}
                        left={() =>
                            portada(p) ? (
                                <Avatar.Image size={48} source={{ uri: portada(p) }} />
                            ) : (
                                <Avatar.Icon size={48} icon="playlist-music" />
                            )
                        }
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                    />
                ))}
                {playlists.length === 0 && (
                    <Text style={styles.vacio}>Aún no tienes playlists. Crea una con el botón +</Text>
                )}
            </ScrollView>

            <FAB icon="plus" label="Nueva playlist" style={styles.fab} onPress={() => setDialogo(true)} />

            <CrearPlaylistDialog
                visible={dialogo}
                onCerrar={() => setDialogo(false)}
                onCrear={nombre => router.push(`/playlist/${crearPlaylist(nombre)}`)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contenido: {
        padding: 16,
    },
    vacio: {
        textAlign: "center",
        marginTop: 20,
        color: "#999",
    },
    fab: {
        position: "absolute",
        right: 16,
        bottom: 16,
    },
});
