import { connect } from 'react-redux';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, SafeAreaView, Alert, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FAB } from 'react-native-elements';
import { StatusBar } from 'react-native';
import { setCurrentUser } from '../../../store';
import store from '../../../store';
import config from '../../../config/config.json';
import DateTimePicker from '@react-native-community/datetimepicker';

const Home = ({ currentUser }) => {
    //marcadores
    const heartDates = ['2023-02-14', '2023-03-08', '2023-04-22'];
    //Data
    const [showDatePicker, setShowDatePicker] = useState(false);

    //Modal
    const [modal1Visible, setModal1Visible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [isFabGroupVisible, setIsFabGroupVisible] = useState(false);

    // Var
    const [relacaoSexual, setRelacaoSexual] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [intervalo, setIntervalo] = useState();


    async function addRelacaoSexual() {
        try {
            console.log(currentUser.id,relacaoSexual)
            const response = await fetch(config.urlRootNode + 'add-relacao-sexual', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_usuario: currentUser.id,
                    data1: relacaoSexual
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
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
                        title="Relação sexual"
                        icon={{
                            name: 'home',
                            type: 'font-awesome',
                        }}
                        onPress={() => {
                            setModal1Visible(true);
                        }}
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modal1Visible}
                        onRequestClose={() =>
                            setModal1Visible(false)
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
                                        setModal1Visible(false);
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
                                    onPress={addRelacaoSexual}>
                                    <Text style={styles.buttonText}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <FAB
                        title="  Menstração  "
                        icon={{
                            name: 'trash',
                            type: 'font-awesome',
                        }}
                        onPress={() => setModal2Visible(true)}
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modal2Visible}
                        onRequestClose={() => setModal2Visible(false)}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.texto}>
                                    Adicionar Menstruações
                                </Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        setModal2Visible(false);
                                    }}
                                >
                                    <Text style={styles.buttonText}>X</Text>
                                </TouchableOpacity>

                                <Text style={styles.label}>Data da última menstruação</Text>
                                <TextInput
                                    style={styles.input}
                                    value={selectedDate.toLocaleDateString('pt-BR')}
                                    onTouchStart={() => setShowDatePicker(true)}
                                    onChangeText={setSelectedDate}
                                />

                                {showDatePicker && (
                                    <DateTimePicker
                                        value={selectedDate}
                                        display="spinner"
                                        onChange={(event, date) => {
                                            setShowDatePicker(false);
                                            if (date) {
                                                setSelectedDate(date);
                                            }
                                        }}
                                    />
                                )}
                                <Text style={styles.label}>Intervalo das menstruações</Text>
                                <TextInput
                                    placeholder="Intervalo em dias"
                                    style={styles.input}
                                    value={intervalo}
                                    onChangeText={setIntervalo}
                                />
                                <Text style={styles.label}>Informaçoes da menstruação</Text>
                                <TextInput
                                    placeholder="Observações sobre o ciclo"
                                    style={styles.input}
                                    value={intervalo}
                                    onChangeText={setIntervalo}
                                />

                                <TouchableOpacity
                                    style={styles.button2}
                                    //onPress={ola}
                                >
                                    <Text style={styles.buttonText}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                <FAB
                    title=" Escolha         "
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
const mapStateToProps = (state) => ({
    currentUser: state.currentUser
});

export default connect(mapStateToProps)(Home);
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
        //backgroundColor: '#F8B8FA',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#C60052',

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
    label: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 6,
        marginTop: 10,
        marginLeft: 10,
    },
    input: {
        backgroundColor: 'white',
        width: '100%',
        height: 40,
        borderRadius: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
    },
}); 