sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
  ],
  function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend(
      "attendanceshabas.attendanceshabas.controller.Home",
      {
        onInit: function () {
          this.getView().addEventDelegate(
            {
              onBeforeShow: jQuery.proxy(function (oEvent) {
                this.onBeforeShow(oEvent);
              }),
            },
            this
          );
        },

        onBeforeShow: function (oEvent) {
          this.oBundle = this.getOwnerComponent()
            .getModel("i18n")
            .getResourceBundle();
          var currentDateDay = new Date()
            .toLocaleDateString("he-IL")
            .split(".")[0];
          var currentDateMonth = new Date(
            new Date().setMonth(new Date().getMonth())
          )
            .toLocaleDateString("he-IL")
            .split(".")[1];
          var currentDateYear = new Date()
            .toLocaleDateString("he-IL")
            .split(".")[2];

          if (currentDateMonth.length === 1) {
            currentDateMonth = "0" + currentDateMonth;
          }
          var curMonthHeb = this.changeMonthToHeb(currentDateMonth);
          this.getView()
            .byId("calendar-date")
            .setText(curMonthHeb + " " + currentDateYear);
          let data = [
            {
              fullName: "אלי כהן",
              empType: "שוטר",
              city: "לוד",
              workArea: "נגדים",
              cardNumber: "05878913",
              email: "eli@police.gov.il",
              workSchedule: "שוטר 100%, 5 ימים",
            },
          ];

          var oData = [
            {
              date: "2024-11-11",
              enterTime: "09:00",
              exitTime: "17:00",
              totalHours: "8",
              totalHoursNeto: "7.5",
              certificates: "None",
              absenceWithPayment: "No",
              absenceWithoutPayment: "No",
              globalAbsence: "No",
              note: "Good performance",
              requests: "N/A",
            },
            // Add more objects as needed
          ];

          var dates = [
            {
              name: "ינואר",
            },
            {
              name: "פברואר",
            },
            {
              name: "מרץ",
            },
            {
              name: "אפריל",
            },
            {
              name: "מאי",
            },
            {
              name: "יוני",
            },
            {
              name: "יולי",
            },
            {
              name: "אוגוסט",
            },
            {
              name: "ספטמבר",
            },
            {
              name: "אוקטובר",
            },
            {
              name: "נובמבר",
            },
            {
              name: "דצמבר",
            },
          ];
          this.getOwnerComponent().setModel(new JSONModel(dates), "Dates");
          this.getOwnerComponent().setModel(new JSONModel(oData), "oData");
          this.getOwnerComponent().setModel(new JSONModel(data), "EmpDetails");
        },
        changeMonthToHeb: function (month) {
          switch (month) {
            case "01":
              return this.oBundle.getText("January");
              break;
            case "02":
              return this.oBundle.getText("February");
              break;

            case "03":
              return this.oBundle.getText("March");
              break;

            case "04":
              return this.oBundle.getText("April");
              break;

            case "05":
              return this.oBundle.getText("May");
              break;

            case "06":
              return this.oBundle.getText("June");
              break;

            case "07":
              return this.oBundle.getText("July");
              break;

            case "08":
              return this.oBundle.getText("August");
              break;

            case "09":
              return this.oBundle.getText("September");
              break;

            case "10":
              return this.oBundle.getText("October");
              break;
            case "11":
              return this.oBundle.getText("November");
              break;
            case "12":
              return this.oBundle.getText("December");
              break;
          }
        },
        addCertificate: async function () {
          this.addCertificate = await this.loadFragment({
            name: "attendanceshabas.attendanceshabas.fragments.AddCertificate",
          });
          this.addCertificate.open();
        },

        closeAddCertificate: function () {
          this.addCertificate.close();
          this.addCertificate.destroy();
          this.addCertificate = null;
        },
        addReport: async function () {
          this.addReport = await this.loadFragment({
            name: "attendanceshabas.attendanceshabas.fragments.addReport",
          });
          this.addReport.open();
        },

        actionsPopup: function (oEvent) {
          var oButton = oEvent.getSource(),
            oView = this.getView();

          // create popover
          if (!this._pPopover) {
            this._pPopover = Fragment.load({
              id: oView.getId(),
              name: "attendanceshabas.attendanceshabas.fragments.ActionsPopup",
              controller: this,
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

        openCalendar: function (oEvent) {
          var oButton = oEvent.getSource(),
            oView = this.getView();

          // Create popover if it doesn't exist
          if (!this.oCalendarPopover) {
            this.oCalendarPopover = Fragment.load({
              id: oView.getId(), // Using the view's ID for unique fragment IDs
              name: "attendanceshabas.attendanceshabas.fragments.Calendar",
              controller: this,
            }).then(function (oPopover) {
              oView.addDependent(oPopover);
              return oPopover;
            });
          }

          // Open the calendar fragment when ready
          this.oCalendarPopover.then(function (oPopover) {
            oPopover.openBy(oButton);
          });
        },

        handleCalendarSelect: function (oEvent) {
          var selectedDates = oEvent.getSource().getSelectedDates()[0];
          var startDate = selectedDates.getStartDate().toLocaleDateString("he");
          var endDate = selectedDates.getEndDate();
          if (!endDate) {
            endDate = startDate;
          } else {
            endDate = selectedDates.getEndDate().toLocaleDateString("he");
          }
          this.getView()
            .byId("absenceDatesInput")
            .setValue(`${startDate} - ${endDate}`);
        },

        onMonthsPress: function (oEvent) {
          var oButton = oEvent.getSource(),
            oView = this.getView();

          // create popover
          if (!this.oMonthsPress) {
            this.oMonthsPress = Fragment.load({
              id: oView.getId(),
              name: "attendanceshabas.attendanceshabas.fragments.Months",
              controller: this,
            }).then(function (oPopover) {
              oView.addDependent(oPopover);
              // oPopover.bindElement("/ProductCollection/0");
              return oPopover;
            });
          }
          this.oMonthsPress.then(function (oPopover) {
            oPopover.openBy(oButton);
          });
        },

        openAttendanceUpdate: async function () {
          this.openAttendanceUpdate = await this.loadFragment({
            name: "attendanceshabas.attendanceshabas.fragments.AttendanceUpdate",
          });
          this.openAttendanceUpdate.open();
        },
      }
    );
  }
);
