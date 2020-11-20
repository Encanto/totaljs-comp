var math = require('mathjs');

const ID = 'flowcounter';

exports.id = 'e2-add';
exports.title = 'Add';
exports.version = '1.0.0';
exports.author = 'William Clark';
exports.color = '#08a351';
exports.icon = 'plus-circle';  // Icon reference from https://fontawesome.com/v4.7.0/icons/
exports.input = true;
exports.output = 1;
exports.options = { enabled: true };
exports.readme = `# Counter

Precision addition of two numeric values;`

exports.html = `<div class="padding">
<div data-jc="textbox" data-jc-path="initialvalue" data-jc-config="placeholder:1;increment:true;type:number;align:center">@(Initial Value)</div>
<div data-jc="textbox" data-jc-path="increment" data-jc-config="placeholder:1;increment:true;type:number;align:center">@(Increment)</div>
<p><a href="https://youtu.be/NuUbTm1oRE0" target="_blank">Example Video</a></p>
</div>`

exports.readme = `# Count

This component counts the number of messages received.  Wow.

__Response:__

Integer value based on the initial value and increment settings.

__Arguments:__
- Initial Value: What number should be output on the receipt of the first message.
- Increment: What should the increment be for each following message received.`;

exports.install = function(instance: any) {

	var count = 0;

	instance.on('data', function(response: any) {
		try {
			count = math.add(count, response.data);
			instance.send2(count); 	
		} catch (e) {
			instance.error('Code: ' + e.message);
		}
	});

};