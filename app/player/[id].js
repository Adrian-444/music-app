import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, IconButton, Menu, ProgressBar, Snackbar, Text } from "react-native-paper";
import { CrearPlaylistDialog } from "../../components/CrearPlaylistDialog";
import { usePlaylists } from "../../context/PlaylistsContext";
import musica from "../../data/musica.json";

export default function Player() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [favorito, setFavorito] = useState(false);
    const [reproduciendo, setReproduciendo] = useState(false);
    const [menu, setMenu] = useState(false);
    const [dialogo, setDialogo] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const { playlists, crearPlaylist, agregarCancion } = usePlaylists();

    const cancion = musica.canciones.find(c => c.id === id);

    const agregarA = (playlistId, nombre) => {
        agregarCancion(playlistId, cancion.id);
        setMenu(false);
        setMensaje(`Agregada a ${nombre}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <IconButton icon="chevron-down" mode="contained" onPress={() => router.back()} />
                <View style={styles.centro}>
                    <Text variant="labelSmall" style={styles.gris}>REPRODUCIENDO DEL ÁLBUM</Text>
                    <Text variant="titleMedium" style={styles.negrita}>{cancion.album}</Text>
                </View>
                <Menu
                    visible={menu}
                    onDismiss={() => setMenu(false)}
                    anchor={<IconButton icon="dots-vertical" mode="contained" onPress={() => setMenu(true)} />}
                >
                    {playlists.map(p => (
                        <Menu.Item
                            key={p.id}
                            leadingIcon="playlist-plus"
                            title={`Agregar a ${p.nombre}`}
                            onPress={() => agregarA(p.id, p.nombre)}
                        />
                    ))}
                    <Menu.Item
                        leadingIcon="plus"
                        title="Nueva playlist…"
                        onPress={() => {
                            setMenu(false);
                            setDialogo(true);
                        }}
                    />
                </Menu>
            </View>

            <Image source={{ uri: cancion.imagen }} style={styles.portada} />

            <View style={styles.info}>
                <View>
                    <Text variant="titleLarge" style={styles.negrita}>{cancion.titulo}</Text>
                    <Text variant="bodyMedium" style={styles.gris}>{cancion.artista}</Text>
                </View>
                <IconButton
                    icon={favorito ? "heart" : "heart-outline"}
                    iconColor={favorito ? "#C6F432" : "#fff"}
                    onPress={() => setFavorito(!favorito)}
                />
            </View>

            <ProgressBar progress={0.3} style={styles.progreso} />
            <View style={styles.tiempos}>
                <Text variant="labelSmall" style={styles.gris}>1:37</Text>
                <Text variant="labelSmall" style={styles.gris}>{cancion.duracion}</Text>
            </View>

            <View style={styles.controles}>
                <IconButton icon="shuffle-variant" />
                <IconButton icon="skip-previous" />
                <IconButton
                    icon={reproduciendo ? "pause" : "play"}
                    mode="contained"
                    containerColor="#C6F432"
                    iconColor="#000"
                    size={36}
                    onPress={() => setReproduciendo(!reproduciendo)}
                />
                <IconButton icon="skip-next" />
                <IconButton icon="repeat" />
            </View>

            <Button icon="chevron-down" textColor="#aaa" contentStyle={styles.letra}>
                LETRA
            </Button>

            <CrearPlaylistDialog
                visible={dialogo}
                onCerrar={() => setDialogo(false)}
                onCrear={nombre => agregarA(crearPlaylist(nombre), nombre)}
            />

            <Snackbar visible={!!mensaje} onDismiss={() => setMensaje("")} duration={2000}>
                {mensaje}
            </Snackbar>
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
    },
    negrita: {
        fontWeight: "bold",
    },
    gris: {
        color: "#999",
    },
    portada: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 16,
        marginVertical: 24,
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    progreso: {
        marginTop: 16,
        height: 3,
    },
    tiempos: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },
    controles: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 12,
    },
    letra: {
        flexDirection: "column-reverse",
    },
});
