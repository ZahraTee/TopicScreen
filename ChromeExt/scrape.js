var i, imgs, token;
blocked_topics = [];
saveBlockedTopic("man");

document.body.appendChild('<div class="user_box">');


function saveBlockedTopic(topic)
{
	chrome.storage.sync.get("blocked_topics", function(items)
	{
		//blocked_topics = items.blocked_topics;
		blocked_topics = ["girl", "politics", "war"];
		blocked_topics.push(topic);
		chrome.storage.sync.set({'blocked_topics': blocked_topics}, function() {
         getBlockedTopics();
        });
	})
}

function getBlockedTopics()
{
	chrome.storage.sync.get("blocked_topics", function(items)
	{
		blocked_topics = items.blocked_topics;
		getToken();
	})
	return blocked_topics;
}

function getToken()
{
	$.post("https://api.clarifai.com/v1/token/", {grant_type: "client_credentials", client_id: "0tibu3hLLX0yM_B1IZj_wfIyweqsjhn6w5XRS41O", client_secret: "uS8pDSrBUiR3ZucHLcIrDcU0MMYObopodjU0zmkD"}, function(result){
        console.log(result);
        token = result;
        imgs = $('img');
		for (i = 0; i < imgs.length; i++) {
			var alttext = getImageTagsFromURL(blocked_topics, imgs[i], imgs[i].src);
		}
	});
}

function getImageTagsFromURL(blocked, image_element,image_url)
{
	if (image_url == null || image_url == "") { return; }
	var pic_formats = ["jpg", "jpeg", "png", "gif", "bmp", "tiff"];
	var count;
	for (var i in pic_formats) { if (endsWith(image_url, pic_formats[i])) count++; }
	if (count == 0) return;

	$.ajax({
		url: 'https://api.clarifai.com/v1/tag/',
		type: 'POST',
		beforeSend: function (xhr) {
		    xhr.setRequestHeader('Authorization', 'bearer ' + "JZ5hbKIpkw3HmxVii3A7kqnZIaTwHZ");
		},
		data: {url: image_url},
		success: function (object) {
			for (i = 0; i < object.results.length; i++) {
				var keywords = object.results[i].result.tag.classes;
				for(x = 0; x < keywords.length; x++)
				{
					if (blocked.indexOf(keywords[x]) > -1) {
						$(image_element).after('<div class="overlay"><h3>Image blocked by TopicScreen</h3></div>');
						$(image_element).each(function(index) {
							$(this).next(".overlay").andSelf().wrapAll("<div class='ce-container'/>")
						});
					}
				}
			}
		},
		error: function (err) { return "Unreadable image."},
	});
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}