
import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { Container, Input, Content, Item, Icon, Button } from 'native-base'
import { } from 'react-native-elements'
import { connect } from 'react-redux';

import * as actionRegister from '../../redux/actions/register'


class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            email: null,
            phone_number: null,
            isLoading: false,
            isError: false
        }
    }

    registerCheck = () => {
        if (this.props.data.isSuccess) {

            this.props.registerSuccess()
            
            let userId = this.props.data.data.id.toString()
            AsyncStorage.setItem('userId', userId)

            this.props.navigation.navigate('Question')
        }
    }

    register = async () => {
        let { name, email, phone_number } = this.state
        if (name || email || phone_number !== null) {
            this.props.register(
                {
                    name: name,
                    email: email,
                    phone_number: phone_number
                }
            )
            this.setState({
                isLoading: this.props.data.isLoading,
                isError: this.props.data.isError
            })

        } else {
            alert('Please Complete the form')

        }

    }

    onChange = (text, type) => {
        if (type === 'name') {
            this.setState({
                name: text
            })
        } else if (type === 'email') {
            this.setState({
                email: text
            })
        } else {
            this.setState({
                phone_number: text
            })
        }
    }

    render() {
        this.registerCheck()
        return (
            <Container>
                <Content contentContainerStyle={{ flexGrow: 1, backgroundColor: '#f8f8f8' }}>
                    <View
                        style={{
                            backgroundColor: '#f8f8f8', flex: 0.3, alignItems: 'center',
                            justifyContent: 'center', paddingTop: 10, borderBottomWidth: 0.25,
                            borderBottomColor: '#f8f8f8', shadowColor: "#414141",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4.65,

                            elevation: 7,
                        }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={{ fontFamily: 'Roboto', fontSize: 27, fontWeight: '500', color: '#58BEC9' }}>Hi Candidate,</Text>
                            <Text style={{ fontFamily: 'Roboto', fontSize: 24, }}>Fill the form to continue</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#f8f8f8', flex: 0.6, paddingHorizontal: 40, paddingTop: 60, alignItems: 'center' }}>
                        <Item>
                            <Icon active name='user' style={{ fontSize: 20, color: '#58BEC9' }} type="SimpleLineIcons" />
                            <Input placeholder='who are you ?' onChangeText={text => this.onChange(text, 'name')} />
                        </Item>
                        <Item>
                            <Icon active name='email' type='MaterialCommunityIcons' style={{ fontSize: 20, color: '#58BEC9' }} />
                            <Input placeholder="what's your email" onChangeText={text => this.onChange(text, 'email')} />
                        </Item>
                        <Item>
                            <Icon active name='cellphone' style={{ fontSize: 20, color: '#58BEC9' }} type="MaterialCommunityIcons" />
                            <Input placeholder="what's your cellphone number ?" onChangeText={text => this.onChange(text, 'phone_number')} />
                        </Item>
                        <View style={{ marginVertical: 40, flexDirection: 'row', width: '100%', alignItems: "flex-end", justifyContent: 'flex-end' }}>
                            <Button onPress={this.register} iconLeft bordered style={{ borderWidth: 1, borderColor: '#f96d15', paddingHorizontal: 5 }}>
                                <Icon name='home' style={{ marginLeft: 0, paddingRight: 3, color: '#f96d15' }} />
                                <Text style={{ fontFamily: 'Roboto', color: '#f96d15' }}>Let's Go</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#58BEC9', alignItems: 'center', justifyContent: 'center', flex: 0.1 }}>
                        <Text style={{ fontFamily: 'Roboto', fontSize: 20, fontWeight: '500', color: '#f8f8f8' }}>QnApps</Text>
                    </View>
                </Content>
            </Container>
        )
    }

}
const mapStateToProps = state => {
    return {
        data: state.register
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (data) => dispatch(actionRegister.register(data)),
        registerSuccess: () => dispatch(actionRegister.registerSuccess()),
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Form);