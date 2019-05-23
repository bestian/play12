import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title : string = 'play12'
  cards : [number] = [6, 4, 2, 1]

  public reset () {
    for (var i = 0; i < 4; ++i) {
    	this.cards[i] = Math.floor(Math.random() * 6) + 1
    }
  }
}
