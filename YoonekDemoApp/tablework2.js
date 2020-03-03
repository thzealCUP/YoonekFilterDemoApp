/// <reference path="../jquery-3.1.0.intellisense.js" />
/// <reference path="../jquery-3.4.1.js" />
 var table_holder = [];

var filt = '';

function ApplyFilter(value, col, tblObj) {


    tblObj
        .column(col + ':name')
        .search(value)
        .draw();
    filt = tblObj.rows({ filter: 'applied' }).data();
    var temp = '';
    $.map(filt, function (data) {

        console.log("data.COMPANY_SYMBOL");
        console.log(data.COMPANY_SYMBOL);
        temp += data.COMPANY_SYMBOL + "|";
    });
    temp = temp.slice(0, -1);
    console.log("Filter");
    console.log(temp);

    $.map(yoonek.DT_Obj, function (data) {

        var ab = ($.inArray(col, data[0]) == -1) ? false : true;

        if (ab) {
            data
                .column(col + ':name')
                .search(value)
                .draw();

        } else {
            data
                .column("Ticker:name")
                .search(
                    temp,
                    true,
                    false
                ).draw();

        }
    });


}

var dropdownObj = null;


var num_system = {
    num_Decider: function (val, opt) {
        var options = {
            color: null,
            customcolor: null,
            fontsize: null,
            icon: null,
            comma: null,
            decimalformat: null,
            capital: null
        }
        if (arguments[1] == undefined) {
            options.color = false;
            options.customcolor = null;
            options.fontsize = "";
            options.icon = undefined;
            options.comma = false;
            options.decimalformat = null;
            options.capital = false;
        } else {
            options.color = (opt.color == undefined) ? false : opt.color;
            options.customcolor = (opt.customcolor == undefined) ? false : opt.customcolor;
            options.fontsize = (opt.fontsize == undefined) ? "" : opt.fontsize;
            options.icon = (opt.icon == undefined) || opt.icon == false ? undefined : opt.icon;
            options.comma = (opt.comma == undefined) || opt.comma == false ? undefined : opt.comma;
            options.decimalformat = (opt.decimalformat == undefined) ? undefined : opt.decimalformat;
            options.capital = (opt.capital == undefined) || opt.capital == false ? undefined : opt.capital;
        }
        if (val > 0) {
            var res = '<label' + ((options.customcolor != false) ? ' style=color:' + options.customcolor + ' ' : ((options.color == true) ? ' class="uk-text-success" ' : ''))
                + ((options.fontsize != null) ? " style='font-size:" + options.fontsize + "' " : "") + '>'
                + ((options.icon != undefined) ? '<i class="material-icons" style="vertical-align:bottom ;line-height: 13px; width: 15px; ">arrow_drop_up</i> ' : '')
                + ((options.comma != undefined) ?
                    numeral(val).format('0,0') :
                    ((options.capital != undefined || options.capital != false) ?

                        ((options.decimalformat != undefined) ?
                            (numeral(val).format('0.' + options.decimalformat + ' a')).toUpperCase() :
                            (numeral(val).format('0.00 a')).toUpperCase())
                        :
                        numeral(val).format('0.00 a').toUpperCase())
                )
                + '</label>';
            return res;
        } else {
            var res = '<label' + ((options.customcolor != false) ? ' style=color:' + options.customcolor + ' ' : ((options.color == true) ? ' class="uk-text-danger" ' : ''))
                + ((options.fontsize != null) ? " style='font-size:" + options.fontsize + " '" : "") + '>'
                + ((options.icon != undefined) ? '<i class="material-icons" style="vertical-align: bottom ; line-height: 13px;width: 15px;" >arrow_drop_down</i> ' : '')
                + ((options.comma != undefined) ?
                    numeral(val).format('0,0') :
                    ((options.capital != undefined || options.capital != false) ?
                        (numeral(val).format('0 a')).toUpperCase() :
                        numeral(val).format('0 a'))
                )
                + '</label>';
            return res;
        }
    }

}


var Param = {
    GetParam: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "false";
    },
    SetParam: function (cname, cvalue, exdays) {
             var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
     }
}

function GetParam(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "false";
}
function search(indexKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].index === indexKey) {
            return [myArray[i],i];
        }
    }
}

var yoonek = {
    Req_Param: {
        User_: 'Demo',//Param.GetParam("User_"),
        Year_: ((Param.GetParam("Year_") == "false") ? "2018" : Param.GetParam("Year_")),
        Ticker_: ((Param.GetParam("Ticker_") == "false") ? "ALL" : Param.GetParam("Ticker_")),
        Country: null,
        CountryId: '003',
        CountryFlag: null,
        Industry_: ((Param.GetParam("Industry_") == "false") ? "ALL" : Param.GetParam("Industry_")),
        Sector_: null,//((Param.GetParam("Sector_") == "false") ? "ALL" : Param.GetParam("Sector_")),
        RSD_Value: ((Param.GetParam("RSD_Value_") == "false") ? "0" : Param.GetParam("RSD_Value_")),
    },
    url_Fetcher: function () {
        $.urlParam = function (name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                .exec(window.location.search);

            return (results !== null) ? results[1] || 0 : false;
        }

        //yoonek.Req_Param.User_ = ($.urlParam('user') == "admin") ? "ALL" : $.urlParam('user');
        //yoonek.Req_Param.Ticker_ = ($.urlParam('ticker') == false) ? "ALL" : $.urlParam('user');
        //yoonek.Req_Param.Year_ = ($.urlParam('year') == false) ? "ALL" : $.urlParam('year');
        //yoonek.Req_Param.Industry_ = ($.urlParam('Industry') == false) ? "ALL" : $.urlParam('Industry');
        yoonek.Req_Param.Sector_ = ($.urlParam('Sector') == false) ? "ALL" : $.urlParam('Sector');

    },
    Loader: {
        close_ajax: function () {
            $(document).ajaxStop(function () {
                $(".se-pre-con").fadeOut("slow");
            });
            $(document).ajaxStart(function () {
                $(".se-pre-con").fadeIn("slow");
            });
        }, 
        close: function () {
            setTimeout(function () {
                $(".se-pre-con").fadeOut("slow");
            }, 200);
        }
    },
    DT_Obj: {
        dt_dept: null,
        dt_Data: [],
        dt_Column:[],
    },
    DT_Col: {
        container: [],
        selectedCol: [],
        colfilter: [],
        Data_Json: [],
        Data:[],

        FilterOption: {
            val1: null,
            val2: null,
            operator:null,
            text:null,
            colName: null,
            Index: null,
            FilterData: [],
            FilterColumnDef:[]
        }
    },
    Filter: { 
        Opt_Select: [],
        Col_Collector: function (col) {
            $.inArray(col, yoonek.Filter.Opt_Select);
            if ($.inArray(col, yoonek.Filter.Opt_Select)==-1) {
                yoonek.Filter.Opt_Select.push(col);
            }
        }
    },
    Init: function () {
        $(document).ajaxStop(function () {
            $(".se-pre-con").fadeOut("slow");
        });
        $(document).ajaxStart(function () {
            $(".se-pre-con").fadeIn("slow");
        });
        yoonek.url_Fetcher();
        yoonek.dt_Init([]);
        yoonek.Loader.close_ajax();
        //yoonek.ajax.Country();
        //yoonek.ajax.LiveData_Stock();
        yoonek.ajax.ScreenerCol({
            'P_USER': yoonek.Req_Param.User_
        });
        //alert(yoonek.Req_Param.Sector_);
    },
    element_Init: function () {

        //$('.tabs').tabs();

        $(document).on('click', '.tab', function () {

            console.log($(this).children('a').html());
            yoonek.dt_ColDisplayHandler($(this).children('a').html());

        })

        $(document).on('click', '.icon-filter', function () {
            var name = $(this).attr('data-col');
            
            $('#col_filter').html('<div class="col-md-4" style="margin-top: 24px;">'+
                '<select class="selectpicker" data-ddloperator="">               '+
                '    <option value=">">greater than</option>          '+
                '    <option value=">=">greater than equal to</option> '+
                '    <option value="<">less than</option>             '+
                '    <option value="<=">less than equal to</option>    '+
                '    <option value="=">equal</option>                 '+
                '</select>                                  '+
                '</div> '+
                '<div class="col-md-6">' +
                '<div class="input-field">' +
                '<input id="' + name + '" data-filtervalue="' + name + '" type="text" class="validate" >' +
                '<label for="' + name + '">' + name + '</label>' +
                '</div></div>' +
                '<div class="col-md-2">' +
                '<a class="waves-effect waves-light btn" data-btnfilt="' + name + '"><i class="material-icons left">search</i></a>' +
                '</div>');

            yoonek.Filter.Col_Collector(name);
            yoonek.DT_Col.FilterOption.text = '[data-filtervalue="' + name + '"]';
            yoonek.DT_Col.FilterOption.colName = name;
            yoonek.DT_Col.FilterOption.Index = yoonek.DT_Obj.dt_dept.column(name + ':name').index();
            $('select').formSelect();
            yoonek.DT_Col.FilterOption.operator = $('[data-ddloperator] option:selected').val();


            $(document).on('click', '[data-btnfilt="' + name + '"]', function () {



                yoonek.DT_Col.FilterOption.operator = $('[data-ddloperator] option:selected').val();
                yoonek.DT_Col.FilterOption.val1 = "";
                yoonek.DT_Col.FilterOption.val2 = "";

                yoonek.DT_Col.FilterOption.val1 =
                    (isNaN(parseFloat($(yoonek.DT_Col.FilterOption.text).val(), 10)) ? yoonek.DT_Col.FilterOption.operator = null : parseFloat($(yoonek.DT_Col.FilterOption.text).val(), 10));


                //yoonek.DT_Obj.dt_dept
                //    //.columns(yoonek.DT_Col.FilterOption.Index)
                //    .columns(yoonek.DT_Col.FilterOption.colName + ':name')
                //    .data()
                //    .flatten()
                //    .filter(function (value, index) {
                //        return value > yoonek.DT_Col.FilterOption.val1 ? true : false;
                //    }).draw();

            
                //yoonek.DT_Obj.dt_dept.column(name + ':name').
                //    search(value,
                //        true,
                //        true).draw();


                var resultObject = search(yoonek.DT_Col.FilterOption.Index, yoonek.DT_Col.FilterOption.FilterColumnDef);

                if (resultObject != undefined) {
                    yoonek.DT_Col.FilterOption.FilterColumnDef[resultObject[1]] = {
                        "index": yoonek.DT_Col.FilterOption.Index,
                        "val": yoonek.DT_Col.FilterOption.val1,
                        "operator": yoonek.DT_Col.FilterOption.operator
                    }
                } else {
                    yoonek.DT_Col.FilterOption.FilterColumnDef.push({
                        "index": yoonek.DT_Col.FilterOption.Index,
                        "val": yoonek.DT_Col.FilterOption.val1,
                        "operator": yoonek.DT_Col.FilterOption.operator
                    })
                }

              

                yoonek.filtering();

                //yoonek.DT_Obj.dt_dept.draw();
                //var a = yoonek.DT_Obj.dt_dept.rows({ filter: 'applied' }).data();
                //console.log("table Data");
                //console.log(a);


                //yoonek.DT_Col.FilterOption.FilterData = a;
                //yoonek.dt_department(yoonek.DT_Col.FilterOption.FilterData);
            });


            $('#ColName_Modal').modal('open');
            
        });

        $(document).on('change', '[data-ddloperator]', function () {

            yoonek.DT_Col.FilterOption.operator = $('[data-ddloperator] option:selected').val();
            //yoonek.DT_Obj.dt_dept.draw();
            //var a = yoonek.DT_Obj.dt_dept.rows({ filter: 'applied' }).data();
            //console.log("table Data");
            //console.log(a);
            //yoonek.DT_Col.FilterOption.FilterData = a;
            //yoonek.dt_department(yoonek.DT_Col.FilterOption.FilterData);

            //Friday working here
        });


        $('#ddlColumn').change(function () {
            console.log($(this).val());
            //yoonek.ajax.ExtraCalculation({
            //    P_User: yoonek.Req_Param.User_,
            //    P_SYear: '2018',// yoonek.Req_Param.Year_,
            //    P_Ticker: yoonek.Req_Param.Ticker_,
            //    P_Country: yoonek.Req_Param.CountryId,
            //    P_Sector: decodeURI(yoonek.Req_Param.Sector_),
            //    P_RSD_Values: yoonek.Req_Param.RSD_Value,
            //    Data_Yoonek: JSON.stringify(yoonek.DT_Obj.dt_Data)
            //});

            var selectArry = $(this).val(); 
            yoonek.DT_Obj.dt_dept.columns().visible(false);
            $.map(selectArry, function (data) { 
                yoonek.dt_ColDisplay(data, true);
            })
            //Working
            yoonek.dt_headerBuilder();
        });

        $(document).on('click', '.tabs-custom .tab', function () {
            $('.tabs-custom .tab').removeClass('tab-active');
            $(this).addClass('tab-active');
            yoonek.dt_ColMapper($(this).text()); 
        });

        $(document).on('click', '#btn_resetfilter', function () {
            yoonek.DT_Col.FilterOption.FilterColumnDef = [];
            yoonek.DT_Col.FilterOption.Index = '';
            yoonek.DT_Col.FilterOption.val1 = '';
            yoonek.DT_Col.FilterOption.operator = null;
            yoonek.dt_department(yoonek.DT_Col.Data);
            //$.map(yoonek.Filter.Opt_Select, function (col) {
            //    yoonek.DT_Obj.dt_dept.column(col + ':name').search('').draw();
            //});
 
        });

        $(document).on('change','.countrypicker', function () { 
            //$('.countrypicker option:selected').val();
            yoonek.Req_Param.Country = $('.countrypicker option:selected').text();
            yoonek.Req_Param.CountryFlag = $('.countrypicker option:selected').val();
            yoonek.Req_Param.CountryId = $('.countrypicker option:selected').attr('data-id');

            $('.btn-flag').attr('src', yoonek.Req_Param.CountryFlag);

            localStorage.setItem("countryFlag", yoonek.Req_Param.CountryFlag);
            localStorage.setItem("countryID", yoonek.Req_Param.CountryId);
            localStorage.setItem("countryName", yoonek.Req_Param.Country);

            yoonek.ajax.Init_ajax();
        })

        $(document).on('click', '[data-tickercapture]', function () {
            //alert($(this).html());
            console.log($(this));
            console.log($(this).attr('data-tickerdata'));
            Param.SetParam('Ticker', $(this).attr('data-tickerdata'), "10000");
            Param.SetParam('CIK', $(this).attr('data-cik'), "10000");
            
        });

    },
    dropdown_search: function (title) {

        return '<div style="padding: 0px 5px 0px 18px;"><input data-title="' + title + '" class="validate custom-input" id="icon_prefix" placeholder="search"> ' +
            '<a href="javascript:void(0)" style= "position: absolute;bottom: 10px;left: 0px;" class="dropdown-trigger" data-target="dropdown1" > ' +
            '<i  style="font-size:14px" class="material-icons prefix-table"> search</i>' +
            '</a> ' +
            '<ul class="dropdown-content" style="min-width:122px" id="dropdown1">' +
            '<li data-opt="exect" data-col="' + title + '" style="padding: 0px 0 0 20px;line-height: 20px;min-height: 20px;">' +
            '<a href="#"><i style="width: 0px;margin-left: -24px;" class="material-icons">link</i>Exact</a>' +
            '</li>' +
            //'<li data-opt="not Contain" data-col="' + title + '"   style="padding: 0px 0 0 20px;line-height: 20px;min-height: 20px;">' +
            //'<a href="#"><i style="width: 0px;margin-left: -24px;" class="material-icons">link_off</i>not Contain</a>' +
            //'</li>' 
            '<li data-opt="Reset"  data-col="' + title + '"   style="padding: 0px 0 0 20px;line-height: 20px;min-height: 20px;"> ' +
            '<a href="#"><i style="width: 0px;margin-left: -24px;" class="material-icons">close</i>Reset</a>' +
            '</li>' +
            '</ul></div> ';
    },
    dt_Init: function (data) {
        yoonek.dt_department(data);
    },
    ClearFilter: function () {
        $('[data-searchCol]').each(function () {
            $(this).val('');
        })
    },
    ResetFilter: function (data) {
        data
            .column(yoonek.Filter.Col + ':name')
            .search(value, true, true, true)
            .draw();
    },
    dt_filterEvent: function () {

        $(document).on('click', '.btn_custFilter', function () {
            console.log("cust");
            console.log($(this).text());
        })

        //$(document).on('keyup', 'input[data-searchCol=Ticker]', function () {
        //    var a = $(this).attr('data-searchCol=Ticker');
        //    var textSearch = $(this).val();
        //    //yoonek.ClearFilter();
        //    //$(this).val(textSearch); 
        //    $.map(yoonek.DT_Obj, function (data, i) {
        //        console.log(data);
        //        if (data.column('ticker:name') != null) {
        //            data
        //                .column('ticker:name')
        //                .search(textSearch)
        //                .draw();
        //        }
        //    });
        //});

        //$(document).on('keyup', 'input[data-searchCol=Company]', function () {
        //    var a = $(this).attr('data-searchCol=Company');
        //    var textSearch = $(this).val();
        //    //yoonek.ClearFilter();
        //    //$(this).val(textSearch);
        //    $.map(yoonek.DT_Obj, function (data, i) {
        //        console.log(data);
        //        if (data.column('Company:name') != null) {
        //            data
        //                .column('Company:name')
        //                .search(textSearch)
        //                .draw();
        //        }
        //    });
        //});
        //$(document).on('keyup', 'input[data-searchCol=CompanyCik]', function () {
        //    var a = $(this).attr('data-searchCol=CompanyCik');
        //    var textSearch = $(this).val();
        //    yoonek.ClearFilter();
        //    $(this).val(textSearch);
        //    $.map(yoonek.DT_Obj, function (data, i) {
        //        console.log(data);
        //        if (data.column('CompanyCik:name') != null) {
        //            data
        //                .column('CompanyCik:name')
        //                .search(textSearch)
        //                .draw();
        //        }
        //    });
        //});
        //$(document).on('keyup', 'input[data-searchCol=Industry]', function () {
        //    var a = $(this).attr('data-searchCol=Industry');
        //    var textSearch = $(this).val();
        //    yoonek.ClearFilter();
        //    $(this).val(textSearch);
        //    $.map(yoonek.DT_Obj, function (data, i) {
        //        console.log(data);
        //        if (data.column('Industry:name') != null) {
        //            data
        //                .column('Industry:name')
        //                .search(textSearch)
        //                .draw();
        //        }
        //    });
        //});

        $(document).on('click', '[data-filteropt]', function () {
            alert();
        })

    },
    dt_header_adjust: function (tab) {
        console.log("call");
        console.log(tab);

        $.map(yoonek.DT_Obj, function (data) {
            data.fixedHeader.adjust();
            //new $.fn.dataTable.FixedHeader(data);
            //table.fixedHeader.enable();
            data.fixedHeader.disable();
        })
        setTimeout(function () {
            var a = yoonek.tab_table_Map(tab);
            a.fixedHeader.enable();
        }, 600)

    },
    tab_table_Map: function (tab) {
        switch (tab) {
            case "Main":
                return yoonek.DT_Obj.dt_dept;
                break;
            case "Performance":
            //    switch (tab) {
            case "Growth":
                return yoonek.DT_Obj.dt_Growth;
                break;
            case "Activity":
                return yoonek.DT_Obj.dt_Activity;
                break;
            case "Profit":
                return yoonek.DT_Obj.dt_Profit;
                break;
            case "Liquidity":
                return yoonek.DT_Obj.dt_liquidity;
                break;
            case "Solvency":
                return yoonek.DT_Obj.dt_solvency;
                break;
            case "Operational":
                return yoonek.DT_Obj.dt_Operational;
                break;
            case "ImpofAR":
                return yoonek.DT_Obj.dt_ImpoFar;
                break;
            case "RecCol":
                return yoonek.DT_Obj.dt_RevCol;
                break;


            //}
            //break;
            case "Ownership":
                return yoonek.DT_Obj.dt_Ownership;
                break;
            case "Financial":
                return yoonek.DT_Obj.dt_Financial;
                break;
            case "Valuation":
                return yoonek.DT_Obj.dt_valuation;
                break;
            case "FinRatio":
                return yoonek.DT_Obj.dt_Performance;
                break;
            case "Technical":
            case "trend_following":
                return yoonek.DT_Obj.dt_Trend;
                break;
            case "Oscillator":
                return yoonek.DT_Obj.dt_Occilator;
                break;
            default:
        }
    },
    filtering: function () {
        yoonek.dt_department(yoonek.DT_Col.Data);
        var temp = [];


        $.map(yoonek.DT_Col.FilterOption.FilterColumnDef, function (data) {
            console.log("Data is here");
            console.log(data);


            yoonek.DT_Col.FilterOption.Index = data["index"];
            yoonek.DT_Col.FilterOption.operator = data["operator"];
            yoonek.DT_Col.FilterOption.val1 =
                (isNaN(parseFloat(data["val"])) ? yoonek.DT_Col.FilterOption.operator = null : parseFloat(data["val"]));


            yoonek.DT_Obj.dt_dept.draw();
            //temp = yoonek.DT_Obj.dt_dept.rows({ filter: 'applied' }).data();
            temp = yoonek.DT_Obj.dt_dept.rows({ search: 'applied' }).data();
            console.log("Temp data is here");
            console.log(temp);
            yoonek.dt_department(temp);

        });


        


    },
    dt_department: function (json) {
        if (yoonek.DT_Obj.dt_dept == null) {
             $.fn.dataTable.ext.search.push(
                function (settings, data, dataIndex) {

                    //console.log("Column Data settings");
                    //console.log(settings);
                    //console.log(data);
                    //console.log(dataIndex);

             
                     yoonek.DT_Col.FilterOption.val1 =
                         (isNaN(parseFloat($(yoonek.DT_Col.FilterOption.text).val(), 10)) ? yoonek.DT_Col.FilterOption.operator = null : parseFloat($(yoonek.DT_Col.FilterOption.text).val(), 10));




                    yoonek.DT_Col.FilterOption.val2 = "";

                    switch (yoonek.DT_Col.FilterOption.operator) {
                        case ">":
                            var a = 'arrow_drop_up';
                            var b = 'arrow_drop_down';
                            var c = data[yoonek.DT_Col.FilterOption.Index]; 
                            c = c.replace(/[^\d.-]/g, '');
                            console.log(c);
                            if (parseFloat(c) > parseFloat(yoonek.DT_Col.FilterOption.val1)) {
                                return true;
                            } 

                        
                            break;

                        case ">=":
                            var a = 'arrow_drop_up';
                            var b = 'arrow_drop_down';
                            var c = data[yoonek.DT_Col.FilterOption.Index]; 
                            c = c.replace(/[^\d.-]/g, '');
                            console.log(c);

                            if (parseFloat(c) >= parseFloat(yoonek.DT_Col.FilterOption.val1)) {
                                return true;
                            }
                            break;
                        case "<":
                            var a = 'arrow_drop_up';
                            var b = 'arrow_drop_down';
                            var c = data[yoonek.DT_Col.FilterOption.Index]; 
                            c = c.replace(/[^\d.-]/g, '');

                            console.log(c);

                            if (parseFloat(c) < parseFloat(yoonek.DT_Col.FilterOption.val1)) {
                                return true;
                            }
                            break;
                        case "<=":
                            var a = 'arrow_drop_up';
                            var b = 'arrow_drop_down';
                            var c = data[yoonek.DT_Col.FilterOption.Index];
                            c = c.replace(/[^\d.-]/g, '');

                            if (parseFloat(c) <= parseFloat(yoonek.DT_Col.FilterOption.val1)) {
                                return true;
                            }
                            break;
                        case "=":
                            var a = 'arrow_drop_up';
                            var b = 'arrow_drop_down';
                            var c = data[yoonek.DT_Col.FilterOption.Index];
                            c = c.replace(/[^\d.-]/g, '');

                            if (parseFloat(c) == parseFloat(yoonek.DT_Col.FilterOption.val1)) {
                                return true;
                            }
                            break;
                        case null:
                            return true;
                            break;
                        default:
                            return false;
                    }
                      
                }
            );
            yoonek.DT_Obj.dt_dept = $('#ohlctabmain').DataTable({
                //"ordering": true,
                select: { style: 'single' },
                "search": { regex: true },
                paging: true,
                //sorting: true,
                colReorder: true,
                fixedHeader: true,
                "pageLength": 10,
                dom: /*"<'row' <'col s1'l><'col s4 push-s7'f>> */"rtip",
                orderCellsTop: true,
                //buttons: [
                //    {
                //        extend: 'colvis',
                //        collectionLayout: 'fixed three-column',
                //        postfixButtons: ['colvisRestore']
                //    }
                //],
                //buttons: ['colvis'], 
                //['Ticker',
                //    'CIK',
                //    'Sector',
                //    'SIC Industry',
                //    'Structure',
                //    'Market Cap(D)',
                //    'P/E',
                //    'Price',
                //    'Change',
                //    'Volume']
                "columns": [
                    {
                        "width": "20%",
                        "title": "Ticker",
                        "name": "Ticker",
                        "render": function (data, type, full, meta) {
                            return ' <a style="font-size: 14px; font-weight: 600;" data-tickercapture="" href="YoonekSub2Copy.aspx" data-cik=' + full.COMPANY_CIK+' data-tickerdata=' + full.COMPANY_SYMBOL + ' data-username=' + yoonek.Req_Param.User_ + '  href="" target="_blank">' + full['COMPANY_SYMBOL'] + ' </a> </br>' + full['COMPANY_NAME'];
                            //return ' <a style="font-size: 14px;    font-weight: 600;" href="YoonekSub2Copy.html?TickerName=' + full.COMPANY_SYMBOL + '&?UserName=' + yoonek.Req_Param.User_ + '" target="_blank">' + full['COMPANY_SYMBOL'] + ' </a> </br>' + full['COMPANY_NAME'];

                        }
                    },
                    
                    { "title": "CIK", "name": "CIK", "data": "COMPANY_CIK", "visible": false },
                    { "title": "SIC Industry", "name": "SIC Industry", "data": "INDUSTRY_DESC", "visible": false },
                    { "title": "Sector", "name": "Sector", "data": "SECTOR_DESC", "visible": false},
                    { "title": "Structure", "name": "Structure", "data": "STRUCTURE_DESCRIPTION", "visible": false},
                    {
                        "title": "Market Cap(D)", "name": "Market Cap(D)", "data": "MC", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                customcolor: '#29b6f6',
                                capital: true,
                                decimalformat: '00'

                            });
                        }
                    },

                    {
                        //"width": "10%",
                        "title": "P/E", "name": "P/E", "data": "PE", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true,
                                decimalformat: '00'
                            });
                        }
                    },
                    {
                        //"width": "10%",
                        "title": "Price", "name": "Price", "data": "PRICE", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true,
                                decimalformat: '00'
                            });
                        }
                    },
                    {
                        //"width": "10%",
                        "title": "Change", "name": "Change", "data": "CHANGEVAL", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data);
                        }
                    },
                    {
                        "title": "Volume", "name": "Volume", "data": "VOLUME", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                customcolor: '#29b6f6',
                                comma: true
                            });
                        }
                    },

                    {
                        //"width": "10%",
                        "title": "Sales Growth%", "name": "Sales Growth", "data": "SALES_GROWTH", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true,
                                decimalformat: '00'
                            });
                        }
                    },
                    {
                        //"width": "10%",
                        "title": "Net Income Growth", "name": "Net Income Growth", "data": "NET_INCOME_GROWTH", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        //"width": "10%",
                        "title": "Asset Growth%", "name": "Asset Growth%", "visible": false, "data": "ASSET_GROWTH", "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },

                    {
                        //"width": "10%",
                        "title": "Fixed Asset Turnover", "visible": false, "name": "Fixed Asset Turnover", "data": "FIXED_ASSET_TURNOVER",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },

                    {
                        //"width": "10%",
                        "title": "Gross Profit/ Sales%", "visible": false, "name": "Gross Profit/ Sales%", "data": "GROSS_PROFIT_SALES",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        //"width": "10%",
                        "title": "Profit Margin%", "name": "Profit Margin%", "visible": false, "data": "PROFIT_MARGIN",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        //"width": "10%",
                        "title": "Return on Assets%", "name": "Return on Assets%", "visible": false, "data": "RETURN_ON_ASSETS",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        "title": "Return on Equity%", "name": "Return on Equity%", "visible": false, "data": "RETURN_ON_EQUITY",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },

                    {
                        "title": "Current Ratio", "name": "Current Ratio", "visible": false, "data": "CURRENT_RATIO",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        "title": "Days Payable Outstanding", "visible": false, "name": "Days Payable Outstanding", "data": "DAYS_PAYABLE_OUTSTANDING",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        "title": "Quick Ratio", "name": "Quick Ratio", "visible": false, "data": "QUICK_RATIO",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },

                    {
                        "title": "Debt to Total Assets", "name": "Debt to Total Assets", "visible": false, "data": "DEBT_TO_TOTAL_ASSETS",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true,
                                decimalformat: '00'

                            });
                        }
                    },
                    {
                        "title": "Debt to Equity", "name": "Debt to Equity", "data": "DEBT_TO_EQUITY", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        "title": "Times Interest Earned (Accrual)", "visible": false, "name": "Times Interest Earned (Accrual)", "data": "TIMES_INTEREST_EARNED_ACCRUAL", "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        "title": "Times Interest Earned (Cash)", "visible": false, "name": "Times Interest Earned (Cash)", "data": "TIMES_INTEREST_EARNED_CASH", "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        "title": "Receivable Turnover", "visible": false, "name": "Receivable Turnover", "data": "RECEIVABLE_TURNOVER",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        "title": "Inventory Turnover", "visible": false, "name": "Inventory Turnover", "data": "INVENTORY_TURNOVER",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },

                    {
                        "title": "Bad Debt Expense Percentage", "visible": false, "name": "Bad Debt Expense Percentage", "data": "BAD_DEBT_EXPENSE_PERCENTAGE",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        "title": "Allowance Percentage", "visible": false, "name": "Allowance Percentage", "data": "ALLOWANCE_PERCENTAGE",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        "title": "Accounts Receivable to Total Assets%", "visible": false, "name": "Accounts Receivable to Total Assets", "data": "AR_TOTAL_ASSETS",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },
                    {
                        "title": "Days of Receivable", "name": "Days of Receivable", "visible": false, "data": "DAYS_OF_RECEIVABLE",
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                comma: true
                            });
                        }
                    },

                    {
                        "title": "Market Cap", "name": "Market Cap", "data": "MC", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                customcolor: '#29b6f6',
                                capital: true,
                                decimalformat: '00'


                            });
                        }
                    },
                    {
                        "title": "Outstanding", "name": "Outstanding", "data": "PE", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "PS", "name": "PS", "data": "PS", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "EPSY", "name": "EPSY", "data": "EPSY", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "EPSP5Y", "name": "EPSP5Y", "data": "EPSP5Y", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "SALEP5Y", "name": "SALEP5Y", "data": "SALEP5Y", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "PRICE", "name": "PRICE", "data": "PRICE", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "CHANGEVAL", "name": "CHANGEVAL", "data": "CHANGEVAL", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "Insider Own", "name": "Insider Own", "data": "PBV", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },

                    {
                        "title": "Performance Week", "name": "Perf Week", "data": "PERFWEEK", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "Performance Month", "name": "Perf Month", "data": "PERFMONTH", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "Performance QTR", "name": "Perf QTR", "data": "PERFQTR", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "Performance Half", "name": "Perf Half", "data": "PERFHALF", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "Performance YTD", "name": "Perf YTD", "data": "PERFYEAR", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },///// Here
                    {
                        "title": "Volatility W", "name": "Volatility W", "data": "VOLWEEK", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "Volatility M", "name": "Volatility M", "data": "VOLMON", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "Ave Volume", "name": "Ave Volume", "data": "AVGVOLUME", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                customcolor: '#29b6f6',
                                comma: true
                            });
                        }
                    },
                    {
                        "title": "RELVOLUME", "name": "RELVOLUME", "data": "RELVOLUME", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                customcolor: '#29b6f6',
                                comma: true
                            });
                        }
                    },
                    {
                        //"width": "5.5%",
                        "title": "Dividend", "name": "Dividend", "data": "DIVIDEND", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "5.5%",
                        "title": "ROA", "name": "ROA", "data": "RETURN_ON_ASSETS", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "5.5%",
                        "title": "ROE", "name": "ROE", "data": "RETURN_ON_EQUITY", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "5.5%",
                        "title": "ROI", "name": "ROI", "data": "RETURN_ON_INCOME", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "5.5%",
                        "title": "Current R", "name": "Current R", "data": "CURRENT_RATIO", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "5.5%",
                        "title": "QUICK RATIO", "name": "QUICK RATIO", "data": "QUICK_RATIO", "visible": false
                        , "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "5.5%",
                        "title": "LTDebt/Eq", "name": "LTDebt/Eq", "data": "LTDEQ", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "5.5%",
                        "title": "Cur Debt/Eq", "name": "Cur Debt/Eq", "data": "STDEQ", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "5.5%",
                        "title": "Gross Margin%", "name": "Gross Margin%", "data": "GROSSM", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "5.5%",
                        "title": "Operating Margin", "name": "Operating Margin", "data": "OPENM", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "5.5%",
                        "title": "Earnings", "name": "Earnings", "data": "PROFIT_MARGIN", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "5.5%",
                        "title": "Profit Margin%", "name": "Profit Margin%", "data": "PROFIT_MARGIN", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "BETA", "name": "BETA", "data": "BETA", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "ATR", "name": "ATR", "data": "ATR", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "SMA20", "name": "SMA20", "data": "SMA20", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "SMA50", "name": "SMA50", "data": "SMA50", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "SMA200", "name": "SMA200", "data": "SMA200", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "WHIGH52", "name": "WHIGH52", "data": "WHIGH52", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "WLOW52", "name": "WLOW52", "data": "WLOW52", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "UPPERBAND", "name": "UPPERBAND", "data": "UPPERBAND", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "LOWERBAND", "name": "LOWERBAND", "data": "LOWERBAND", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },

                    {
                        "title": "RSI", "name": "RSI", "data": "RSI", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "ADX", "name": "ADX", "data": "SMA20", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "AO", "name": "AO", "data": "SMA50", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "CCI", "name": "CCI", "data": "SMA200", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        "title": "MACD", "name": "MACD", "data": "WHIGH52", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "10%",
                        "title": "Stoch %K(Fast)", "name": "Stoch %K(Fast)", "data": "KFAST", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "10%",
                        "title": "Stoch %D(Fast)", "name": "Stoch %D(Fast)", "data": "DFAST", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "10%",
                        "title": "Stoch %K (Slow)", "name": "Stoch %K (Slow)", "data": "KSLOW", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    },
                    {
                        //"width": "10%",
                        "title": "Stoch %D (Slow)", "name": "Stoch %D (Slow)", "data": "DSLOW", "visible": false,
                        "render": function (data, type, full, meta) {
                            return num_system.num_Decider(data, {
                                color: true,
                                icon: true,
                                capital: true
                            });
                        }
                    }

                ]
            });
            var ColName = "";
            yoonek.DT_Obj.dt_dept.columns().every(function () {
                ColName += "<option value='" + this.header().innerHTML + "'>" + this.header().innerHTML + "</option>";
            });
            $('#ddlColumn').html(ColName);

            //yoonek.dt_ColDisplayHandler('Main');
             
        } else {
            yoonek.DT_Obj.dt_dept.clear().rows.add(json).draw();
        }
    },
    tab_placer: function (json) {

        var ele = "",i=0;
        $.map(json, function (data) {
            console.log('Tabs placer');

            if (i=0) {
                ele += "<li class='tab active'><a href='#" + data['TAB_DESC'] + "'>" + data['TAB_DESC'] + "</a> </li>"
                i++;
            } else {
                ele += "<li class='tab'><a href='#" + data['TAB_DESC'] + "'>" + data['TAB_DESC'] + "</a> </li>"
            }
           

            console.log(data);

        });

        $('[data-tabplaceholder]').html(ele);
        //$('.tabs').tabs();

    },
    dt_DynamicCol_Mapper: function (tab) {
        var result = [];

        $.map(yoonek.DT_Obj.dt_Column, function (data, i) {

            if (data["TAB_DESC"] == tab) {
                //console.log("Col Mapper");
                //console.log(data);
                result.push(data["COLUMN_DESC"]);
            }

          

        })
         
        return result;
    },
    dt_ColMapper: function (key) {
        var result = [];
        switch (key) {
            case "Main":
                $('[data-tabname]').html('Main');
                $('#tabsCollector').html('');
                result =
                    ['Ticker',
                        'CIK',
                        'Sector',
                        'SIC Industry',
                        'Structure',
                        'Market Cap(D)',
                        'P/E',
                        'Price',
                    //  'Change',
                    //  'Volume'
                    ]
                break;
             //New Tabs start from here
            case "Profitability":
                $('#tabsCollector').html('');
                $('[data-tabname]').html('Profitability');
                result =
                    ['Ticker', 
                        'Return on Equity',
                        'Return on Assets',
                        'Gross Margin',
                        'Profit Margin',
                    ]
                break;
            case "Leverage":
                $('#tabsCollector').html('');
                $('[data-tabname]').html('Leverage');
                result =
                    ['Ticker','Debt to Equity',
                        'Return on Equity',
                        'Sector',
                        'SIC Industry', 
                    ]
                break;
            case "Efficiency":
                $('#tabsCollector').html('');
                $('[data-tabname]').html('Leverage');
                result =
                    ['Ticker','Receivable Turnover',
                        'Days of Receivable',
                        'Fixed Asset Turnover',
                        'Inventory Turnover', 
                    ]
                break;
            case "Liquidity":
                $('#tabsCollector').html('');
                $('[data-tabname]').html('Leverage');
                result =
                    ['Ticker','Current Ratio',
                        'Quick Ratio',
                        'Times Interest Earned (Accrual)',
                        'Times Interest Earned (Cash)', 
                    ]
                break;
            case "Valuation":
                $('#tabsCollector').html('');
                $('[data-tabname]').html('Leverage');
                result =
                    ['Ticker','P/E',
                        'Quick Ratio',
                        'Times Interest Earned (Accrual)',
                        'Times Interest Earned (Cash)', 
                    ]
                break;


            default:
        }

        return result;
    },
    dt_ColDisplayHandler: function (Tab) {
        yoonek.DT_Col.container = [];
        //yoonek.DT_Col.container = yoonek.dt_ColMapper(Tab);
        yoonek.DT_Col.container = yoonek.dt_DynamicCol_Mapper(Tab);

        yoonek.DT_Obj.dt_dept.columns().visible(false);
        $('#ddlColumn option').removeAttr('selected');
        $.map(yoonek.DT_Col.container , function (data) {
            yoonek.DT_Obj.dt_dept.columns(data + ":name").visible(true);
            $('#ddlColumn option[value="' + data + '"]').attr('selected', 'selected');
        });

        yoonek.dt_headerBuilder();
     

    },
    dt_headerBuilder: function () {
        $('#ohlctabmain thead tr:eq(0) th').each(function (i) {
            var title = $(this).text();

            var search = '<div class="input-field">' +
                '<input id="' + title + '" type="text" class="validate" >' +
                '<label for="' + title + '">' + title + '</label>' +
                '</div>';
            console.log("Column here is here");

            if (title == 'Ticker' || title == 'CIK' || title == 'SIC Industry' || title == 'Sector' || title == 'Structure') {
                $(this).html(search);

                $('input', this).on('keyup change', function () {
                    yoonek.Filter.Col_Collector('Ticker');

                    yoonek.DT_Obj.dt_dept.column(i).search($(this).val()).draw();
                });

            } else {
                $(this).html(title + '<span data-col="' + title + '" class="icon-filter icon-custom"></span>');
            }


        });

        yoonek.DT_Obj.dt_dept.columns.adjust().draw();
        setTimeout(function () {
            $(".se-pre-con").fadeOut("slow");
        }, 200);
    },
    dt_ColDisplay: function (col, status) {
        yoonek.DT_Obj.dt_dept.columns(col + ":name").visible(status);

        yoonek.DT_Obj.dt_dept.columns.adjust().draw();
    },
    ajax: {
        Init_ajax: function () {
            var ajax_data = {
                P_User: yoonek.Req_Param.User_,
                P_SYear:'2018',// yoonek.Req_Param.Year_,
                P_Ticker: yoonek.Req_Param.Ticker_,
                P_Country: yoonek.Req_Param.CountryId,
                P_Sector: decodeURI(yoonek.Req_Param.Sector_),
                P_RSD_Values: yoonek.Req_Param.RSD_Value
            }

             $.ajax({
                 url: "api/Yoonek_Data/GetYoonek",
                 type: 'GET',
                 dataType: 'json',
                 data: ajax_data,
                 beforeSend: function () { 
                     $(".se-pre-con").fadeIn("slow");

                 },
                success: function (data) {
                    //setTimeout(function () {
                    console.log(data);
                    //yoonek.DT_Obj.dt_Data = data;
                    yoonek.DT_Col.Data = data;
                    console.log("--------------xxxxxxxxxxxxx--------------");
                    console.log(yoonek.DT_Obj.dt_Data);
                    yoonek.dt_Init(data);
                    yoonek.element_Init();
                    setTimeout(function () {
                        $(".se-pre-con").fadeOut("slow");
                    }, 200);


                 },
                 error: function (request) {
                     console.log('failure');
                 }
             });
           // yoonek.dt_Init(aData);
            //yoonek.element_Init();
           // setTimeout(function () {
             //   $(".se-pre-con").fadeOut("slow");
         //   }, 200);
        },
        LiveData_Stock: function () {
            $('#newsTicker4').breakingNews({
                themeColor: '#11cbd7',
                source: {
                    type: 'rss',
                    usingApi: 'rss2json',
                    rss2jsonApiKey: 'm8ipcqazhbmpft5yfhya8u2x1lm6jmldkqfmgodn',
                    url: 'http://rss.cnn.com/rss/edition.rss',
                    //url: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=5YWXERS57PSED09S',
                    //url: 'http://finance.yahoo.com/d/quotes.csv?s=GE&f=nkqwxyr1l9t5p4',
                    limit: 7,
                    showingField: 'title',
                    linkEnabled: true,
                    target: '_blank',
                    seperator: '<span class="bn-seperator" style="background-image:url(img/cnn-logo.png);">||</span>',
                    errorMsg: 'RSS Feed not loaded. Please try again.'
                }
            });
        },
        Country: function () {
            $.ajax({
                url: "api/General/GetCountry",
                type: 'GET',
                dataType: 'json',
                 beforeSend: function () {
                },
                success: function (data) {
                    //setTimeout(function () {
                    console.log(data);
                    yoonek.CountryDropDown(data);
                    yoonek.ajax.Init_ajax();


                },
                error: function (request) {
                    console.log('failure');
                }
            });
        },
        ExtraCalculation: function (ajax_data) {
           

            $.ajax({
                url: "api/yoonekdata/GetYoonek_EC",
                type: 'POST',
                dataType: 'json',
                data: ajax_data,
                'content-type':'application/json',
                beforeSend: function () {
                    $(".se-pre-con").fadeIn("slow");

                },
                success: function (data) {
                    //setTimeout(function () {
                    console.log(data);
                    yoonek.DT_Obj.dt_Data = data;
                    console.log("--------------xxxxxxxxxxxxx--------------");
                    console.log(yoonek.DT_Obj.dt_Data);
                    yoonek.dt_Init(data);
                    yoonek.element_Init();
                    setTimeout(function () {
                        $(".se-pre-con").fadeOut("slow");
                    }, 200);


                },
                error: function (request) {
                    console.log('failure');
                }
            });

        },
        ScreenerCol: function (ajax_data) {
            
            $.ajax({
                //url: "api/yoonekdata/Get_Yoonek_Screener_Col",
                url: "api/Yoonek_Data/Get_Yoonek_Screener_Col",
                type: 'GET', 
                //'content-type': 'application/json',
                dataType: 'json',
                data: ajax_data,
                beforeSend: function () {
                    $(".se-pre-con").fadeIn("slow");
                },
                success: function (data) {
                    //setTimeout(function () {
                    //console.log("--------------xxxxxx Col here xxxxxxx--------------");

                    console.log(data);
                    console.log("Column");
                    console.log(data.Tabs);
                    yoonek.tab_placer(data["Tabs"]);
                    yoonek.DT_Obj.dt_Column = data["Column"];
                    yoonek.dt_ColDisplayHandler(data.Tabs[0].TAB_DESC);
                    yoonek.ajax.Init_ajax();

                },
                error: function (request) {
                    console.log('failure');
                }
            });

        }
    }, 
    CountryDropDown: function (json) {
    var countryList = "";

    $.map(json, function (country) {
        var flagIcon = "css/flags/" + country.code + ".png";
        //countryList += "<option data-country-code='" + country.code + "' data-tokens='" + country.code + " " + country.name + "' style='padding-left:25px; background-position: 4px 7px; background-image:url(" + flagIcon + ");background-repeat:no-repeat;' value='" + country.name + "'>" + country.name + "</option>";
        var opt = "";
        if (country.name == "USA") {
            opt = " selected ";
        }
        countryList += '<option ' + opt + ' data-id="' + country.id + '" data-code="' + country.code + '" value="' + flagIcon + '" data-icon="' + flagIcon + '" class="left">' + country.name + '</option>';
        opt = "";
    })

        //$.each(json, function (index, country) {
           

        //});
    $('.countrypicker').html(countryList)
    $('.countrypicker').formSelect();

    yoonek.Req_Param.Country = $('.countrypicker option:selected').text();
    yoonek.Req_Param.CountryFlag = $('.countrypicker option:selected').val();
    yoonek.Req_Param.CountryId = $('.countrypicker option:selected').attr('data-id');

    //$('.countrypicker option:selected').val();
    $('.btn-flag').attr('src', yoonek.Req_Param.CountryFlag);
    //alert(yoonek.Req_Param.Country);
    localStorage.setItem("countryFlag", yoonek.Req_Param.CountryFlag);
    localStorage.setItem("countryID", yoonek.Req_Param.CountryId);
    localStorage.setItem("countryName", yoonek.Req_Param.Country);

    }
}

$('document').ready(yoonek.Init());






