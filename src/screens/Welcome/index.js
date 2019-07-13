import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import {
    Button
} from 'native-base'
import { globalStyles } from '../../styles/globalStyles'
import { color } from '../../styles/baseColor'


export default class Welcome extends Component {
    
    componentDidMount() {
       
    }
    render() {
        return (
            <View style={globalStyles.containerTransparent}>
               
                <Text style={globalStyles.note}>Welcome To PT. Mencari Cinta Sejati</Text>
                <Button
                    onPress={() => {
                        this.props.navigation.navigate("Question")
                    }
                    }
                    >
                    <Text style={{ color: 'white', fontWeight: '500', backgroundColor: color.orange }}>NEXT</Text>
                </Button>
            </View>
        )
    }
}