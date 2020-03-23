'use strict'

document.addEventListener('DOMContentLoaded',  function(){
	
	let elem = document.querySelector('.message-container');
	
	function togDisplay(e){
		let slidebar = window.innerWidth - document.body.offsetWidth;
		
		function hide(elem){
			if (!elem.hidden) {
				document.body.style.overflow = '';
				document.body.style.width = '';
				elem.hidden = true;
				return true;
			} else {
				document.body.style.overflow = 'hidden';
				document.body.style.width = `${document.body.offsetWidth - slidebar}px`;
				elem.hidden = false;
				return false;
			}
		}

		if (!elem.hidden) {
			document.body.style.overflow = 'hidden';
			document.body.style.width = `${document.body.offsetWidth - slidebar}px`;
		}

		if (e){
			hide(elem);
			e.stopPropagation();
		}
	}
	
	function stopScroll(e){
		
		if (!elem.hidden) {
			
			if (e.type == 'keydown') {
				if (e.key == 'PageUp' || e.key == 'PageDown' || e.key == ' ') {
					e.preventDefault();
					e.stopPropagation();
					return;
				}
			}
			
			if (e.type == 'mousedown' && e.which == 2) {
				e.preventDefault();
				e.stopPropagation();
				return;
			}

			e.preventDefault();
		}
	}

	document.querySelector('.message-container').addEventListener('click', togDisplay);
	document.querySelector('.message').addEventListener('click', (e) => e.stopPropagation() );
	document.querySelector('INPUT').addEventListener('click', togDisplay);
	// document.addEventListener('keydown', stopScroll);
	// document.addEventListener('mousedown', stopScroll);
	// window.addEventListener('wheel', stopScroll, {passive: false});
	
	togDisplay();
});