(function () {
	// Mustard cutting
	if (!window.requestAnimationFrame) return;


	var delay = 15000;
	var slides = Array.prototype.slice.call(
		document.querySelectorAll('.slide')
	);
	var items = Array.prototype.slice.call(
		document.querySelectorAll('.slides__item')
	);
	var slideButtons = Array.prototype.slice.call(
		document.querySelectorAll('.slides__button')
	);
	var progress = document.querySelector('.slides__progress');
	var timeout;


	function nextSlide() {
		var activeSlide = document.querySelector('.slide--active');
		var index = slides.indexOf(activeSlide);
		var nextIndex = index === slides.length - 1 ? 0 : index + 1;

		showSlide(nextIndex);
	}


	function showSlide(index) {
		var activeSlide = document.querySelector('.slide--active');
		var activeItem = document.querySelector('.slides__item--active');

		activeSlide.classList.remove('slide--active');
		slides[index].classList.add('slide--active');

		activeItem.classList.remove('slides__item--active');
		items[index].classList.add('slides__item--active');

		progress.classList.remove('slides__progress--play');
		requestAnimationFrame(function () {
			requestAnimationFrame(function () {
				progress.classList.add('slides__progress--play');
			});
		});

		clearTimeout(timeout);
		timeout = setTimeout(nextSlide, delay);
	}


	function onItemClick(event) {
		var index = items.indexOf(event.currentTarget);

		showSlide(index);
	}


	function onButtonClick(event) {
		var indexDiff = slideButtons.indexOf(event.currentTarget) === 0 ? -1 : 1;
		var activeSlide = document.querySelector('.slide--active');
		var index = slides.indexOf(activeSlide) + indexDiff;

		if (index === -1) {
			index = slides.length - 1;
		} else if (index === slides.length) {
			index = 0;
		}

		showSlide(index);
	}


	function prefetch(href) {
		var link = document.createElement('link');
		link.rel = 'prefetch';
		link.href = href;
		document.head.appendChild(link);
	}


	progress.classList.add('slides__progress--play');
	timeout = setTimeout(nextSlide, delay);

	items.forEach(function (item) {
		item.addEventListener('click', onItemClick);
	});

	slideButtons.forEach(function (button) {
		button.addEventListener('click', onButtonClick);
	});

	slides.slice(1).forEach(function (slide) {
		prefetch(slide.getAttribute('data-img'));
	});
})();
