/**
 * The below methods help render the grabbed images and present them on the plugin screen.
 */
var POPUP = (function(){
	if ($){
		
		/**
		 * Method to fire request to content scripts to get the DOM data.
		 * 
		 * @param actionString The information request.
		 * @param success Function to handle success.
		 * @param failure Function to handle the failure.
		 */
		function getFromSelectedTab(actionString, success, failure){
			chrome.tabs.getSelected(null, function(tab) {
				// Send a request to the content script.
				var params = {
						action : actionString
				}
				
				chrome.tabs.sendRequest(tab.id, params, function(response) {
					if (response){
						success.call(this, response);
					}else{
						failure.call(this);
					}
				});
			});
		}
		
		function loadAllImagesFromTab(onLoad){
			getFromSelectedTab("getAllImages", function(res){
				if (res.images){
					onLoad.call(this, res.images);
				}
			}, function(){
				alert("Oops! Something went wrong.");
			});
		}
		
		function renderImagesOnCanvas(imgArr){
			UTIL.pinterest.addPinMarklet({
				images : imgArr
			});
		}
		
		function checkImage(img){
			
		}
		
		function uncheckImage(img){
			
		}
		
		function isLoggedInFlickr(){
			
		}
		
		function uploadImages(imgArr){
			
		}
		
		return {
			isLoggedIn : function(){
				
			},
			
			init : function(){
				loadAllImagesFromTab( function(imgs){
					renderImagesOnCanvas(imgs);
				});
			}
		}
	}else{
		throw "jQuery not installed.";
	}
})();


/**
 * Create the plugin popup screen.
 */
if ($){
	/**
	 * Onload of popup
	 */
	$(function(){
		if (POPUP){
			POPUP.init();
		}
	});
}