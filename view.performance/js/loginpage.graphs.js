//before drawing graph set individual graph container height and width
//get graph container width and height
(function() {
	var c=$('#graph-container'), w=parseInt(c.css('width').replace('px','')),h=parseInt(c.css('height').replace('px',''));
	var grp_area=$('#graph-area');
	//set width of multiple graphs container, which will contain 3 graphs
	grp_area.css('width',(w*3)+'px');
	//now set width and height of individual graphs container
	$('.individual-graphs').css({'width':(w-2)+'px','height':(h-2)+'px'});

	//add controls to  left, right buttons
	var ind=0, _b=$('body'), graphName=['PIE CHART','AREA CHART','WATERFALL'], sldInfo=$('#slide-information');
	_b.on('click', '#slide-right-img', function() {
		if(ind === 2)
			return;
		ind++;
		//show type of graph name
		sldInfo.text(graphName[ind]);
		//move container to 1 step right
		grp_area.css('left',-(w*ind)+'px');
	});
	_b.on('click', '#slide-left-img', function() {
		if(ind === 0)
			return;
		ind--;
		//show type of graph name
		sldInfo.text(graphName[ind]);
		//move container to 1 step right
		grp_area.css('left',-(w*ind)+'px');
	});
})();

//show pie chart - graph 1
$(function () {
    $('#graph1').highcharts({
        chart: {
            type: 'pie',
            options3d: {
				enabled: true,
                alpha: 45,
                beta: 0
            },
            backgroundColor: 'rgba(255,255,255,0)'
        },
        title: {
            text: 'Number of features developed, issues fixed..'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        exporting: {enabled: false},
        credits: {enabled: false},
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'features, issues',
            data: [
                ['Kark Technologies',   45.0],
                ['Moontara Technovations',       26.8],
                {
                    name: 'Personal Projects',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['PK4 Software Technologies',    8.5],
            ]
        }]
    });
});


//show pie chart - graph 3
$(function () {
    $('#graph2').highcharts({
        chart: {
                type: 'area',
                backgroundColor: 'rgba(255,255,255,0)'
            },
            title: {
                text: 'Number of features developed, issues fixed..'
            },
            subtitle: {
                text: 'Shoib Mohammed A (career info)'
            },
            xAxis: {
                categories: ['2011', '2012', '2013', '2014'],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Features/Issues'
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' Features, Issues'
            },            
	        exporting: {enabled: false},
	        credits: {enabled: false},
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [{
                name: 'Kark Technologies',
                data: [10, 0, 0, 0]
            }, {
                name: 'Moontara Technovations',
                data: [0, 20, 0, 0]
            }, {
                name: 'PK4 Software',
                data: [0, 0, 30, 0]
            }, {
                name: 'Personal Projects',
                data: [2, 5, 10, 4]
            }]
    });
});


//show pie chart - graph 3
$(function () {
    $('#graph3').highcharts({
        chart: {
            type: 'waterfall',
             backgroundColor: 'rgba(255,255,255,0)'
        },

        title: {
            text: 'Number of features developed, issues fixed..'
        },

        xAxis: {
            type: 'category'
        },

        yAxis: {
            title: {
                text: 'Features/Issues'
            }
        },

        legend: {
            enabled: false
        },

        tooltip: {
            pointFormat: '<b>{point.y:,2f} Features/Issues</b>'
        },
        exporting: {enabled: false},
	    credits: {enabled: false},
        series: [{
            upColor: Highcharts.getOptions().colors[2],
            color: Highcharts.getOptions().colors[3],
            data: [{
                name: 'Kark Technologies',
                y: 10
            }, 
            {
                name: 'Moontara Technovations',
                y: 20
            }, 
            {
                name: 'PK4 Software',
                y: 25
            }, 
            {
                name: 'Personal Projects',
                y: 35
            }, 
            ],
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return Highcharts.numberFormat(this.y, 0, ',') + '';
                },
                style: {
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    textShadow: '0px 0px 3px black'
                }
            },
            pointPadding: 0
        }]
    });
});