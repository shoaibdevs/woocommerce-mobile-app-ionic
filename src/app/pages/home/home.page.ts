import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Swiper } from 'swiper';
import { ApiService } from 'src/app/service/api.service';
import { register } from 'swiper/element/bundle';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

 
  constructor(
    public service: ApiService,
    public router: Router
  ) { }
  bannerData: any = [
    {
      banners_image: 'https://www.elitegemscollection.com/wp-content/uploads/2024/08/bvf.jpg'
    },
    {
      banners_image: 'https://www.elitegemscollection.com/wp-content/uploads/2024/08/sdw-01-scaled.jpg'
    }
  ];
  categories: any[] = [];
  topRatedProducts: any;
  ngOnInit() {


    this.loadData();
  }

  loadData(){
    const banner$ = this.service.getBanner();
    const category$ = this.service.getCategory();
    const topRated$ = this.service.getTopRated();
  
    forkJoin([category$, topRated$]).subscribe((res: any[]) => {
      // if (res[0].data) {
      //   this.bannerData = res[0].data;
      // }
      this.categories = res[0];
      this.topRatedProducts = res[1];
    });
  }
  
  handleRefresh(event: any) {
    // const banner$ = this.service.getBanner();
    const category$ = this.service.getCategory();
    const topRated$ = this.service.getTopRated();
  
    forkJoin([category$, topRated$]).subscribe((res: any[]) => {
      // if (res[0].data) {
      //   this.bannerData = res[0].data;
      // }
      this.categories = res[0];
      this.topRatedProducts = res[1];
      event.target.complete();
    });
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }
 
  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  

}
