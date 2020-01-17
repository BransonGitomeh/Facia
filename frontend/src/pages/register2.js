import React, { Component } from 'react';

import Webcam from "react-webcam";

import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import axios from 'axios'
const SERVER_API = "http://localhost:4333"

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

let captureInterval = 0

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
      onUserMedia={() => props.onReady(webcamRef.current)}
      onUserMediaError={error => console.log('Error user media', error)}
    />
  );
};

class Register extends Component {
  state = {
    employee: {},
    jobs: [],
    images: [],
    splitImages: [],
    analysing: false,
    finishedAnalysis: false,
    targetNumberOfImages: 10,
    percentage: 0,
    count: 0  // save this to local storage so it shows session
  }
  async componentDidMount() {
    if (this.props.socket)
      this.props.socket.on('new-face', async (data) => {
        const images = [...this.state.images, data];

        const percentage = (Number(images.length) / Number(this.state.targetNumberOfImages) * 100).toFixed(1);

        this.setState({
          images,
          percentage,
          splitImages: images.chunk_inefficient(4)
        })
      })

    const { data: employee } = await axios.get(`${SERVER_API}/employees/${this.props.match.params.id}`)

    this.setState({ employee })
  }
  sendImageForProcessing(image) {
    console.log("Sending image for processing")
    if (this.props.socket)
      this.props.socket.emit('new-registration', {
        number: this.state.employee.number,
        label: this.state.employee.number,
        image
      });

    this.setState({
      count: ++this.state.count
    })
  }
  startAnalysis() {
    if (this.props.socket)
      this.props.socket.emit('storeClientInfo', { customId: this.state.name });
    this.processWebcam(this.state.camera)
    this.setState({
      analysing: true
    })
  }
  stopAnalysis() {
    clearInterval(captureInterval);
    captureInterval = 0;

    if (this.state.finishedAnalysis === true) {
      // reset state here
      this.setState({
        analysing: false,
        images: [],
        splitImages: [],
        analysing: false,
        finishedAnalysis: false,
        targetNumberOfImages: 40,
        percentage: 0,
        count: 0
      })
      return swal.fire({
        text: "Analysis Complete",
        title: "Please ask the next user to be visible on the camera",
        icon: "success"
      }).then(() => this.props.history.goBack());
    }

    swal.fire({
      text: "Analysis Interupted",
      title: "Please restart the analysis if need be...",
      icon: "warning"
    }).then(() => this.props.history.goBack());

    // reset state here
    this.setState({
      analysing: false,
      images: [],
      splitImages: [],
      analysing: false,
      finishedAnalysis: false,
      targetNumberOfImages: 40,
      percentage: 0,
      count: 0
    })
  }
  startProcessingWebcam(webcam) {
    this.state.camera = webcam
  }
  processWebcam(webcam) {
    const capture = async () => {
      const imageSrc = webcam.getScreenshot();
      this.sendImageForProcessing(imageSrc)
    }

    // return capture().catch(console.log);

    // When you want to cancel it:
    captureInterval = setInterval(() => {
      if (this.state.percentage <= 100) {
        return capture().catch(console.log)
      }

      this.setState({
        finishedAnalysis: true
      })

      this.stopAnalysis()
    }, 200);
  }
  render() {
    return (
      <div>
        {/* begin:: Header Mobile */}
        < div
          id="kt_header_mobile"
          className="kt-header-mobile  kt-header-mobile--fixed "
        >
          <div className="kt-header-mobile__logo">
            <a href="index.html">
              <img alt="Logo" src="assets/media/logos/logo-1.png" />
            </a>
          </div>
          <div className="kt-header-mobile__toolbar">
            <button
              className="kt-header-mobile__toolbar-toggler kt-header-mobile__toolbar-toggler--left"
              id="kt_aside_mobile_toggler"
            >
              <span />
            </button>
            <button
              className="kt-header-mobile__toolbar-topbar-toggler"
              id="kt_header_mobile_topbar_toggler"
            >
              <i className="flaticon-more" />
            </button>
          </div>
        </div >
        {/* end:: Header Mobile */}
        < div className="kt-grid kt-grid--hor kt-grid--root" >
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
            {/* begin:: Aside */}
            {/* end:: Aside */}
            <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper">
              {/* end:: Header */}
              <div
                className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
                id="kt_content"
              >

                {/* begin:: Content */}
                {/*begin::Dashboard 6*/}
                {/*begin::Row*/}
                <div className="row">
                  <div className="col-lg-9 col-xl-9 col-md-6 order-lg-2 order-xl-1">
                    <div className="embed-responsive embed-responsive-16by9 video-container">
                      {/* <video className="embed-responsive-item" autoPlay /> */}
                      <WebcamCapture onReady={camera => this.startProcessingWebcam(camera)} />
                      <div className="overlay-desc">
                        <img
                          style={{ marginTop: 20, alignSelf: "center" }}
                          src="/image.png"
                          alt
                          // width={"70%"}
                          height={"70%"}
                        />
                        <img
                          style={{
                            position: "absolute",
                            paddingBottom: 20,
                            maxWidth: "30%",
                            maxHeight: "30%",
                            height: "auto"
                          }}
                          src="/cool2.gif"
                          alt
                        />
                        {/* <h1
                            style={{
                              backgroundColor: "rgba(255,255,255,0.5)",
                              color: "black",
                              marginBottom: "auto"
                            }}
                          >
                            Pleace center your face on the emoji and folow its
                            movements
                    </h1> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-xl-3 col-md-6 order-lg-3 order-xl-1">
                    {/*begin::Portlet*/}
                    <div className="kt-portlet kt-portlet--height-fluid kt-widget-13">
                      <div className="kt-portlet__body">
                        <div className="kt-widget-13">
                          <div className="kt-widget-13__body">
                            <a className="kt-widget-13__title" href="#">
                              {this.state.employee.names}
                            </a>
                            <div className="kt-widget-13__desc">
                              We are now collecting a few details about your face,
                              this includes the disance between your eyes, the
                              distance between the side of your mouth and other
                              facial features.
                        </div>
                          </div>
                          <div className="kt-widget-13__foot">
                            {
                              this.state.analysing != true
                                ? null
                                : (<div className="kt-widget-13__progress">
                                  <div className="kt-widget-13__progress-info">
                                    <div className="kt-widget-13__progress-status">
                                      Analysis Progress
                                      </div>
                                    <div className="kt-widget-13__progress-value">
                                      {this.state.percentage}%
                                      </div>
                                  </div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar kt-bg-brand"
                                      role="progressbar"
                                      style={{ width: `${this.state.percentage}%` }}
                                      aria-valuenow={this.state.percentage}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    />
                                  </div>


                                </div>)
                            }
                          </div>

                          {
                            this.state.analysing
                              ? <button type="button" onClick={() => this.stopAnalysis()} className="btn btn-danger">Stop Analysis</button>
                              : <button type="button" onClick={() => this.startAnalysis()} className="btn btn-primary">Start Analysis</button>
                          }
                        </div>
                      </div>
                    </div>
                    {/*end::Portlet*/}
                  </div>
                </div>
                {/*end::Row*/}
                {/*end::Dashboard 6*/}

                {/* end:: Content */}
              </div>
            </div>
          </div>
        </div >
        {/* end:: Page */}
        {/* begin:: Scrolltop */}
        < div id="kt_scrolltop" className="kt-scrolltop" >
          <i className="la la-arrow-up" />
        </div >
        {/* end:: Scrolltop */}
      </div >
    );
  }
}

export {
  WebcamCapture,
  Register
}