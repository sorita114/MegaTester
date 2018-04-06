$(function () {
	$.validator.methods.email = function (value, element) {
		return this.optional(element) || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
	};
	$('#loginForm').validate({
		rules : {
			email : {
				email : true
			}
		},
		submitHandler: function (form) {
			$.post('/login', deparam($(form).serialize()))
				.done(function (response) {
					console.log('response : ', response);
				});
			return false;
		}
	});

	$('#loginUserName, #loginPassword').on('focus blur keyup', function () {
		var $this = $(this);

		$this
			.nextAll('.label-material')
			.toggleClass('hidden', $this.val() !== '');
	});
});