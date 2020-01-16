'use strict';
// Class definition
var KTDatatableChildDataLocalDemo = function() {
	// Private functions

	var subTableInit = function(e) {
		$('<div/>').attr('id', 'child_data_local_' + e.data.RecordID).appendTo(e.detailCell).KTDatatable({
			data: {
				type: 'local',
				source: e.data.Orders,
				pageSize: 10,
			},

			// layout definition
			layout: {
				theme: 'default',
				scroll: true,
				height: 300,
				footer: false,

				// enable/disable datatable spinner.
				spinner: {
					type: 1,
					theme: 'default',
				},
			},

			sortable: true,

			// columns definition
			columns: [
				{
					field: 'OrderID',
					title: 'Order ID',
					template: function (row) {
						return '<span>' + row.OrderID + ' - ' + row.ShipCountry + '</span>';
					},
				}, {
					field: 'ShipCountry',
					title: 'Country',
					width: 100,
				}, {
					field: 'ShipAddress',
					title: 'Ship Address',
				}, {
					field: 'ShipName',
					title: 'Ship Name',
				}, {
					field: 'TotalPayment',
					title: 'Payment',
					type: 'number',
				}, {
					field: 'Status',
					title: 'Status',
					// callback function support for column rendering
					template: function (row) {
						var status = {
							1: {'title': 'Pending', 'class': 'kt-badge--brand'},
							2: {'title': 'Delivered', 'class': ' kt-badge--metal'},
							3: {'title': 'Canceled', 'class': ' kt-badge--primary'},
							4: {'title': 'Success', 'class': ' kt-badge--success'},
							5: {'title': 'Info', 'class': ' kt-badge--info'},
							6: {'title': 'Danger', 'class': ' kt-badge--danger'},
							7: {'title': 'Warning', 'class': ' kt-badge--warning'},
						};
						return '<span class="kt-badge ' + status[row.Status].class + ' kt-badge--inline kt-badge--pill">' + status[row.Status].title + '</span>';
					},
				}, {
					field: 'Type',
					title: 'Type',
					autoHide: false,
					// callback function support for column rendering
					template: function (row) {
						var status = {
							1: {'title': 'Online', 'state': 'danger'},
							2: {'title': 'Retail', 'state': 'primary'},
							3: {'title': 'Direct', 'state': 'accent'},
						};
						return '<span class="kt-badge kt-badge--' + status[row.Type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' +
							status[row.Type].state + '">' +
							status[row.Type].title + '</span>';
					},
				}
			],
		});
	};

	// demo initializer
	var mainTableInit = function() {

		var dataJSONArray = JSON.parse(
			'[{"RecordID":1,"FirstName":"Tommie","LastName":"Pee","Company":"Roodel","Email":"tpee0@slashdot.org","Phone":"103-891-3486","Status":4,"Type":1,"Orders":[{"OrderID":"41250-166","ShipCountry":"FR","ShipAddress":"5 Rutledge Court","ShipName":"Rogahn-Shanahan","OrderDate":"3/7/2017","TotalPayment":"$591994.23","Status":5,"Type":1},{"OrderID":"0078-0595","ShipCountry":"CN","ShipAddress":"953 Schlimgen Park","ShipName":"Hilpert-Sanford","OrderDate":"5/12/2017","TotalPayment":"$79774.93","Status":1,"Type":1},{"OrderID":"47593-443","ShipCountry":"BY","ShipAddress":"46925 Memorial Park","ShipName":"Brakus and Sons","OrderDate":"2/12/2017","TotalPayment":"$1095029.28","Status":1,"Type":1},{"OrderID":"50114-5236","ShipCountry":"NZ","ShipAddress":"1420 Mockingbird Drive","ShipName":"Beer-Harris","OrderDate":"6/6/2017","TotalPayment":"$778690.72","Status":5,"Type":3},{"OrderID":"36987-2826","ShipCountry":"PL","ShipAddress":"3995 Huxley Court","ShipName":"Kling, Miller and Quitzon","OrderDate":"9/1/2017","TotalPayment":"$773995.02","Status":5,"Type":2},{"OrderID":"62750-006","ShipCountry":"ID","ShipAddress":"2064 Dennis Parkway","ShipName":"Lang, Kohler and Considine","OrderDate":"9/21/2017","TotalPayment":"$830550.45","Status":5,"Type":2},{"OrderID":"59779-597","ShipCountry":"IR","ShipAddress":"32 Golf Course Parkway","ShipName":"Jaskolski-Hilll","OrderDate":"4/4/2017","TotalPayment":"$754685.32","Status":3,"Type":3},{"OrderID":"59762-3743","ShipCountry":"HT","ShipAddress":"76 Anthes Hill","ShipName":"Reynolds Group","OrderDate":"1/23/2017","TotalPayment":"$295435.66","Status":2,"Type":1},{"OrderID":"64942-1114","ShipCountry":"ID","ShipAddress":"7511 Mayfield Avenue","ShipName":"Purdy and Sons","OrderDate":"12/1/2016","TotalPayment":"$636911.04","Status":6,"Type":2},{"OrderID":"13537-505","ShipCountry":"KZ","ShipAddress":"36303 Esch Parkway","ShipName":"Reinger, Howe and Kertzmann","OrderDate":"1/31/2016","TotalPayment":"$753691.79","Status":4,"Type":1},{"OrderID":"16781-426","ShipCountry":"SE","ShipAddress":"507 Columbus Lane","ShipName":"Carter, Gibson and Kassulke","OrderDate":"10/26/2017","TotalPayment":"$873190.14","Status":2,"Type":2},{"OrderID":"60512-1008","ShipCountry":"ID","ShipAddress":"8 Jana Lane","ShipName":"Rutherford and Sons","OrderDate":"1/10/2017","TotalPayment":"$242894.68","Status":3,"Type":1},{"OrderID":"0456-0461","ShipCountry":"CN","ShipAddress":"5127 Roxbury Trail","ShipName":"Johnson Inc","OrderDate":"12/10/2017","TotalPayment":"$328850.50","Status":5,"Type":3},{"OrderID":"63304-098","ShipCountry":"GR","ShipAddress":"54627 Randy Lane","ShipName":"Johnston, Veum and Funk","OrderDate":"12/11/2016","TotalPayment":"$278247.03","Status":3,"Type":2},{"OrderID":"64092-317","ShipCountry":"CN","ShipAddress":"292 Rusk Lane","ShipName":"Bode, Zboncak and Reichel","OrderDate":"4/10/2016","TotalPayment":"$798173.38","Status":2,"Type":2},{"OrderID":"36987-1483","ShipCountry":"CU","ShipAddress":"2225 Saint Paul Junction","ShipName":"Dach, Haag and Koss","OrderDate":"2/7/2017","TotalPayment":"$1147799.38","Status":4,"Type":2},{"OrderID":"68084-814","ShipCountry":"ID","ShipAddress":"0 Sheridan Avenue","ShipName":"Little-O\'Hara","OrderDate":"11/24/2016","TotalPayment":"$394051.79","Status":6,"Type":1},{"OrderID":"42023-131","ShipCountry":"BR","ShipAddress":"4238 Roth Drive","ShipName":"Boehm LLC","OrderDate":"4/23/2016","TotalPayment":"$300684.31","Status":6,"Type":3},{"OrderID":"14290-350","ShipCountry":"CN","ShipAddress":"41950 Troy Point","ShipName":"Windler, Larkin and Collier","OrderDate":"4/17/2017","TotalPayment":"$467794.40","Status":4,"Type":1}]},\n' +
			'{"RecordID":2,"FirstName":"Scott","LastName":"Coldbreath","Company":"Zooxo","Email":"scoldbreath1@zdnet.com","Phone":"143-179-5104","Status":5,"Type":1,"Orders":[{"OrderID":"55316-029","ShipCountry":"ID","ShipAddress":"56955 Rusk Street","ShipName":"Paucek, Dietrich and Bergnaum","OrderDate":"9/27/2016","TotalPayment":"$662732.49","Status":2,"Type":3},{"OrderID":"68462-467","ShipCountry":"CN","ShipAddress":"13005 Bultman Court","ShipName":"Stamm Group","OrderDate":"3/22/2017","TotalPayment":"$653958.68","Status":4,"Type":2},{"OrderID":"55154-8270","ShipCountry":"UG","ShipAddress":"6 Brentwood Place","ShipName":"Stroman, Schowalter and Bogan","OrderDate":"8/20/2016","TotalPayment":"$57166.20","Status":3,"Type":2},{"OrderID":"63736-002","ShipCountry":"ID","ShipAddress":"51 Banding Junction","ShipName":"Crona-Konopelski","OrderDate":"2/5/2017","TotalPayment":"$733681.16","Status":3,"Type":2},{"OrderID":"54868-5182","ShipCountry":"CN","ShipAddress":"629 Oxford Alley","ShipName":"Lindgren LLC","OrderDate":"5/21/2016","TotalPayment":"$921137.56","Status":3,"Type":2},{"OrderID":"55714-4529","ShipCountry":"JP","ShipAddress":"9 Melvin Point","ShipName":"Kris-Will","OrderDate":"4/29/2016","TotalPayment":"$184624.81","Status":1,"Type":2},{"OrderID":"63736-305","ShipCountry":"CN","ShipAddress":"84196 New Castle Junction","ShipName":"Lockman-Luettgen","OrderDate":"9/7/2016","TotalPayment":"$922821.30","Status":2,"Type":2}]},\n' +
			'{"RecordID":349,"FirstName":"Nial","LastName":"Beden","Company":"Feedspan","Email":"nbeden9o@hostgator.com","Phone":"465-123-8300","Status":1,"Type":2,"Orders":[{"OrderID":"54868-5649","ShipCountry":"PH","ShipAddress":"594 Anderson Road","ShipName":"Daniel-Huel","OrderDate":"6/24/2016","TotalPayment":"$762496.04","Status":4,"Type":1},{"OrderID":"0078-0327","ShipCountry":"PH","ShipAddress":"2 Lotheville Parkway","ShipName":"Baumbach, Parisian and Ruecker","OrderDate":"2/6/2016","TotalPayment":"$999714.19","Status":2,"Type":1},{"OrderID":"0363-2173","ShipCountry":"CN","ShipAddress":"5921 Becker Terrace","ShipName":"Rohan-Marks","OrderDate":"7/2/2016","TotalPayment":"$44425.99","Status":4,"Type":2},{"OrderID":"14783-105","ShipCountry":"BR","ShipAddress":"9 Waubesa Court","ShipName":"Anderson, Gutkowski and Zieme","OrderDate":"6/15/2016","TotalPayment":"$144439.32","Status":1,"Type":3},{"OrderID":"59779-215","ShipCountry":"PT","ShipAddress":"4 Clarendon Alley","ShipName":"Cremin, Leuschke and Marks","OrderDate":"9/7/2016","TotalPayment":"$158843.95","Status":1,"Type":1},{"OrderID":"49349-655","ShipCountry":"LR","ShipAddress":"3033 Arrowood Park","ShipName":"Boyle, Dicki and Wilderman","OrderDate":"3/17/2016","TotalPayment":"$840995.38","Status":2,"Type":1},{"OrderID":"37000-821","ShipCountry":"DE","ShipAddress":"8 Esch Drive","ShipName":"Bogisich and Sons","OrderDate":"5/11/2016","TotalPayment":"$852346.75","Status":5,"Type":2},{"OrderID":"36987-2794","ShipCountry":"PY","ShipAddress":"94302 Katie Place","ShipName":"Doyle, Boyer and Franecki","OrderDate":"5/1/2016","TotalPayment":"$1086070.09","Status":6,"Type":3},{"OrderID":"52533-172","ShipCountry":"ID","ShipAddress":"93 Parkside Center","ShipName":"King and Sons","OrderDate":"1/22/2017","TotalPayment":"$628455.94","Status":3,"Type":2}]},\n' +
			'{"RecordID":350,"FirstName":"Teddie","LastName":"Ferneley","Company":"Dabtype","Email":"tferneley9p@oakley.com","Phone":"284-728-5534","Status":6,"Type":2,"Orders":[{"OrderID":"13734-023","ShipCountry":"CN","ShipAddress":"3434 Gulseth Plaza","ShipName":"Hauck LLC","OrderDate":"7/12/2016","TotalPayment":"$707730.01","Status":3,"Type":2},{"OrderID":"64406-008","ShipCountry":"ID","ShipAddress":"4 Boyd Avenue","ShipName":"Dickens-Mann","OrderDate":"7/31/2016","TotalPayment":"$675692.10","Status":1,"Type":3},{"OrderID":"64117-596","ShipCountry":"IR","ShipAddress":"40 Katie Circle","ShipName":"Cremin, D\'Amore and Rowe","OrderDate":"12/4/2017","TotalPayment":"$479956.28","Status":1,"Type":2},{"OrderID":"0591-2784","ShipCountry":"CA","ShipAddress":"42 Sutherland Pass","ShipName":"Hermann-Schroeder","OrderDate":"6/25/2016","TotalPayment":"$242558.93","Status":3,"Type":2},{"OrderID":"55154-4029","ShipCountry":"PT","ShipAddress":"801 Badeau Alley","ShipName":"Cole, King and Crona","OrderDate":"10/12/2017","TotalPayment":"$641687.48","Status":6,"Type":2},{"OrderID":"65862-208","ShipCountry":"ID","ShipAddress":"325 Birchwood Alley","ShipName":"Anderson, Corkery and Gleason","OrderDate":"3/3/2016","TotalPayment":"$1180528.08","Status":5,"Type":3}]}]');

		
			var datatable = $('.kt_datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'local',
				source: dataJSONArray,
				pageSize: 10, // display 20 records per page
			},

			// layout definition
			layout: {
				theme: 'default',
				scroll: false,
				height: null,
				footer: false,
			},

			sortable: true,

			filterable: false,

			pagination: true,

			detail: {
				title: 'Load sub table',
				content: subTableInit,
			},

			search: {
				input: $('#generalSearch'),
			},

			// columns definition
			columns: [
				{
					field: 'RecordID',
					title: '',
					sortable: false,
					width: 30,
					textAlign: 'center', // left|right|center,
				}, {
					field: 'FirstName',
					title: 'First Name',
				}, {
					field: 'LastName',
					title: 'Last Name',
				}, {
					field: 'Company',
					title: 'Company',
				}, {
					field: 'Email',
					title: 'Email',
				}, {
					field: 'Phone',
					title: 'Phone',
				}, {
					field: 'Status',
					title: 'Status',
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Pending', 'class': 'kt-badge--brand'},
							2: {'title': 'Delivered', 'class': ' kt-badge--metal'},
							3: {'title': 'Canceled', 'class': ' kt-badge--primary'},
							4: {'title': 'Success', 'class': ' kt-badge--success'},
							5: {'title': 'Info', 'class': ' kt-badge--info'},
							6: {'title': 'Danger', 'class': ' kt-badge--danger'},
							7: {'title': 'Warning', 'class': ' kt-badge--warning'},
						};
						return '<span class="kt-badge ' + status[row.Status].class + ' kt-badge--inline kt-badge--pill">' + status[row.Status].title + '</span>';
					},
				}, {
					field: 'Type',
					title: 'Type',
					autoHide: false,
					// callback function support for column rendering
					template: function(row) {
						var status = {
							1: {'title': 'Online', 'state': 'danger'},
							2: {'title': 'Retail', 'state': 'primary'},
							3: {'title': 'Direct', 'state': 'accent'},
						};
						return '<span class="kt-badge kt-badge--' + status[row.Type].state + ' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-' + status[row.Type].state +
							'">' +
							status[row.Type].title + '</span>';
					},
				}, {
					field: 'Actions',
					width: 110,
					title: 'Actions',
					sortable: false,
					overflow: 'visible',
					template: function() {
						return '\
		                  <div class="dropdown">\
		                      <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">\
		                          <i class="la la-ellipsis-h"></i>\
		                      </a>\
		                      <div class="dropdown-menu dropdown-menu-right">\
		                          <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
		                          <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
		                          <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
		                      </div>\
		                  </div>\
		                  <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\
		                      <i class="la la-edit"></i>\
		                  </a>\
		                  <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">\
		                      <i class="la la-trash"></i>\
		                  </a>\
		              ';
					},
				}],
		});

		$('#kt_form_status').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'status');
		});

		$('#kt_form_type').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'type');
		});

		$('#kt_form_status,#kt_form_type').selectpicker();

	};

	return {
		// Public functions
		init: function() {
			// init dmeo
			mainTableInit();
		},
	};
}();

jQuery(document).ready(function() {
	KTDatatableChildDataLocalDemo.init();
});