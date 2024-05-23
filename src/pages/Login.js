import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button, Headline } from 'react-native-paper';

import Container from '../components/Container';
import Body from '../components/Body';
import Input from '../components/Input';
import Logo from '../components/Logo';

import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';

import { login } from '../services/auth.services';

const Login = () => {

    const navigation = useNavigation();

    const { setSigned, setName } = useUser();

    const [email, setEmail] = useState('teste@email.com');
    const [password, setPassword] = useState('pucminas');

    const handleLogin = () => {

        login({
            email: email,
            password: password
        }).then(res => {

            if (res && res.user) {

                setSigned(true);
                setName(res.user.name);
                AsyncStorage.setItem('@TOKEN_KEY', res.accessToken).then();

            } else {
                Alert.alert('Atenção!', 'Usuário ou senha iválidos.')
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

                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Entrar
                </Button>

                <Button mode="outlined" onPress={() => navigation.navigate('Register')} style={styles.button}>
                    Criar Conta
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

export default Login;