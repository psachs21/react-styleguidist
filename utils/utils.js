module.exports.setComponentsNames = function setComponentsNames(components) {
	components.map(function(component) {
		var module = component.module;
		component.name = module.displayName || module.name;
		if (!component.name) {
			throw Error('Cannot detect component name for ' + component.filepath);
		}
	});
	return components;
};

module.exports.globalizeComponents = function globalizeComponents(components) {
	components.map(function(component) {
		global[component.name] = component.module;
	});
};
