import { Component } from '@angular/core';
import { FooterComponent } from "../common/footer/footer.component";
import { SidebarComponent } from "../common/sidebar/sidebar.component";
import { HeaderComponent } from "../common/header/header.component";
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-layout',
    standalone: true,
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css',
    imports: [FooterComponent, SidebarComponent, HeaderComponent, RouterModule]
})
export class LayoutComponent {

}
