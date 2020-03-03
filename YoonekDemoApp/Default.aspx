<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="YoonekDemoApp.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
     <title>Zeal-App</title>
    
    <style>
        /* Paste this css to your style sheet file or under head tag */
        /* This only works with JavaScript,
        if it's not present, don't show loader */
        .no-js #loader {
            display: none;
        }

        .js #loader {
            display: block;
            position: absolute;
            left: 100px;
            top: 0;
        }

        .se-pre-con {
            position: fixed;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background: url(Assets/images/Preloader_2.gif) center no-repeat #fff;
        }
    </style>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
     <link href="Assets/css/bootstrap-grid.css" rel="stylesheet" />
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
     <link rel="stylesheet" href=" https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.1.0/material.min.css" />
    <link href="https://cdn.datatables.net/1.10.19/css/dataTables.material.min.css" rel="stylesheet" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.5/css/uikit.css" />
    <link href="Assets/css/materialize.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.datatables.net/colreorder/1.5.1/css/colReorder.dataTables.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/fixedheader/3.1.5/css/fixedHeader.dataTables.min.css" />

    <link rel="stylesheet" href="https://cdn.datatables.net/fixedcolumns/3.2.6/css/fixedColumns.dataTables.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.5.6/css/buttons.dataTables.css" />
    <link href="Assets/css/icon-style.css" rel="stylesheet" />
    <link href="Assets/css/Custom.css" rel="stylesheet" />
    <style>
                .preloader-background {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #eee;
                    position: fixed;
                    z-index: 100;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }

                .Wrapspan {
                    color: green;
                    width: 13px;
                    margin-left: 35px;
                    cursor: pointer
                }
                /*table.dataTable thead td:nth-child(2) {
                    color: lime;
                }*/

                /*thead tr:nth-child(even) td {
                    padding:0px !important;
                    color: lime;
                }*/
                table.dataTable tbody tr.selected {
                    color: white !important;
                    background-color: #eeeeee !important;
                }


                .colvis-group-show,
                .colvis-group-hide {
                    cursor: pointer;
                }

                .colvis-group-show {
                    display: none;
                }

                .input-field {
                    position: relative;
                    margin-top: 25px;
                    margin-bottom: 6px;
                }

                input:not([type]), input[type=text]:not(.browser-default), input[type=password]:not(.browser-default), input[type=email]:not(.browser-default), input[type=url]:not(.browser-default), input[type=time]:not(.browser-default), input[type=date]:not(.browser-default), input[type=datetime]:not(.browser-default), input[type=datetime-local]:not(.browser-default), input[type=tel]:not(.browser-default), input[type=number]:not(.browser-default), input[type=search]:not(.browser-default), textarea.materialize-textarea {
                    background-color: transparent;
                    border: none;
                    border-bottom: 1px solid #9e9e9e;
                    border-radius: 0;
                    outline: none;
                    height: 25px;
                    width: 100%;
                    font-size: 12px;
                    margin: 0 0 0px 0;
                    padding: 0;
                    box-shadow: none;
                    box-sizing: content-box;
                    transition: box-shadow .3s, border .3s;
                }

                .tabs-custom {
                    height: 30px !important;
                    margin-bottom: 10px;
                }

                    .tabs-custom .tab {
                        line-height: 30px;
                        height: 28px;
                    }

                .tab-active {
                    border-bottom: #039be5 solid 1px !important;
                }

                .btn-flag {
                    border-radius: 50%;
                    width: 26px;
                    height: 26px;
                    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.04), 0 3px 1px -2px rgba(0, 0, 0, 0.04), 0 1px 5px 0 rgba(0, 0, 0, 0.04);
                    transition: all ease-in-out 0.3s;
                    cursor: pointer;
                }

                    .btn-flag:hover {
                        transform: translateZ(8px);
                        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
                    }


                /*table.dataTable thead .sorting:before, table.dataTable thead .sorting_asc:before, table.dataTable thead .sorting_desc:before, table.dataTable thead .sorting_asc_disabled:before, table.dataTable thead .sorting_desc_disabled:before {
            right: 1em;
            content:""; "\2191";
        }
                    table.dataTable thead .sorting:after, table.dataTable thead .sorting_asc:after, table.dataTable thead .sorting_desc:after, table.dataTable thead .sorting_asc_disabled:after, table.dataTable thead .sorting_desc_disabled:after {
            right: 0.5em;
            content:""; "\2193";
        }*/
                .sorting, .sorting_asc, .sorting_desc {
                    background: none;
                }

                table.dataTable thead .sorting,
                table.dataTable thead .sorting_asc,
                table.dataTable thead .sorting_desc {
                    background: none;
                    right: 0px;
                    content: "";
                }

                    table.dataTable thead .sorting:before, table.dataTable thead .sorting_asc:before, table.dataTable thead .sorting_desc:before, table.dataTable thead .sorting_asc_disabled:before, table.dataTable thead .sorting_desc_disabled::before {
                        right: 0px;
                        content: "";
                    }

                    table.dataTable thead .sorting:before, table.dataTable thead .sorting_asc:before, table.dataTable thead .sorting_desc:before, table.dataTable thead .sorting_asc_disabled:before, table.dataTable thead .sorting_desc_disabled::after {
                        right: 0px;
                        content: "";
                    }

                    .modal { overflow:visible; }
    </style>
</head>
<body> 
      <!-- TradingView Widget BEGIN -->
    <div class="tradingview-widget-container">
        <div class="tradingview-widget-container__widget"></div>
        <!--<div class="tradingview-widget-copyright"><a href="https://www.tradingview.com" rel="noopener" target="_blank"><span class="blue-text">Ticker Tape</span></a> by TradingView</div>-->
        <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
            var a = {
                "symbols": [
                    {
                        "title": "S&P 500",
                        "proName": "OANDA:SPX500USD"
                    },
                    {
                        "title": "Shanghai Composite",
                        "proName": "INDEX:XLY0"
                    },
                    {
                        "title": "EUR/USD",
                        "proName": "FX_IDC:EURUSD"
                    },
                    {
                        "title": "BTC/USD",
                        "proName": "BITFINEX:BTCUSD"
                    },
                    {
                        "title": "ETH/USD",
                        "proName": "BITFINEX:ETHUSD"
                    }
                ],
                "colorTheme": "light",
                "isTransparent": false,
                "displayMode": "adaptive",
                "locale": "en"
            }
        </script>
    </div>
    <!-- TradingView Widget END -->
    
        <div class="se-pre-con"></div>
    <!-- Ends -->
  
    <!-- Begin page content -->
    <div class="container ">
        <div class="card">
            <div class="card-content">
                <!--<span class="card-title">Card Title</span>-->
                <!--<div class="panel-heading">
                    <div class="pull-right">
                        <button class="btn btn-default btn-xs btn-filter" id='divslider'>
                            <span class="glyphicon glyphicon-filter"></span>
                            Filter
                        </button>
                    </div>
                </div>-->
                <div class="row">
                    <div class="col s12">
                        <ul class="tabs" data-tabplaceholder="">
                           <%-- <li class="tab active"><a href="#Main">Main</a> </li>
                            <li class="tab"><a href="#Profitability">Profitability</a> </li>
                            <li class="tab"><a href="#Leverage">Leverage</a></li>--%>
                            <!--<li class="tab"><a href="#Ownership">Ownership</a></li>-->
                            <%--<li class="tab"><a href="#Efficiency">Efficiency</a></li>
                            <li class="tab"><a href="#Liquidity">Liquidity</a></li>
                            <li class="tab"><a href="#Valuation">Valuation</a></li>--%>
                        </ul>
                    </div>
                    <div class="col s12">
                        <div class="row">
                            <div class="col s6">
                                <h5 data-tabname=""></h5>
                            </div>
                            <div class="col s6">
                                <div class="row valign-wrapper  uk-text-right">
                                    <div class="col s3">
                                    </div>
                                    <div class="col s1" style="padding-top: 10px;">
                                        <img class="btn-flag" src="images/flags/us.png" />
                                    </div>
                                    <div class="col s3 uk-text-left">
                                        <label>Country</label>
                                        <select class="selectpicker countrypicker" data-live-search="true" data-default="United States" data-flag="true"></select>
                                    </div>
                                    <div class="col s2 uk-text-center" style="padding-top: 16px;">
                                        <a class="waves-effect waves-teal " id="btn_resetfilter">Reset </a>
                                    </div>
                                    <div class="col s4 uk-text-left">
                                        <label>Column Filter</label>
                                        <select id="ddlColumn" multiple></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col s12" id="tabsCollector">
                    </div>
                    <div id="" class="col s12">
                        <table id='ohlctabmain' class="mdl-data-table wrap uk-text-left " style="width:100%"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <div class="card">
                <div class="card-content">
                    * Disclaimer: The Zeal Corp. or any group company or subsidiary or anyone involved with The Zeal Corp.would like to remind you that the data contained in this website is not necessarily real-time nor accurate. All stocks prices are not provided by exchanges but rather by market makers, and so prices may not be accurate and may differ from the actual market price, meaning prices are indicative and not appropriate for trading purposes. Therefore The Zeal or any group company or subsidiary or anyone involved with The Zeal Corp. doesn't bear any responsibility for any trading losses you might incur as a result of using this data.

                    The Zeal Corp or any group company or subsidiary or anyone involved with The Zeal Corp. will not accept any liability for loss or damage as a result of reliance on the information including data, quotes, charts and buy/sell signals contained within this website. Please be fully informed regarding the risks and costs associated with trading the financial markets, it is one of the riskiest investment forms possible.

                </div>
            </div>
            <!--<span class="text-muted"></span>-->
        </div>
    </footer>

    <div id="ColName_Modal" class="modal">
        <div class="modal-content">
            <h5>Column Filter</h5>

           <%-- <div class="row" id="col_filter">

            </div>--%>
            <div class="row" id="col_filter">
              <%--  <div class="col-md-4">
                    <select data-ddloperator="">
                        <option>greater than</option>
                        <option>greater than equal to</option>
                        <option>less than</option>
                        <option>less than equal to</option>
                        <option>equal</option> 
                    </select>
                </div>
                <div class="col-md-8">
                         <div class="input-field">
                    <input id="Profit Margin%" data-filt="Profit Margin%" type="text" class="validate valid"><label for="Profit Margin%" class="active">Profit Margin%</label>
                         </div>
      
                </div>--%>
                 </div>
        </div>

    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
    <script src="https://cdn.datatables.net/colreorder/1.5.1/js/dataTables.colReorder.min.js"></script>
    <script src="https://cdn.datatables.net/fixedheader/3.1.5/js/dataTables.fixedHeader.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xregexp/3.1.1/xregexp-all.min.js"></script>
    <script src="https://cdn.datatables.net/fixedcolumns/3.2.6/js/dataTables.fixedColumns.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.6/js/dataTables.buttons.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.5.6/js/buttons.colVis.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
    <script src="Scripts/Component.js"></script>
    <script src="tablework2.js"></script>

</body>
</html>
