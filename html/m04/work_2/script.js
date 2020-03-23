'use strict'

let messageDefault = false;

document.addEventListener('DOMContentLoaded',  function(){
  
  let el_message = document.querySelector('.message-container');
  
  function hideScroll(){
    let slidebarWidth = window.innerWidth - document.body.offsetWidth;
    if ( document.body.style.overflowY !== 'hidden' && slidebarWidth ) {
      document.body.style.overflowY = 'hidden';
      document.body.style.width = `${document.body.offsetWidth - slidebarWidth}px`;
      return true;
    }
  }
  
  function showScroll(){
    if (document.body.style.overflowY == 'hidden') {
      document.body.style.overflowY = '';
      document.body.style.width = '';
      return true;
    }
  }
  
  function toggleScroll(){
    hideScroll() || showScroll()
  }
  
  function hideElem(el){
    showScroll()
    if (!el.hidden) {
      el.hidden = true;
      return true;
    }
  }
  
  function showElem(el){
    hideScroll()
    if (el.hidden) {
      el.hidden = false;
      return true;
    }
  }
  
  function toggleDisplay(flag = null){//bool или ничего
    if (flag === true){
      showElem(el_message);
    } else if (flag === false){
      hideElem(el_message)
    } else {
      hideElem(el_message) || showElem(el_message);
    }
    
  }

  el_message.addEventListener('click', toggleDisplay);
  document.querySelector('.message').addEventListener('click', (e) => e.stopPropagation() );
  document.querySelector('#toggleScroll').addEventListener('click', toggleScroll);
  document.querySelector('#toggleDisplay').addEventListener('click', toggleDisplay);
  
  toggleDisplay(messageDefault);
});