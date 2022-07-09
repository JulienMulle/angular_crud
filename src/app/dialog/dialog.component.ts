import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, Form } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Seconde main", "reconditionner"];
  productForm !: FormGroup;
  actionBtn: string = "Save"

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder, 
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      comment: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
    })
    if( this.editData){
      this.actionBtn = "Udpate",
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct(): void{
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("produit ajouté");
            this.productForm.reset();
            this.dialogRef.close('save');
            console.log(res)
          },
          error:()=>{
            alert("oups il y a eu une erreur")
          }
        })
      }
    } else{
      this.updateProduct()
    }
  }

  updateProduct(){
    this.api.patchProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("produit modifier avec succès");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:(error):void=>{
        alert("oups debrouille toi !");
        console.log(error)
      }
    })
  }

}
