import { Component, inject, OnInit } from '@angular/core';
import { MerchantService } from '../../../../core/services/merchant.service';
import { UserService } from '../../../../core/services/user.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../../core/services/department.service';
import { IBodyMerchant, IMerchant } from '../../../../models/merchant.model';
import { HeaderComponent } from '../../../../shared/header/header.component';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  private ngUnsubscribe = new Subject<void>();

  private merchantService =  inject(MerchantService);
  private userService = inject(UserService);
  private departmentService = inject(DepartmentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public departments: string[] = [];
  public municipalities: string[] = [];
  public municipaliti!: string;
  public isEditMode: boolean = false;
  public totalRevenue: number = 0;
  public totalEmployees: number = 0;

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.getDepartments();
    this.checkEditMode();
  }

  public merchantForm: FormGroup = new FormGroup({
    businessName: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    city: new FormControl({ value: '', disabled: true }, [Validators.required]),
    phone: new FormControl('', [Validators.pattern('^[0-9]+$')]),
    email: new FormControl('', [Validators.email]),
    status: new FormControl('Active', [Validators.required]),
    hasEstablishments: new FormControl(false),
  })


  getDepartments(){
    this.departmentService.getDepartments().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (data) => {
        this.departments = data.data!;
      },
      error(err) {
         console.log('error getting the departments')
      },
    })
  }

  getMunicipalities(department : string){
    this.departmentService.getMunicipalitiesByDepartment(department).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (data) => {
        this.municipalities = data.data!;
      },
      error(err) {
         console.log('error getting the municipalities')
      },
    })
  }

  onDepartmentChange() {
    const department = this.merchantForm.get('department')?.value;
    if (department) {
      this.merchantForm.get('city')?.enable();
      this.getMunicipalities(department);
    } else {
      this.merchantForm.get('city')?.disable();
      this.municipalities = [];
    }
  }

  checkEditMode() {
    const merchantId = this.route.snapshot.queryParamMap.get('id');
    console.log(merchantId);
    if (merchantId) {
      this.isEditMode = true;
      this.merchantService.getMerchantById(+merchantId).pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe({
        next: (merchant) =>{
          console.log(merchant);
          this.merchantForm.get('businessName')?.setValue(merchant.data?.businessName);
          this.merchantForm.get('city')?.setValue(merchant.data?.city);
          this.merchantForm.get('city')?.enable();
          this.municipaliti = merchant.data?.city!;          
          this.merchantForm.get('phone')?.setValue(merchant.data?.phone);
          this.merchantForm.get('email')?.setValue(merchant.data?.email);
          this.merchantForm.get('status')?.setValue(merchant.data?.status);
        },
        error(err) {
          console.log('error getting merchant')
        },
      });
    }
  }

    submitForm() {
    if (this.merchantForm.valid) {
      const merchantData : IBodyMerchant = {
        businessName : this.merchantForm.get('businessName')?.value,
        city : this.merchantForm.get('city')?.value,
        phone : this.merchantForm.get('phone')?.value,
        email : this.merchantForm.get('email')?.value,
        status : this.merchantForm.get('status')?.value
      }

      console.log(merchantData);
      
      if (this.isEditMode) {
        const merchantId = this.route.snapshot.queryParamMap.get('id');
        const id : number = parseInt(merchantId!);
        this.merchantService.updateMerchant(merchantData, id).pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe({
          next: () => {
            this.router.navigate(['dashboard'])
          },
          error(err) {
              console.error("no se pudo actualizar el usuario" + err)
          },
        }
        );
      } else {
        this.merchantService.createMerchant(merchantData).pipe(
          takeUntil(this.ngUnsubscribe)
        ).subscribe({
          next: () => {
            this.router.navigate(['/dashboard'])
          },
          error(err) {
            console.error("no se pudo Crear el usuario" + err)
          },
        });
      }
    }
  }
  

}
