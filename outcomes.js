const data_outcomes= [

    {
      'race': 'Summons',
      'val': '0.0588',
      'tt': '6',
      'offset': 0,
      'label': 0
    },
    {
      'race':'Arrests',
      'val': '0.059959',
      'tt': '6',
      'offset': '0.0588',
      'label': 0.062
    },
    {
      'race':'No Action Taken',
      'val': '0.8812409',
      'tt': '88',
      'offset': '0.118759',
      'label': 0.48
    }
  ]


  const svg_outcomes = d3.select(".outcomes").append("svg")
    .attr("width", width)
    .attr("height", height)

  svg_outcomes.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

    var z = d3.scaleOrdinal()
      .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B"]);


  svg_outcomes.selectAll("rect")
       .data(data_outcomes)
       .enter()
       .append("rect")
       .attr("fill", function(d) { return z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
       .on("mouseover", function() { tooltip.style("display", null); })
   .on("mouseout", function() { tooltip.style("display", "none"); })
   .on("mousemove", function(d) {
     var xPosition = d3.mouse(this)[0]-5;
     var yPosition = d3.mouse(this)[1]-60;
     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip.select("text").text(d.tt + " % ")
     tooltip.attr("fill", "white")
     tooltip.attr("font-family", "Courier")
     tooltip.attr("font-size", "18px");
      });

svg_outcomes.selectAll("text")
   .data(data_outcomes)
   .enter()
   .append("text")
   .attr("class", "label")
   .text(function(d) {
      return d.race;
   })
   .attr('x', d => x(Number(d.label)))
   .attr("y", label_y)
   .attr("font-family", "Courier")
   .attr("font-size", "16px")
   .attr("fill", "white");

   // Prep the tooltip bits, initial display is hidden
var tooltip = svg_outcomes.append("g")
.attr("class", "tooltip")
.style("display", "none")

// tooltip.append("rect")
//     .attr("width", 60)
//     .attr("height", 20)
//     .attr("fill", "#F4F4F4")
//     .style("opacity", 0.5)
//     .attr("x", d => d.label);

tooltip.append("text")
  // .attr("x", d => d.label)
  .attr("dy", label_y)
