console.log("shit");
saveBlockedTopic();

var wrapper         = $(".input_fields_wrap"); //Fields wrapper
var add_button      = $(".add_field_button"); //Add button ID

$(add_button).click(function(e){ //on add input button click
    e.preventDefault();
        $(wrapper).append('<div><input type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
    }
});

$(wrapper).on("click",".remove_field", function(e){ //user click on remove text
    e.preventDefault();
    deleteBlockedTopic();
})

function saveBlockedTopic(topic)
{
	chrome.storage.local.get("blocked_topics", function(items)
		{
			blocked_topics = ["girl", "politics", "war"];
			console.log(items);
			blocked_topics.push(topic);
			chrome.storage.sync.set({'blocked_topics': blocked_topics}, function() {
	          // Notify that we saved.
	          message('Settings saved');
	        });
		})
	}
}

function deleteBlockedTopic(topic)
{
	StorageArea.get("blocked_topics", function(items)
		{
			blocked_topics = items.blocked_topics;
			console.log(items);
			blocked_topics.remove(topic);
			chrome.storage.sync.set({'blocked_topics': blocked_topics}, function() {
	          // Notify that we saved.
	          message('Settings saved');
	        });
		})
	}
}

    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div><input type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});