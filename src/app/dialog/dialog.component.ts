import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, Form } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Seconde main", "reconditionner"];
  productForm !: FormGroup

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  addProduct(): void{
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next:(res)=>{
          alert("produit ajouté");
          this.productForm.reset();
        },
        error:()=>{
          alert("oups il y a eu une erreur")
        }
      })
    }
  }

}
