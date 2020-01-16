
import React, { Component } from 'react';
import axios from 'axios'
import {
  Link
} from "react-router-dom";
import { WebcamCapture } from "../../pages/register2"
import _ from "lodash"
const toastr = window.toastr

// const SERVER_API = "http://192.168.0.106:4333"
const SERVER_API = "http://localhost:4333"

let captureInterval = 0

import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export default class AddEmployees extends Component {
  state = {
    number: null,
    names: null,
    department: null,
    chunked: [],
    images: [],

    jobs: [],
    splitImages: [],
    analysing: false,
    finishedAnalysis: false,
    targetNumberOfImages: 40,
    percentage: 0,
    count: 0  // save this to local storage so it shows session
  }
  async createNewEmployee(e) {
    e.preventDefault()
    const { names, number, department } = this.state

    this.setState({ saving: true })
    await axios.post(`${SERVER_API}/employees/add`, {
      number,
      names,
      department
    })

    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };

    toastr.success("Employee has been saved!");
    this.setState({ saving: true })
  }
  sendImageForProcessing(image) {
    if (this.props.socket)
      this.props.socket.emit('new-registration', {
        label: this.state.name,
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
      return swal.fire("Analysis Complete", "Please ask the next user to be visible on the camera", "success");
    }

    swal.fire("Analysis Interupted", "Please restart the analysis if need be...", "warning");

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
    const { match: { params } = {} } = this.props;

    return <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
      <div className="row">
        <div className="col-lg-12">
          {/*begin::Portlet*/}
          <div className="kt-portlet">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">Edit employee details</h3>
              </div>
            </div>
            {/*begin::Form*/}
            <form
              className="kt-form kt-form--label-right"
              onSubmit={(e) => this.createNewEmployee(e)}
            >
              <div className="kt-portlet__body">
                <div className="form-group row">
                  <div className="col-lg-4">
                    <label>Employee Id:</label>
                    <input
                      required={true}
                      type="text"
                      className="form-control"
                      placeholder="Enter employee number"
                      onChange={e => this.setState({ number: e.target.value })}
                    />
                    <span className="form-text text-muted">Please enter employee number</span>
                  </div>
                  <div className="col-lg-4">
                    <label className>Full Names:</label>
                    <input
                      required={true}
                      type="text"
                      className="form-control"
                      placeholder="Enter names"
                      onChange={e => this.setState({ names: e.target.value })}
                    />
                    <span className="form-text text-muted">Please enter employee full names</span>
                  </div>
                  {/* <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleSelect1">Departments</label>
                      <select onChange={e => this.setState({
                        department: e.value
                      })} className="form-control" id="exampleSelect1">
                        <option>Main</option>
                        <option value={1}>IT</option>
                        <option value={1}>HR</option>
                      </select>
                    </div>
                  </div> */}
                </div>

               

              </div>

              <div className="kt-portlet__foot">
                <div className="kt-form__actions">
                  <div className="row">
                    <div className="col-lg-12">
                      <button type="reset" className="btn btn-secondary ">
                        Clear
                                            </button>
                      <button type="submit" className="btn btn-primary pull-right">
                        Save
                                            </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg kt-separator--portlet-fit" />;


        </div>

        {/*end::Form*/}
      </div>
    </div>

  }
}
