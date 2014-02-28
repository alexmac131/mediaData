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
	for (var i = 0; i < masterMovie.length; i++){ 
		var master =  masterMovie[i].id;		
		$.data( document.body,String(master),masterMovie[i]);
		dataset.push( { "id" :masterMovie[i].id , "label" : masterMovie[i].filename });		
    }

	titles = masterMovie.length;
	$("#titles").html(titles + " titles available.");

	$.widget( "custom.catcomplete", $.ui.autocomplete, {
 		_renderMenu: function( ul, items ) {
		$("#showlist").empty().show();	
		items.sort(compare);

		var count = 1;
      	$.each( items, function( index, item ) {

			//var idset = "m" + item.id ;
			var textString = $.data( document.body, String(item.id)).filename ;
			
			cloned = $("#data").clone().show();
			cloned.attr(
				'id',
				$.data( document.body, String(item.id)).id
				).css(cssSet);
			
			if (count % 2) {
				cloned.css("background-color","#DDDDDD");
			}
			else {
				cloned.css("background-color","#EDEDED");
			}
			cloneyear = $("#year").clone();  // done
			if ($.data( document.body, String(item.id)).year != "null") {
				cloneyear.html($.data( document.body, String(item.id)).year);
			}
			clonenas = $("#nas").clone();  // done
			clonenas.html("nas drive:" + $.data( document.body, String(item.id)).nasdrive);
			cloneep = $("#ep").clone();  // cloneep
			cloneseries = $("#season").clone();  //done
			if ($.data( document.body, String(item.id)).espisode != "null" 
				&&  $.data( document.body, String(item.id)).series <= 50) {
					cloneep.html("Episode " + $.data( document.body, String(item.id)).espisode);
					cloneseries.html("Season " + $.data( document.body, String(item.id)).series);
			}
			clonemediaShowType = $("#mediaShowType").clone();  //done
			clonemediaShowType.html($.data( document.body, String(item.id)).mediaType);
			clonegenre = $("#genre").clone();  // done
			cloneName = $("#nametitle").clone();  //done
			cloneName.html(textString);
			cloned.append(cloneyear).append(cloneep);
			cloned.append(clonegenre).append(clonemediaShowType).append(cloneseries);
			cloned.append(clonenas).append(cloneName);
			$("#showlist").append(cloned); 
			count++;
		});
    }
});

	var minSet = 2;
	$( "#search" ).catcomplete({
		minLength:minSet,
	    source: dataset,
	    delay: 350,
		response: function( event, ui ) {
			if (ui.content.length == 0) {
				$("#showlist").empty().hide();		
			}
			$("#match").text(ui.content.length).show();
	     }, 
	});

	$("#search").on('keydown', function() {
	 	var key = event.keyCode || event.charCode;
	 	if( key == 8 || key == 46 ) {
	        //var sizenow = $("#search").val().length;
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
