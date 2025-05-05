import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoderService } from 'src/app/Core/Services/loder.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  showLoader: boolean = false;

  constructor(private _loaderService: LoderService) {
    

    this._loaderService.isLoading.subscribe(
      
      (value) => (this.showLoader = value)
    )
  

  }

}
