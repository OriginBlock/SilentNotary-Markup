/*!
 * jquery.fixedHeaderTable. The jQuery fixedHeaderTable plugin
 *
 * Copyright (c) 2013 Mark Malek
 * http://fixedheadertable.com
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * http://docs.jquery.com/Plugins/Authoring
 * jQuery authoring guidelines
 *
 * Launch  : October 2009
 * Version : 1.3
 * Released: May 9th, 2011
 *
 *
 * all CSS sizing (width,height) is done in pixels (px)
 */(function(c){c.fn.fixedHeaderTable=function(m){var u={width:"100%",height:"100%",themeClass:"fht-default",borderCollapse:!0,fixedColumns:0,fixedColumn:!1,sortable:!1,autoShow:!0,footer:!1,cloneHeadToFoot:!1,autoResize:!1,create:null},b={},n={init:function(a){b=c.extend({},u,a);return this.each(function(){var a=c(this);h._isTable(a)?(n.setup.apply(this,Array.prototype.slice.call(arguments,1)),c.isFunction(b.create)&&b.create.call(this)):c.error("Invalid table mark-up")})},setup:function(){var a=c(this), d=a.find("thead"),e=a.find("tfoot"),g=0,f,k,p;b.originalTable=c(this).clone();b.includePadding=h._isPaddingIncludedWithWidth();b.scrollbarOffset=h._getScrollbarWidth();b.themeClassName=b.themeClass;f=-1<b.width.search("%")?a.parent().width()-b.scrollbarOffset:b.width-b.scrollbarOffset;a.css({width:f});a.closest(".fht-table-wrapper").length||(a.addClass("fht-table"),a.wrap('<div class="fht-table-wrapper"></div>'));f=a.closest(".fht-table-wrapper");!0==b.fixedColumn&&0>=b.fixedColumns&&(b.fixedColumns= 1);0<b.fixedColumns&&0==f.find(".fht-fixed-column").length&&(a.wrap('<div class="fht-fixed-body"></div>'),c('<div class="fht-fixed-column"></div>').prependTo(f),k=f.find(".fht-fixed-body"));f.css({width:b.width,height:b.height}).addClass(b.themeClassName);a.hasClass("fht-table-init")||a.wrap('<div class="fht-tbody"></div>');p=a.closest(".fht-tbody");var l=h._getTableProps(a);h._setupClone(p,l.tbody);a.hasClass("fht-table-init")?k=f.find("div.fht-thead"):(k=0<b.fixedColumns?c('<div class="fht-thead"><table class="fht-table"></table></div>').prependTo(k): c('<div class="fht-thead"><table class="fht-table"></table></div>').prependTo(f),k.find("table.fht-table").addClass(b.originalTable.attr("class")).attr("style",b.originalTable.attr("style")),d.clone().appendTo(k.find("table")));h._setupClone(k,l.thead);a.css({"margin-top":-k.outerHeight(!0)});!0==b.footer&&(h._setupTableFooter(a,this,l),e.length||(e=f.find("div.fht-tfoot table")),g=e.outerHeight(!0));d=f.height()-d.outerHeight(!0)-g-l.border;p.css({height:d});a.addClass("fht-table-init");"undefined"!== typeof b.altClass&&n.altRows.apply(this);0<b.fixedColumns&&h._setupFixedColumn(a,this,l);b.autoShow||f.hide();h._bindScroll(p,l);return this},resize:function(){return this},altRows:function(a){var d=c(this);a="undefined"!==typeof a?a:b.altClass;d.closest(".fht-table-wrapper").find("tbody tr:odd:not(:hidden)").addClass(a)},show:function(a,d,b){var g=c(this),f=g.closest(".fht-table-wrapper");if("undefined"!==typeof a&&"number"===typeof a)return f.show(a,function(){c.isFunction(d)&&d.call(this)}),this; if("undefined"!==typeof a&&"string"===typeof a&&"undefined"!==typeof d&&"number"===typeof d)return f.show(a,d,function(){c.isFunction(b)&&b.call(this)}),this;g.closest(".fht-table-wrapper").show();c.isFunction(a)&&a.call(this);return this},hide:function(a,d,b){var g=c(this),f=g.closest(".fht-table-wrapper");if("undefined"!==typeof a&&"number"===typeof a)return f.hide(a,function(){c.isFunction(b)&&b.call(this)}),this;if("undefined"!==typeof a&&"string"===typeof a&&"undefined"!==typeof d&&"number"=== typeof d)return f.hide(a,d,function(){c.isFunction(b)&&b.call(this)}),this;g.closest(".fht-table-wrapper").hide();c.isFunction(b)&&b.call(this);return this},destroy:function(){var a=c(this),d=a.closest(".fht-table-wrapper");a.insertBefore(d).removeAttr("style").append(d.find("tfoot")).removeClass("fht-table fht-table-init").find(".fht-cell").remove();d.remove();return this}},h={_isTable:function(a){var d=a.is("table"),b=0<a.find("thead").length;a=0<a.find("tbody").length;return d&&b&&a?!0:!1},_bindScroll:function(a){var d= a.closest(".fht-table-wrapper"),c=a.siblings(".fht-thead"),g=a.siblings(".fht-tfoot");a.bind("scroll",function(){0<b.fixedColumns&&d.find(".fht-fixed-column").find(".fht-tbody table").css({"margin-top":-a.scrollTop()});c.find("table").css({"margin-left":-this.scrollLeft});(b.footer||b.cloneHeadToFoot)&&g.find("table").css({"margin-left":-this.scrollLeft})})},_fixHeightWithCss:function(a,d){b.includePadding?a.css({height:a.height()+d.border}):a.css({height:a.parent().height()+d.border})},_fixWidthWithCss:function(a, d,e){b.includePadding?a.each(function(){c(this).css({width:void 0==e?c(this).width():e})}):a.each(function(){c(this).css({width:void 0==e?c(this).parent().width():e})})},_setupFixedColumn:function(a,d,e){var g=a.closest(".fht-table-wrapper"),f=g.find(".fht-fixed-body");d=g.find(".fht-fixed-column");var k=c('<div class="fht-thead"><table class="fht-table"><thead><tr></tr></thead></table></div>'),p=c('<div class="fht-tbody"><table class="fht-table"><tbody></tbody></table></div>');a=c('<div class="fht-tfoot"><table class="fht-table"><tfoot><tr></tr></tfoot></table></div>'); var g=g.width(),l=f.find(".fht-tbody").height()-b.scrollbarOffset,q,t,r,s;k.find("table.fht-table").addClass(b.originalTable.attr("class"));p.find("table.fht-table").addClass(b.originalTable.attr("class"));a.find("table.fht-table").addClass(b.originalTable.attr("class"));q=f.find(".fht-thead thead tr > *:lt("+b.fixedColumns+")");r=b.fixedColumns*e.border;q.each(function(){r+=c(this).outerWidth(!0)});h._fixHeightWithCss(q,e);h._fixWidthWithCss(q,e);var m=[];q.each(function(){m.push(c(this).width())}); t=f.find("tbody tr > *:not(:nth-child(n+"+(b.fixedColumns+1)+"))").each(function(a){h._fixHeightWithCss(c(this),e);h._fixWidthWithCss(c(this),e,m[a%b.fixedColumns])});k.appendTo(d).find("tr").append(q.clone());p.appendTo(d).css({"margin-top":-1,height:l+e.border});t.each(function(a){0==a%b.fixedColumns&&(s=c("<tr></tr>").appendTo(p.find("tbody")),b.altClass&&c(this).parent().hasClass(b.altClass)&&s.addClass(b.altClass));c(this).clone().appendTo(s)});d.css({height:0,width:r});var n=d.find(".fht-tbody .fht-table").height()- d.find(".fht-tbody").height();d.find(".fht-tbody .fht-table").bind("mousewheel",function(a,d,b,e){if(0!=e)return a=parseInt(c(this).css("marginTop"),10)+(0<e?120:-120),0<a&&(a=0),a<-n&&(a=-n),c(this).css("marginTop",a),f.find(".fht-tbody").scrollTop(-a).scroll(),!1});f.css({width:g});if(!0==b.footer||!0==b.cloneHeadToFoot)k=f.find(".fht-tfoot tr > *:lt("+b.fixedColumns+")"),h._fixHeightWithCss(k,e),a.appendTo(d).find("tr").append(k.clone()),d=a.find("table").innerWidth(),a.css({top:b.scrollbarOffset, width:d})},_setupTableFooter:function(a,d,e){d=a.closest(".fht-table-wrapper");var g=a.find("tfoot");a=d.find("div.fht-tfoot");a.length||(a=0<b.fixedColumns?c('<div class="fht-tfoot"><table class="fht-table"></table></div>').appendTo(d.find(".fht-fixed-body")):c('<div class="fht-tfoot"><table class="fht-table"></table></div>').appendTo(d));a.find("table.fht-table").addClass(b.originalTable.attr("class"));switch(!0){case !g.length&&!0==b.cloneHeadToFoot&&!0==b.footer:e=d.find("div.fht-thead");a.empty(); e.find("table").clone().appendTo(a);break;case g.length&&!1==b.cloneHeadToFoot&&!0==b.footer:a.find("table").append(g).css({"margin-top":-e.border}),h._setupClone(a,e.tfoot)}},_getTableProps:function(a){var d={thead:{},tbody:{},tfoot:{},border:0},c=1;!0==b.borderCollapse&&(c=2);d.border=(a.find("th:first-child").outerWidth()-a.find("th:first-child").innerWidth())/c;d.thead=h._getColumnsWidth(a.find("thead tr"));d.tfoot=h._getColumnsWidth(a.find("tfoot tr"));d.tbody=h._getColumnsWidth(a.find("tbody tr")); return d},_getColumnsWidth:function(a){var d={},b={},g=0,f,k;f=h._getColumnsCount(a);for(k=0;k<f;k++)b[k]={rowspan:1,colspan:1};a.each(function(a){var l=0,k=0;c(this).children().each(function(a){for(var f=parseInt(c(this).attr("colspan"))||1,h=parseInt(c(this).attr("rowspan"))||1;1<b[a+k].rowspan;)b[a+k].rowspan--,k+=b[a].colspan;a+=l+k;l+=f-1;1<h&&(b[a]={rowspan:h,colspan:f});if("undefined"===typeof d[a]||1!=d[a].colspan)d[a]={width:c(this).width()+parseInt(c(this).css("border-left-width"))+parseInt(c(this).css("border-right-width")), colspan:f},1==f&&g++});if(g==f)return!1});return d},_getColumnsCount:function(a){var b=0;a.each(function(a){var g;c(this).children().each(function(a){a=parseInt(c(this).attr("colspan"))||1;g=parseInt(c(this).attr("rowspan"))||1;b+=a});if(1<b||1==g)return!1});return b},_setupClone:function(a,d){var e=a.find("thead").length?"thead tr":a.find("tfoot").length?"tfoot tr":"tbody tr",g={},e=a.find(e);columnsCount=h._getColumnsCount(e);for(i=0;i<columnsCount;i++)g[i]={rowspan:1,colspan:1};e.each(function(a){var e= 0,h=0;c(this).children().each(function(a){for(var f=parseInt(c(this).attr("colspan"))||1,m=parseInt(c(this).attr("rowspan"))||1;1<g[a+h].rowspan;)g[a+h].rowspan--,h+=g[a].colspan;a+=e+h;e+=f-1;1<m&&(g[a]={rowspan:m,colspan:f});"undefined"!==typeof d[a]&&d[a].colspan==f&&((c(this).find("div.fht-cell").length?c(this).find("div.fht-cell"):c('<div class="fht-cell"></div>').appendTo(c(this))).css({width:parseInt(d[a].width,10)}),c(this).closest(".fht-tbody").length||!c(this).is(":last-child")||c(this).closest(".fht-fixed-column").length|| (a=Math.max((c(this).innerWidth()-c(this).width())/2,b.scrollbarOffset),c(this).css({"padding-right":parseInt(c(this).css("padding-right"))+a+"px"})))})})},_isPaddingIncludedWithWidth:function(){var a=c('<table class="fht-table"><tr><td style="padding: 10px; font-size: 10px;">test</td></tr></table>'),d,e;a.addClass(b.originalTable.attr("class"));a.appendTo("body");d=a.find("td").height();a.find("td").css("height",a.find("tr").height());e=a.find("td").height();a.remove();return d!=e?!0:!1},_getScrollbarWidth:function(){var a= 0;if(!a)if(/msie/.test(navigator.userAgent.toLowerCase())){var b=c('<textarea cols="10" rows="2"></textarea>').css({position:"absolute",top:-1E3,left:-1E3}).appendTo("body"),e=c('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({position:"absolute",top:-1E3,left:-1E3}).appendTo("body"),a=b.width()-e.width()+2;b.add(e).remove()}else b=c("<div />").css({width:100,height:100,overflow:"auto",position:"absolute",top:-1E3,left:-1E3}).prependTo("body").append("<div />").find("div").css({width:"100%", height:200}),a=100-b.width(),b.parent().remove();return a}};if(n[m])return n[m].apply(this,Array.prototype.slice.call(arguments,1));if("object"!==typeof m&&m)c.error('Method "'+m+'" does not exist in fixedHeaderTable plugin!');else return n.init.apply(this,arguments)}})(jQuery);



// plugins && functions

Chart.plugins.register({
    afterDatasetsUpdate: function(chart) {
        if (chart.controller.config.unique && chart.controller.config.unique.length > 0 && chart.controller.config.unique == 'ov') {
            Chart.helpers.each(chart.getDatasetMeta(0).data, function(rectangle, index) {
                rectangle._view.x = rectangle._model.x = rectangle._view.x - 9;
            });
            Chart.helpers.each(chart.getDatasetMeta(1).data, function(rectangle, index) {
                rectangle._view.x = rectangle._model.x = rectangle._view.x + 9;
            });
            Chart.helpers.each(chart.getDatasetMeta(2).data, function(rectangle, index) {
                rectangle._view.width = rectangle._model.width = 58;
            });
        }
    }
});

Chart.pluginService.register({
    afterUpdate: function(chart) {
        if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
            var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
            arc.round = {
                x: (chart.chartArea.left + chart.chartArea.right) / 2,
                y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
                radius: (chart.outerRadius + chart.innerRadius) / 2,
                thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
                backgroundColor: arc._model.backgroundColor
            }
        }
    },

    afterDraw: function(chart) {
        if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
            var ctx = chart.chart.ctx;
            var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
            var startAngle = Math.PI / 2 - arc._view.startAngle;
            var endAngle = Math.PI / 2 - arc._view.endAngle;

            ctx.save();
            ctx.translate(arc.round.x, arc.round.y);
            ctx.fillStyle = arc.round.backgroundColor;
            ctx.beginPath();
            ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
            ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    },
});

Chart.pluginService.register({
    afterUpdate: function(chart) {
        if (chart.config.options.elements.center) {
            var helpers = Chart.helpers;
            var centerConfig = chart.config.options.elements.center;
            var globalConfig = Chart.defaults.global;
            var ctx = chart.chart.ctx;

            var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
            var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);

            if (centerConfig.fontSize)
                var fontSize = centerConfig.fontSize;
            // figure out the best font size, if one is not specified
            else {
                ctx.save();
                var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
                var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
                var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);

                do {
                    ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
                    var textWidth = ctx.measureText(maxText).width;

                    // check if it fits, is within configured limits and that we are not simply toggling back and forth
                    if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
                        fontSize += 1;
                    else {
                        // reverse last step
                        fontSize -= 1;
                        break;
                    }
                } while (true)
                ctx.restore();
            }

            // save properties
            chart.center = {
                font: helpers.fontString(fontSize, fontStyle, fontFamily),
                fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
            };
        }
    },
    afterDraw: function(chart) {
        if (chart.center) {
            var centerConfig = chart.config.options.elements.center;
            var ctx = chart.chart.ctx;

            ctx.save();
            ctx.font = chart.center.font;
            ctx.fillStyle = chart.center.fillStyle;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
            var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
            ctx.fillText(centerConfig.text, centerX, centerY);
            ctx.restore();
        }
    },
});

Chart.pluginService.register({
    afterUpdate: function(chart) {
        if (chart.config.options.elements.uniq !== undefined) {
            var a = chart.config.data.datasets.length - 1;
            for (let i in chart.config.data.datasets) {
                for (var j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
                    if (Number(j) == (chart.config.data.datasets[i].data.length - 1))
                        continue;
                    var arc = chart.getDatasetMeta(i).data[j];
                    arc.round = {
                        x: (chart.chartArea.left + chart.chartArea.right) / 2,
                        y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
                        radius: chart.innerRadius + chart.radiusLength / 2 + (a * chart.radiusLength),
                        thickness: chart.radiusLength / 2 - 1,
                        backgroundColor: arc._model.backgroundColor
                    }
                }
                a--;
            }
        };
    },

    afterDraw: function(chart) {
        if (chart.config.options.elements.uniq !== undefined) {
            var ctx = chart.chart.ctx;
            for (let i in chart.config.data.datasets) {
                for (var j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
                    if (Number(j) == (chart.config.data.datasets[i].data.length - 1))
                        continue;
                    var arc = chart.getDatasetMeta(i).data[j];
                    var startAngle = Math.PI / 2 - arc._view.startAngle;
                    var endAngle = Math.PI / 2 - arc._view.endAngle;

                    ctx.save();
                    ctx.translate(arc.round.x, arc.round.y);
                    ctx.fillStyle = arc.round.backgroundColor;
                    ctx.beginPath();
                    ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
                    ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
            }
        };
    },
});

var radiusBackground = function() {
    var self = this;

    self.draw = function(chartInstance) {
        if (chartInstance.options.radiusBackground) {
            var x = chartInstance.chart.canvas.clientWidth / 2,
                y = chartInstance.chart.canvas.clientHeight / 2,
                ctx = chartInstance.chart.ctx;

            ctx.beginPath();
            ctx.arc(x, y, chartInstance.outerRadius - (chartInstance.radiusLength / 2), 0, 2 * Math.PI);
            ctx.lineWidth = chartInstance.radiusLength;
            ctx.strokeStyle = chartInstance.options.radiusBackground.color || '#d1d1d1';
            ctx.stroke();
        }
    };
    return {
        beforeDatasetsDraw: self.draw,
        onResize: self.draw
    }
};

Chart.plugins.register(new radiusBackground());

// config


Chart.defaults.global.legend.display = false;
Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.responsive = true;
// Chart.defaults.global.animation.duration = 0;
// Chart.defaults.global.animation.animationSteps = 0;
Chart.defaults.scale.gridLines.display = false;
Chart.defaults.scale.gridLines.drawBorder = false;
Chart.defaults.scale.ticks.fontSize = 10;

// config end

var radiusSpacer = {
    data: [100],
    backgroundColor: ["transparent"],
    borderColor: ['#ffffff'],
    borderWidth: 0,
    hoverBorderColor: ["#ffffff", "#ffffff"],
    hoverBackgroundColor: ["#ffffff"]
};