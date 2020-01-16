
import React, { Component } from 'react';
import axios from 'axios'
import {
    Link
} from "react-router-dom";

import $ from "jquery"
import _ from "lodash"

import * as qs from 'query-string';

// const SERVER_API = "http://192.168.0.106:4333"
const SERVER_API = "http://localhost:4333"

export default class Register extends Component {
    state = {
        number: null,
        names: null,
        department: null,
        chunked: [],
        images: []
    }
    async componentDidMount() {
        const { match: { params } = {} } = this.props;

        const [
            { data: { images } },
            { data: employee }
        ] = await Promise.all([
            axios.get(`${SERVER_API}/analysis/${params.user_id}`),
            axios.get(`${SERVER_API}/employees/${params.user_id}`)
        ])

        console.log({ employee, images })

        if (images)
            this.setState({
                images,
                chunked: _.chunk(images, 6)
            })

        const { names, number } = employee
        this.setState({
            names,
            number
        })
    }
    // async componentDidMount() {
    //     const { match: { params } = {} } = this.props;
    //     const { data: employee } = await axios.get(`${SERVER_API}/employees/${params.user_id}`)

    //     const { names, number } = employee
    //     this.setState({
    //         names,
    //         number
    //     })
    // }
    async deleteImage(image) {
        const { match: { params } = {} } = this.props;

        const images = this.state.images.filter(image2 => image2 !== image);
        this.setState({
            images,
            chunked: _.chunk(images, 6)
        })
        await axios.delete(`${SERVER_API}/analysis/${params.user_id}/main/${image}`)
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
                        <form className="kt-form kt-form--label-right">
                            <div className="kt-portlet__body">
                                <div className="form-group row">
                                    <div className="col-lg-4">
                                        <label>Employee Number:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter employee number"
                                            value={this.state.number}
                                            onChange={e => this.setState({ number: e.target.value })}
                                        />
                                        <span className="form-text text-muted">Please enter employee number</span>
                                    </div>
                                    <div className="col-lg-4">
                                        <label className>Full Names:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter names"
                                            value={this.state.names}
                                            onChange={e => this.setState({ names: e.target.value })}
                                        />
                                        <span className="form-text text-muted">Please enter employee full names</span>
                                    </div>
                                    {/* <div className="col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="exampleSelect1">Department</label>
                                            <select className="form-control" id="exampleSelect1">
                                                <option>1</option>
                                                <option value={1}>2</option>
                                                <option value={1}>3</option>
                                                <option value={1}>4</option>
                                                <option value={1}>5</option>
                                            </select>
                                            <span className="form-text text-muted">Please select department you are in</span>
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="kt-portlet__foot">
                                <div className="kt-form__actions">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <button type="reset" className="btn btn-secondary ">
                                                Cancel
                                            </button>
                                            <button type="reset" className="btn btn-primary pull-right">
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* <div className="kt-separator kt-separator--border-dashed kt-separator--space-lg kt-separator--portlet-fit" />; */}

                    <div className="kt-portlet">
                        <div className="kt-portlet__head">
                            <div className="kt-portlet__head-label">
                                <h3 className="kt-portlet__head-title">Samples of {this.state.name} face. (We need atleast 20 good ones to have a good accuracy)</h3>
                            </div>
                        </div>

                        <div className="kt-portlet__body">
                            {
                                this.state.chunked.map(group => {
                                    return <div className="row text-center text-lg-left" style={{ height: 150 }}>
                                        {
                                            group.map(image => {
                                                return <div className="col-lg-2 col-md-4 col-6">
                                                    {/* <a href="#" className="d-block mb-4 h-100"> */}
                                                    <img
                                                        className="img-fluid img-thumbnail mama"
                                                        src={`${SERVER_API}/analysis/${params.user_id}/main/${image}`}
                                                        style={{
                                                            position: 'relative',
                                                            top: 0,
                                                            left: 0
                                                        }}
                                                    />

                                                    <img
                                                        className="img-fluid img-thumbnail baby"
                                                        src={`${SERVER_API}/analysis/${params.user_id}/faces/${image}`}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '50px',
                                                            left: '70px',
                                                            width: '40%'
                                                        }}
                                                    />
                                                    <button style={{
                                                        position: 'absolute',
                                                        top: '50px',
                                                        left: '10px'
                                                    }}
                                                        onClick={() => this.deleteImage(image)}
                                                        type="button"
                                                        className="btn btn-primary btn-icon btn-sm"
                                                    >
                                                        <i className="fa fa-trash"
                                                        /></button>

                                                </div>
                                            })
                                        }
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>


                {/*end::Form*/}
            </div>
        </div>

    }
}
