import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CategoriesDataSource, CategoriesItem } from './categories-datasource';
import { MatCardModule } from '@angular/material/card';
import { Category } from './category.dto';
import { CategoryService } from './category.service';
import { lastValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { CategoryFormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { LoadingBarComponent } from '../loading-bar.component';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }
    
  `,
  standalone: true,
  imports: [MaterialModule, CategoryFormComponent, LoadingBarComponent]
})
export class CategoriesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;
  dataSource = new MatTableDataSource<Category>();

  category!: Category

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'action'];

  showForm: boolean = false

  showLoading: boolean = false

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {

  }

  onNewCategoryClick() {
    this.category = {
      id: 0,
      name: '',
      description: ''
    }

    this.showForm = true
    // console.log(this.showForm);
  }

  onEditCategoryClick(category: Category) {
    this.category = {
      id: category.id,
      name: category.name,
      description: category.description
    }
    console.log("edit category: ", category.id, category.name, category.description);
    this.showForm = true
  }

  async onDeleteCategoryClick(category: Category) {
    if (confirm(`Deletar "${category.name}" com id ${category.id} ?`)) {
      this.showLoading = true
      await lastValueFrom(this.categoryService.delete(category.id))
      this.showLoading = false
      this.loadCategories();
    }
  }

  hideCategoryForm() {
    this.showForm = false
    this.loadCategories()
  }

  onSave(category: Category) {
    console.log('saving category ', category);
    const saved = lastValueFrom(this.categoryService.save(category))
    console.log('Saved', saved);
    // this.hideCategoryForm()
    this.showForm = false
    this.loadCategories()

  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
    this.loadCategories()
    console.log(this.showForm);

  }

  async loadCategories(): Promise<void> {
    this.showLoading = true
    const categories = await lastValueFrom(this.categoryService.getAll())
    this.dataSource = new MatTableDataSource(categories)
    this.table.dataSource = this.dataSource
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.showLoading = false
  }




}
