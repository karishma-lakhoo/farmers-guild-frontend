import {View, Text, Button} from "react-native";
import TestComponent from "../components/test-component";
const TestScreen = ({navigation}) => {
    return (
        <View testID="test-screen">
            <Text>hello</Text>
            <Button title={"test"}/>
        </View>
    )

}
export default TestScreen;