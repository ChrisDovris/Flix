import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
    standalone: true,
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrl: 'header.component.scss',
    imports: [RouterLink,RouterLinkActive,RouterOutlet,RouterModule, MenubarModule]
})

export class HeaderComponent implements OnInit {

    @Input() showTypes : 'movie' | 'tv' = 'movie';
    items: MenuItem[] | undefined;
    
    constructor() { }

    ngOnInit() {
        this.items = [
            { label: 'Home',
            routerLink:'/' },
            { label: 'Movies',
                routerLink:'/shows-list/movie' },
            { label: 'Tv Shows',
                routerLink:'/shows-list/tv' },
            { label: 'Genres',
            routerLink: '/genres' },
        ]
     }
}