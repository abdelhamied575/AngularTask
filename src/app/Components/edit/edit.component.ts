import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/Core/Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Productdata } from 'src/app/Core/Services/interfaces/productdata';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {


  imagePreviews: string[] = [];


  productForm: FormGroup;
  productId: number;

  constructor(
    private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute,
    private _FormBuilder: FormBuilder,
    private _Router: Router,
    private toster:ToastrService
  ) {
    this.productForm = this._FormBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      price: ['', [Validators.required, Validators.min(0)]],
      brand: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      tags: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      images: ['', [Validators.required]]
    });

    this.productId = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
  }

  // ngOnInit(): void {
  //   this._ProductService.getProductById(this.productId).subscribe({
  //     next: (product: Productdata) => {
  //       this.productForm.patchValue({
  //         title: product.title,
  //         description: product.description,
  //         price: product.price,
  //         brand: product.brand,
  //         tags: product.tags ,
  //         images: product.images[0]
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Error No product:', err);
  //     }
  //   });
  // }

  ngOnInit(): void {
  this._ProductService.getProductById(this.productId).subscribe({
    next: (product: Productdata) => {
      this.productForm.patchValue({
        title: product.title,
        description: product.description,
        price: product.price,
        brand: product.brand,
        tags: product.tags.join(', '),
        images: product.images[0]
      });
    },
    error: (err) => {
      console.error('Error No product:', err);
    }
  });
}


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
  }
}



  handleForm(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const productData: Productdata = {
        title: formValue.title,
        description: formValue.description,
        price: formValue.price,
        brand: formValue.brand,
        tags: formValue.tags,
        images: formValue.images 
      };

      this._ProductService.updateProduct(this.productId,productData).subscribe({
        next: (response) => {
          console.log('Product updated:', response);
          this._Router.navigate(['/home']);
          this.toster.success('Product updated successfully');
          
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.toster.error('Error updating product', error.message);
        }
      });
    } else {
      console.log('Invalid form');
    }
  }


}
