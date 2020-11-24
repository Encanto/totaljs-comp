import math = require('mathjs');

const ID = 'e2add';

exports.id = 'e2add';
exports.title = 'Add';
exports.group = 'Common';
exports.color = '#08a351';
exports.version = '1.0.0';
exports.author = 'William Clark';
exports.icon = 'plus-circle';  // Icon reference from https://fontawesome.com/v4.7.0/icons/
exports.input = true;
exports.output = 1;
exports.options = { enabled: true };
exports.readme = `# Add numbers

Adds all values recieved together, and outputs total.`;

exports.html = `<div class="padding">
	<div><i class="fa fa-bar-chart mr5"></i>@(Counter for last 12 months)</div>
	<div data-jc="nosqlcounter" data-jc-path="flowcounterstats" class="m mt10" data-jc-noscope="true" style="height:100px"></div>
</div>
<script>ON('open.counter', function(instance) {
	TRIGGER('{0}', { id: instance.id }, 'flowcounterstats');
});</script>`.format(ID);

exports.install = function(instance: any) {

	var count: math.MathType = 0.0;

	instance.on('data', function(data: any) {
        console.log('data recieved:' + JSON.stringify(data));
        count = math.add(count, data.data);
		NOSQL(ID).counter.hit(instance.id, 1);
		instance.custom.status();
	});

	instance.custom.stats = function(callback) {
		NOSQL(ID).counter.monthly(instance.id, function(err, response) {
			callback(err, response);
		});
	};

	instance.custom.reset = function(callback) {
		NOSQL(ID).counter.clear(function() {
			callback && callback();
		});
	};

	instance.custom.status = function() {
		setTimeout2(instance.id, function() {
			instance.status('total: ' + count.toString());
			instance.send2(count);
		}, 100);
	};

	NOSQL(ID).counter.count(instance.id, function(err, response) {
		count = response;
		instance.custom.status();
	});
};

FLOW.trigger(ID, function(next, data) {
	NOSQL(ID).counter.monthly(data.id, function(err, response) {
		next(response);
	});
});

exports.uninstall = function() {
	FLOW.trigger(ID, null);
};
