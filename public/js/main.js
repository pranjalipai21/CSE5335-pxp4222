$(document).ready(function() {
	$('#myButton').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            url: "https://cse5335-pxp4222.herokuapp.com/db",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
						
			    $("#tableData").append('<tr ><th style ="text-align: center;">Rank</th><th style ="text-align: center;">State</th><th style ="text-align: center;">Stadium</th><th style ="text-align: center;">Capacity</th></tr>');
				$.each(data, function(index, value){
				var row = $("<tr><td>"+value.rank+ "</td><td>"+ value.state+"</td><td>"+value.stadium+"</td><td>"+value.capacity+"</td></tr>");
				$("#tableData").append(row);
				
			});
			google.charts.load('current', {'packages':['corechart']});
		    google.charts.setOnLoadCallback(drawChart);
			markMap();
            },
		});
		
			$('#myButton').hide();
    });
});	
	
	

function drawChart(){
	
	$.getJSON('https://cse5335-pxp4222.herokuapp.com/db',function(data){
		var dataTable = new google.visualization.DataTable();
	 dataTable.addColumn('string','Stadium');
	 dataTable.addColumn('number','Capacity');
	 var row_array = [];
		 $.each(data, function(key, value)
		 {
			var each_array = [value.stadium,value.capacity]
			row_array.push(each_array);
		 });
		 dataTable.addRows(row_array);
	 var options = {'title':'Capacity of the people in the stadium',
                       'width':550,
                       'height':500};
	var chart = new google.visualization.PieChart(document.getElementById('piechart'));

	chart.draw(dataTable, options);
	 });
	 
}
function markMap(){
var map = new google.maps.Map(document.getElementById('map'), {
				  zoom: 4,
				  center: new google.maps.LatLng(37.7599446, -100.4212681),
				  mapTypeId: google.maps.MapTypeId.ROADMAP,
				  scrollwheel: false
				 });
				
		var infowindow = new google.maps.InfoWindow();
        $.getJSON('https://cse5335-pxp4222.herokuapp.com/db',function(data){
		
        	 $.each(data, function(key, value)
		 {
			latLng = new google.maps.LatLng(value.latitude, value.longitude);
            var marker = new google.maps.Marker({
		    position: latLng,
			map:map,
			title: value.stadium
           });
		   });
		   

});
}
    
