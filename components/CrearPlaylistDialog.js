import { useState } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";

export function CrearPlaylistDialog({ visible, onCerrar, onCrear }) {
    const [nombre, setNombre] = useState("");

    const cerrar = () => {
        setNombre("");
        onCerrar();
    };

    const crear = () => {
        if (!nombre.trim()) return;
        onCrear(nombre.trim());
        cerrar();
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={cerrar}>
                <Dialog.Title>Nueva playlist</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        mode="outlined"
                        label="Nombre de la playlist"
                        value={nombre}
                        onChangeText={setNombre}
                        onSubmitEditing={crear}
                        autoFocus
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={cerrar}>Cancelar</Button>
                    <Button onPress={crear} disabled={!nombre.trim()}>
                        Crear
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
