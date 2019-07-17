
import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import {
    Form, Textarea, Text,
    Button
} from 'native-base'
import { connect } from 'react-redux';
import { color } from '../../styles/baseColor'

import * as actionQuestion from '../../redux/actions/question'
import * as actionAnswer from '../../redux/actions/answer'

class RecordAnswer extends Component {
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
            <View style={{ flex: 0.7, backgroundColor: 'transparent', paddingHorizontal: 110 }}>
                <Button
                    style={{ backgroundColor:'#f96d15'}}
                    onPress={() => {
                        this.nextQuestion(question.id, this.state.userId, this.state.answer)
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: '500' }}>Record</Text>
                </Button>
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
)(RecordAnswer);

