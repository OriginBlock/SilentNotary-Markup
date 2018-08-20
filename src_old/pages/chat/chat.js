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

$(window).load(function(){
    $('.message-list__table').tableHeadFixer({
        'left' : 4
    });
});