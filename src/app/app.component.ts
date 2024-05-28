import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, 
      HeaderComponent, 
      FooterComponent,
      RouterLink, 
      RouterLinkActive, 
      HttpClientModule,
      RouterModule,
      TabViewModule,
      ImageModule,
      CarouselModule,
      InputTextModule,
      PaginatorModule
      ],
})
export class AppComponent {
  title = 'Flix';
}
