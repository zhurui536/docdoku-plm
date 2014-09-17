define([
    "common-objects/collections/workflow_models",
    "common-objects/views/documents/checkbox_list",
    "views/workflows/workflow_list_item",
    "text!templates/workflows/workflow_list.html"
], function (WorkflowList, CheckboxListView, WorkflowListItemView, template) {
    var WorkflowListView = CheckboxListView.extend({

        template: template,

        collection: function () {
            return new WorkflowList();
        },
        itemViewFactory: function (model) {
            return new WorkflowListItemView({
                model: model
            });
        },
        rendered: function () {
            this.once("_ready", this.dataTable);
        },
        dataTable: function () {
            var oldSort = [
                [0, "asc"]
            ];
            if (this.oTable) {
                oldSort = this.oTable.fnSettings().aaSorting;
                this.oTable.fnDestroy();
            }
            this.oTable = this.$el.dataTable({
                aaSorting: oldSort,
                bDestroy: true,
                iDisplayLength: -1,
                oLanguage: {
                    sSearch: "<i class='fa fa-search'></i>",
                    sEmptyTable: APP_CONFIG.i18n.NO_DATA,
                    sZeroRecords: APP_CONFIG.i18n.NO_FILTERED_DATA
                },
                sDom: 'ft',
                aoColumnDefs: [
                    { "bSortable": false, "aTargets": [ 0 ] },
                    { "sType": APP_CONFIG.i18n.DATE_SORT, "aTargets": [4] }
                ]
            });
            this.$el.parent().find(".dataTables_filter input").attr("placeholder", APP_CONFIG.i18n.FILTER);
        }
    });
    return WorkflowListView;
});