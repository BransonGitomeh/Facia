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
        users: [],
        splitUsers: [],
        count: 0  // save this to local storage so it shows session
    }
    componentDidMount() {
        // socket.on('news', function (data) {
        //   console.log(data);
        //   socket.emit('my other event', { my: 'data' });
        // });
        socket.on('new-detection', async (data) => {
            console.log('new detection', data)
            this.setState({
                users: [data, ...this.state.users],
                splitUsers: [data, ...this.state.users].chunk_inefficient(4)
            })
        })
    }
    sendImageForProcessing(image) {
        console.log("sendImageForProcessing")
        socket.emit('liveFeed', {
            image
        });
        this.setState({
            count: ++this.state.count
        })
    }
    render() {
        // console.log(this.state)
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
                                    : <WebcamCapture capture={image => this.sendImageForProcessing(image)} interval={2000} />
                            }

                            <div>
                                Images Analyzed: {this.state.count}
                            </div>
                        </div>

                        <div className="col-sm">
                            {
                                this.state.splitUsers.map(row => {
                                    return (<div className="row">
                                        {
                                            row.map(col => {
                                                return (<div className="col-sm">
                                                    <img className="img-fluid img-thumbnail" src={col.img} />
                                                    <p>{col.user}</p>
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