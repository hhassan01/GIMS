import React                                    from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { createMuiTheme }                       from '@material-ui/core/styles';
import { ThemeProvider }                        from '@material-ui/styles';
import { orange }                               from '@material-ui/core/colors';
import UserList                                 from './userList/userList';
import LogIn                                    from './login/LogIn';
import SignUp                                   from './signup/SignUp';
import Dashboard                                from './dashboard/Dashboard';
import ManufacturerDash                         from './dashboard/DashboardManufacturer';
import ResetPassword                            from './resetPassword/resetPassword';
import PasswordForm                             from './resetPassword/passwordForm';
import './App.css';


function App() {
    return (
        <Router>
            <Route exact path="/"   component={LogIn}            />
            <Route path="/signup"   component={SignUp}           />
            <Route path="/users"    component={UserList}         />
            <Route path="/profile"  component={Dashboard}        />
            <Route path="/Manulist" component={ManufacturerDash} />
        </Router>
    );
}

export default App;