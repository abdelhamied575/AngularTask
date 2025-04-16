import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/Components/navbar/navbar.component';
import { FooterComponent } from 'src/app/Components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent,RouterOutlet],
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {

}
