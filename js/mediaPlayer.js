$(function() {
	$("#match").hide();
	$("#search").focus();
	$("#message").hide();
	$("#closeMessage").hide();

	var cssSet = new Array ();
		cssSet = { 
			"padding-bottom":"5px",
			'visibility':'visible',
			"color":"navy",
			"font-size":"1.1.em",
			"width":"80%",
			"height":"22",
			"border":" solid 1",
			"position":"relative",
			"text-align":"left",
			"padding":"10",
			"font-size":".8em",
			"margin-bottom":"4",
			"border-radius":"2%"
		};
	
	var titles = 0;
	var dataset = new Array ();
	var master;
	for (var i = 0; i < masterMovie.length; i++){ 
		master =  masterMovie[i].id;		
		$.data( document.body,String(master),masterMovie[i]);
		dataset.push( { "id" :masterMovie[i].id , "label" : masterMovie[i].filename });		
    }
    //console.log (dataset);
	titles = masterMovie.length;
	$("#titles").html(titles + " titles available.");

	$.widget( "custom.catcomplete", $.ui.autocomplete, {
 		_renderMenu: function( ul, items ) {
		$("#showlist").empty();	
		//items.sort(compare);

		//console.log ("starting to render");    
			
		//var tau = $.now();
		$("#showList").hide();
		$.each( items, function( index, item ) {
			var tea = $.now();
		    var dataUnit =  ($.data( document.body, String(item.id)));	
			var cloned = $("#data").clone();
			cloned.attr('id',dataUnit.id).css(cssSet);
			$(cloned[0].children.nas).html (dataUnit.nasdrive);
			$(cloned[0].children.nametitle).html (dataUnit.filename);
			$(cloned[0].children.mediaShowType).html (dataUnit.mediaType);

			if (item.id % 2) {
				cloned.css("background-color","#DDDDDD");
			}
			else {
				cloned.css ("background-color","#EDEDED");
			}

			if (dataUnit.year != null) {
				$(cloned[0].children.year).html (dataUnit.year);
			}			
			if (dataUnit.espisode != "" ) {
					$(cloned[0].children.ep).html ("Episode " + dataUnit.espisode);
				    $(cloned[0].children.season).html ("Series " +dataUnit.season);
			}
			$("#showlist").append(cloned); 
		});

        $("#showList").show();
        //console.log ("total time " + ($.now() - tau));  	
    }
});

	var minSet = 3;
	$( "#search" ).catcomplete({
		minLength:minSet,
	    source: dataset,
	   	response: function( event, ui ) {
	   		//console.log(ui);
			if (ui.content.length == 0) {
				$("#showlist").empty().hide();		
			}
			$("#match").text(ui.content.length).show();
			// when we search and have a subset they are all possible next matches so 
			// why search all 10,000 when we only need to search say 76.
			$( "#search" ).catcomplete("option","source",ui.content);
			
	     }, 
	});

	$("#search").on('keydown', function() {
	 	var key = event.keyCode || event.charCode;
	 	if( key == 8 ) {
	 		// when we hit the back key we need to refresh to the orginal data source.
	 		$( "#search" ).catcomplete("option","source",dataset);
	        if (($("#search").val().length) <= 1) {			
				$("#showlist").empty().hide();
				$("#match").hide();
			}
			else {
				$("#match").show();
				$("#showlist").show();
			}
		}
	});

	function compare (a,b) {
	 	if (a.label < b.label) {
	     	return 1;
	 	}
	 	if (a.label > b.label) {
	    	return -1;
	 	}
	 	return 0;
	}

});


/*

$.extend( $.ui.autocomplete, {
	escapeRegex: function( value ) {
		return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
	},

	filter: function(array, term) {
		var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
		return $.grep( array, function(value) {
			return matcher.test( value.label || value.value || value );
		});
	}
});

*/
