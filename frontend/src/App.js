import React, { Component } from 'react';

import Webcam from "react-webcam";
import Navbar from "./components/navbar2"
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

import DataTable from "./pages/management/datatable"

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import { Register } from "./pages/register2"
import Live from "./pages/live2"
import Management from "./pages/management/index"
import AddEmployees from "./pages/management/add"
import EditEmployees from "./pages/management/edit"

const io = require('socket.io-client')

Object.defineProperty(Array.prototype, 'chunk_inefficient', {
  value: function (chunkSize) {
    var array = this;
    return [].concat.apply([],
      array.map(function (elem, i) {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
      })
    );
  }
});

// this component just listens got route changes, and updates the backend
class RouteChangeListener extends Component {
  componentDidMount() {
    this.unlisten =
      this.props.history.listen(location => {
        this.props.locationChanged(location.pathname)
      });
  }

  render() {
    return null;
  }
}

const RouteChangeListenerWrapper = withRouter(props => (<RouteChangeListener {...props} />))

const SERVER_API = "192.168.0.106"

export default class App extends Component {
  state = {
    clients: [],
    socket: io(window.location.href.includes('localhost')
      ? 'http://localhost:4333'
      : `http://${SERVER_API}:4333`),
    connected: true
  }
  componentDidMount() {
    this.state.socket.on('disconnect', () => {
      console.warn("Client disconnected from the main server")
      this.setState({
        connected: false
      })
    })

    this.state.socket.on('connection', () => {
      console.log("Client connected from the main server")
      this.setState({
        connected: true
      })

      // send auth data to authenticate
      console.log("Requesting authorisation")
      this.state.socket.emit('auth', {
        id: localStorage.getItem('authId'),
        token: localStorage.getItem('token'),
        user: 'admin@tete.com',
        jurisdiction: 'Administration'
      });

      // wait for auth to succeeed
      this.state.socket.on('auth-success', ({ id }) => {
        console.log("Client authed from the main server", id)
        localStorage.setItem('authId', id)
        localStorage.setItem('token', 'token')

      })
    })

    this.state.socket.on('broadcast', (data) => {
      const { clients } = data
      this.setState({
        clients
      })
    })
  }
  handleScreenChange(location) {
    this.state.socket.emit('screen', {
      url: location.split("/")[1].toUpperCase()
    })
  }
  render() {

    return (
      <BrowserRouter>

        <RouteChangeListenerWrapper locationChanged={location => this.handleScreenChange(location)} />

        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <Navbar clients={this.state.clients} connected={this.state.connected} />
            <Register socket={this.state.socket} connected={this.state.connected} />
          </Route>
          <Route path="/live">
            <Navbar clients={this.state.clients} connected={this.state.connected} />
            <Live socket={this.state.socket} connected={this.state.connected} />
          </Route>
          <Route path="/management">
            <Management clients={this.state.clients} socket={this.state.socket} connected={this.state.connected} >
              <Switch>
                <Route path="/management/employees/add" component={() => <AddEmployees clients={this.state.clients} connected={this.state.connected} />} />
                <Route path="/management/employees/edit/:user_id" component={EditEmployees} />
                <Route path="/management/employees" component={DataTable} />
              </Switch>
            </Management>
          </Route>
          <Route path="/">
            <Navbar clients={this.state.clients} connected={this.state.connected} />
            <p>Start with training the model since its taking pics of you</p>
            <p>Proceed to test the model to see if it recorgnises you https://f10bc7c2.ngrok.io</p>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}