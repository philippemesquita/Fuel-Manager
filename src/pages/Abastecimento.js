
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { RadioButton, TextInput, Button, Appbar } from "react-native-paper";

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

import Header from '../components/Header';
import Container from "../components/Container";
import Body from "../components/Body";

import Input from "../components/Input";

import { useNavigation } from '@react-navigation/native';

import { updateGasto, insertGasto, deleteGasto } from "../services/gastos.services";

const Abastecimento = ({ route }) => {

    const navigation = useNavigation();
    const { item } = route.params ? route.params : {};

    const [tipo, setTipo] = useState('gas');
    const [preco, setPreco] = useState('');
    const [valor, setValor] = useState('');
    const [odometro, setOdometro] = useState('');
    const [data, setData] = useState((moment(new Date).format('DD/MM/YYYY')));

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (item) {
            setTipo(item.tipo == 0 ? 'gas' : 'eta');
            setData(item.data);
            setPreco(item.preco);
            setValor(item.valor);
            setOdometro(item.odometro);
        }
    }, [item])

    const handleSalvar = () => {

        if (item) {

            updateGasto({
                tipo: tipo == 'gas' ? 0 : 1,
                data: data,
                preco: preco,
                valor: valor,
                odometro: odometro,
                id: item.id
            }
            ).then();

        } else {
            insertGasto({
                tipo: tipo == 'gas' ? 0 : 1,
                data: data,
                preco: preco,
                valor: valor,
                odometro: odometro
            }
            ).then();
        }

        navigation.goBack();
    };

    const handleExcluir = () => {
        deleteGasto(item.id).then(res => {
            navigation.goBack();
        });
    };


    return (
        <Container>
            <Header title={'Abastecimento'} goBack={() => navigation.goBack()}>
                <Appbar.Action icon="check" onPress={(handleSalvar)} />

                {
                    item &&
                    <Appbar.Action icon="trash-can" onPress={(handleExcluir)} />
                }

            </Header>
            <Body>
                <View style={styles.containerRadio}>
                    <View style={styles.containerItem}>
                        <RadioButton
                            value="first"
                            status={tipo === 'gas' ? 'checked' : 'unchecked'}
                            color="red"
                            onPress={() => setTipo('gas')}
                        />
                        <Text>Gasolina</Text>
                    </View>

                    <View style={styles.containerItem}>
                        <RadioButton
                            value="second"
                            status={tipo === 'eta' ? 'checked' : 'unchecked'}
                            color="green"
                            onPress={() => setTipo('eta')}
                        />
                        <Text>Etanol</Text>
                    </View>
                </View>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        onTouchCancel={() => setShow(false)}
                        onChange={(event, date) => {
                            setShow(false);
                            setData(moment(date).format('DD/MM/YYYY'));
                        }}
                    />
                )}

                <TouchableOpacity onPress={() => setShow(true)}>
                    <Input
                        editable={false}
                        label="Data"
                        value={data}
                        left={<TextInput.Icon icon="calendar" />}
                    />
                </TouchableOpacity>

                <Input
                    label="Preço"
                    value={preco}
                    onChangeText={text => setPreco(text)}
                    left={<TextInput.Icon icon="currency-brl" />}
                />

                <Input
                    label="Valor"
                    value={valor}
                    onChangeText={text => setValor(text)}
                    left={<TextInput.Icon icon="currency-brl" />}
                />

                <Input
                    label="Odômetro"
                    value={odometro}
                    onChangeText={text => setOdometro(text)}
                    left={<TextInput.Icon icon="av-timer" />}
                />

                <Button style={styles.button} buttonColor="green" mode="contained" onPress={(handleSalvar)}>Salvar</Button>

                {
                    item &&
                    <Button style={styles.button} buttonColor="red" mode="contained" onPress={(handleExcluir)}>Excluir</Button>
                }

            </Body>
        </Container>
    );
};

const styles = StyleSheet.create({
    containerRadio: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    containerItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginBottom: 8
    }
});

export default Abastecimento;