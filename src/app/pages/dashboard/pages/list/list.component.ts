import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { IMerchant } from '../../../../models/merchant.model';
import { IResponse} from '../../../../models/response.model';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { MerchantService } from '../../../../core/services/merchant.service';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HeaderComponent, FormsModule, FooterComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  private ngUnsubscribe = new Subject<void>();
  
  private router = inject(Router);
  public userService = inject(UserService);
  private merchantService = inject(MerchantService);
  private toastService = inject(ToastrService)

  public data : IResponse<IMerchant[]>  | null =  null;
  public merchants : IMerchant[]  = [];
  public itemsPerPage: number = 5;

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getMerchants();
  }

  getMerchants(): void {
    this.merchantService.getPaginatedMerchants(this.itemsPerPage).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (response) => {
        this.data = response;
        this.merchants = response.data!;
      },
      error: (err) => {
        console.error("Error fetching merchants:", err);
        this.toastService.info("Error fetchig merchants")
      }
    });
  }

  createMerchant(){
    this.router.navigate(['/dashboard/form'])
  }

  editMerchant(merchantId: number): void {
    this.router.navigate(['/dashboard/form'], {
      queryParams: { id : merchantId}
    });
  }

  toggleStatus(merchantId: number, currentStatus: string): void {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
  
    this.merchantService.updateMerchantStatus(merchantId, newStatus).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: () => {
        this.toastService.success(`State changed to ${newStatus} for merchant ID: ${merchantId}`)
        this.getMerchants();
      },
      error: (err) => {
        console.error('Error when changing status:', err);
        this.toastService.info('Error when changing status')
      }
    });
  }

  deleteMerchant(merchantId: number): void {
    if (confirm('¿Estás seguro de eliminar este comerciante?')) {
      this.merchantService.deleteMerchant(merchantId).pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe({
        next: () => {
          console.log(`Comerciante ID: ${merchantId} eliminado`);
          this.toastService.success(`merchant ID: ${merchantId} Delete`)
          this.getMerchants();
        },
        error: (err) => {
          console.error('Error deleting merchant', err);
          this.toastService.info('Error deleting merchant')
        }
      });
    }
  }

  downloadCSV(): void {
    this.merchantService.downloadCSVReport().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next : (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'merchants_report.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error : (err)  => {
        this.toastService.info("Error downloading file")
        console.error('Error downloading file', err);
      },
    
    })
  }

}