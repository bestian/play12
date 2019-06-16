import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  win: boolean = false;
  wins : number = 0;
  myNum : number = 0;
  title : string = '加減乘除湊12';
  target: number = 12;
  cards : [number, number, number, number] = [
  	Math.floor(Math.random() * 6) + 1,
  	Math.floor(Math.random() * 6) + 1,
  	Math.floor(Math.random() * 6) + 1,
  	Math.floor(Math.random() * 6) + 1
  ];

  constructor(private storage: Storage) {
  }

  // set a key/value
  public setValue(key: string, value: any) {
    this.storage.set(key, value).then((response) => {
      console.log('set' + key + ' ', response);
 
      //get Value Saved in key
      this.getValue(key);
 
    }).catch((error) => {
      console.log('set error for ' + key + ' ', error);
    });
  }

  // get a key/value pair
  getValue(key: string) {
    this.storage.get(key).then((val) => {
      console.log('get ' + key + ' ', val);
      this[key] = "";
      this[key] = val;
    }).catch((error) => {
      console.log('get error for ' + key + '', error);
    });
  }

  public iWin () {
    this.win = true;
    this.wins++
  }

  public isWin () {
    var ans = true
    for (var i = 0; i < this.cards.length; ++i) {
      if (this.cards[i] != 0) { ans = false }
    }
    if (this.myNum != 12) { ans = false }
    return ans
  }

  public use (idx) {
  	this.cards[idx] = 0;
  }

  public reset () {
    for (var i = 0; i < 4; ++i) {
    	this.cards[i] = Math.floor(Math.random() * 6) + 1
    }
    this.myNum = 0;
    this.win = false;
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
    console.log(this.isWin())
    if (this.isWin()) {
      this.iWin()
    }
  }
}
