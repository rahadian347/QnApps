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

                <Text style={globalStyles.note}>Welcome To Our Interview Section</Text>
                <Text style={globalStyles.note}>Rules: </Text>
                <Text style={globalStyles.note}>4 Questions (Description, Multiselect, MultiChoice, Recording) </Text>
                <Text style={globalStyles.note}>Answer wisely and Enjoy </Text>

                <View style={{ paddingTop: 10,marginHorizontal: 50}}>
                    <Button
                        style={{backgroundColor: color.orange, paddingHorizontal: 10}}
                        onPress={() => {
                            this.props.navigation.navigate("Question")
                        }
                        }
                    >
                        <Text style={{ color: 'white', fontWeight: '500', backgroundColor: color.orange }}>NEXT</Text>
                    </Button>

                </View>
            </View>
        )
    }
}