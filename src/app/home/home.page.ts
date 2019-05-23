import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myNum : number = 0;
  title : string = '加減乘除湊12';
  cards : [number, number, number, number] = [
  	Math.floor(Math.random() * 6) + 1,
  	Math.floor(Math.random() * 6) + 1,
  	Math.floor(Math.random() * 6) + 1,
  	Math.floor(Math.random() * 6) + 1
  ];
  used : [boolean, boolean, boolean, boolean] = [false, false, false, false]

  public use (idx) {
  	this.cards[idx] = 0;
  }

  public reset () {
    for (var i = 0; i < 4; ++i) {
    	this.cards[i] = Math.floor(Math.random() * 6) + 1
    }
    this.myNum = 0;
  }

  public makecard () {
  	for (var i = 0; i < 4; ++i) {
  		if (this.cards[i] == 0) {
  			this.cards[i] = this.myNum;
  			this.myNum = 0;
  			break;
  		}
  	}
  }

  public count (o, item, index) {
  	this.use(index)
  	switch (o) {
  		case '+':
  			this.myNum += item;
  			break;
  		case '-':
  			this.myNum -= item;
  			break;
  		case '*':
  			this.myNum *= item;
  			break;
  		case '/':
  			this.myNum /= item;
  			break;
  		default:
  			this.myNum = 0
  	}
  }
}
