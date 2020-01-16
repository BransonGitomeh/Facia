import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import axios from 'axios'

// const SERVER_API = "http://192.168.0.106:4333"
const SERVER_API = "http://localhost:4333"

const toastr = window.toastr

export default class Register extends Component {
    state = {
        employees: []
    }
    async componentDidMount() {
        const { data: employees } = await axios.get(`${SERVER_API}/employees`)
        this.setState({ employees })
    }
    async deleteEmployee(employee) {
        if (!confirm('Are you sure you want to remove this employee?'))
            return;

        await axios.delete(`${SERVER_API}/employees/${employee._id}`)

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

        toastr.success("Employee has been removed!");

        this.setState({
            employees: this.state.employees.filter(e => e._id !== employee._id)
        })
    }
    render() {
        return <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div className="kt-portlet kt-portlet--mobile">
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">Your Employees</h3>
                    </div>
                    <div className="kt-portlet__head-toolbar">
                        <div className="kt-portlet__head-toolbar-wrapper">
                            <Link
                                to="/management/employees/add"
                                className="btn btn-clean btn-sm btn-icon btn-icon-md"
                            >
                                <i className="flaticon-add-circular-button" />
                            </Link>
                        </div>
                    </div>
                </div>;

                <div className="kt-portlet__body">
                    {/*begin: Datatable */}
                    <table
                        className="table table-striped- table-bordered table-hover table-checkable"
                        id="kt_table_1"
                    >
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Names</th>
                                {/* <th>Department</th> */}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map(employee => {
                                const { names, number, department } = employee
                                return <tr>
                                    <td>{number}</td>
                                    <td>{names}</td>
                                    {/* <td>{department}</td> */}
                                    <td><div>
                                        <Link
                                            to={`/management/employees/edit/${number}`}
                                            className="btn btn-sm btn-clean btn-icon btn-icon-md"
                                            title="View"
                                        >
                                            <i className="la la-edit" />
                                        </Link>
                                        <a
                                            to="#"
                                            onClick={() => this.deleteEmployee(employee)}
                                            className="btn btn-sm btn-clean btn-icon btn-icon-md"
                                            title="View"
                                        >
                                            <i className="la la-trash" />
                                        </a>
                                    </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    {/*end: Datatable */}
                </div>
            </div>
        </div>

        {/* end:: Content */ }
    }
}