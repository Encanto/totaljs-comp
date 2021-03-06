import math = require('mathjs');

const ID = 'e2multiply';

exports.id = 'e2multiply';
exports.title = 'Multiply';
exports.group = 'Math';
exports.color = '#08a351';
exports.version = '1.0.0';
exports.author = 'William Clark';
exports.icon = 'times-circle';  // Icon reference from https://fontawesome.com/v4.7.0/icons/
exports.input = true;
exports.output = 1;
exports.options = { enabled: true };
exports.readme = `# Multiply Numbers

Multiplies numeric values recieved together, and outputs total.`;

exports.html = `<div class="padding">
	<div data-jc="textbox" data-jc-path="initialvalue" data-jc-config="placeholder:0;increment:true;type:number;align:center">@(Initial Value)</div>
</div>`.format(ID);

exports.install = function(instance: any) {

	var count: math.MathType = 0.0;

	instance.on('data', function(data: any) {
        // console.log('data recieved:' + JSON.stringify(data));
        count = math.multiply(count, data.data);
		instance.custom.status();
	});

	instance.custom.stats = function(callback: Function) {
	};


	instance.custom.status = function() {
		setTimeout2(instance.id, function() {
			instance.status('total: ' + count.toString());
			instance.send2(count);
		}, 100);
	};

	instance.custom.reconfigure = function() {
		count = instance.options.initialvalue;
		instance.custom.status();
	};

	instance.custom.reconfigure();
	instance.on('options', instance.custom.reconfigure);
};

exports.uninstall = function() {
	FLOW.trigger(ID, null);
};
