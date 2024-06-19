import { Component } from '@angular/core';
import { MatListItem } from '@angular/material/list';

interface MenuItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListItem],
  template: `
    @for (item of menuItems; track item.path) {
      <a mat-list-item [href]="item.path">{{item.label}}</a>
      }
  `,
  styles: ``
})
export class MenuComponent {

  menuItems: Array<MenuItem> = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/categories",
      label: "Categorias",
    },
    {
      path: "/suppliers",
      label: "Suppliers",
    },
  ]
}
