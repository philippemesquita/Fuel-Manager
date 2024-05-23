import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';

import Container from './../components/Container'
import Header from './../components/Header';
import Body from './../components/Body';
import Input from './../components/Input';

const Calculadora = () => {

    const [gas, setGas] = useState('');
    const [eta, setEta] = useState('');
    const [res, setRes] = useState('');

    const handleCalcular = () => {
        if (!gas || gas <= 0 || !eta || eta <= 0) {
            Alert.alert('Atenção!', 'Obrigatório informar o valor da Gasolina e do Etanol!')
        }
        else {
            let pct = Math.round((eta / gas) * 100);
            if (pct < 70) {
                setRes(pct + '% Recomendamos o uso do Etanol!');
            }
            else {
                setRes(pct + '% Recomendamos o uso da Gasolina!');
            }
        }
    };

    return (
        <Container>
            <Header title={'Calculadora Flex'} />
            <Body>

                <Input
                    label="Preço da Gasolina"
                    value={gas}
                    onChangeText={gas => setGas(gas)}
                />

                <Input
                    label="Preço do Etanol"
                    value={eta}
                    onChangeText={eta => setEta(eta)}
                />

                <Button mode='contained' onPress={handleCalcular}>
                    Calcular
                </Button>

                <Text style={styles.texto}>{res}</Text>
            </Body>
        </Container>
    );
};

const styles = StyleSheet.create({
    texto: {
        textAlign: 'center',
        margin: 10
    }
});

export default Calculadora;