import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const Input = (props) => {
    return (
        <TextInput style={styles.input}asa
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FFF',
        marginBottom: 10,
    },
});

export default Input;