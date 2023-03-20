import { IRouteProps } from "../../src/library/RouteProp";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import HomeScreen from "../screens/Home";
import GardenScreen from "../screens/Garden";
import LogScreen from "../screens/Log";
import PlantsScreen from "../screens/Plants";


const routes: IRouteProps[] = [
    {
        name: 'Login',
        component: LoginScreen,
    },
    {
        name: 'SignUp',
        component: SignUpScreen,
    },
    {
        name: 'Home',
        component: HomeScreen,
    },
    {
        name: 'Garden',
        component: GardenScreen,
    },
    {
        name: 'Log',
        component: LogScreen,
    },
    {
        name: 'Plants',
        component: PlantsScreen,
    }
];

export default routes;