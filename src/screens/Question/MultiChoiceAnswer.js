
import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import {
    Text,
    Button
} from 'native-base'
import { connect } from 'react-redux';
import { color } from '../../styles/baseColor'

import * as actionQuestion from '../../redux/actions/question'
import * as actionAnswer from '../../redux/actions/answer'

class MultiChoiceAnswer extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
            userId: '',
            answer: '',
            question: null,
            options: [],
        }


    }

    async componentDidMount() {
        const userId = await AsyncStorage.getItem('userId')

        let question = this.props.questions.questions

        const arr = question.options.split(", ");
        const choice = arr.map((item, index) => {
            return { label: item, value: index }
        })
        this.props.question.isSuccess = false

        this.setState({
            question, options: choice, userId
        })
        console.log(this.state.options)
    }

    nextQuestion = (question_id, user_id, answer) => {
      
        this.props.answer({

            question_id,
            user_id,
            answer,
        })
        this.setState({
            answer: '',
            selectedAnswer: []
        })
    }


    handleChangeRadio = value => this.setState({ answer: value + 1 })

    render() {


        if (this.props.answers.isSuccess) {
            this.props.question(this.props.questions.page)

            this.setState({ answer: '', selectedAnswer: [] })
            this.props.answers.isSuccess = false
            this.props.questions.isSuccess = true
        }

        return (
            <View style={{ flex: 0.7, backgroundColor: 'transparent' }}>
                <View style={{marginLeft: 15}}>

                    <RadioForm
                        radio_props={this.state.options}
                        initial={0}
                        buttonColor={'#f96d15'}
                        onPress={(value) => this.handleChangeRadio(value)}
                    />

                </View>


                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button
                        onPress={() => {
                            this.nextQuestion(this.props.questions.questions.id, this.state.userId, this.state.selectedAnswer)
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
)(MultiChoiceAnswer);