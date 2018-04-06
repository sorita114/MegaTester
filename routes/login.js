const express = require('express');
const CONSTS = require('../bin/consts');
const axios = require('axios');
const router = express.Router();

const API_DOMAIN = process.env.NODE_ENV === 'production' ? CONSTS.API_DOMAIN : 'http://localhost:3000';

/* GET home page. */
router.get('/', (req, res) => {
	res.render('login', { title: 'Login' });
});
//TODO:email, password encoding 추가!필요
//TODO:password validate 규칙 추가 수정 필요
router.post('/login', ({body}, res) => {
	let result = validateFormData(body);
	if (!result.status) {
		throw result.message;
	} else {
		axios.post(API_DOMAIN + '/login', body)
			.then((response) => {
				res.status(200)
					.send(response.data)
					.end();
			})
			.catch((error) => {
				throw error;
			});
	}
});

function validateFormData({email, password}) {
	if(!email || !password) {
		return {
			message : 'empty formData',
			status : false
		};
	}
	if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(decodeURIComponent(email))) {
		return {
			message : 'please.check email!',
			status : false
		}
	}

	return {
		message : 'success',
		status : true
	}
}

module.exports = router;