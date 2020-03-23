import './index.scss';

export class Counter {
  
  constructor(el) {
    this.btn = el;
    this.btn.addEventListener('click', this.addition);
  }
  
  addition(e) {
    let val = ( !isNaN(+e.currentTarget.value) ) ? +e.currentTarget.value : 0;
    return function(){
      e.currentTarget.value = val + 1;
    }()
  }
}