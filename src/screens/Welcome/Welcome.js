import React, {Component} from 'react';
import { Text, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles'

export default class Loading extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.welcome}>Welcome to RNStarter!</Text>
        <Text style={globalStyles.note}>made by aden trisna daud kurnia</Text>
        <Text style={globalStyles.note}>hmm,</Text>
      </View>
    );
  }
}