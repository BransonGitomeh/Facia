"use strict";
var KTDatatablesBasicBasic = function () {

	var initTable1 = function () {
		var table = $('#kt_table_1');

		if (!table)
			return;

		// begin first table
		table.DataTable({
			responsive: true
		});

		table.on('change', '.kt-group-checkable', function () {
			var set = $(this).closest('table').find('td:first-child .kt-checkable');
			var checked = $(this).is(':checked');

			$(set).each(function () {
				if (checked) {
					$(this).prop('checked', true);
					$(this).closest('tr').addClass('active');
				}
				else {
					$(this).prop('checked', false);
					$(this).closest('tr').removeClass('active');
				}
			});
		});

		table.on('change', 'tbody tr .kt-checkbox', function () {
			$(this).parents('tr').toggleClass('active');
		});
	};

	return {

		//main function to initiate the module
		init: function () {
			initTable1();
		}
	};
}();

// window.KTDatatablesBasicBasic = KTDatatablesBasicBasic
// jQuery(document).ready(function () {
// 	KTDatatablesBasicBasic.init();
// });