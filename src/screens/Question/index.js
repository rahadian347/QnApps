
import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Container, Input, Content, Form, Textarea, Card, CardItem, Body, Text,
        Button } from 'native-base'
import { } from 'react-native-elements'
import { connect } from 'react-redux';
import { color } from '../../styles/baseColor'
import CountDown from 'react-native-countdown-component';

import * as actionQuestion from '../../redux/actions/question'

class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isError: false,
            userId: '',
            number: 1,
        }


    }

    async componentDidMount() {
        const userId = await AsyncStorage.getItem('userId')
        this.setState({
            userId
        })
        console.log(this.props.number)
        if(this.state.number <= 1) {
            this.props.question(this.state.number)
        }

    }

    nextQuestion = (number) => {

        this.props.question(number + 1)
    }



    render() {
        let question = this.props.questions.questions
        return (
            <Container>
                <Content padder contentContainerStyle={{
                    flexGrow: 1, backgroundColor: '#45969b', alignItems: 'center',
                    justifyContent: 'center', borderBottomWidth: 0.25,
                    borderBottomColor: '#f8f8f8',
                }}>
                    <View style={{
                        backgroundColor: '#f8f8f8', width: '90%', height: '90%', borderRadius: 10,
                        shadowColor: "#414141",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4.65,
                        elevation: 7,
                    }}>
                        <View style={{ flex: 0.3, backgroundColor: 'transparent' }}>
                            <View style={{
                                flex: 0.2, backgroundColor: 'transparent', flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20
                            }}>
                                <Text style={{ fontWeight: '500', fontFamily: 'Roboto', color: color.orange }}>{`Question ${question.number}`}</Text>
                                {question.timer == 0 ? <Text> </Text> : 
                                <CountDown
                                    until={question.timer * 60}
                                    timeToShow={['M', 'S']}
                                    onFinish={() => alert('finished')}
                                    onPress={() => alert('hello')}
                                    digitStyle={{ backgroundColor: color.orange }}
                                    size={12}
                                />}
                            </View>
                            <View style={{ marginHorizontal: 10, marginTop: 10  }}>
                                <Card >
                                    <CardItem >
                                        <Body>
                                            <Text>{question.description}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </View>
                        </View>

                        <View style={{ flex: 0.7, backgroundColor: 'transparent' }}>

                           {
                                question.type == 'text' ? 
                                <Form style={{ marginHorizontal: 10 }}>
                                    <Textarea rowSpan={5} bordered placeholder="fill your answer here.."
                                        style={{
                                            borderRadius: 10,
                                            borderColor: color.orange
                                        }} />
                                </Form> :
                                <Text>Nanti Ini multiple</Text>
                           }

                           <View style={{flex: 1,backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Button onPress={()=>{this.nextQuestion(question.number)}} transparent>
                                    <Text style={{ color: color.orange, fontWeight: '500' }}>NEXT</Text>
                                </Button>
                           </View>
                        </View>

                    </View>
                </Content>
            </Container>
        )
    }

}
const mapStateToProps = state => {
    return {
        questions: state.question,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        question: (number) => dispatch(actionQuestion.question(number))
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Question);