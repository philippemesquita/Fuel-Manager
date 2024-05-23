import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';

import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';
import Logo from '../components/Logo';

import { useNavigation } from '@react-navigation/native';

import { register } from '../services/auth.services';

const Register = () => {

    const navigation = useNavigation();

    const [name, setName] = useState('Teste')
    const [email, setEmail] = useState('teste@email.com');
    const [password, setPassword] = useState('pucminas');

    const handleRegister = () => {

        register({
            name: name,
            email: email,
            password: password
        }).then(res => {

            if (res) {
                Alert.alert('Atenção', 'Usuário Cadastrado com sucesso!', [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert('Atenção!', 'Usuário não cadastrado! Tente novamente mais tarde.')
            }

        });

    };

    return (
        <Container>

            <View style={styles.header}>
                <Logo />
            </View>

            <Headline style={styles.textHeader}>
                Fuel Manager
            </Headline>

            <Body>

                <Input
                    label="Nome"
                    value={name}
                    onChangeText={text => setName(text)}
                    left={<TextInput.Icon icon="account" />}
                />

                <Input
                    label="E-mail"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    left={<TextInput.Icon icon="email" />}
                />

                <Input
                    label="Senha"
                    value={password}
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    left={<TextInput.Icon icon="key" />}
                />

                <Button mode="contained" onPress={handleRegister} style={styles.button}>
                    Criar Conta
                </Button>

                <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
                    Cancelar
                </Button>
            </Body>
        </Container>
    );

};

const styles = StyleSheet.create({
    button: {
        marginBottom: 8,
    },
    textHeader: {
        textAlign: 'center',
    },
    header: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default Register;