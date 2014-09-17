/*global define*/
define(
    [
        'backbone',
        "mustache",
        "text!templates/product_creation_view.html",
        "common-objects/models/configuration_item"],
    function (Backbone, Mustache, template, ConfigurationItem) {

        var ProductCreationView = Backbone.View.extend({

            events: {
                "submit #product_creation_form": "onSubmitForm",
                "hidden #product_creation_modal": "onHidden"
            },

            initialize: function () {
                _.bindAll(this);
            },

            render: function () {
                this.$el.html(Mustache.render(template, {i18n: APP_CONFIG.i18n}));
                this.bindDomElements();
                this.bindTypeahead();
                return this;
            },

            bindDomElements: function () {
                this.$modal = this.$('#product_creation_modal');
                this.$inputPartNumber = this.$('#inputPartNumber');
                this.$inputProductId = this.$('#inputProductId');
                this.$inputDescription = this.$('#inputDescription');
            },

            bindTypeahead: function () {
                this.$inputPartNumber.typeahead({
                    source: function (query, process) {
                        $.getJSON(APP_CONFIG.contextPath + '/api/workspaces/' + APP_CONFIG.workspaceId + '/parts/numbers?q=' + query, function (data) {
                            var partNumbers = [];
                            _(data).each(function (d) {
                                partNumbers.push(d.partNumber);
                            });
                            process(partNumbers);
                        });
                    }
                });
            },

            onSubmitForm: function (e) {

                this.model = new ConfigurationItem({
                    id: this.$inputProductId.val(),
                    workspaceId: APP_CONFIG.workspaceId,
                    description: this.$inputDescription.val(),
                    designItemNumber: this.$inputPartNumber.val()
                });

                this.model.save({}, {
                    wait: true,
                    success: this.onProductCreated,
                    error: this.onError
                });

                e.preventDefault();
                e.stopPropagation();
                return false;
            },

            onProductCreated: function () {
                this.trigger('product:created', this.model);
                this.closeModal();
            },

            onError: function (model, error) {
                alert(APP_CONFIG.i18n.CREATION_ERROR + " : " + error.responseText);
            },

            openModal: function () {
                this.$modal.modal('show');
            },

            closeModal: function () {
                this.$modal.modal('hide');
            },

            onHidden: function () {
                this.remove();
            }

        });

        return ProductCreationView;

    });