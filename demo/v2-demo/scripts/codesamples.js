/*
    This file contains the code samples which will appear live in the web-page.
    Each sample method name starts with _Report_ or _Page or _Embed depends on which section it appears.
    Please keep this.
*/

// ---- Embed Code ----------------------------------------------------

function _Embed_BasicEmbed() {
    // Read embed application token from textbox
    var txtAccessToken = $('#txtAccessToken').val();

    // Read embed URL from textbox
    var txtEmbedUrl = $('#txtReportEmbed').val();

    // Read report Id from textbox
    var txtEmbedReportId = $('#txtEmbedReportId').val();

    // Get models. models contains enums that can be used.
    var models = window['powerbi-client'].models;

    // We give All permissions to demonstrate switching between View and Edit mode and saving report.
    var permissions = models.Permissions.All;

    // Embed configuration used to describe the what and how to embed.
    // This object is used when calling powerbi.embed.
    // This also includes settings and options such as filters.
    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    var config= {
        type: 'report',
        tokenType: 1, // models.TokenType.Embed
        accessToken: txtAccessToken,
        embedUrl: txtEmbedUrl,
        id: txtEmbedReportId,
        permissions: permissions,
        settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: true
        }
    };

    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Embed the report and display it within the div container.
    var report = powerbi.embed(embedContainer, config);

    // Report.off removes a given event handler if it exists.
    report.off("loaded");

    // Report.on will add an event handler which prints to Log window.
    report.on("loaded", function() {
        Log.logText("Loaded");
    });

    report.on("error", function(event) {
        Log.log(event.detail);
        
        report.off("error");
    });

    report.off("saved");
    report.on("saved", function(event) {
        Log.log(event.detail);
        if(event.detail.saveAs) {
            Log.logText('In order to interact with the new report, create a new token and load the new report');
         }
     });
}

function _Embed_DashboardEmbed() {
    // Read embed application token from textbox
    var txtAccessToken = $('#txtAccessToken').val();

    // Read embed URL from textbox
    var txtEmbedUrl = $('#txtDashboardEmbed').val();

    // Read dashboard Id from textbox
    var txtEmbedDashboardId = $('#txtEmbedDashboardId').val();

    // Get models. models contains enums that can be used.
    var models = window['powerbi-client'].models;

    // Embed configuration used to describe the what and how to embed.
    // This object is used when calling powerbi.embed.
    // This also includes settings and options such as filters.
    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    var config = {
        type: 'dashboard',
        tokenType: models.TokenType.Embed,
        accessToken: txtAccessToken,
        embedUrl: txtEmbedUrl,
        id: txtEmbedDashboardId
    };

    // Get a reference to the embedded dashboard HTML element
    var dashboardContainer = $('#dashboardContainer')[0];

    // Embed the dashboard and display it within the div container.
    var dashboard = powerbi.embed(dashboardContainer, config);

    // Dashboard.off removes a given event handler if it exists.
    dashboard.off("loaded");

    // Dashboard.on will add an event handler which prints to Log window.
    dashboard.on("loaded", function() {
        Log.logText("Loaded");
    });

    dashboard.on("error", function(event) {
        Log.log(event.detail);
        
        dashboard.off("error");
    });

    dashboard.off("tileClicked");
    dashboard.on("tileClicked", function(event) {
        Log.log(event.detail);
     });
}

function _Mock_Embed_BasicEmbed(isEdit) {
    // Read embed application token from textbox
    var txtAccessToken = $('#txtAccessToken').val();

    // Read embed URL from textbox
    var txtEmbedUrl = $('#txtReportEmbed').val();

    // Read report Id from textbox
    var txtEmbedReportId = $('#txtEmbedReportId').val();

    // Get models. models contains enums that can be used.
    var models = window['powerbi-client'].models;
    var permissions = models.Permissions.Copy | models.Permissions.Read;
    var viewMode = isEdit ? models.ViewMode.Edit : models.ViewMode.View;

    // Embed configuration used to describe the what and how to embed.
    // This object is used when calling powerbi.embed.
    // This also includes settings and options such as filters.
    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    var config= {
        type: 'report',
        tokenType: models.TokenType.Embed,
        accessToken: txtAccessToken,
        embedUrl: txtEmbedUrl,
        id: txtEmbedReportId,
        permissions: permissions,
        viewMode: viewMode,
        settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: true,
            useCustomSaveAsDialog: true
        }
    };

    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Embed the report and display it within the div container.
    var report = powerbi.embed(embedContainer, config);

    // Report.off removes a given event handler if it exists.
    report.off("loaded");

    // Report.on will add an event handler which prints to Log window.
    report.on("loaded", function() {
        Log.logText("Loaded");
    });

    report.on("saveAsTriggered", function() {
        Log.logText("Cannot save sample report");
    });

    report.off("error");
    report.on("error", function(event) {
        Log.log(event.detail);
    });

    report.off("saved");
    report.on("saved", function(event) {
        Log.log(event.detail);
        if(event.detail.saveAs) {
          Log.logText('In order to interact with the new report, create a new token and load the new report');
        }
    });
}

function _Mock_Embed_BasicEmbed_EditMode() {
    _Mock_Embed_BasicEmbed(true);
}

function _Mock_Embed_BasicEmbed_ViewMode() {
    _Mock_Embed_BasicEmbed(false);
}

function _Embed_BasicEmbed_EditMode() {
    // Read embed application token from textbox
    var txtAccessToken = $('#txtAccessToken').val();

    // Read embed URL from textbox
    var txtEmbedUrl = $('#txtReportEmbed').val();

    // Read report Id from textbox
    var txtEmbedReportId = $('#txtEmbedReportId').val();

    // Get models. models contains enums that can be used.
    var models = window['powerbi-client'].models;

    // Embed configuration used to describe the what and how to embed.
    // This object is used when calling powerbi.embed.
    // This also includes settings and options such as filters.
    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    var config = {
        type: 'report',
        tokenType: models.TokenType.Embed,
        accessToken: txtAccessToken,
        embedUrl: txtEmbedUrl,
        id: txtEmbedReportId,
        permissions: models.Permissions.All /*gives maximum permissions*/,
        viewMode: models.ViewMode.Edit,
        settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: true
        }
    };

    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Embed the report and display it within the div container.
    var report = powerbi.embed(embedContainer, config);

    // Report.off removes a given event handler if it exists.
    report.off("loaded");

    // Report.on will add an event handler which prints to Log window.
    report.on("loaded", function() {
        Log.logText("Loaded");
    });

    report.off("error");
    report.on("error", function(event) {
        Log.log(event.detail);
    });

    report.off("saved");
    report.on("saved", function(event) {
        Log.log(event.detail);
        if(event.detail.saveAs) {
          Log.logText('In order to interact with the new report, create a new token and load the new report');
        }
    });
}

function _Embed_EmbedWithDefaultFilter() {
    var txtAccessToken = $('#txtAccessToken').val();
    var txtEmbedUrl = $('#txtReportEmbed').val();
    var txtEmbedReportId = $('#txtEmbedReportId').val();
    
    // Get models. models contains enums that can be used.
    var models = window['powerbi-client'].models;

    const filter = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "Store",
        column: "Chain"
      },
      operator: "In",
      values: ["Lindseys"]
    };
    
    var embedConfiguration = {
        type: 'report',
        tokenType: models.TokenType.Embed,
        accessToken: txtAccessToken,
        embedUrl: txtEmbedUrl,
        id: txtEmbedReportId,
        settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false
        },
        filters: [filter]
    };
    
    var embedContainer = document.getElementById('embedContainer');
    powerbi.embed(embedContainer, embedConfiguration);
}

function _Embed_Create() {
    // Read embed application token from textbox
    var txtAccessToken = $('#txtCreateAccessToken').val();

    // Read embed URL from textbox
    var txtEmbedUrl = $('#txtCreateReportEmbed').val();

    // Read dataset Id from textbox
    var txtEmbedDatasetId = $('#txtEmbedDatasetId').val();
    
    // Get models. models contains enums that can be used.
    var models = window['powerbi-client'].models;

    // Embed create configuration used to describe the what and how to create report.
    // This object is used when calling powerbi.createReport.
    var embedCreateConfiguration = {
        tokenType: models.TokenType.Embed,
        accessToken: txtAccessToken,
        embedUrl: txtEmbedUrl,
        datasetId: txtEmbedDatasetId,
    };
    
    // Grab the reference to the div HTML element that will host the report
    var embedContainer = $('#embedContainer')[0];

    // Create report
    var report = powerbi.createReport(embedContainer, embedCreateConfiguration);

    // Report.off removes a given event handler if it exists.
    report.off("loaded");

    // Report.on will add an event handler which prints to Log window.
    report.on("loaded", function() {
        Log.logText("Loaded");
    });

    report.off("error");
    report.on("error", function(event) {
        Log.log(event.detail);
    });

    // report.off removes a given event handler if it exists.
    report.off("saved");
    report.on("saved", function(event) {
        Log.log(event.detail);
        Log.logText('In order to interact with the new report, create a new token and load the new report');
    });
}

function _Mock_Embed_Create() {
    // Read embed application token from textbox
    var txtAccessToken = $('#txtCreateAccessToken').val();

    // Read embed URL from textbox
    var txtEmbedUrl = $('#txtCreateReportEmbed').val();

    // Read dataset Id from textbox
    var txtEmbedDatasetId = $('#txtEmbedDatasetId').val();
    
    // Get models. models contains enums that can be used.
    var models = window['powerbi-client'].models;

    // Embed create configuration used to describe the what and how to create report.
    // This object is used when calling powerbi.createReport.
    var embedCreateConfiguration = {
        tokenType: models.TokenType.Embed,
        accessToken: txtAccessToken,
        embedUrl: txtEmbedUrl,
        datasetId: txtEmbedDatasetId,
        settings: {
            useCustomSaveAsDialog: true
        }
    };
    
    // Grab the reference to the div HTML element that will host the report
    var embedContainer = $('#embedContainer')[0];

    // Create report
    var report = powerbi.createReport(embedContainer, embedCreateConfiguration);

    // Report.off removes a given event handler if it exists.
    report.off("loaded");

    // Report.on will add an event handler which prints to Log window.
    report.on("loaded", function() {
        Log.logText("Loaded");
    });
    report.on("saveAsTriggered", function() {
        Log.logText("Cannot save sample report");
    });

    report.off("error");
    report.on("error", function(event) {
        Log.log(event.detail);
    });
}

// ---- Report Operations ----------------------------------------------------

function _Report_GetId() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Retrieve the report id.
    var reportId = report.getId();

    Log.logText(reportId);
}

function _Report_UpdateSettings() {
    // The new settings that you want to apply to the report.
    const newSettings = {
      navContentPaneEnabled: true,
      filterPaneEnabled: false
    };

    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Update the settings by passing in the new settings you have configured.
    report.updateSettings(newSettings)
        .then(function (result) {
            $("#result").html(result);
        })
        .catch(function (error) {
            $("#result").html(error);
        });
}

function _Report_GetPages() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Retrieve the page collection and loop through to collect the 
    // page name and display name of each page and display the value.
    report.getPages()
        .then(function (pages) {
            pages.forEach(function(page) {
                var log = page.name + " - " + page.displayName;
                Log.logText(log);
            });
        })
        .catch(function (error) {
            Log.log(error);
        });
}

function _Report_SetPage() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // setPage will change the selected view to the page you indicate.
    // This is the actual page name not the display name.
    report.setPage("ReportSection2")
        .then(function (result) {
            Log.log(result);
        })
        .catch(function (errors) {
            Log.log(errors);
        });

    // Report.off removes a given event handler if it exists.
    report.off("pageChanged");

    // Report.on will add an event handler which prints page 
    // name and display name to Log window.
    report.on("pageChanged", function(event) {
        var page = event.detail.newPage;
        Log.logText(page.name + " - " + page.displayName);
    });
}

function _Report_GetFilters() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);
    
    // Get the filters applied to the report.
    report.getFilters()
        .then(function (filters) {
            Log.log(filters);
        })
        .catch(function (errors) {
            Log.log(errors);
        });
}

function _Report_SetFilters() {
    // Build the filter you want to use. For more information, See Constructing
    // Filters in https://github.com/Microsoft/PowerBI-JavaScript/wiki/Filters.
    const filter = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "Store",
        column: "Chain"
      },
      operator: "In",
      values: ["Lindseys"]
    };

    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);
    
    // Set the filter for the report.
    // Pay attention that setFilters receives an array.
    report.setFilters([filter])
        .then(function (result) {
            Log.log(result);
        })
        .catch(function (errors) {
            Log.log(errors);
        });
}

function _Report_RemoveFilters() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Remove the filters currently applied to the report.
    report.removeFilters()
        .then(function (result) {
            Log.log(result);
        })
        .catch(function (errors) {
            Log.log(errors);
        });
}

function _Report_PrintCurrentReport() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Trigger the print dialog for your browser.
    report.print()
        .then(function (result) {
            Log.log(result);
        })
        .catch(function (errors) {
            Log.log(errors);
        });
}

function _Report_Reload() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Reload the displayed report
    report.reload()
        .then(function (result) {
            Log.logText("Reloaded");
        })
        .catch(function (errors) {
            Log.log(errors);
        });
}

function _Report_Refresh() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Refresh the displayed report
    report.refresh()
        .then(function (result) {
            Log.logText("Refreshed");
        })
        .catch(function (errors) {
            Log.log(errors);
        });
}

function _Report_FullScreen() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Displays the report in full screen mode.
    report.fullscreen();
}

function _Report_ExitFullScreen() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Exits full screen mode.
    report.exitFullscreen();
}

function _Report_switchModeEdit() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Switch to edit mode.
    report.switchMode("edit");
}

function _Report_switchModeView() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Switch to view mode.
    report.switchMode("view");
}

function _Report_save() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Save report
    report.save();
}

function _Mock_Report_save() {
    Log.logText('Cannot save sample report');
}

function _Report_saveAs() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);
    
    var saveAsParameters = {
        name: "newReport"
    };

    // SaveAs report
    report.saveAs(saveAsParameters);
}

// ---- Page Operations ----------------------------------------------------

function _Page_SetActive() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);
    
    // Retrieve the page collection, and then set the second page to be active.
    report.getPages()
        .then(function (pages) {
            pages[1].setActive().then(function (result) {
                Log.log(result);
            });
        })
        .catch(function (errors) {
           Log.log(errors);
        });
}

function _Page_GetFilters() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);
    
    // Retrieve the page collection and get the filters for the first page.
    report.getPages()
        .then(function (pages) {
            pages[0].getFilters()
                .then(function (filters) {
                    Log.log(filters);
                })
                .catch(function (errors) {
                    Log.log(errors);
                });
        })
        .catch(function (errors) {
            Log.log(errors);
        });
}

function _Page_SetFilters() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Build the filter you want to use. For more information, see Constructing 
    // Filters in https://github.com/Microsoft/PowerBI-JavaScript/wiki/Filters.
    const filter = {
        $schema: "http://powerbi.com/product/schema#basic",
        target: {
            table: "Store",
            column: "Chain"
        },
        operator: "In",
        values: ["Lindseys"]
    };

    // Retrieve the page collection and then set the filters for the first page.
    // Pay attention that setFilters receives an array.
    report.getPages()
        .then(function (pages) {
            pages[0].setFilters([filter])
                .then(function (result) {
                    Log.log(result);
                })
                .catch(function (errors) {
                    Log.log(errors);
                });
        })
        .catch(function (errors) {
            Log.log(errors);
        });
}

function _Page_RemoveFilters() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);
    
    // Retrieve the page collection and remove the filters for the first page.
    report.getPages()
        .then(function (pages) {
            pages[0].removeFilters()
                .then(function (result) {
                    Log.log(result);
                })
                .catch(function (errors) {
                    Log.log(errors);
                });
        })
        .catch(function (errors) {
            Log.log(errors);
        });
}

// ---- Event Listener ----------------------------------------------------

function _Events_PageChanged() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Report.off removes a given event listener if it exists.
    report.off("pageChanged");

    // Report.on will add an event listener.
    report.on("pageChanged", function(event) {
        var page = event.detail.newPage;
        Log.logText("Page changed to: " + page.name + " - " + page.displayName);
    });

    // Select Run and change to a different page.
    // You should see an entry in the Log window.

    Log.logText("Select different page to see events in Log window.");
}

function _Events_DataSelected() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Report.off removes a given event listener if it exists.
    report.off("dataSelected");

    // Report.on will add an event listener.
    report.on("dataSelected", function(event) {
        var data = event.detail;
        Log.log(data);
    });

    // Select Run and select an element of a visualization.
    // For example, a bar in a bar chart. You should see an entry in the Log window.

    Log.logText("Select data to see events in Log window.");
}

function _Events_SaveAsTriggered() {
    // Get a reference to the embedded report HTML element
    var embedContainer = $('#embedContainer')[0];

    // Get a reference to the embedded report.
    report = powerbi.get(embedContainer);

    // Report.off removes a given event listener if it exists.
    report.off("saveAsTriggered");

    // Report.on will add an event listener.
    report.on("saveAsTriggered", function(event) {
        Log.log(event);
    });

    // Select Run and then select SaveAs.
    // You should see an entry in the Log window.

    Log.logText("Select SaveAs to see events in Log window.");
}

// ---- Dashboard Operations ----------------------------------------------------

function _Dashboard_GetId() {
    // Get a reference to the embedded dashboard HTML element
    var dashboardContainer = $('#dashboardContainer')[0];

    // Get a reference to the embedded dashboard.
    dashboard = powerbi.get(dashboardContainer);

    // Retrieve the dashboard id.
    var dashboardId = dashboard.getId();

    Log.logText(dashboardId);
}

function _Dashboard_FullScreen() {
    // Get a reference to the embedded dashboard HTML element
    var dashboardContainer = $('#dashboardContainer')[0];

    // Get a reference to the embedded dashboard.
    dashboard = powerbi.get(dashboardContainer);

    // Displays the dashboard in full screen mode.
    dashboard.fullscreen();
}

function _Dashboard_ExitFullScreen() {
    // Get a reference to the embedded dashboard HTML element
    var dashboardContainer = $('#dashboardContainer')[0];

    // Get a reference to the embedded dashboard.
    dashboard = powerbi.get(dashboardContainer);

    // Exits full screen mode.
    dashboard.exitFullscreen();
}

// ---- Dashboard Events Listener ----------------------------------------------------

function _DashboardEvents_TileClicked() {
    // Get a reference to the embedded dashboard HTML element
    var dashboardContainer = $('#dashboardContainer')[0];

    // Get a reference to the embedded dashboard.
    dashboard = powerbi.get(dashboardContainer);

    // dashboard.off removes a given event listener if it exists.
    dashboard.off("tileClicked");

    // dashboard.on will add an event listener.
    dashboard.on("tileClicked", function(event) {
        Log.log(event);
    });
}