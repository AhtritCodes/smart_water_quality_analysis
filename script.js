document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?LR-verbose&snipver=1&LiveTest=1"></' + 'script>')

const solnNameInput = document.querySelector('#soln-name');
const pHValueInput = document.querySelector('#pH-value');
const sendBtn = document.querySelector('#send-data');
const refreshBtn = document.querySelector('#receive-data');

let count = 0;

// fetching urls
const db_route = 'http://localhost:1337/data';
const send_route = 'http://localhost:1337/sendDataFront';

// send form values
sendBtn.addEventListener('click', (e) => {
	e.preventDefault();

	// send data to server
	const nameValue = solnNameInput.value;
	const phValue = parseFloat(pHValueInput.value);

	const frontData = {
		"name": nameValue,
		"pH": phValue
	};

	fetch(send_route, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(frontData)
	})
	.then(response => response.json())
	.then(data => {
		document.querySelector('#post-response').innerHTML = `Response: <br><br> ${JSON.stringify(data)} <br><br>`;
	})
	.catch(err => {
		console.error('Error: ', err);
	});

	solnNameInput.value = '';
	pHValueInput.value = '';

});


// all data from database
refreshBtn.addEventListener('click', (e) => {
	e.preventDefault();

	fetchDbData(db_route);
});


// microbes name from api
// viewTempBtn.addEventListener('click', (e) => {
// 	e.preventDefault();

// 	const url = api_route + `/temp/${tempVal}`;
// 	fetchTempMicrobes(url);
// });


// viewpHBtn.addEventListener('click', (e) => {
// 	e.preventDefault();

// 	const url = api_route + `/temp/${pHVal}`;
// 	fetchpHMicrobes(url);
// });


// ##############################################

// helper functions
// ==============================

// fetch function
const fetchDbData = (url) => {

	// let response = await fetch(url);
	fetch(url)
	.then(response => response.json())
	.then(data => showTableHtml(data));

}


// updata table html 
const showTableHtml = (data) => {

	const table = document.querySelector('table tbody');
	let string = '';

	// store temp and pH values from db
	tempVal = data.temp;
	pHVal = data.pH;

	if (data.data == 'not found') {
		table.innerHTML = `<tr><td class='no-data' colspan='3'>No Data</td></tr>`;

		count = 1;
	} else {

		if(count <= 1) {
			table.innerHTML = '';
		}


		data.forEach((arr) => {
			string += `<tr>`;
			string += `<td>${arr.id}</td>`;
			string += `<td>${arr.name}</td>`;
			string += `<td>${arr.temp}</td>`;
			string += `<td>${arr.tds}</td>`;
			string += `<td>${arr.pH}</td>`;
			string += `<td>${arr.tempMicrobe}</td>`;
			string += `<td>${arr.phMicrobe}</td>`;
			string += `</tr>`;
		});

		// console.log(table.innerHTML);

		table.innerHTML = string;
	}

}
