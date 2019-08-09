let listContent = document.querySelector('.list-content');
let profileList = document.getElementById('profile-list');
let profileDetails = document.getElementById('profile-details');

let user = {};
let results = [];

fetch('https://randomuser.me/api/?results=50')
	.then(response => response.json())
	.then(data => {
		results = data.results;
		//console.log(results);
		let index = 0;

		for (const user of data.results) {
			listContent.innerHTML += `
			<div class="card p-4 card-users d-flex" >
				<a class="button-detail" onclick="selectUser(${index})"> 
					<img src="${
						user.picture.medium
					}" class="card-img-top rounded-circle img-list" alt="user image">
					<div class="card-body p-0">
							<ul>
								<li>Name: ${user.name['first']} ${user.name['last']}</li>
								<li>City: ${user.location['city']}</li>
								<li>State: ${user.location['state']}</li>
							</ul>
					</div>
				</a>
			</div>
		`;
			index++;
		}
	});

// acá comencé a probar con jQuery

function selectUser(index) {
	$('.profile-details').click(function() {
		$('.profile-details').fadeIn(500);
	});
	console.log(results[index]);
	user = results[index];
	profileList.classList.add('hide');
	profileDetails.classList.remove('hide');

	//detailed card
	$('.details img').attr('src', user.picture.large);
	$('.details img')
		.animate({ width: '90%' }, 1000)
		.animate({ fontSize: '24px' }, 1000)
		.animate({ boxShadow: 'inset 0 0 1px red' });
	$('.detail-description').fadeIn('slow');
	$('.details .name').html(
		user.name['title'] + ' ' + user.name['first'] + ' ' + user.name['last']
	);
	$('.details .direction').html(
		user.location['street'] +
			' Street, ' +
			user.location['city'] +
			', ' +
			user.location['state']
	);
	$('.details .email').html(user.email);
	$('.details .gender').html(
		user.gender + ' | ' + user.dob['age'] + ' years old.'
	);
	$('.details .phone').html('Mobile: ' + user.cell);
}

showDetails();
function showDetails() {
	$('.button-detail').click(function(e) {
		e.preventDefault();
		$('img.img-list')
			.slideUp(300)
			.fadeIn(400);
		$('.detail-description li')
			.slideDown(300)
			.delay(800)
			.fadeIn(400);
	});

	$('.detail-image').hover(
		function() {
			$('.button-back').css('opacity', 1);
		},
		function() {
			$('.button-back').css('opacity', 0);
		}
	);

	$('.button-back').hover(
		function() {
			$('.detail-image').attr(
				'box-shadow',
				'-10px -10px 20px 10px rgba(0, 0, 0, 0.4)'
			);
			$('.detail-image').attr('filter', 'brightness(0.5)');
			$('.button-back').css('opacity', 1);
		},
		function() {
			$('.detail-image').removeAttr('filter');
			$('.detail-image').removeAttr('box-shadow');
		}
	);
}

function backDetails() {
	$('.button-back').click(function(e) {
		e.preventDefault();
		profileList.classList.remove('hide');
		$('.profile-details').fadeIn(500);
		profileDetails.classList.add('hide');
	});
}

// animacion del titulo
// si no separaba las letras no me tomaba la animacion

const titlePrinc = document.querySelector('.title-princip');

titleText = titlePrinc.innerHTML;
lettersArray = titleText.split('');
titlePrinc.innerHTML = '';
console.log(lettersArray);

var span;
var letter;

for (i = 0; i < lettersArray.length; i++) {
	span = document.createElement('span');
	letter = document.createTextNode(lettersArray[i]);
	if (lettersArray[i] == ' ') {
		byline.appendChild(letter);
	} else {
		span.appendChild(letter);
		titlePrinc.appendChild(span);
	}
}
