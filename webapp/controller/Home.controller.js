sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/core/Fragment'
],
    function (Controller, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("attendanceshabas.attendanceshabas.controller.Home", {
            onInit: function () {
                let data = [{
                    fullName: 'אלי כהן',
                    empType: "שוטר",
                    city: 'לוד',
                    workArea: "נגדים",
                    cardNumber: "05878913",
                    email: "eli@police.gov.il",
                    workSchedule: "שוטר 100%, 5 ימים"
                }];

                var oData = [
                    { date: "2024-11-11", enterTime: "09:00", exitTime: "17:00", totalHours: "8", totalHoursNeto: "7.5", certificates: "None", absenceWithPayment: "No", absenceWithoutPayment: "No", globalAbsence: "No", note: "Good performance", requests: "N/A" }
                    // Add more objects as needed
                ];


                this.getOwnerComponent().setModel(new JSONModel(oData), "oData");
                this.getOwnerComponent().setModel(new JSONModel(data), "EmpDetails");


            },

            addCertificate: async function () {
                this.addCertificate = await this.loadFragment({
                    name: "attendanceshabas.attendanceshabas.fragments.AddCertificate"
                });
                this.addCertificate.open();
            },

            actionsPopup: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();

                // create popover
                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "attendanceshabas.attendanceshabas.fragments.ActionsPopup",
                        controller: this
                    }).then(function (oPopover) {
                        oView.addDependent(oPopover);
                        // oPopover.bindElement("/ProductCollection/0");
                        return oPopover;
                    });
                }
                this._pPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },

        });
    });
