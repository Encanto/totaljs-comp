import math = require('mathjs');

const ID = 'e2add';

exports.id = 'e2add';
exports.title = 'Add';
exports.group = 'Math';
exports.color = '#08a351';
exports.version = '1.0.0';
exports.author = 'William Clark';
exports.icon = 'plus-circle';  // Icon reference from https://fontawesome.com/v4.7.0/icons/
exports.input = true;
exports.output = 1;
exports.options = { enabled: true };
exports.readme = `# Add Numbers

Adds numeric values recieved together, and outputs total.`;

exports.html = `<div class="padding">
	<div data-jc="textbox" data-jc-path="initialvalue" data-jc-config="placeholder:0;increment:true;type:number;align:center">@(Initial Value)</div>
</div>`.format(ID);

exports.install = function(instance: any) {

	var count: math.MathType = 0.0;

	instance.on('data', function(data: any) {
        console.log('data recieved:' + JSON.stringify(data));
        count = math.add(count, data.data);
		instance.custom.status();
	});

	instance.custom.stats = function(callback: ICallback) {
	};


	instance.custom.status = function() {
		setTimeout2(instance.id, function() {
			instance.status('total: ' + count.toString());
			instance.send2(count);
		}, 100);
	};

};

exports.uninstall = function() {
	FLOW.trigger(ID, null);
};
