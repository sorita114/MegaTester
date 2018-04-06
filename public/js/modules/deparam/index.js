const deparam = (params) => {
	return params.replace('?', '')
		.split('&')
		.map(function (n) {
			return n = n.split('='), this[n[0]] = n[1], this;
		}.bind({}))[0];
};
export default deparam;