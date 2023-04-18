import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, Button, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FAB } from 'react-native-elements';
import { StatusBar } from 'react-native';

export default function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showBox, setShowBox] = useState(false);
    const heartDates = ['2023-02-14', '2023-03-08', '2023-04-22'];
    const [modalVisible, setModalVisible] = useState(false);
    const [isFabGroupVisible, setIsFabGroupVisible] = useState(false);
    const handleFabPress = () => {
        setShowBox(!showBox);
    };

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
                        title="Opção 1"
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
                                <Button title="Fechar" onPress={() => setModalVisible(false)} />
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
                    title="Opções"
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
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').height * 0.6,
    },
}); 