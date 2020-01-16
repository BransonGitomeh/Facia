import React, { Component } from 'react';

import Webcam from "react-webcam";
import moment from "moment"
import Navbar from "../components/navbar"
import _ from "lodash"

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
            onUserMedia={() => props.onReady(webcamRef.current)}
            onUserMediaError={error => console.log('Error user media', error)}
        />
    );
};

let captureInterval = 0
export default class Register extends Component {
    state = {
        users: [],
        uniqueUsersWithLatestTime: [],
        picToShow: {},
        splitUsers: [],
        count: 0  // save this to local storage so it shows session
    }
    componentDidMount() {
        this.props.socket.on('new-detection', async (data) => {
            // console.log('new detection', data)
            data.time = new Date()

            const users = [data, ...this.state.users]
            const uniqueUsersWithLatestTime = _.uniqBy(users, 'user')

            this.setState({
                picToShow: {
                    ...this.state.picToShow,
                    [data.user]: data.img
                },
                uniqueUsersWithLatestTime,
                users,
                splitUsers: users.chunk_inefficient(4)
            })
        })
    }
    componentWillUnmount() {
        clearInterval(captureInterval)
        captureInterval = 0;
    }
    sendImageForProcessing(image) {
        console.log(`Sending image`)
        this.props.socket.emit('liveFeed', {
            image
        });
        this.setState({
            count: ++this.state.count
        })
    }

    startProcessing(webcam) {
        captureInterval = setInterval(() => {
            const imageSrc = webcam.getScreenshot();
            this.sendImageForProcessing(imageSrc)
        }, 200);
    }

    processImage() {

    }

    render() {
        return (
            <div>
                {/* begin:: Header Mobile */}
                <div
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
                </div>
                {/* end:: Header Mobile */}
                <div className="kt-grid kt-grid--hor kt-grid--root">
                    <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
                        {/* begin:: Aside */}
                        {/* end:: Aside */}
                        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper">
                            {/* end:: Header */}
                            <div
                                className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
                                id="kt_content"
                            >
                                {/* begin:: Subheader */}
                                <div className="kt-subheader   kt-grid__item" id="kt_subheader">
                                    <div className="kt-container  kt-container--fluid ">
                                        <div className="kt-subheader__main">
                                            <h3 className="kt-subheader__title">Dashboard</h3>
                                            <span className="kt-subheader__separator kt-hidden" />
                                            <div className="kt-subheader__breadcrumbs">
                                                <a href="#" className="kt-subheader__breadcrumbs-home">
                                                    <i className="flaticon2-shelter" />
                                                </a>
                                                <span className="kt-subheader__breadcrumbs-separator" />
                                                <a href className="kt-subheader__breadcrumbs-link">
                                                    Dashboards{" "}
                                                </a>
                                                <span className="kt-subheader__breadcrumbs-separator" />
                                                <a href className="kt-subheader__breadcrumbs-link">
                                                    Brand Aside{" "}
                                                </a>
                                                {/* <span class="kt-subheader__breadcrumbs-link kt-subheader__breadcrumbs-link--active">Active link</span> */}
                                            </div>
                                        </div>
                                        <div className="kt-subheader__toolbar">
                                            <div className="kt-subheader__wrapper">
                                                <a
                                                    href="#"
                                                    className="btn btn-icon btn btn-label btn-label-brand btn-bold"
                                                    data-toggle="kt-tooltip"
                                                    title="Reports"
                                                    data-placement="top"
                                                >
                                                    <i className="flaticon2-writing" />
                                                </a>
                                                <a
                                                    href="#"
                                                    className="btn btn-icon btn btn-label btn-label-brand btn-bold"
                                                    data-toggle="kt-tooltip"
                                                    title="Calendar"
                                                    data-placement="top"
                                                >
                                                    <i className="flaticon2-hourglass-1" />
                                                </a>
                                                <div
                                                    className="dropdown dropdown-inline"
                                                    data-toggle="kt-tooltip"
                                                    title="Quick actions"
                                                    data-placement="top"
                                                >
                                                    <a
                                                        href="#"
                                                        className="btn btn-icon btn btn-label btn-label-brand btn-bold"
                                                        data-toggle="dropdown"
                                                        data-offset="0px,0px"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="flaticon2-add-1" />
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                                        <ul className="kt-nav kt-nav--active-bg" role="tablist">
                                                            <li className="kt-nav__item">
                                                                <a href className="kt-nav__link">
                                                                    <i className="kt-nav__link-icon flaticon2-psd" />
                                                                    <span className="kt-nav__link-text">Document</span>
                                                                </a>
                                                            </li>
                                                            <li className="kt-nav__item">
                                                                <a className="kt-nav__link" role="tab">
                                                                    <i className="kt-nav__link-icon flaticon2-supermarket" />
                                                                    <span className="kt-nav__link-text">Message</span>
                                                                </a>
                                                            </li>
                                                            <li className="kt-nav__item">
                                                                <a href className="kt-nav__link">
                                                                    <i className="kt-nav__link-icon flaticon2-shopping-cart" />
                                                                    <span className="kt-nav__link-text">Product</span>
                                                                </a>
                                                            </li>
                                                            <li className="kt-nav__item">
                                                                <a className="kt-nav__link" role="tab">
                                                                    <i className="kt-nav__link-icon flaticon2-chart2" />
                                                                    <span className="kt-nav__link-text">Report</span>
                                                                    <span className="kt-nav__link-badge">
                                                                        <span className="kt-badge kt-badge--danger kt-badge--inline kt-badge--rounded">
                                                                            pdf
                              </span>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li className="kt-nav__item">
                                                                <a href className="kt-nav__link">
                                                                    <i className="kt-nav__link-icon flaticon2-sms" />
                                                                    <span className="kt-nav__link-text">Post</span>
                                                                </a>
                                                            </li>
                                                            <li className="kt-nav__item">
                                                                <a href className="kt-nav__link">
                                                                    <i className="kt-nav__link-icon flaticon2-avatar" />
                                                                    <span className="kt-nav__link-text">Customer</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div
                                                    className="dropdown dropdown-inline"
                                                    data-toggle="kt-tooltip"
                                                    title="Quick actions"
                                                    data-placement="top"
                                                >
                                                    <a
                                                        href="#"
                                                        className="btn btn btn-label btn-label-brand btn-bold"
                                                        data-toggle="dropdown"
                                                        data-offset="0 0"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        Reports
                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <ul
                                                            className="kt-nav kt-nav--active-bg"
                                                            id="kt_nav_1"
                                                            role="tablist"
                                                        >
                                                            <li className="kt-nav__item">
                                                                <a href className="kt-nav__link">
                                                                    <i className="kt-nav__link-icon flaticon2-psd" />
                                                                    <span className="kt-nav__link-text">Products</span>
                                                                </a>
                                                            </li>
                                                            <li className="kt-nav__item">
                                                                <a
                                                                    className="kt-nav__link"
                                                                    role="tab"
                                                                    id="kt_nav_link_1"
                                                                >
                                                                    <i className="kt-nav__link-icon flaticon2-supermarket" />
                                                                    <span className="kt-nav__link-text">Customers</span>
                                                                    <span className="kt-nav__link-badge">
                                                                        <span className="kt-badge kt-badge--success kt-badge--inline kt-badge--rounded">
                                                                            6
                              </span>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li className="kt-nav__item">
                                                                <a href className="kt-nav__link">
                                                                    <i className="kt-nav__link-icon flaticon2-shopping-cart" />
                                                                    <span className="kt-nav__link-text">Orders</span>
                                                                </a>
                                                            </li>
                                                            <li className="kt-nav__item">
                                                                <a href className="kt-nav__link">
                                                                    <i className="kt-nav__link-icon flaticon2-shopping-cart" />
                                                                    <span className="kt-nav__link-text">Reports</span>
                                                                </a>
                                                            </li>
                                                            <li className="kt-nav__item">
                                                                <a
                                                                    className="kt-nav__link"
                                                                    role="tab"
                                                                    id="kt_nav_link_2"
                                                                >
                                                                    <i className="kt-nav__link-icon flaticon2-chart2" />
                                                                    <span className="kt-nav__link-text">Console</span>
                                                                    <span className="kt-nav__link-badge">
                                                                        <span className="kt-badge kt-badge--danger kt-badge--inline kt-badge--rounded">
                                                                            new
                              </span>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li className="kt-nav__item">
                                                                <a href className="kt-nav__link">
                                                                    <i className="kt-nav__link-icon flaticon2-sms" />
                                                                    <span className="kt-nav__link-text">Settings</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* end:: Subheader */}
                                {/* begin:: Content */}
                                <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                                    {/*begin::Dashboard 6*/}
                                    {/*begin::Row*/}
                                    <div className="row">
                                        <div className="col-lg-9 col-xl-9 col-md-6 order-lg-2 order-xl-1">
                                            {/*begin::Portlet*/}
                                            {/* <div class="kt-portlet kt-portlet--height-fluid">

									<div class="kt-portlet__body" style="padding: 0px;">
										<div class="kt-widget-1">

											<div class="tab-content">
												<div class="tab-pane fade active show" id="kt_tabs_19_15dffc61276a56"
													role="tabpanel">

													
												</div>

											</div>
										</div>
									</div>
								</div> */}
                                            {/*end::Portlet*/}
                                            <div className="embed-responsive embed-responsive-16by9 video-container">
                                                <WebcamCapture analysing={true} onReady={camera => this.startProcessing(camera)} interval={2000} />
                                                <div className="overlay-desc">
                                                    <img
                                                        style={{
                                                            position: "absolute",
                                                            paddingBottom: 0,
                                                            maxWidth: "40%",
                                                            maxHeight: "40%",
                                                            height: "auto"
                                                        }}
                                                        src="cool2.gif"
                                                        alt
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-xl-3 col-md-6 order-lg-2 order-xl-1">
                                            {/*begin::Portlet*/}
                                            <div className="kt-portlet kt-portlet--height-fluid kt-widget-17">
                                                <div className="kt-portlet__body">
                                                    <div className="kt-widget-17">
                                                        {
                                                            this.state.uniqueUsersWithLatestTime.map(user => {
                                                                return (<div className="kt-widget-17__item">
                                                                    <div className="kt-widget-17__product">
                                                                        <div className="kt-widget-17__thumb">
                                                                            <a href="#">
                                                                                <img
                                                                                    src={this.state.picToShow[user.user]}
                                                                                    className="kt-widget-17__image"
                                                                                    alt
                                                                                    title
                                                                                />
                                                                            </a>
                                                                        </div>
                                                                        <div className="kt-widget-17__product-desc">
                                                                            <a href="#">
                                                                                <div className="kt-widget-17__title">
                                                                                    {user.user}
                                                                                </div>
                                                                            </a>
                                                                            <div className="kt-widget-17__sku">Last seen: {moment(user.time).fromNow(true)} ago.</div>
                                                                            <div className="kt-widget-17__sku">Confidence: {user.confidence.toFixed(1)}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>)
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            {/*end::Portlet*/}
                                        </div>
                                    </div>
                                    {/*end::Row*/}
                                    {/*end::Dashboard 6*/}
                                </div>
                                {/* end:: Content */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* end:: Page */}
                {/* begin:: Scrolltop */}
                <div id="kt_scrolltop" className="kt-scrolltop">
                    <i className="la la-arrow-up" />
                </div>
            </div>
        )
    }
}