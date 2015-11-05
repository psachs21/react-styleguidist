var marked = require('meta-marked');

readExamples = function(markdown) {
	var codePlaceholder = '<%{#}%>';
	var codeChunks = [];

	var renderer = new marked.Renderer();
	renderer.heading = function(text, level, raw) {
		var tag = 'h' + (level + 2);
		return '<' + tag + '>' + text + '</' + tag + '>\n';
	};
	renderer.code = function(code) {
		codeChunks.push(code);
		return codePlaceholder;
	};

	var processed = marked(markdown, {renderer: renderer});
	var html = processed.html;
	var meta = processed.meta;

	var chunks = [];
	var textChunks = html.split(codePlaceholder);
	textChunks.forEach(function(chunk) {
		if (chunk) {
			chunks.push({type: 'html', content: chunk});
		}
		var code = codeChunks.shift();
		if (code) {
			chunks.push({type: 'code', content: code});
		}
	});

	return { examples: chunks, metadata: meta };
};

module.exports = function (source, map) {
	this.cacheable && this.cacheable();

	var data = readExamples(source);

	return [
			'if (module.hot) {',
			'	module.hot.accept([]);',
			'}',
			'module.exports = ' + JSON.stringify(data)
		].join('\n');
};
