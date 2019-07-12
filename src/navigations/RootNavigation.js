import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation"


import Loading from '../screens/Loading/Loading'
import Welcome from '../screens/Welcome/Welcome'

const Initial = createStackNavigator({
    Loading: {
        screen: Loading,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    }
})

const App = createStackNavigator({
    Welcome: {
        screen : Welcome,
        navigationOptions : ({navigation}) => ({
            header: null
        })
    }
},
{
    initialRouteName: 'Welcome'
})

const RootNavigation = createAppContainer(createSwitchNavigator(
    {
        Initial: Initial,
        App: App
    },
    {

        initialRouteName: 'Initial',
        resetOnBlur: true,
    }
));

export default RootNavigation