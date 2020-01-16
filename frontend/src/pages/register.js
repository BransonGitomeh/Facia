import React, { Component } from 'react';

import Webcam from "react-webcam";
import Navbar from "../components/navbar"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const io = require('socket.io-client')

var socket = io('http://localhost:4333');

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const WebcamCapture = (props) => {
  const webcamRef = React.useRef(null);
  if (props.analysing == true)
    return (
      <Webcam
        audio={false}
        height={'auto'}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={"100%"}
        videoConstraints={videoConstraints}
        onUserMedia={() => {
          setInterval(() => {
            const imageSrc = webcamRef.current.getScreenshot();
            props.capture(imageSrc)
          }, props.interval);
        }}
      />
    );
};

export default class Register extends Component {
  state = {
    images: [],
    splitImages: [],
    analysing: false,
    count: 0  // save this to local storage so it shows session
  }
  componentDidMount() {
    // socket.on('news', function (data) {
    //   console.log(data);
    //   socket.emit('my other event', { my: 'data' });
    // });


    socket.on('new-face', async (data) => {
      console.log('new face', data)
      this.setState({
        images: [...this.state.images, data],
        splitImages: [...this.state.images, data].chunk_inefficient(4)
      })
    })
  }
  sendImageForProcessing(image) {
    
    socket.emit('new-registration', {
      label: this.state.name,
      image
    });
    console.log("Sent the image to the server")
    this.setState({
      count: ++this.state.count
    })
  }
  startAnalysis() {
    socket.emit('storeClientInfo', { customId: this.state.name });
    this.setState({
      analysing: true
    })
  }
  stopAnalysis() {
    this.setState({
      analysing: false
    })
  }
  render() {
    return (
      <div className="app">
        <div style={{
          marginTop: 15
        }} className="container-fluid">
          <div className="row">
            <div className="col-sm">
              {
                this.state.analysing == false
                  ? null
                  : <WebcamCapture analysing={this.state.analysing} capture={image => this.sendImageForProcessing(image)} interval={2000} />
              }
              <form onSubmit={(e) => {
                e.preventDefault()
                this.startAnalysis()
              }}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Unique registration name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name your name"
                    value={this.state.name}
                    onInput={e => this.setState({
                      name: e.target.value
                    })}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your details with anyone else.
                </small>
                </div>
                {
                  this.state.analysing == false
                    ? < button disabled={!this.state.name} type="submit" className="btn btn-primary">Start Training</button>
                    : null
                }
              </form>

              <div>
                Images Analyzed: {this.state.count}
              </div>
            </div>
            <div className="col-sm">
              {
                this.state.splitImages.map(row => {
                  return (<div className="row">
                    {
                      row.map(col => {
                        return (<div className="col-sm">
                          <img className="img-fluid img-thumbnail" src={col.img} />
                        </div>)
                      })
                    }
                  </div>)
                })
              }
            </div>
          </div>
        </div>
      </div >
    );
  }
}