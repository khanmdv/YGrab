/**
 * These methods will run on the current tab and provide DOM data to the plugin. 
 *
 */
var YGRAB = (function(){
	var findAllImages = function(){
		var results = [];
		
		$("body").find("img").each(function(){
			var $el = $(this);
			results.push({
				src : $el.attr("src"),
				alt : $el.attr("title") ? $el.attr("title") : $el.attr("alt")
			});
		});
		
		return results;
	}
	
	return {
		"findAllImages" : findAllImages
	}
})();

/**
 * Listen to the requests from the plugin and respond accordingly.
 * 
 */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "getAllImages"){
		sendResponse( { 
						images : YGRAB.findAllImages()
					  });
	} else {
		sendResponse({}); // Send nothing..
	}
});
