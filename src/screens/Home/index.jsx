import{View,Text, StyleSheet, TouchableOpacity} from 'react-native'
export default function Home(){
return(
    <View style={StyleSheet.container}>
        <Text style={StyleSheet.title}>Home</Text>
        <TouchableOpacity on onPress={()=> navigation.goBack}>
            <Text>Voltar</Text>
        </TouchableOpacity>
    </View>
)

}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
        },
        title:{
            color:'orange',
            fontSize:48,
            fontWeight:'bold',
        },
    }
)