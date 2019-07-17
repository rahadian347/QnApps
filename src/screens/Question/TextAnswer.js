
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

class TextAnswer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: ''
        }


    }



    async componentDidMount() {
        const userId = await AsyncStorage.getItem('userId')
        this.setState({
            userId,
        })
    }


    nextQuestion = (question_id, user_id, answer) => {
        this.props.answer({

            question_id,
            user_id,
            answer,
        })
        this.setState({
            answer: '',
        })
    }

    render() {

        let question
        question = this.props.questions.questions
        if (this.props.answers.isSuccess) {
            this.props.question(this.props.questions.page)

            this.setState({ answer: '' })
            this.props.answers.isSuccess = false
        }

        return (
            <View style={{ flex: 0.7, backgroundColor: 'transparent' }}>
                <Form style={{ marginHorizontal: 10 }}>
                    <Textarea rowSpan={5} bordered placeholder="fill your answer here.."
                        onChangeText={(answer) => this.setState({ answer })}
                        value={this.state.answer}
                        style={{
                            borderRadius: 10,
                            borderColor: color.orange
                        }} />
                </Form>


                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button
                        onPress={() => {
                            this.nextQuestion(question.id, this.state.userId, this.state.answer)
                        }}
                        transparent>
                        <Text style={{ color: color.orange, fontWeight: '500' }}>NEXT</Text>
                    </Button>
                </View>
            </View>
        )

    }

}
const mapStateToProps = state => {
    return {
        questions: state.question,
        answers: state.answer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        question: (number) => dispatch(actionQuestion.question(number)),
        answer: (question_id, user_id, answer) => dispatch(actionAnswer.answer(question_id, user_id, answer))
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(TextAnswer);

