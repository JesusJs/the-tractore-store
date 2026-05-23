import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { 
  ReactiveFormsModule, 
  FormGroup, 
  FormControl, 
  FormArray, 
  Validators, 
  AbstractControl, 
  ValidationErrors, 
  AsyncValidatorFn 
} from '@angular/forms';
import { CartService } from '@the-tractor-store/shared-catalog';
import { ButtonComponent } from '@the-tractor-store/ts-design-system';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ButtonComponent],
  selector: 'app-mfe_checkout-entry',
  templateUrl: 'entry.component.html',
  styleUrl: 'entry.component.scss'
})
export class RemoteEntryComponent implements OnInit {
  private router = inject(Router);
  private cartService = inject(CartService);

  public isModalOpen = signal(false);
  public orderPlaced = signal(false);

  public stores = [
    { id: 'aurora-arlington', name: 'Aurora Flagship Store', city: 'Arlington' },
    { id: 'big-micro-burlington', name: 'Big Micro Machines', city: 'Burlington' }
  ];

  public checkoutForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    storeId: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [this.storeIdAsyncValidator()],
      updateOn: 'change'
    }),
    extraPickups: new FormArray<FormControl>([])
  });

  ngOnInit(): void {
    if (this.router.url.includes('/thanks')) {
      this.orderPlaced.set(true);
    }
  }

  get extraPickups(): FormArray {
    return this.checkoutForm.get('extraPickups') as FormArray;
  }

  public addExtraPickup(): void {
    this.extraPickups.push(new FormControl('', [Validators.required, Validators.minLength(2)]));
  }

  public removeExtraPickup(index: number): void {
    this.extraPickups.removeAt(index);
  }

  public openModal(): void {
    this.isModalOpen.set(true);
  }

  public closeModal(): void {
    this.isModalOpen.set(false);
  }

  public selectStore(storeId: string): void {
    const control = this.checkoutForm.get('storeId');
    if (control) {
      control.setValue(storeId);
      control.markAsDirty();
      control.markAsTouched();
    }
    this.closeModal();
  }

  private storeIdAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return of(control.value).pipe(
        delay(500),
        map(val => {
          const isValid = this.stores.some(s => s.id === val);
          return isValid ? null : { invalidStore: true };
        })
      );
    };
  }

  public placeOrder(): void {
    if (this.checkoutForm.valid) {
      this.cartService.clearCart();
      this.checkoutForm.markAsPristine(); // allow navigating to thanks page
      this.router.navigate(['/mfe_checkout/thanks']);
    }
  }

  public continueShopping(): void {
    this.router.navigate(['/mfe_explore']);
  }
}
