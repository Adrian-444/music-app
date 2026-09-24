import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Card, Searchbar, Text } from "react-native-paper";
import { Seccion } from "../../components/Seccion";
import musica from "../../data/musica.json";

export default function Buscar() {
    const [busqueda, setBusqueda] = useState("");

    const generos = musica.generos.filter(g => g.nombre.toLowerCase().includes(busqueda.toLowerCase()));

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScrollView contentContainerStyle={styles.contenido}>
                <Searchbar
                    placeholder="Busca una canción"
                    value={busqueda}
                    onChangeText={setBusqueda}
                    style={styles.buscador}
                />

                <Seccion titulo="Explora tu SoundCloud" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {musica.explorar.map(e => (
                        <Card key={e.id} style={styles.explorar}>
                            <Card.Cover source={{ uri: e.imagen }} style={styles.explorarImagen} />
                            <Text variant="labelMedium" style={styles.tag}>{e.tag}</Text>
                        </Card>
                    ))}
                </ScrollView>

                <Seccion titulo="Estados de Ánimo y Géneros" />
                <View style={styles.grid}>
                    {generos.map(g => (
                        <Card key={g.id} style={[styles.genero, { backgroundColor: g.color }]}>
                            <Card.Content style={styles.generoContenido}>
                                <Text variant="titleSmall" style={styles.generoNombre}>{g.nombre}</Text>
                                <Avatar.Image size={56} source={{ uri: g.imagen }} style={styles.generoImagen} />
                            </Card.Content>
                        </Card>
                    ))}
                </View>
                {generos.length === 0 && <Text style={styles.vacio}>Sin resultados</Text>}
            </ScrollView>
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
    buscador: {
        borderRadius: 30,
    },
    explorar: {
        width: 130,
        marginRight: 12,
    },
    explorarImagen: {
        height: 170,
    },
    tag: {
        position: "absolute",
        bottom: 10,
        left: 10,
        color: "#fff",
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    genero: {
        width: "48%",
        marginBottom: 12,
    },
    generoContenido: {
        height: 90,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    generoNombre: {
        color: "#fff",
    },
    generoImagen: {
        alignSelf: "flex-end",
        transform: [{ rotate: "15deg" }],
    },
    vacio: {
        textAlign: "center",
        marginTop: 20,
    },
});
