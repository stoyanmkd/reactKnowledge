"use strict";
import React from 'react';
import {Link} from 'react-router';
import { IndexLink } from 'react-router'
import NavLink from './../components/navigation/nav-link';
import Home from './home';

class Repos extends React.Component {
    render(){
        return (
            <div>
                <h2>Repos</h2>
                {/* add some links */}
                <ul>
                    <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
                    <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
                    <li><NavLink to="/repos/facebook/react">React</NavLink></li>
                </ul>
                <div>
                    {/* ... */}
                    {this.props.children || <Home/>}
                </div>
            </div>
        )
    }
};

export default Repos