import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation"


import Loading from '../screens/Loading/Loading'
import Form from '../screens/Form'
import Question from '../screens/Question'

const Initial = createStackNavigator({
    Loading: {
        screen: Loading,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    }
})

const App = createStackNavigator({
    Form: {
        screen : Form,
        navigationOptions : ({navigation}) => ({
            header: null
        })
    },
    Question: {
        screen : Question,
        navigationOptions : ({navigation}) => ({
            header: null
        })
    },
},
{
    initialRouteName: 'Form'
})

const RootNavigation = createAppContainer(createSwitchNavigator(
    {
        Initial: Initial,
        App: App
    },
    {

        initialRouteName: 'Initial',
        resetOnBlur: false,
    }
));

export default RootNavigation