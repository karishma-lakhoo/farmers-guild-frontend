import { IStackScreenProps } from "./StackScreenProps";


export interface IRouteProp {
    component: React.FunctionComponent<IStackScreenProps>;
    name: string;
}