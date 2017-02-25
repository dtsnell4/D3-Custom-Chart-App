$(document).ready(function() {
    var obj = {};
    obj.domain = [];
    obj.reset = false;

    $("#works").click(function() {
        $("#panel").fadeOut();
        $("#panel2").fadeIn();
    })
    $("#editor").click(function() {
        $("#panel2").fadeOut();
        $("#panel").fadeIn();
    })

    $("#update").click(function(){
        setObject();
        obj.updateChart(obj.tsvdata);
    });
    $("#getcode").click(function(){
        setObject();

        var output;

        $.get("output.html", function(response) {

            var dxarr = obj.dxaxis.toString();
            dxarr = "['" + dxarr.replace(/\,/g, "','") + "']";

            var dyarr = obj.dyaxis.toString();
            dyarr = "['" + dyarr.replace(/\,/g, "','") + "']";

            var t0 = response.replace("%%barcolor%%", obj.bar_color);
            var t1 = t0.replace("%%barhovercolor%%", obj.bar_hover_color);
            var t2 = t1.replace("%%top%%", obj.margin.top);
            var t3 = t2.replace("%%right%%", obj.margin.right);
            var t4 = t3.replace("%%bottom%%", obj.margin.bottom);
            var t5 = t4.replace("%%left%%", obj.margin.left);
            var t6 = t5.replace("%%barpadding%%", obj.bar_padding);
            var t7 = t6.replace("%%tickformat%%", "'" + obj.tick_format + "'");
            var t8 = t7.replace("%%showtooltip%%", "'" + obj.showtooltip + "'");
            var t9 = t8.replace("%%sig_digits%%", obj.sig_digits);
            var t10 = t9.replace("%%xticknum%%", obj.xticknum);
            var t11 = t10.replace("%%yticknum%%", obj.yticknum);
            var t12 = t11.replace("%%xlabeltext%%", "'" + obj.xlabeltext + "'");
            var t13 = t12.replace("%%ylabeltext%%", "'" + obj.ylabeltext + "'");
            var t14 = t13.replace("%%xrotation%%", obj.xrotation);
            var t15 = t14.replace("%%yrotation%%", obj.yrotation);
            var t16 = t15.replace("%%dxaxis%%", dxarr);
            var t17 = t16.replace("%%dyaxis%%", dyarr);

            $("#thecode").val(t17);

        });
    });

    setObject = function() {
        obj.tsvdata = $("#tsvdata").val();
        obj.margin = {top: $("#top-margin").val(), right: $("#right-margin").val(), bottom: $("#bottom-margin").val(), left: $("#left-margin").val()},
        obj.bar_color = $("#bar-color").val();
        obj.bar_hover_color = $("#bar-hover-color").val();
        obj.bar_padding = $("#bar_padding").val();
        obj.bar_padding = +obj.bar_padding.replace('%','') / 100;
        obj.showtooltip = $("input[name='showtooltip']:checked").val();
        obj.sig_digits = $("#sig_digits").val();
        obj.tick_format = $("input[name='tickformat']:checked").val();
        obj.xticknum = $("#xticknum").val();
        obj.yticknum = $("#yticknum").val();
        obj.xlabeltext = $("#xlabel").val();
        obj.ylabeltext = $("#ylabel").val();
        obj.xrotation = $("#xrotation").val();
        obj.yrotation = $("#yrotation").val();
        
        switch (obj.xrotation) {
            case "90":
                obj.dxaxis = ["1em", "-0.5em", "start"];
                break;

            case "45":
                obj.dxaxis = ["0.15em", "0.5em", "start"];
                break;

            default: 
                obj.dxaxis = ["0", "0.71em", "middle"];
        }

        switch (obj.yrotation) {
            case "-90":
                obj.dyaxis = ["1em", "-1em", "middle"];

                break;

            case "-45":
                obj.dyaxis = ["0.15em", "-0.5em", "end"];
                break;

            default: 
                obj.dyaxis = ["0", "0.32em", "end"];
        }
    }


    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    
    var svg = d3.select("svg"),
        container = svg.select(function() { return this.parentNode; });

    var containerBBox = container.node().getBoundingClientRect();

    var margin = {top: 20, right: 20, bottom: 35, left: 45},
        width = containerBBox.width - margin.left - margin.right,
        height = containerBBox.height - margin.top - margin.bottom;

    svg.attr("width", containerBBox.width);
    svg.attr("height", containerBBox.height);

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var init = "letter\tfrequency\n" +
    "A\t.08167 \n" +
    "B\t.01492 \n" +
    "C\t.02782 \n" +
    "D\t.04253 \n" +
    "E\t.12702 \n" +
    "F\t.02288 \n" +
    "G\t.02015 \n" +
    "H\t.06094 \n" +
    "I\t.06966 \n" +
    "J\t.00153 \n" +
    "K\t.00772 \n" +
    "L\t.04025 \n" +
    "M\t.02406 \n" +
    "N\t.06749 \n" +
    "O\t.07507 \n" +
    "P\t.01929 \n" +
    "Q\t.00095 \n" +
    "R\t.05987 \n" +
    "S\t.06327 \n" +
    "T\t.09056 \n" +
    "U\t.02758 \n" +
    "V\t.00978 \n" +
    "W\t.02360 \n" +
    "X\t.00150 \n" +
    "Y\t.01974 \n" +
    "Z\t.00074";

    $("#tsvdata").val(init);

    obj.initChart = function(tsv) {

        var data = tsvJSON(tsv);
        var columns = d3.keys(data[0]);

        var xlabeltext = "Letter",
        	ylabeltext = "Frequency";

        $("#xlabel").val(xlabeltext);
        $("#ylabel").val(ylabeltext);

        x.domain(data.map(function(d) { return d[columns[0]]; }));
        y.domain([0, d3.max(data, function(d) { return d[columns[1]]; })]);

        var xaxis = g.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + height + ")")
			.transition()
			.duration(300)
			.call(d3.axisBottom(x).ticks(5));

        var xlabel = svg.append("text")      // text label for the x axis
	        .attr("transform", "translate(" + (width / 2 + margin.left) + " ," + (+svg.attr("height")) + ")")
	        .attr("class", "x-axis-label")
	        .attr("dy", "-.25em")
	        .style("text-anchor", "middle")
	        .text(xlabeltext);

        var yaxis = g.append("g")
			.attr("class", "axis axis--y")
			.call(d3.axisLeft(y).ticks(10, "%"));

      	var ylabel = svg.append("text")
	        .attr("transform", "rotate(-90)")
	        .attr("class", "y-axis-label")
	        .attr("x",0 - (height / 2))
	        .attr("dy", "1em")
	        .style("text-anchor", "middle")
	        .text(ylabeltext);

        var bars = g.selectAll(".bar").data(data, function(d) { return d[columns[0]]; });

        bars.enter().append("rect")
            .attr("class", "bar")
            .attr("fill", "steelblue")
            .attr("x", function(d) { return x(d[columns[0]]); })
            .attr("y", function(d) { return y(d[columns[1]]); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d[columns[1]]); })
			.on("mouseover", function(d) {
				d3.select(this).attr("fill", "brown");
			})                  
			.on("mousemove", function(d){
	            tooltip
	              .style("left", d3.event.pageX + 10 + "px")
	              .style("top", d3.event.pageY - 40 + "px")
	              .style("display", "inline-block")
	              .html((d[columns[0]]) + ": " + d3.format(".1%")(d[columns[1]]));
	        })
			.on("mouseout", function(d) {
			  d3.select(this).attr("fill", "steelblue");
			  tooltip.style("display", "none");
			});

        obj.domain = data.map(function(d) { return d[columns[0]]; })

        setObject();
    };

    obj.updateChart =  function(tsv) {

        var data = tsvJSON(tsv);
        var columns = d3.keys(data[0]);

        var currdomain = data.map(function(d) { return d[columns[0]]; })

        if (obj.domain.toString() != currdomain.toString()) {
            obj.reset = true;
        }

        obj.domain = currdomain;

        width = containerBBox.width - obj.margin.left - obj.margin.right,
        height = containerBBox.height - obj.margin.top - obj.margin.bottom;   

        x = d3.scaleBand().rangeRound([0, width]).padding(obj.bar_padding);
	    y = d3.scaleLinear().rangeRound([height, 0]);

        x.domain(data.map(function(d) { return d[columns[0]]; }));
        y.domain([0, d3.max(data, function(d) { return d[columns[1]]; })]);

	    g.attr("transform", "translate(" + obj.margin.left + "," + obj.margin.top + ")");

        svg.select(".axis.axis--x")
            .transition()
                .duration(300)
        	.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x).ticks(obj.xticknum))
			.selectAll("text")	
		        .style("text-anchor", obj.dxaxis[2])
		        .attr("dx", obj.dxaxis[0])
		        .attr("dy", obj.dxaxis[1])
		        .attr("transform", "rotate(" + obj.xrotation + ")");

        svg.select(".axis.axis--y")
			.transition()
                .duration(300)
			.call(d3.axisLeft(y).ticks(obj.yticknum, obj.tick_format))
			.selectAll("text")	
		        .style("text-anchor", obj.dyaxis[2])
		        .attr("dx", obj.dyaxis[0])
		        .attr("dy", obj.dyaxis[1])
		        .attr("transform", "rotate(" + obj.yrotation + ")");

      	svg.select(".x-axis-label")
      		.text(obj.xlabeltext);

  		svg.select(".y-axis-label")
      		.text(obj.ylabeltext);

        if (obj.reset) {
            var bars = g.selectAll(".bar")
                .remove()
                .exit()
                .data(data, function(d) { return d[columns[0]]; });

            bars.on("mouseover", function(d) {
                d3.select(this).attr("fill", obj.bar_hover_color);
            });
            bars.enter().append("rect")
                .transition()
            	   .duration(300)
                .attr("fill", obj.bar_color)
                .attr("height", function(d) { return height - y(d[columns[1]]); })
                .attr("class", "bar")
                .attr("y", function(d) { return y(d[columns[1]]); })
                .attr("x", function(d) { return x(d[columns[0]]); }) 
                .attr("width", x.bandwidth());
        } else {
            var bars = g.selectAll(".bar")
                .data(data, function(d) { return d[columns[0]]; });

            bars.enter().append("rect")
            
            bars.transition()
                   .duration(300)
                .attr("fill", obj.bar_color)
                .attr("height", function(d) { return height - y(d[columns[1]]); })
                .attr("class", "bar")
                .attr("y", function(d) { return y(d[columns[1]]); })
                .attr("x", function(d) { return x(d[columns[0]]); }) 
                .attr("width", x.bandwidth());

            bars.exit()
                .remove();
        }

        bars.on("mouseover", function(d) {
			d3.select(this).attr("fill", obj.bar_hover_color);
		});

        if (obj.showtooltip) {
			bars.on("mousemove", function(d){
	            tooltip
	              .style("left", d3.event.pageX + 10 + "px")
	              .style("top", d3.event.pageY - 40 + "px")
	              .style("display", "inline-block")
	              .html((d[columns[0]]) + ": " + d3.format((obj.sig_digits ? "." + obj.sig_digits : "") + obj.tick_format)(d[columns[1]]));
	        })                 
			.on("mouseout", function(d) {
                d3.select(this).attr("fill", obj.bar_color);
                tooltip.style("display", "none");
			});
            console.log("1", obj.showtooltip)
        } else {
            bars.on("mousemove", function(d){
                tooltip.style("display", "none")
            })                 
            .on("mouseout", function(d) {
                d3.select(this).attr("fill", obj.bar_color);
                tooltip.style("display", "none");
            });
            console.log("2", obj.showtooltip)        }

        obj.reset = false;
    };

    function tsvJSON(tsv){
      var lines=tsv.split("\n");
      var result = [];
      var headers=lines[0].split("\t");
     
      for(var i=1;i<lines.length;i++){

     	  if (lines[i] != "") {

	          var obj = {};
	          var currentline=lines[i].split("\t");

	          for(var j=0;j<headers.length;j++){
	              obj[headers[j]] = currentline[j];
	          }

      		  result.push(obj);
	      }
      }

      return result; //JavaScript object
      //return JSON.stringify(result); //JSON
    }
    
    // TODO
    // $( window ).resize(function() {
    //     console.log(obj.tsvdata)
    //     obj.updateChart(obj.tsvdata);
    // });

    obj.initChart(init);

});
