sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, JSONModel) {
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

                this.getOwnerComponent().setModel(new JSONModel(data), "EmpDetails");


            },


        });
    });
