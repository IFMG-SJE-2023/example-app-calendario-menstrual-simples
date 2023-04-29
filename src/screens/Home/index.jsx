import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, Button, SafeAreaView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FAB } from 'react-native-elements';
import { StatusBar } from 'react-native';
import dbUsuarios from '../../services/sqlite/Usuarios';


export default function Home() {
    const [showBox, setShowBox] = useState(false);
    const heartDates = [];
    const [modalVisible, setModalVisible] = useState(false);
    const [isFabGroupVisible, setIsFabGroupVisible] = useState(false);
    const [relacaoSexual, setRelacaoSexual] = useState('');

    const handleFabPress = () => {
        setShowBox(!showBox);
    };
    const handleNextPress = () => {
        if (relacaoSexual) {

        } else {
            Alert.alert('Selecione a data para continuar.');
        }
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar hidden={true} />
            <View style={[styles.calendario]}>
                <Calendar
                    minDate={'2023-01-01'}
                    maxDate={'2024-12-31'}
                    dayComponent={({ date, state }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                {/* Check if the current date is in the list of heart dates */}
                                {heartDates.includes(date.dateString) && (
                                    <Icon name="heart" size={26} color="#f00" style={{ position: 'absolute' }} />
                                )}
                                <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>
                                    {date.day}
                                </Text>
                            </View>
                        );
                    }}
                />
            </View>
            <View style={[styles.fabPrincipal]}>
                <View style={[styles.fabGroup, { display: isFabGroupVisible ? 'flex' : 'none' }]}>
                    <FAB
                        title="Relação"
                        icon={{
                            name: 'check',
                            type: 'font-awesome',
                        }}
                        onPress={() => {
                            //setIsFabGroupVisible(isFabGroupVisible);
                            setModalVisible(true);

                        }}
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() =>
                            setModalVisible(false)
                        }
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.texto}>
                                    Adcionar Relação Sexual
                                </Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.buttonText}>X</Text>
                                </TouchableOpacity>
                                <View style={styles.calendario}>
                                    <Calendar
                                        locale='pt-br'
                                        monthFormat='MMMM yyyy'
                                        onDayPress={(day) => setRelacaoSexual(day.dateString)}
                                        markedDates={{ [relacaoSexual]: { selected: true } }}
                                    />
                                </View>
                                <TouchableOpacity style={styles.button2}
                                    onPress={handleNextPress}>
                                    <Text style={styles.buttonText}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <FAB
                        title="Opção 2"
                        icon={{
                            name: 'trash',
                            type: 'font-awesome',
                        }}
                        onPress={() => console.log('Opção 2 selecionada')}
                    />
                    <FAB
                        title="Opção 3"
                        icon={{
                            name: 'edit',
                            type: 'font-awesome',
                        }}
                        onPress={() => console.log('Opção 3 selecionada')}
                    />
                </View>
                <FAB
                    title="Opções  "
                    icon={{
                        name: 'plus',
                        type: 'font-awesome',
                    }}
                    onPress={() => setIsFabGroupVisible(!isFabGroupVisible)}
                />
            </View>


        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    calendario: {
        width: '100%',
    },
    box: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: '80%',
        height: '90%',
        backgroundColor: 'white',
    },
    fabPrincipal: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    fabMenu: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',

        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.75,
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        position: 'absolute',
        top: 0,
        right: 0
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    texto: {
        alignItems: 'center',
    },
    button2: {
        backgroundColor: '#c60052',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 20,
    },
    botaoSelecionado: {
        backgroundColor: '#ff5b8b',
    },
}); 