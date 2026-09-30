import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Checkbox, IconButton, List, Modal, Portal, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CancionCard } from "../../components/CancionCard";
import { Seccion } from "../../components/Seccion";
import { usePlaylists } from "../../context/PlaylistsContext";
import musica from "../../data/musica.json";

export default function PlaylistDetalle() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { playlists, agregarCancion, quitarCancion, eliminarPlaylist } = usePlaylists();
    const [agregando, setAgregando] = useState(false);

    const playlist = playlists.find(p => p.id === id);

    if (!playlist) {
        return (
            <SafeAreaView style={[styles.container, styles.centro]}>
                <Text variant="titleMedium">Playlist no encontrada</Text>
                <Button onPress={() => router.back()}>Volver</Button>
            </SafeAreaView>
        );
    }

    const canciones = playlist.canciones.map(cid => musica.canciones.find(c => c.id === cid)).filter(Boolean);

    const alternar = cancionId =>
        playlist.canciones.includes(cancionId)
            ? quitarCancion(playlist.id, cancionId)
            : agregarCancion(playlist.id, cancionId);

    const eliminar = () => {
        eliminarPlaylist(playlist.id);
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <IconButton icon="chevron-left" mode="contained" onPress={() => router.back()} />
                <View style={styles.centro}>
                    <Text variant="labelSmall" style={styles.gris}>PLAYLIST</Text>
                    <Text variant="titleMedium" style={styles.negrita}>{playlist.nombre}</Text>
                </View>
                <IconButton icon="delete-outline" mode="contained" onPress={eliminar} />
            </View>

            <ScrollView contentContainerStyle={styles.contenido}>
                <Text variant="bodyMedium" style={styles.gris}>{canciones.length} canciones</Text>

                <Button icon="playlist-plus" mode="contained" style={styles.boton} onPress={() => setAgregando(true)}>
                    Agregar canciones
                </Button>

                {canciones.length > 0 ? (
                    <>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {canciones.map(c => (
                                <CancionCard key={c.id} cancion={c} onPress={() => router.push(`/player/${c.id}`)} />
                            ))}
                        </ScrollView>

                        <Seccion titulo="Canciones" />
                        {canciones.map(c => (
                            <List.Item
                                key={c.id}
                                title={c.titulo}
                                description={`${c.artista} · ${c.duracion}`}
                                onPress={() => router.push(`/player/${c.id}`)}
                                left={() => <Avatar.Image size={48} source={{ uri: c.imagen }} />}
                                right={() => <IconButton icon="close" onPress={() => quitarCancion(playlist.id, c.id)} />}
                            />
                        ))}
                    </>
                ) : (
                    <Text style={styles.vacio}>Esta playlist está vacía. Agrega canciones para empezar.</Text>
                )}
            </ScrollView>

            <Portal>
                <Modal visible={agregando} onDismiss={() => setAgregando(false)} contentContainerStyle={styles.modal}>
                    <Text variant="titleMedium" style={styles.negrita}>Agregar a {playlist.nombre}</Text>
                    <ScrollView style={styles.modalLista}>
                        {musica.canciones.map(c => (
                            <List.Item
                                key={c.id}
                                title={c.titulo}
                                description={c.artista}
                                onPress={() => alternar(c.id)}
                                left={() => <Avatar.Image size={40} source={{ uri: c.imagen }} />}
                                right={() => (
                                    <Checkbox
                                        status={playlist.canciones.includes(c.id) ? "checked" : "unchecked"}
                                        onPress={() => alternar(c.id)}
                                    />
                                )}
                            />
                        ))}
                    </ScrollView>
                    <Button mode="contained" onPress={() => setAgregando(false)}>
                        Listo
                    </Button>
                </Modal>
            </Portal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    centro: {
        alignItems: "center",
        justifyContent: "center",
    },
    contenido: {
        paddingTop: 16,
    },
    negrita: {
        fontWeight: "bold",
    },
    gris: {
        color: "#999",
    },
    boton: {
        marginVertical: 16,
    },
    vacio: {
        textAlign: "center",
        marginTop: 20,
        color: "#999",
    },
    modal: {
        backgroundColor: "#1A1A1A",
        margin: 16,
        padding: 16,
        borderRadius: 16,
        maxHeight: "80%",
    },
    modalLista: {
        marginVertical: 12,
    },
});
