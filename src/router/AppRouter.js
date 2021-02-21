import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen/RegisterScreen';

import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path='/login' component={LoginScreen}/>
                    <Route exact path='/register' component={RegisterScreen}/>
                    <Route exact path='/' component={CalendarScreen}/>

                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    )
}
