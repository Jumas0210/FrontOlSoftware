import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() isEditMode: boolean = false;
  @Input() totalRevenue: number = 0;
  @Input() totalEmployees: number = 0;
}
