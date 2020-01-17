import React, { Component } from 'react';

import {
    Link
} from "react-router-dom";

export default class Register extends Component {
    render() {
        return <div>
            {/* begin:: Aside */}
            <button className="kt-aside-close " id="kt_aside_close_btn">
                <i className="la la-close" />
            </button>
            <div
                className="kt-aside  kt-aside--fixed  kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop"
                id="kt_aside"
            >
                {/* begin:: Aside */}
                <div className="kt-aside__brand   kt-grid__item" id="kt_aside_brand">
                    <div className="kt-aside__brand-logo">
                        <a href="/">
                            <img alt="Logo" src="/assets/media/logos/logo-1.png" />
                        </a>
                    </div>
                    <div className="kt-aside__brand-tools">
                        <button
                            className="kt-aside__brand-aside-toggler kt-aside__brand-aside-toggler--left"
                            id="kt_aside_toggler"
                        >
                            <span />
                        </button>
                    </div>
                </div>
                {/* end:: Aside */}
                {/* begin:: Aside Menu */}
                <div
                    className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid"
                    id="kt_aside_menu_wrapper"
                >
                    <div
                        id="kt_aside_menu"
                        className="kt-aside-menu "
                        data-ktmenu-vertical={1}
                        data-ktmenu-scroll={1}
                        data-ktmenu-dropdown-timeout={500}
                    >
                        <ul className="kt-menu__nav ">
                            <li className="kt-menu__section ">
                                <h4 className="kt-menu__section-text">Main</h4>
                                <i className="kt-menu__section-icon flaticon-more-v2" />
                            </li>
                            <li className="kt-menu__item " aria-haspopup="true">
                                <Link
                                    to="/management/employees"
                                    className="kt-menu__link "
                                >
                                    <i className="kt-menu__link-icon flaticon-users" />
                                    <span className="kt-menu__link-text">Employees</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* end:: Aside Menu */}
            </div>
            {/* end:: Aside */}

            <div />
        </div>
    }
}