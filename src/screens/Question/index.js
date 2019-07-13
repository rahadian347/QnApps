
import React, { Component } from 'react'
import { View, AsyncStorage, FlatList, ActivityIndicator } from 'react-native'
import {
    Container, Input, Content, Form, Textarea, Card, CardItem, Body, Text,
    Button
} from 'native-base'
import SelectMultiple from 'react-native-select-multiple'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { color } from '../../styles/baseColor'
import CountDown from 'react-native-countdown-component';

import * as actionQuestion from '../../redux/actions/question'
import * as actionAnswer from '../../redux/actions/answer'

class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isError: false,
            userId: '',
            number: 1,
            answer: '',
            selectedAnswer: [],
            attachment: ''
        }


    }

    async componentDidMount() {
        const userId = await AsyncStorage.getItem('userId')
        this.setState({
            userId
        })
        if (this.state.number <= 1) {
            this.props.question(this.state.number)
        }

    }

    nextQuestion = (number, question_id, user_id, answer, attachment) => {

        this.props.question(number + 1)
        this.props.answer({

            question_id,
            user_id,
            answer,
            attachment
        })
        this.setState({
            answer: '',
            attachment: '',
            selectedAnswer: []
        })
    }

    onSelectionsChange = (selectedAnswer) => {
        this.setState({ selectedAnswer })
        console.log(this.state.selectedAnswer)
    }




    render() {
        let question = this.props.questions.questions


        if (question.options == undefined) {
            return (
                <ActivityIndicator size={"large"} />
            )

        }
        let option = question.options.split(", ")
        console.log(option)
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
                                        onFinish={() => this.nextQuestion(question.number, question.id, this.state.userId, this.state.selectedAnswer, this.state.attachment)}
                                        onPress={() => this.nextQuestion(question.number, question.id, this.state.userId, this.state.selectedAnswer, this.state.attachment)}
                                        digitStyle={{ backgroundColor: color.orange }}
                                        size={12}
                                    />}
                            </View>
                            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
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
                                            onChangeText={(answer) => this.setState({ answer })}
                                            value={this.state.answer}
                                            style={{
                                                borderRadius: 10,
                                                borderColor: color.orange
                                            }} />
                                    </Form>
                                    :
                                    (question.type == 'multi select') ?
                                        <SelectMultiple
                                            items={option}
                                            keyExtractor={(item, index) => (item, index).toString()}
                                            selectedItems={this.state.selectedAnswer}
                                            onSelectionsChange={this.onSelectionsChange} />

                                        : (question.type == 'multi choice') ?
                                            <Text>multiple choice</Text>
                                            :
                                            <Icon
                                                reverse
                                                name='record-rec'
                                                size={30}
                                                type='material-community'
                                                color='#45969b'
                                                containerStyle={{ justifyContent: 'flex-end', alignSelf: 'flex-end', padding: 5 }}
                                                onPress={() => alert("record")}
                                            />

                            }

                            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Button
                                    onPress={() => {
                                        question.type == 'text' ?
                                            this.nextQuestion(question.number, question.id, this.state.userId, this.state.answer, this.state.attachment)
                                            : question.type == 'multi select' || question.type == 'multi choice' ?
                                                this.nextQuestion(question.number, question.id, this.state.userId, this.state.selectedAnswer, this.state.attachment)
                                                : <Text>Record</Text>
                                    }
                                    }
                                    transparent>
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
        question: (number) => dispatch(actionQuestion.question(number)),
        answer: (question_id, user_id, answer, attachment) => dispatch(actionAnswer.answer(question_id, user_id, answer, attachment))
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Question);