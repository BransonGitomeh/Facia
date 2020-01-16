import React from 'react';
import {

    Link
} from "react-router-dom";

const routeNameMap = {
    "/": 'home',
    "/live": "Live Processing",
    "/register": "Facial Registration",
    "/management": "Administration",
    "/management/employees": "Employee Administration"
}

export default (props) => {
    const { pathname } = window.location

    return (
        <div
            id="kt_header"
            className="kt-header kt-grid__item "
            data-ktheader-minimize="on"
            style={{
                paddingRight: 25,
                paddingLeft: 25
            }}
        >
            <div className="kt-container  kt-container--fluid ">
                {/* begin:: Subheader */}
                <div className="kt-subheader   kt-grid__item">
                    <div className="kt-subheader__main">
                        <h3 className="kt-subheader__title">FaceWork</h3>
                        <span className="kt-subheader__separator kt-hidden" />
                        <div className="kt-subheader__breadcrumbs">
                            <a href="#" className="kt-subheader__breadcrumbs-home">
                                <i className="flaticon-user" />
                            </a>
                            <span className="kt-subheader__breadcrumbs-link kt-subheader__breadcrumbs-link--active">{routeNameMap[pathname]}</span>

                        </div>
                    </div>
                </div>
                {/* begin:: Topbar */}
                <div className="kt-header__topbar">
                    {/*begin: Search */}
                    <div className="kt-header__topbar-item kt-header__topbar-item--search">
                        <div className="kt-header__topbar-wrapper">
                            <div
                                className="kt-quick-search kt-quick-search--inline kt-quick-search--result-compact"
                                id="kt_quick_search_inline"
                            >
                                {/* <form method="get" className="kt-quick-search__form">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="flaticon2-search-1" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control kt-quick-search__input"
                                            placeholder="Search..."
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="la la-close kt-quick-search__close" />
                                            </span>
                                        </div>
                                    </div>
                                </form> */}
                                <div data-toggle="dropdown" data-offset="0,15px" />
                                <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-lg">
                                    <div
                                        className="kt-quick-search__wrapper kt-scroll ps"
                                        data-scroll="true"
                                        data-height={325}
                                        data-mobile-height={200}
                                        style={{ height: 325, overflow: "hidden" }}
                                    >
                                        <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                                            <div
                                                className="ps__thumb-x"
                                                tabIndex={0}
                                                style={{ left: 0, width: 0 }}
                                            />
                                        </div>
                                        <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                                            <div
                                                className="ps__thumb-y"
                                                tabIndex={0}
                                                style={{ top: 0, height: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="kt-header__topbar-item dropdown">
                        <div
                            className="kt-header__topbar-wrapper"
                            data-toggle="dropdown"
                            data-offset="30px,0px"
                        >
                            <span className="kt-header__topbar-icon">
                                <i className="flaticon-apps" />
                            </span>
                        </div>
                        <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl">
                            <div
                                className="kt-head"
                                style={{ backgroundImage: "url(assets/media/misc/head_bg_sm.jpg)" }}
                            >
                                <h3 className="kt-head__title">Quick Actions</h3>
                            </div>
                            <div className="kt-grid-nav">
                                <Link className="kt-grid-nav__item" to="/live">
                                    <div className="kt-grid-nav__item-icon">
                                        <i className="flaticon-browser" />
                                    </div>
                                    <div className="kt-grid-nav__item-title"> Live view</div>
                                    <div className="kt-grid-nav__item-desc">Identifying and Actions</div>
                                </Link>
                                <Link className="kt-grid-nav__item" to="/register">
                                    <div className="kt-grid-nav__item-icon">
                                        <i className="flaticon-plus" />
                                    </div>
                                    <div className="kt-grid-nav__item-title"> Registration</div>
                                    <div className="kt-grid-nav__item-desc">Add People</div>
                                </Link>
                                <Link className="kt-grid-nav__item" to="/management/employees">
                                    <div className="kt-grid-nav__item-icon">
                                        <i className="flaticon-computer" />
                                    </div>
                                    <div className="kt-grid-nav__item-title"> Management</div>
                                    <div className="kt-grid-nav__item-desc">Reports and Analysis</div>
                                </Link>
                                <Link className="kt-grid-nav__item" to="/management/settings">
                                    <div className="kt-grid-nav__item-icon">
                                        <i className="flaticon-settings" />
                                    </div>
                                    <div className="kt-grid-nav__item-title"> Administration</div>
                                    <div className="kt-grid-nav__item-desc">Settings and Logs</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/*end: Quick Actions */}
                    {/*begin: Languages */}
                    <div className="kt-header__topbar-item kt-header__topbar-item--langs">
                        <div
                            className="kt-header__topbar-wrapper"
                            data-toggle="dropdown"
                            data-offset="10px,0px"
                            aria-expanded="false"
                        >
                            <span className="kt-header__topbar-icon">
                                <img src="/assets/media/flags/226-united-states.svg" />
                            </span>
                        </div>
                        <div
                            className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim"
                            style={{}}
                        >
                            <ul className="kt-nav kt-margin-t-10 kt-margin-b-10">
                                <li className="kt-nav__item kt-nav__item--active">
                                    <a href="#" className="kt-nav__link">
                                        <span className="kt-nav__link-icon">
                                            <img src="/assets/media/flags/226-united-states.svg" />
                                        </span>
                                        <span className="kt-nav__link-text">English</span>
                                    </a>
                                </li>
                                <li className="kt-nav__item">
                                    <a href="#" className="kt-nav__link">
                                        <span className="kt-nav__link-icon">
                                            <img src="/assets/media/flags/128-spain.svg" />
                                        </span>
                                        <span className="kt-nav__link-text">Spanish</span>
                                    </a>
                                </li>
                                <li className="kt-nav__item">
                                    <a href="#" className="kt-nav__link">
                                        <span className="kt-nav__link-icon">
                                            <img src="/assets/media/flags/162-germany.svg" />
                                        </span>
                                        <span className="kt-nav__link-text">German</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/*end: Languages */}

                    {/*begin: Network Icon */}
                    <div className="kt-header__topbar-item dropdown">
                        <div
                            className="kt-header__topbar-wrapper"
                            data-toggle="dropdown"
                            data-offset="30px,0px"
                            aria-expanded="false"
                        >
                            <span className="kt-header__topbar-icon kt-bg-brand">
                                <i className="fa fa-network-wired kt-font-light" />
                            </span>

                            {
                                props.connected == true
                                    ? <span className="kt-badge kt-badge--success kt-badge--notify"></span>
                                    : <span className="kt-badge kt-badge--danger kt-badge--notify">!</span>
                            }

                        </div>
                    </div>;

                    {/*end: Network Icon */}

                    {/*begin: User */}
                    <div className="kt-header__topbar-item kt-header__topbar-item--user">
                        <div
                            className="kt-header__topbar-wrapper"
                            data-toggle="dropdown"
                            data-offset="10px,0px"
                        >
                            <img alt="Pic" src="https://picsum.photos/200" />
                            {/*use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) */}
                        </div>
                        <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-md">
                            <div
                                className="kt-user-card kt-margin-b-40 kt-margin-b-30-tablet-and-mobile"
                                style={{ backgroundImage: "url(assets/media/misc/head_bg_sm.jpg)" }}
                            >
                                <div className="kt-user-card__wrapper">
                                    <div className="kt-user-card__pic">
                                        {/*use "kt-rounded" class for rounded avatar style*/}
                                        <img
                                            alt="Pic"
                                            src="https://picsum.photos/200"
                                            className="kt-rounded-"
                                        />
                                    </div>
                                    <div className="kt-user-card__details">
                                        <div className="kt-user-card__name">Administration</div>
                                        <div className="kt-user-card__position">Floor 3 ,Door 2</div>
                                    </div>
                                </div>
                            </div>
                            <ul className="kt-nav kt-margin-b-10">
                                <li className="kt-nav__separator kt-nav__separator--fit" />
                                <li className="kt-nav__custom kt-space-between">
                                    <a
                                        href="custom/login/login-v1.html"
                                        target="_blank"
                                        className="btn btn-label-brand btn-upper btn-sm btn-bold"
                                    >
                                        Sign Out
              </a>
                                    <i
                                        className="flaticon2-information kt-label-font-color-2"
                                        data-toggle="kt-tooltip"
                                        data-placement="right"
                                        title="true"
                                        data-original-title="Click to learn more..."
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/*end: User */}
                </div>
                {/* end:: Topbar */}
            </div>
        </div >
    );
};