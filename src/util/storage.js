var Storage = {};

/**
 * 检查是否支持localStorage
 * @return Boolean
 */
Storage.isAvailable = function() {
	if (typeof localStorage === 'object') {
		return true;
	} else {
		return false;
	}
};
Storage.set = function(key, value) {
	localStorage.setItem(key, value + "");
};
Storage.get = function(key) {
	return localStorage.getItem(key);
}
Storage.remove = function(key) {
	localStorage.removeItem(key);
};
Storage.clear = function() {
	localStorage.clear();
}

module.exports = Storage;