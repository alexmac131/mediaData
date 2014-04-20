$(function() {
	$("#match").hide();
	//$("#search").focus();
	$("#message").hide();
	$("#closeMessage").hide();
	var x = document.cookie;
	if (x.length > 5) {
		var tmp = x.split(/;/);	
		perpage = tmp[0].match(/\d{1,}/);
		pageLimit = parseInt(perpage[0]);
		if (!tmp[1].match(/none/)) {
			command = tmp[1].match(/=(.*)/	);
		}
	}
	
	$("#search").tooltip( {
	    boolean: true,
	 	show  :{ effect:"blind", duration:100},
	 	content: "Please enter 3 charaters or more"
	}); 

	$("#search").focusin(function(){
	 	$("#search").tooltip("disable");
	});

	$("#search").focusout(function(){
		$("#search").tooltip("enable");
	});


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
    titles = masterMovie.length;
	
	$("#titles").html(titles + " titles available.");


$.widget( "custom.catcomplete", $.ui.autocomplete, {
 	_renderMenu: function( ul, items ) {
 		console.log("rendering menu" + $.now());
		$("#showlist").empty();	
		//items.sort(compare);	
		var clonedList = $("#showlist").clone();
		clonedList.empty();
		$("#showList").hide();

		var count = 1;
		$.each( items, function( index, item ) {
		    var dataUnit =  ($.data( document.body, String(item.id)));	
			var cloned = $("#data").clone();
			
			cloned.attr('id',dataUnit.id).css(cssSet);
			$(cloned[0].children.nas).html (dataUnit.nasdrive);
			$(cloned[0].children.nametitle).html (dataUnit.filename);
			$(cloned[0].children.mediaShowType).html (dataUnit.mediaType);

			if (count % 2) {
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
			clonedList.append(cloned);
			count++;
		});
		$("#showlist").append(clonedList);
		console.log(clonedList);
		console.log("show list " + $.now() + "  " + count + "\n\n\n");
		$("#showlist").show().children().show();
		$("#showlist").show().children().show();
    	
    }
});

	var minSet = 3;
	$( "#search" ).catcomplete({
		minLength:minSet,
	    source: dataset,

	   	response: function( event, ui ) {
	   		if (ui.content.length < minSet) {
				$("#showlist").empty().hide();		
			}
			$("#match").text(ui.content.length).show().children().show();;
			// when we search and have a subset they are all possible next matches so 
			// why search all 10,000 when we only need to search say 76.
		    //console.log("reduce data");
		    //console.log (ui.content.length);
			$( "#search" ).catcomplete("option","source",ui.content);
	    }, 
	});

	$("#search").on('keydown', function() {
	 	var key = event.keyCode || event.charCode;
	 	//console.log("key " + key);
	 	if( key == 8 ) {
	 		// when we hit the back key we need to refresh to the orginal data source.
	 		console.log("rebuild data " +  $.now());
	 		
	 		$( "#search" ).catcomplete("option","source",dataset);
	        if (($("#search").val().length) <= minSet) {			
				$("#showlist").empty().hide();
				$("#match").hide();
			}
			else {
				$("#match").show();
				$("#showlist").show().children().show();
			}
		}
	});

	$("#button").click( function() {
	 	var key = event.keyCode || event.charCode;
	 	console.log (key);
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



	$("#preferences").click(function(){
		messageNote(1,"informaiton data ", "/mediaPlayer/preference.html");
		$("#accepted").focus();

	});

	function messageNote (toggle, message, file) {
		if (typeof file == "undefined" || file == null) { 
    		file  = ""; 
  		}
        if (toggle == 0) {
            $("#message").text("");
			$("#message").hide();
		}
        else {
			$("#message").load( file) ;
			$("#message").show();
        }
	}
});

 $("#accepted").click(function(){
    messageNote(0,"");
 });


function closePreferencesSave () { 
	 var perPage = $( "#showPerPage option:selected" ).text();
	 var sortBy = $( "#sortBy option:selected" ).text();
	 document.cookie="perPage=" + perPage + "; expires=Thu, 11 March 2014 12:00:00 GMT; path=/";
	 document.cookie="sortBy=" + sortBy + "; expires=Thu, 11 March 2014 12:00:00 GMT; path=/";
	 $("#message").hide();
	 var x = document.cookie;
	 
}
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
