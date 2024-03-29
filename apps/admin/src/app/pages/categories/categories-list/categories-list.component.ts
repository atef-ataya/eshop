import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  
  constructor(
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void {
   this._getCategories();
  }

  deleteCategory(categoryId: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(categoryId).subscribe(() =>{
          this._getCategories();
          this.messageService.add({severity:'success', summary:'Success', detail:'Category is Deleted!'});
        },()=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Category is Not deleted.'});
        })
      }
  });
  
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories(){ 
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats;
    })
  }
}
