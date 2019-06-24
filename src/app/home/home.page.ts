import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  lastWork: string = '';
  slow: boolean = true;
  win: boolean = false;
  wins : number = 0;
  maxWins: number = 0;
  myNum : number = 0;
  target: number = 12;
  max: number = 6;
  cards : [number, number, number, number] = [
  	Math.floor(Math.random() * 6) + 1,
  	Math.floor(Math.random() * 6) + 1,
  	Math.floor(Math.random() * 6) + 1,
  	Math.floor(Math.random() * 6) + 1
  ];

  constructor(private storage: Storage) {
    this.getValue('maxWins');
  }

  // set a key/value
  public setValue(key: string, value: any) {
    this.storage.set(key, value).then((response) => {
      console.log('set' + key + ' ', response);
    }).catch((error) => {
      console.log('set error for ' + key + ' ', error);
    });
  }

  // get a key/value pair
   public getValue(key: string) {
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
    this.getValue('maxWins')
    this.wins++;
    if (this.wins > this.maxWins) {
      this.setValue('maxWins', this.wins);
      this.getValue('maxWins')
    }
  }

  public isWin () {
    var ans = true
    for (var i = 0; i < this.cards.length; ++i) {
      if (this.cards[i] != 0) { ans = false }
    }
    if (this.myNum != this.target) { ans = false }
    return ans
  }

  public use (idx) {
  	this.cards[idx] = 0;
  }

  public reset () {
    for (var i = 0; i < 4; ++i) {
    	this.cards[i] = Math.floor(Math.random() * this.max) + 1
    }
    this.myNum = 0;
    if (!this.win) { this.wins = 0}
    this.win = false;
    this.lastWork = '';
  }

  public do24 () {
    this.target = 24;
    this.max = 9;
    this.reset();
  }

  public do12 () {
    this.target = 12;
    this.max = 6;
    this.reset();
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
        this.lastWork = this.myNum + '+' + item + '=' + (this.myNum + item);
  			this.myNum += item;
  			break;
  		case '-':
        this.lastWork = this.myNum + '-' + item + '=' + (this.myNum - item);
  			this.myNum -= item;
  			break;
  		case '*':
        this.lastWork = this.myNum + '×' + item + '=' + (this.myNum * item);
  			this.myNum *= item;
  			break;
  		case '/':
        this.lastWork = this.myNum + '÷' + item + '=' + (this.myNum / item);
  			this.myNum /= item;
  			break;
  		default:
  			this.myNum = 0
  	}
    if (this.isWin()) {
      this.iWin()
    } else {
      if (this.slow) {
        this.makecard()
      }
    }
  }
}
