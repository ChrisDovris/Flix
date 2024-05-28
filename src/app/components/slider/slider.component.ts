import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { imagesBaseUrl } from '../../constants/images-url';
import { Movie } from '../../types/movie';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [JsonPipe,AsyncPipe,CommonModule,RouterLink],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [
      state('void', style({opacity: 0})),
      transition('void <=> *',[animate('1s')])
    ])
  ]
  })


export class SliderComponent implements OnInit {

@Input() slides : Movie[] = [];
@Input() isHeader = false;

  imgsBaseUrl = imagesBaseUrl;

  slideIndex = 0;

  ngOnInit(){
    if(!this.isHeader){
      this.changeSlide();
    }
  }

changeSlide() {
  setInterval(() => {
    this.slideIndex++;
    if(this.slideIndex > 10) {
      this.slideIndex = 0;
    }
  }, 5000)
}

}




