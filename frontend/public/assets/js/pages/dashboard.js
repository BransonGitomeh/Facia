//
// Dashboard
//



// Class definition
var KTDashboard = function() {

    var mediumCharts = function() {
        KTLib.initMediumChart('kt_widget_mini_chart_1', [20, 45, 20, 10, 20, 35, 20, 25, 10, 10], 70, KTApp.getStateColor('brand'));
        KTLib.initMediumChart('kt_widget_mini_chart_2', [10, 15, 25, 45, 15, 30, 10, 40, 15, 25], 70, KTApp.getStateColor('danger'));
        KTLib.initMediumChart('kt_widget_mini_chart_3', [22, 15, 40, 10, 35, 20, 30, 50, 15, 10], 70, KTApp.getBaseColor('shape', 4));
    }

    var latestProductsMiniCharts = function() {
        KTLib.initMiniChart($('#kt_widget_latest_products_chart_1'), [6, 12, 9, 18, 15, 9, 11, 8], KTApp.getStateColor('info'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_latest_products_chart_2'), [8, 6, 13, 16, 9, 6, 11, 14], KTApp.getStateColor('warning'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_latest_products_chart_3'), [8, 6, 13, 16, 9, 6, 11, 14], KTApp.getStateColor('warning'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_latest_products_chart_4'), [3, 9, 9, 18, 15, 9, 11, 8], KTApp.getStateColor('success'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_latest_products_chart_5'), [5, 7, 9, 18, 15, 9, 11, 8], KTApp.getStateColor('brand'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_latest_products_chart_6'), [3, 9, 5, 18, 15, 7, 11, 6], KTApp.getStateColor('danger'), 2, false, false);
    }

    var generalStatistics = function() {
        // Mini charts
        KTLib.initMiniChart($('#kt_widget_general_statistics_chart_1'), [6, 8, 3, 18, 15, 7, 11, 7], KTApp.getStateColor('warning'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_general_statistics_chart_2'), [8, 6, 9, 18, 15, 7, 11, 16], KTApp.getStateColor('brand'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_general_statistics_chart_3'), [4, 12, 9, 18, 15, 7, 11, 12], KTApp.getStateColor('danger'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_general_statistics_chart_4'), [3, 14, 5, 12, 15, 8, 14, 16], KTApp.getStateColor('success'), 2, false, false);

        // Main chart
        if (!document.getElementById("kt_widget_general_statistics_chart_main")) {
            return;
        }

        var ctx = document.getElementById("kt_widget_general_statistics_chart_main").getContext("2d");

        var gradient1 = ctx.createLinearGradient(0, 0, 0, 350);
        gradient1.addColorStop(0, Chart.helpers.color(KTApp.getStateColor('brand')).alpha(0.3).rgbString());
        gradient1.addColorStop(1, Chart.helpers.color(KTApp.getStateColor('brand')).alpha(0).rgbString());

        var gradient2 = ctx.createLinearGradient(0, 0, 0, 350);
        gradient2.addColorStop(0, Chart.helpers.color(KTApp.getStateColor('danger')).alpha(0.3).rgbString());
        gradient2.addColorStop(1, Chart.helpers.color(KTApp.getStateColor('danger')).alpha(0).rgbString());

        var mainConfig = {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
                datasets: [{
                    label: 'Sales',
                    borderColor: KTApp.getStateColor('brand'),
                    borderWidth: 2,
                    backgroundColor: gradient1,
                    pointBackgroundColor: KTApp.getStateColor('brand'),
                    data: [30, 60, 25, 7, 5, 15, 30, 20, 15, 10],
                }, {
                    label: 'Orders',
                    borderWidth: 1,
                    borderColor: KTApp.getStateColor('danger'),
                    backgroundColor: gradient2,
                    pointBackgroundColor: KTApp.getStateColor('danger'),
                    data: [10, 15, 25, 35, 15, 30, 55, 40, 65, 40]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false,
                    text: ''
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10, 
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff', 
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                },
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: false
                    }
                },
                hover: {
                    mode: 'index'
                },
                scales: {
                    xAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        display: true,
                        stacked: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        gridLines: {
                            color: '#eef2f9',
                            drawBorder: false,
                            offsetGridLines: true,
                            drawTicks: false
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0,
                        borderWidth: 0,
                        hoverRadius: 0,
                        hoverBorderWidth: 0
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }
            }
        };

        var chart = new Chart(ctx, mainConfig);

        // Update chart on window resize
        KTUtil.addResizeHandler(function() {
            chart.update();
        });
    }
    
    var widgetTechnologiesChart = function() {
        if ($('#kt_widget_technologies_chart').length == 0) {
            return;
        }

        var randomScalingFactor = function() {
            return Math.round(Math.random() * 100);
        };

        var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        35, 30, 35
                    ],
                    backgroundColor: [
                        KTApp.getBaseColor('shape', 3),
                        KTApp.getBaseColor('shape', 4),
                        KTApp.getStateColor('brand')
                    ]
                }],
                labels: [
                    'Angular',
                    'CSS',
                    'HTML'
                ]
            },
            options: {
                cutoutPercentage: 75,
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Technology'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10, 
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff', 
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                }
            }
        };

        var ctx = document.getElementById('kt_widget_technologies_chart').getContext('2d');
        var myDoughnut = new Chart(ctx, config);
    }

    var widgetTechnologiesChart2 = function() {
        if ($('#kt_widget_technologies_chart_2').length == 0) {
            return;
        }

        var randomScalingFactor = function() {
            return Math.round(Math.random() * 100);
        };

        var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        35, 30, 35
                    ],
                    backgroundColor: [                                                                 
                        KTApp.getStateColor('warning'),
                        KTApp.getStateColor('brand'),
                        KTApp.getStateColor('success')
                    ]
                }],
                labels: [       
                    'CSS',     
                    'Angular',               
                    'HTML'    
                ]
            },
            options: {
                cutoutPercentage: 75,
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Technology'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10, 
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff', 
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                }
            }
        };

        var ctx = document.getElementById('kt_widget_technologies_chart_2').getContext('2d');
        var myDoughnut = new Chart(ctx, config);
    }

    var widgetTotalOrdersChart = function() {
        if (!document.getElementById('kt_widget_total_orders_chart')) {
            return;
        }

        // Main chart
        var max = 80;
        var color = KTApp.getStateColor('brand');
        var ctx = document.getElementById('kt_widget_total_orders_chart').getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 120);
        gradient.addColorStop(0, Chart.helpers.color(color).alpha(0.3).rgbString());
        gradient.addColorStop(1, Chart.helpers.color(color).alpha(0).rgbString());

        var data = [30, 35, 45, 65, 35, 50, 40, 60, 35, 45];

        var mainConfig = {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
                datasets: [{
                    label: 'Orders',
                    borderColor: color,
                    borderWidth: 3,
                    backgroundColor: gradient,
                    pointBackgroundColor: KTApp.getStateColor('brand'),
                    data: data,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                title: {
                    display: false,
                    text: 'Stacked Area'
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10, 
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff', 
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                },
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: false
                    }
                },
                hover: {
                    mode: 'index'
                },
                scales: {
                    xAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true,
                        }
                    }],
                    yAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        gridLines: {
                            color: '#eef2f9',
                            drawBorder: false,
                            offsetGridLines: true,
                            drawTicks: false
                        },
                        ticks: {
                            max: max,
                            display: false,
                            beginAtZero: true
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0,
                        borderWidth: 0,
                        hoverRadius: 0,
                        hoverBorderWidth: 0
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }
            }
        };

        var chart = new Chart(ctx, mainConfig);

        // Update chart on window resize
        KTUtil.addResizeHandler(function() {
            chart.update();
        });
    }

    var widgetTotalOrdersChart2 = function() {
        if (!document.getElementById('kt_widget_total_orders_chart_2')) {
            return;
        }

        // Main chart
        var max = 80;
        var color = KTApp.getStateColor('danger');
        var ctx = document.getElementById('kt_widget_total_orders_chart_2').getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 120);
        gradient.addColorStop(0, Chart.helpers.color(color).alpha(0.3).rgbString());
        gradient.addColorStop(1, Chart.helpers.color(color).alpha(0).rgbString());

        var data = [30, 35, 45, 65, 35, 50, 40, 60, 35, 45];

        var mainConfig = {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
                datasets: [{
                    label: 'Orders',
                    borderColor: color,
                    borderWidth: 3,
                    backgroundColor: gradient,
                    pointBackgroundColor: KTApp.getStateColor('brand'),
                    data: data,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                title: {
                    display: false,
                    text: 'Stacked Area'
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10, 
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff', 
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                },
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: false
                    }
                },
                hover: {
                    mode: 'index'
                },
                scales: {
                    xAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true,
                        }
                    }],
                    yAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        gridLines: {
                            color: '#eef2f9',
                            drawBorder: false,
                            offsetGridLines: true,
                            drawTicks: false
                        },
                        ticks: {
                            max: max,
                            display: false,
                            beginAtZero: true
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0,
                        borderWidth: 0,
                        hoverRadius: 0,
                        hoverBorderWidth: 0
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }
            }
        };

        var chart = new Chart(ctx, mainConfig);

        // Update chart on window resize
        KTUtil.addResizeHandler(function() {
            chart.update();
        });
    }

    var widgetSalesStatisticsChart = function() {
        if (!document.getElementById('kt_chart_sales_statistics')) {
            return;
        }

        var MONTHS = ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug'];

        var color = Chart.helpers.color;
        var barChartData = {
            labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug'],
            datasets: [{
                label: 'Sales',
                backgroundColor: color(KTApp.getStateColor('brand')).alpha(1).rgbString(),
                borderWidth: 0,
                data: [20, 30, 40, 35, 45, 55, 45]
            }, {
                label: 'Orders',
                backgroundColor: color(KTApp.getBaseColor('shape', 1)).alpha(1).rgbString(),
                borderWidth: 0,
                data: [25, 35, 45, 40, 50, 60, 50]
            }]
        };

        var ctx = document.getElementById('kt_chart_sales_statistics').getContext('2d');
        var myBar = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: false,
                scales: {
                    xAxes: [{
                        categoryPercentage: 0.35,
                        barPercentage: 0.70,
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        gridLines: false,
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            fontColor: KTApp.getBaseColor('shape', 3),
                            fontSize: 13,
                            padding: 10
                        }
                    }],
                    yAxes: [{
                        categoryPercentage: 0.35,
                        barPercentage: 0.70,
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        gridLines: {
                            color: KTApp.getBaseColor('shape', 2),
                            drawBorder: false,
                            offsetGridLines: false,
                            drawTicks: false,
                            borderDash: [3, 4],
                            zeroLineWidth: 1,
                            zeroLineColor: KTApp.getBaseColor('shape', 2),
                            zeroLineBorderDash: [3, 4]
                        },
                        ticks: {
                            max: 70,                            
                            stepSize: 10,
                            display: true,
                            beginAtZero: true,
                            fontColor: KTApp.getBaseColor('shape', 3),
                            fontSize: 13,
                            padding: 10
                        }
                    }]
                },
                title: {
                    display: false
                },
                hover: {
                    mode: 'index'
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10, 
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff', 
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 5,
                        bottom: 5
                    }
                }
            }
        });
    }

    var widgetRevenueGrowthChart = function() {
        if (!document.getElementById('kt_chart_revenue_growth')) {
            return;
        }

        var color = Chart.helpers.color;
        var barChartData = {
            labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug', '8 Aug', '9 Aug', '10 Aug', '11 Aug', '12 Aug'],
            datasets: [{
                label: 'Sales',
                backgroundColor: color(KTApp.getStateColor('brand')).alpha(1).rgbString(),
                borderWidth: 0,
                data: [10, 40, 20, 40, 40, 60, 40, 80, 40, 70, 40, 70],
                borderColor: KTApp.getStateColor('brand'),
                borderWidth: 3,
                backgroundColor: color(KTApp.getStateColor('brand')).alpha(0.07).rgbString(),
                //pointBackgroundColor: KTApp.getStateColor('brand'),
                fill: true
            }]
        };

        var ctx = document.getElementById('kt_chart_revenue_growth').getContext('2d');
        var myBar = new Chart(ctx, {
            type: 'line',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: false,
                scales: {
                    xAxes: [{
                        categoryPercentage: 0.35,
                        barPercentage: 0.70,
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        gridLines: false,
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            fontColor: KTApp.getBaseColor('shape', 3),
                            fontSize: 13,
                            padding: 10
                        }
                    }],
                    yAxes: [{
                        categoryPercentage: 0.35,
                        barPercentage: 0.70,
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        gridLines: {
                            color: KTApp.getBaseColor('shape', 2),
                            drawBorder: false,
                            offsetGridLines: false,
                            drawTicks: false,
                            borderDash: [3, 4],
                            zeroLineWidth: 1,
                            zeroLineColor: KTApp.getBaseColor('shape', 2),
                            zeroLineBorderDash: [3, 4]
                        },
                        ticks: {
                            max: 100,                            
                            stepSize: 20,
                            display: true,
                            beginAtZero: true,
                            fontColor: KTApp.getBaseColor('shape', 3),
                            fontSize: 13,
                            padding: 10
                        }
                    }]
                },
                title: {
                    display: false
                },
                hover: {
                    mode: 'index'
                },
                elements: {
                    line: {
                        tension: 0.5
                    },
                    point: { 
                        radius: 0 
                    }
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10, 
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff', 
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 5,
                        bottom: 5
                    }
                }
            }
        });
    }

    var daterangepickerInit = function() {
        if ($('#kt_dashboard_daterangepicker').length == 0) {
            return;
        }

        var picker = $('#kt_dashboard_daterangepicker');
        var start = moment();
        var end = moment();

        function cb(start, end, label) {
            var title = '';
            var range = '';

            if ((end - start) < 100 || label == 'Today') {
                title = 'Today:';
                range = start.format('MMM D');
            } else if (label == 'Yesterday') {
                title = 'Yesterday:';
                range = start.format('MMM D');
            } else {
                range = start.format('MMM D') + ' - ' + end.format('MMM D');
            }

            picker.find('#kt_dashboard_daterangepicker_date').html(range);
            picker.find('#kt_dashboard_daterangepicker_title').html(title);
        }

        picker.daterangepicker({
            direction: KTUtil.isRTL(),
            startDate: start,
            endDate: end,
            opens: 'left',
            applyClass: "btn btn-sm btn-primary",
            cancelClass: "btn btn-sm btn-secondary",
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end, '');
    }

    var recentOrdersInit = function() {
        if ($('#kt_recent_orders').length === 0) {
            return;
        }

        var dataJSONArray = [{"RecordID":1,"OrderID":"61715-075","Country":"China","ShipCountry":"CN","ShipCity":"Tieba","ShipName":"Collins, Dibbert and Hoeger","ShipAddress":"746 Pine View Junction","CompanyEmail":"nsailor0@livejournal.com","CompanyAgent":"Nixie Sailor","CompanyName":"Gleichner, Ziemann and Gutkowski","Currency":"CNY","Notes":"imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi","Department":"Outdoors","Website":"irs.gov","Latitude":35.0032213,"Longitude":102.913526,"ShipDate":"2/12/2018","PaymentDate":"2016-04-27 23:53:15","TimeZone":"Asia/Chongqing","TotalPayment":"$246154.65","Status":3,"Type":2,"Actions":null},
            {"RecordID":2,"OrderID":"63629-4697","Country":"Indonesia","ShipCountry":"ID","ShipCity":"Cihaur","ShipName":"Prosacco-Breitenberg","ShipAddress":"01652 Fulton Trail","CompanyEmail":"egiraldez1@seattletimes.com","CompanyAgent":"Emelita Giraldez","CompanyName":"Rosenbaum-Reichel","Currency":"IDR","Notes":"adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum","Department":"Toys","Website":"ameblo.jp","Latitude":-7.1221059,"Longitude":106.5701927,"ShipDate":"8/6/2017","PaymentDate":"2017-11-13 14:37:22","TimeZone":"Asia/Jakarta","TotalPayment":"$795849.41","Status":6,"Type":3,"Actions":null},
            {"RecordID":3,"OrderID":"68084-123","Country":"Argentina","ShipCountry":"AR","ShipCity":"Puerto Iguazú","ShipName":"Lebsack-Emard","ShipAddress":"2 Pine View Park","CompanyEmail":"uluckin2@state.gov","CompanyAgent":"Ula Luckin","CompanyName":"Kulas, Cassin and Batz","Currency":"ARS","Notes":"blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin","Department":"Electronics","Website":"pbs.org","Latitude":-25.6112339,"Longitude":-54.5515662,"ShipDate":"5/26/2016","PaymentDate":"2018-01-22 12:01:51","TimeZone":"America/Argentina/Cordoba","TotalPayment":"$830764.07","Status":1,"Type":2,"Actions":null},
            {"RecordID":199,"OrderID":"65121-883","Country":"Russia","ShipCountry":"RU","ShipCity":"Antipino","ShipName":"Mitchell Inc","ShipAddress":"69291 Leroy Hill","CompanyEmail":"phaimes5i@usa.gov","CompanyAgent":"Paddy Haimes","CompanyName":"Larkin and Sons","Currency":"RUB","Notes":"neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante","Department":"Clothing","Website":"twitter.com","Latitude":58.9918209,"Longitude":55.1890813,"ShipDate":"3/13/2018","PaymentDate":"2016-04-16 08:18:58","TimeZone":"Asia/Yekaterinburg","TotalPayment":"$481960.81","Status":2,"Type":2,"Actions":null},
            {"RecordID":200,"OrderID":"51672-4144","Country":"Russia","ShipCountry":"RU","ShipCity":"Navashino","ShipName":"Monahan and Sons","ShipAddress":"44114 Autumn Leaf Street","CompanyEmail":"blambourn5j@google.com","CompanyAgent":"Byram Lambourn","CompanyName":"Huel and Sons","Currency":"RUB","Notes":"eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus","Department":"Electronics","Website":"china.com.cn","Latitude":55.5292,"Longitude":42.2003001,"ShipDate":"1/13/2016","PaymentDate":"2017-09-29 11:36:18","TimeZone":"Europe/Moscow","TotalPayment":"$240701.63","Status":4,"Type":3,"Actions":null}];

        var datatable = $('#kt_recent_orders').KTDatatable({
            data: {
                type: 'local',
                source: dataJSONArray,
                pageSize: 10,
                saveState: {
                    cookie: false,
                    webstorage: true
                },
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false
            },

            layout: {
                scroll: true,
                height: 500,
                footer: false
            },

            sortable: true,

            filterable: false,

            pagination: true,

            columns: [{
                field: "RecordID",
                title: "#",
                sortable: false,
                width: 40,
                selector: {
                    class: 'kt-checkbox--solid'
                },
                textAlign: 'center'
            }, {
                field: "ShipName",
                title: "Company",
                width: 'auto',
                autoHide: false,
                // callback function support for column rendering
                template: function(data, i) {
                    var number = i + 1;
                    while (number > 5) {
                        number = number - 3;
                    }
                    var img = number + '.png';

                    var skills = [
                        'Angular, React',
                        'Vue, Kendo',
                        '.NET, Oracle, MySQL',
                        'Node, SASS, Webpack',
                        'MangoDB, Java',
                        'HTML5, jQuery, CSS3'
                    ];

                    var output = '\
                        <div class="kt-user-card-v2">\
                            <div class="kt-user-card-v2__pic">\
                                <img src="https://keenthemes.com/keen/themes/keen/theme/demo1/dist/assets/media/client-logos/logo' + img + '" alt="photo">\
                            </div>\
                            <div class="kt-user-card-v2__details">\
                                <a href="#" class="kt-user-card-v2__name">' + data.CompanyName + '</a>\
                                <span class="kt-user-card-v2__email">' +
                        skills[number - 1] + '</span>\
                            </div>\
                        </div>';

                    return output;
                }
            }, {
                field: "ShipDate",
                title: "Date",
                width: 100,
                type: "date",
                format: 'MM/DD/YYYY',
                template: function(data) {
                    return '<span class="kt-font-bold">' + data.ShipDate + '</span>';
                }
            }, {
                field: "Status",
                title: "Status",
                width: 100,
                // callback function support for column rendering
                template: function(row) {
                    var status = {
                        1: {
                            'title': 'Pending',
                            'class': ' btn-label-brand'
                        },
                        2: {
                            'title': 'Processing',
                            'class': ' btn-label-danger'
                        },
                        3: {
                            'title': 'Success',
                            'class': ' btn-label-success'
                        },
                        4: {
                            'title': 'Delivered',
                            'class': ' btn-label-success'
                        },
                        5: {
                            'title': 'Canceled',
                            'class': ' btn-label-warning'
                        },
                        6: {
                            'title': 'Done',
                            'class': ' btn-label-danger'
                        },
                        7: {
                            'title': 'On Hold',
                            'class': ' btn-label-warning'
                        }
                    };
                    return '<span class="btn btn-bold btn-sm btn-font-sm ' + status[row.Status].class + '">' + status[row.Status].title + '</span>';
                }
            }, {
                field: "Type",
                title: "Managed By",
                width: 200,
                // callback function support for column rendering
                template: function(data, i) {
                    var number = 4 + i;
                    while (number > 12) {
                        number = number - 3;
                    }
                    var user_img = '100_' + number + '.jpg';

                    var pos = KTUtil.getRandomInt(0, 5);
                    var position = [
                        'Developer',
                        'Designer',
                        'CEO',
                        'Manager',
                        'Architect',
                        'Sales'
                    ];

                    var output = '';
                    if (number > 5) {
                        output = '<div class="kt-user-card-v2">\
							<div class="kt-user-card-v2__pic">\
								<img src="https://keenthemes.com/keen/preview/assets/media/users/' + user_img + '" alt="photo">\
							</div>\
							<div class="kt-user-card-v2__details">\
								<a href="#" class="kt-user-card-v2__name">' + data.CompanyAgent + '</a>\
								<span class="kt-user-card-v2__desc">' + position[pos] + '</span>\
							</div>\
						</div>';
                    }
                    else {
                        var stateNo = KTUtil.getRandomInt(0, 6);
                        var states = [
                            'success',
                            'brand',
                            'danger',
                            'success',
                            'warning',
                            'primary',
                            'info'];
                        var state = states[stateNo];

                        output = '<div class="kt-user-card-v2">\
							<div class="kt-user-card-v2__pic">\
								<div class="kt-badge kt-badge--xl kt-badge--' + state + '">' + data.CompanyAgent.substring(0, 1) + '</div>\
							</div>\
							<div class="kt-user-card-v2__details">\
								<a href="#" class="kt-user-card-v2__name">' + data.CompanyAgent + '</a>\
								<span class="kt-user-card-v2__desc">' + position[pos] + '</span>\
							</div>\
						</div>';
                    }

                    return output;
                }
            }, {
                field: "Actions",
                width: 80,
                title: "Actions",
                sortable: false,
                autoHide: false,
                overflow: 'visible',
                template: function() {
                    return '\
                        <div class="dropdown">\
                            <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">\
                                <i class="flaticon-more-1"></i>\
                            </a>\
                            <div class="dropdown-menu dropdown-menu-right">\
                                <ul class="kt-nav">\
                                    <li class="kt-nav__item">\
                                        <a href="#" class="kt-nav__link">\
                                            <i class="kt-nav__link-icon flaticon2-expand"></i>\
                                            <span class="kt-nav__link-text">View</span>\
                                        </a>\
                                    </li>\
                                    <li class="kt-nav__item">\
                                        <a href="#" class="kt-nav__link">\
                                            <i class="kt-nav__link-icon flaticon2-contract"></i>\
                                            <span class="kt-nav__link-text">Edit</span>\
                                        </a>\
                                    </li>\
                                    <li class="kt-nav__item">\
                                        <a href="#" class="kt-nav__link">\
                                            <i class="kt-nav__link-icon flaticon2-trash"></i>\
                                            <span class="kt-nav__link-text">Delete</span>\
                                        </a>\
                                    </li>\
                                    <li class="kt-nav__item">\
                                        <a href="#" class="kt-nav__link">\
                                            <i class="kt-nav__link-icon flaticon2-mail-1"></i>\
                                            <span class="kt-nav__link-text">Export</span>\
                                        </a>\
                                    </li>\
                                </ul>\
                            </div>\
                        </div>\
                    ';
                }
            }]
        });

        $('#kt_form_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'status');
        });

        $('#kt_form_type').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

        // Reload datatable layout on aside menu toggle
        if (KTLayout.getAsideSecondaryToggler && KTLayout.getAsideSecondaryToggler()) {
            KTLayout.getAsideSecondaryToggler().on('toggle', function() {
                datatable.redraw();
            });
        }
    }


    return {
        init: function() {
            mediumCharts();

            latestProductsMiniCharts();
            daterangepickerInit();
            generalStatistics();
            recentOrdersInit();

            widgetTechnologiesChart();
            widgetTechnologiesChart2()
            widgetTotalOrdersChart();
            widgetTotalOrdersChart2();

            widgetSalesStatisticsChart();
            widgetRevenueGrowthChart();
        }
    };
}();

// Class initialization
jQuery(document).ready(function() {
    KTDashboard.init();
});