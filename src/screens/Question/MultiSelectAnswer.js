
import React, { Component } from 'react'
import { View, AsyncStorage} from 'react-native'
import {
   Text,
    Button
} from 'native-base'
import SelectMultiple from 'react-native-select-multiple'
import { connect } from 'react-redux';
import { color } from '../../styles/baseColor'

import * as actionQuestion from '../../redux/actions/question'
import * as actionAnswer from '../../redux/actions/answer'

class MultiSelectAnswer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isError: false,
            userId: '',
            answer: '',
            question: null,
            options: [],
            selectedAnswer: []
        }


    }

    async componentDidMount() {
        const userId = await AsyncStorage.getItem('userId')

        let question = this.props.questions.questions

        const arr = question.options.split(", ");

        this.setState({
            question, options: arr, userId
        })
    }

    onSelectionsChange = (selectedAnswer) => {
        this.setState({ selectedAnswer })
        
    }

    nextQuestion = (question_id, user_id, answer) => {
        const convertAnswerToArray = answer.map(item => item.value)
        const indexAnswer = convertAnswerToArray.map(item => this.state.selectedAnswer.indexOf(item))
        const answers = indexAnswer.map(item => item + 1).join(',')
        console.log(convertAnswerToArray)
        console.log(indexAnswer)
        console.log(answers)
        this.props.answer({

            question_id,
            user_id,
            answers,
        })
        this.setState({
            answer: '',
            selectedAnswer: []
        })
    }



    render() {
        

        if (this.props.answers.isSuccess) {
            this.props.question(this.props.questions.page)

            this.setState({ answer: '', selectedAnswer: [] })
            this.props.answers.isSuccess = false
            this.props.questions.isSuccess = true
        }

        return (
            <View style={{ flex: 0.7, backgroundColor: 'transparent' }}>
                <View>
                    <SelectMultiple
                        items={this.state.options}
                        keyExtractor={(item, index) => (item, index).toString()}
                        selectedItems={this.state.selectedAnswer}
                        onSelectionsChange={this.onSelectionsChange} />

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
)(MultiSelectAnswer);