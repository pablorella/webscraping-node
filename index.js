// analizing http://datos.energia.gob.ar to save excel

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

let files = [];

request("http://datos.energia.gob.ar/dataset/1c181390-5045-475e-94dc-410429be4b17/archivo/80ac25de-a44a-4445-9215-090cf55cfda5/",
	function (err, res, body) {
		if (!err) {
			var $ = cheerio.load(body);
			//btn btn-green btn-block
			$('a.btn', 'div.resource-actions').each(function () {
				console.log($(this).attr('href'))
				var UrlFileEma = $(this).attr('href')
				files.push(UrlFileEma);
			});
			var today = new Date();
			var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
			var time = today.getHours() + "hs" + today.getMinutes() + "m" + today.getSeconds() + "ss";
			var CurrentDateTime = date + '---' + time;
			for (let i = 0; i < files.length; i++) {
				if (files[i]) {
					request(files[i]).pipe(fs.createWriteStream(`files/${CurrentDateTime}_${i}.csv`))
				}
			}
		}
	});
