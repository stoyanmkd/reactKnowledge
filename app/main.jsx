"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import KnowledgeTester from './views/knowledge-tester';
import About from './views/about';
import Repos from './views/repos';
import Repo from './views/repo';
import Home from './views/home'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={KnowledgeTester}>
            <IndexRoute component={Home}/>
            <Route path='/repos' component={Repos}>
                <Route path="/repos/:userName/:repoName" component={Repo}/>
            </Route>
            <Route path='/about' component={About}/>
        </Route>
    </Router>,
    document.getElementById('root')
);