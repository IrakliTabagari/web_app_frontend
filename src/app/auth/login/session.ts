import { State } from './state';
import { User } from './user';

export interface Session {
    _id: String,
    startDate: Date,
    endDate: Date,
    user: User,
    state: State,
    __v: Number
}
