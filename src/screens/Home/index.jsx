import { connect } from 'react-redux';
import React, { useState, useEffect  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, SafeAreaView, Alert, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather'; //  alterado de FontAwesome
import { FAB } from 'react-native-elements';
import { StatusBar } from 'react-native';
import { setCurrentUser } from '../../../store';
import store from '../../../store';
import config from '../../../config/config.json';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


const Home = ({ currentUser }) => {
    
    //marcadores do mapa principal

    //  dias de relacao sexual
    const [heartDates, setheartDates] = useState([]);
    //const heartDates = ['2023-02-14', '2023-05-10', '2023-03-08', '2023-04-22'];
    useEffect(()=>{
        if(heartDates?.length === 0){
            getRelacaoSexual(currentUser.id ); // puxa do DB
        }
    },[heartDates]);


    // dias menstruacao
    //const menstruacaoDates = ['2023-05-02', '2023-05-03'];
    const [menstruacaoDates, setMenstruacaoDates ] = useState([]);
    useEffect(()=>{
        if(menstruacaoDates?.length === 0){
            getUltimaMenstruacao(currentUser.id);// puxa do DB
        }
    },[menstruacaoDates]);

    // dia de ovulacao
    // const ovulacaoDates = ['2023-05-14', '2023-06-13'];
    // calculado no APP com base na ultima dia1 da menstruacao
    const [ovulacaoDates, setOvulacaoDates ] = useState([]);


    // modais

    //Modal Add Relacao
    const [modal1Visible, setModal1Visible] = useState(false);
    //Modal Add menstruacao
    const [modal2Visible, setModal2Visible] = useState(false);
    // botoes flutuantes de add relacao e menstruacao
    const [isFabGroupVisible, setIsFabGroupVisible] = useState(false);

    // relacao

    // var da data pressionada no modal add relacao
    //  ja no formato date string
    //  setRelacaoSexual ( day.dateString  )
    const [relacaoSexual, setRelacaoSexual] = useState('');
    
    // menstruacao

    //escolha de Data da ultima mensatruacao
    const [showDatePicker, setShowDatePicker] = useState(false);
    // Var de data da ultima menstruacao selecionada no modal
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [intervalo, setIntervalo] = useState();


    // para lidar com escolha da menstruacao
    // funcao nao esta sendo usada ainda
    // const onChange = (event, selectedDate) => {
    const handlePressMenstruacao = (event) => {
        const currentDate = selectedDate;
        //setDate(currentDate);   //  de onde é esta funcao setDate ?
        //setSelectedDate(currentDate);   
        const dtInicio = currentDate.dateString;
        const dtFim = moment(currentDate).add(4, 'days').toString;
        
        setShowDatePicker(false);
        addCicloMenstrual(currentUser.id,dtInicio);

    };


    // quando se clica no botao CONFIRMAR do modal de add relacao
    function handlePressAddRelacao(){
        // grava no DB a nova relacao
        addRelacaoSexual(currentUser.id,relacaoSexual);

        // atualiza mapa visual
        calendarioAddDiaRelacao(relacaoSexual);
    }

    // funcao secundaria do botao CONFIRMAR do modal de relacoes
    const calendarioAddDiaRelacao = (novoDia) => {
        
        // FUNCAO PARA adidionar no calendario central do front end a relacao, 
        // sem precisar de um refresh do DB
        // VER   const [heartDates, setheartDates] = useState([]);
        //console.log(novoDia);
        setheartDates(oldArray => [...oldArray, novoDia ]);
    };

    // funcao primeira botao CONFIRMAR do modal de relacoes..
    async function addRelacaoSexual(id_usuario, dataDia) {
        // porem ao pressionar um dia, a var  RelacaoSexual que é atribuida
        // onDayPress={(day) => setRelacaoSexual(day.dateString)}
        console.log("addRelacaoSexual" + dataDia);
        // console.log(RelacaoSexual);

        try {
            console.log(currentUser.id,dataDia)
            const request = await fetch(config.urlRootNode + 'add-relacao-sexual', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_usuarioRelacao: id_usuario,
                    dataRelacao: dataDia
                })
            });
            let response = await request.json();
            if (response.success) {
                console.log("relacao gravada");
            } else {
                console.log(response.json());
            }
            // return data;
        
        } catch (error) {
            console.error(error);
        }
    }

   // funcao para caregamento inicial de relacoes
    async function getRelacaoSexual(id_usuario) {
        //  precisa de uma funcao para ler cada resultado e preencher no calendario
        // usando 
        console.log("getRelacaoSexual INICIO ");
        // console.log(RelacaoSexual);
        try {
            let request  = await fetch(config.urlRootNode + 'get-relacao-sexual', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_usuarioRelacao: id_usuario
                })
            });

            let response = await request.json();
            if (response.success) {
                console.log("get relacoes baixadas:  ");
                console.log(response);
                console.log(response.data);
                // atualizar array hearts
                response.foreach((RelacaoSexual) =>{
                      setheartDates(oldArray => [...oldArray, RelacaoSexual.dataValues.data ]);
                });
            } else {
                console.log("getRelacaoSexual  response.success  FALSE");
                console.log(response.json());
            }
            // return data;
        
        } catch (error) {
            console.log("getRelacaoSexual  catch ");
            console.error(error);
        }
    }

    //  grava no DB a menstruacao marcada no modal 
    async function addCicloMenstrual(id_usuario, inicio) {
        // id_usuarioRelacao
        const dtInicio = moment(inicio).format('YYYY-MM-DD');
        const dtFim = moment(inicio).add(4, 'days');
        try {
          const response = await fetch(config.urlRootNode + 'add-ciclo-menstrual', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',   
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id_usuarioCiclo: id_usuario,
              dataInicio:  dtInicio,
              dataFim:  dtFim,
              intervalo1: intervalo
            })
          });
          const data = await response.json();
          if (data) {
              console.log("menstruacao gravada");
            
          }
        } catch (error) {
            console.log("addCicloMenstrual  catch ");
          console.error(error);
        }
    }
    



    //  puxa do DB  menstrucao mais recente
    async function getUltimaMenstruacao(id_usuario) {
        try {
            let request = await fetch(config.urlRootNode + 'get-ultima-menstruacao', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_usuarioCiclo: id_usuario,
                })
            });
      
            let response = await request.json();
      
            if (response.success) {
                let dataInicio;
                let dataFim;
                let dateArray = [];
  
                console.log(" getUltimaMenstruacao:  ");
                console.log(" === console.log(response); === ");
                
                console.log(response);
                console.log(" === console.log(response.data); === ");
                console.log(response.data);
                // só tem 1 resultado
                response.foreach((Ciclo_Menstrual) =>{
                    dataInicio = Ciclo_Menstrual.dataValues.data_inicio;
                    dataFim = Ciclo_Menstrual.dataValues.data_final;
                });

                // preencher datas entre data_inicio e data_final
                var data1 = moment(dataInicio);
                var data9 = moment(dataFim);
                while (data1 <= data9) {
                    setMenstruacaoDates(oldArray => [...oldArray, moment(data1).format('YYYY-MM-DD') ]);
                    data1 = moment(data1).add(1, 'days');
                }

                // preencher dia da ovulacao
                setOvulacaoDates( moment(dataInicio).add(14, 'days').format('YYYY-MM-DD') );
            
            } else {
                // exibir mensagem de erro
                console.log(" getUltimaMenstruacao:  response.success FALSE ");

            }
        } catch (error) {
            console.log("addCicloMenstrual catch ")
          console.error(error);
          // exibir mensagem de erro
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
                                    <Icon name="heart" size={26} color="#00f" style={{ position: 'absolute' }} />
                                )}
                                {ovulacaoDates.includes(date.dateString) && (
                                    <Icon name="sun" size={26} color="#0f0" style={{ position: 'absolute' }} />
                                )}
                                {menstruacaoDates.includes(date.dateString) && (
                                    <Icon name="droplet" size={26} color="#f00" style={{ position: 'absolute' }} />
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

                                    onPress={() => {
                                        handlePressAddRelacao();
                                        }
                                    }>

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
                                                console.log(" menstruacao  DateTimePicker if(Date) TRUE ")
                                                console.log(date);
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

                                <TouchableOpacity
                                    style={styles.button2}
                                    onPress={() => {
                                        handlePressMenstruacao();
                                        }
                                    }
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