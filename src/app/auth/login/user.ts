import { State } from './state';
import { Right } from './right';

export interface User{
    _id: String,
    userName:String,
    password: String,
    state: State,
    email: String,
    rights:[ Right ],
    __v: Number
}