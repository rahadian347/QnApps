
import React, { Component } from 'react'
import { View, AsyncStorage, FlatList, ActivityIndicator } from 'react-native'
import {
    Container, Input, Content, Form, Textarea, Card, CardItem, Body, Text,
    Button
} from 'native-base'
import SelectMultiple from 'react-native-select-multiple'
import { connect } from 'react-redux';
import { color } from '../../styles/baseColor'
import CountDown from 'react-native-countdown-component';

import * as actionQuestion from '../../redux/actions/question'
import * as actionAnswer from '../../redux/actions/answer'

import TextAnswer from './TextAnswer'
import MultiSelectAnswer from './MultiSelectAnswer';
import MultiChoiceAnswer from './MultiChoiceAnswer';
import RecordAnswer from './RecordAnswer';


class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isError: false,
            userId: '',
        }


    }



    async componentDidMount() {
        const userId = await AsyncStorage.getItem('userId')
        this.setState({
            userId,
        })
        this.props.question(this.props.questions.page)


    }


    render() {

        let question = {}
        console.log(this.props.questions.page)

        if (this.props.questions.isSuccess) {
            question = this.props.questions.questions

            this.props.questions.isSuccess = false

        }




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
                                        onFinish={() => this.props.question(this.props.questions.page)}
                                        onPress={() => this.props.question(this.props.questions.page)}
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

                        <View>
                            {this.props.questions.questions && this.props.questions.questions.type == 'text' && <TextAnswer />}
                            {this.props.questions.questions && this.props.questions.questions.type == 'multi select' && <MultiSelectAnswer />}
                            {this.props.questions.questions && this.props.questions.questions.type == 'multi choice' && <MultiChoiceAnswer />}
                            {this.props.questions.questions && this.props.questions.questions.type == 'record' && <RecordAnswer />}


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