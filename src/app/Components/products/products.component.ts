import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/Core/Services/product.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {


  constructor(private _ProductService:ProductService,private toster:ToastrService,private _Router:Router,private fb: FormBuilder) { }


  imagePreviews: string[] = [];


  productForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(10)]],
    price: ['', [Validators.required, Validators.min(0)]],
    brand: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    tags: this.fb.array([this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])]),
    images: [[], Validators.required]
  });

  get tags(): FormArray {
    return this.productForm.get('tags') as FormArray;
  }
  
  addTag(): void {
    this.tags.push(this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]));
  }
  
  removeTag(index: number): void {
    this.tags.removeAt(index);
  }
  
 
  // onFileChange(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   const files = target.files;
  
  //   if (files!=null && files.length > 0) {

  //     const fileNames: string[] = Array.from(files).map(file => file.name);
      
  //     this.productForm.patchValue({ images: fileNames });
      
  //     console.log('Selected file names:', fileNames);
  //   } 
  // }

  onFileChange(event: Event): void {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    const fileNames: string[] = [];
    this.imagePreviews = []; 

    Array.from(files).forEach((file) => {
      fileNames.push(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });

    this.productForm.patchValue({ images: fileNames });
    console.log('Selected file names:', fileNames);
  }
}


  
  handleForm():void{
    if(this.productForm.valid){
      console.log(this.productForm.value);
      this._ProductService.addProduct(this.productForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          this._Router.navigate(['/home']);
          this.toster.success('Product Added Successfully');
        },
        error:(error)=>{
          console.log(error);
          this.toster.error('Error Adding Product');
        }
      })
    }else{
      console.log('invalid form');
      this.toster.error('Invalid Form');
    }
  }


  




}
