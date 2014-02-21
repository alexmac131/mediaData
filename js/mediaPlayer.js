$(function() {
	$("#match").hide();
	$("#aaa").hide();
	$("#search").focus();
    $("#message").hide();
    $("#closeMessage").hide();
	
	var titles = 0;
	var dataset = new Array ();
	for (var i = 0; i < masterMovie.length; i++){
		var master = "m" + masterMovie[i].id;
		jQuery.data( document.body,master,masterMovie[i]);
		dataset.push( { "id" :masterMovie[i].id , "label" : masterMovie[i].filename });
    }
	titles = masterMovie.length;
	$("#titles").html(titles + " titles available.");

	$.widget( "custom.catcomplete", $.ui.autocomplete, {
 		_renderMenu: function( ul, items ) {
		$("#showlist").empty().show();;
		cssSet = new Array ();
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
		items.sort(compare);

      	$.each( items, function( index, item ) {
		var idset = "m" + item.id ;
		cloned = $("#data").clone().show();
		cloned.attr('id',jQuery.data( document.body, idset).id).css(cssSet);
		var textString = jQuery.data( document.body, idset).filename ;
		var datasize = null;

		console.log ("datasize " + datasize);
		datasize = parseInt (getSizes (jQuery.data( document.body, idset).size));			
		console.log ("datasize " + datasize);
		if (datasize >= 1000)  {
			datasize = parseInt (datasize / 10) /100;
			datasize += " G";
		}
		else if (datasize < 1000  && datasize >= 1)  {
				datasize += " M";

		}
		else {
			datasize += " k";
		}
		cloneyear = $("#year").clone();  // done
		if (jQuery.data( document.body, idset).year != "null") {
			cloneyear.html(jQuery.data( document.body, idset).year);
		}

		clonenas = $("#nas").clone();  // done
		clonenas.html("nas drive:" + jQuery.data( document.body, idset).nasdrive);

		cloneep = $("#ep").clone();  // cloneep
		cloneseries = $("#season").clone();  //done
		if (jQuery.data( document.body, idset).espisode != "null" &&  jQuery.data( document.body, idset).series <= 50) {
				cloneep.html("Episode " + jQuery.data( document.body, idset).espisode);
				cloneseries.html("Season " + jQuery.data( document.body, idset).series);
		}

		clonesize = $("#size").clone();  //clonesizze
		clonesize.html(datasize);
		clonemediaShowType = $("#mediaShowType").clone();  //done
		clonemediaShowType.html(jQuery.data( document.body, idset).mediaType);
		clonegenre = $("#genre").clone();  // done

		cloneName = $("#nametitle").clone();  //done
		cloneName.html(textString);
		cloned.append(cloneyear).append(clonesize).append(cloneep);
		cloned.append(clonegenre).append(clonemediaShowType).append(cloneseries);
		cloned.append(clonenas).append(cloneName);
		$("#showlist").append(cloned);
					
        			
      	});
    }
});

	var minSet = 2;
	$( "#search" ).catcomplete({
		minLength:minSet,
	    source: dataset,

		response: function( event, ui ) {
			if (ui.content.length == 0) {
				$("#showlist").empty().hide();
				$("#match").text(ui.content.length).show();
			}
			else {
				var count = 0;
	      		$.each( ui.content, function( index, item ) {
					count++;
				});
				$("#match").text(count).show();
			}
	     } 
	});

	$("#search").on('keydown', function() {
	 	var key = event.keyCode || event.charCode;
		if( key == 8 || key == 46 ) {
	        var sizenow = $("#search").val().length;
			if (sizenow <= 1) {			
				$("#showlist").empty().hide();
				$("#match").hide();
			}
			else {
				$("#match").show();
				$("#showlist").show();
			}
		}
	});

	function getSizes (number) {
		return number / 1000000;	
	}

	$("#help").click(function(){
	    messageNote(1,"Help data", "/mediaPlayer/sheets/help.html" );
	});
	        
	$("#info").click(function(){
	    messageNote(1,"informaiton data ", "/mediaPlayer/sheets/about.html");
	});
	        
	$("#closeMessage").click(function(){
	    messageNote(0,"");
	});

	function messageNote (toggle, message, file) {
	    if (typeof file == "undefined" || file == null) {
	         file  = "";
	    }
	    if (toggle == 0) {
	        $("#message").text("");
	        $("#message").hide();
	        $("#closeMessage").hide();
	    }
	    else {
	        $("#message").load( file) ;
	        $("#message").show();
	        $("#closeMessage").show();
	    }

	}


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
