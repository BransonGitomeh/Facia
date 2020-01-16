import React, { Component } from 'react';
import Navbar from "../../components/navbar2"

import Webcam from "react-webcam";
import _ from "lodash"

import Aside from "./aside"

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
        users: [],
        uniqueUsersWithLatestTime: [],
        splitUsers: [],
        count: 0
    }

    componentDidMount() {
        // init ui
        window.initScripts()
    }

    sendImageForProcessing(image) {
        this.props.socket.emit('liveFeed', {
            image
        });
        this.setState({
            count: ++this.state.count
        })
    }

    render() {
        return (
            <div className="kt-grid kt-grid--hor kt-grid--root">
                <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
                    <Aside/>
                    <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper">
                        {/* begin:: Header */}
                        <Navbar clients={this.props.clients} connected={this.props.connected} />
                        {/* end:: Header */}
                        <div
                            className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
                            id="kt_content"
                        >
                            {this.props.children}
                        </div>
                        {/* begin:: Footer */}
                        <div className="kt-footer kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop">
                            <div className="kt-container  kt-container--fluid ">
                                <div className="kt-footer__copyright">
                                    2018&nbsp;©&nbsp;
            <a
                                        href="http://keenthemes.com/keen"
                                        target="_blank"
                                        className="kt-link"
                                    >
                                        Keenthemes Inc
            </a>
                                </div>
                                <div className="kt-footer__menu">
                                    <a
                                        href="http://keenthemes.com/keen"
                                        target="_blank"
                                        className="kt-footer__menu-link kt-link"
                                    >
                                        About
            </a>
                                    <a
                                        href="http://keenthemes.com/keen"
                                        target="_blank"
                                        className="kt-footer__menu-link kt-link"
                                    >
                                        Team
            </a>
                                    <a
                                        href="http://keenthemes.com/keen"
                                        target="_blank"
                                        className="kt-footer__menu-link kt-link"
                                    >
                                        Contact
            </a>
                                </div>
                            </div>
                        </div>
                        {/* end:: Footer */}
                    </div>
                </div>
            </div>
        )
    }
}