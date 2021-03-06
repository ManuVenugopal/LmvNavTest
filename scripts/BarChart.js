// BarChart using NVD3.js

var _lmvData = null;
var _sortOrder = "value-desc";


$(document).ready(function() {
    
    $("#bn_loadData").click(function(evt) {  
        evt.preventDefault();

        nv.addGraph(function() {
            var barChart = nv.models.multiBarHorizontalChart()
                .x(function(d) { return d.label; })
                .y(function(d) { return d.value; })
                .showValues(true)
                .showControls(false)
                .valueFormat(d3.format('f'))
                .margin({ top: 0, right: 50, bottom: 0, left: 150})
                .transitionDuration(400);

            _lmvData = getLmvObjData();
            _lmvData.content.sort(function(a,b) {
                if (_sortOrder == "value-asc")
                    return a.value - b.value;
                else if (_sortOrder == "value-desc")
                    return b.value - a.value;
                else if (_sortOrder == "label-asc")
                    return a.label < b.label ? -1 : 1;
                else if (_sortOrder == "label-desc")
                    return b.label < a.label ? -1 : 1;
            } );
            var barCharData =
                [
                    {
                        key: "Quantity",
                        values: _lmvData.content
                    }
                ];

            d3.select('#barChart')
                .datum(barCharData)
                .call(barChart);
            barChart.yAxis.axisLabel("Quantity").tickFormat(d3.format("d"));
            d3.selectAll('svg .nv-bar').on('click', handleBarClick );

            nv.utils.windowResize(function() {
                barChart.update();
            });


            return barChart;
        });
    });


    $("#pu_sortOrder").change(function(evt) {
        evt.preventDefault();

        _sortOrder = $("#pu_sortOrder option:selected").val();
    });
});

function handleBarClick(event) {
    d3.selectAll('.nv-bar').classed({'clicked': false});
    d3.select(this).classed({'clicked': true});

    // clickPieWedge
    _viewerMain.isolateById(event.lmvIds);
    //_viewerSecondary.select(evt.data.lmvIds);
    workaround_2D_select(event.lmvIds);
}
