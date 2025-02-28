import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { IMerchant } from '../../../../models/merchant.model';
import { IResponse} from '../../../../models/response.model';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { MerchantService } from '../../../../core/services/merchant.service';
import { FormsModule } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  
  private router = inject(Router);
  public userService = inject(UserService);
  private merchantService = inject(MerchantService);

  public data : IResponse<IMerchant[]>  | null =  null;
  public merchants : IMerchant[]  = [];
  public itemsPerPage: number = 5;

  ngOnInit(): void {
    this.getMerchants();
  }

  getMerchants(): void {
    this.merchantService.getPaginatedMerchants(this.itemsPerPage).subscribe({
      next: (response) => {
        this.data = response;
        this.merchants = response.data!;
      },
      error: (err) => {
        console.error("Error fetching merchants:", err);
      }
    });
  }

  editMerchant(merchantId: number): void {
    this.router.navigate(['/edit-merchant', merchantId]);
  }

  toggleStatus(merchantId: number, currentStatus: string): void {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
  
    this.merchantService.updateMerchantStatus(merchantId, newStatus).subscribe({
      next: () => {
        console.log(`State changed to ${newStatus} for merchant ID: ${merchantId}`);
        this.getMerchants();
      },
      error: (err) => {
        console.error('Error when changing status:', err);
      }
    });
  }

  deleteMerchant(merchantId: number): void {
    if (confirm('¿Estás seguro de eliminar este comerciante?')) {
      this.merchantService.deleteMerchant(merchantId).subscribe({
        next: () => {
          console.log(`Comerciante ID: ${merchantId} eliminado`);
          this.getMerchants();
        },
        error: (err) => {
          console.error('Error al eliminar comerciante:', err);
        }
      });
    }
  }

  downloadCSV(): void {
    this.merchantService.downloadCSVReport().subscribe({
      next : (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'merchants_report.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error(err) {
        console.error('Error al eliminar comerciante:', err);
      },
    
    })
  }

}


