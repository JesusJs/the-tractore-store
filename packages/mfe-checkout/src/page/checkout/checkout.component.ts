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
  AsyncValidatorFn,
} from '@angular/forms';
import { CartService, CatalogService, StoreLocation } from '@the-tractor-store/shared-catalog';
import { ButtonComponent } from '@the-tractor-store/ts-design-system';
import { Observable, of } from 'rxjs';
import { delay, map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ButtonComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutPageComponent implements OnInit {
  private router = inject(Router);
  private cartService = inject(CartService);
  private catalogService = inject(CatalogService);

  public isModalOpen = signal(false);
  public isPlacingOrder = signal(false);
  public stores = signal<StoreLocation[]>([]);

  public checkoutForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    storeId: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [this.storeIdAsyncValidator()],
      updateOn: 'change',
    }),
    extraPickups: new FormArray<FormControl>([]),
  });

  ngOnInit(): void {
    this.cartService.loadCart().subscribe();
    this.catalogService.getStores().subscribe({
      next: (data) => this.stores.set(data),
    });
  }

  get extraPickups(): FormArray {
    return this.checkoutForm.get('extraPickups') as FormArray;
  }

  public addExtraPickup(): void {
    this.extraPickups.push(
      new FormControl('', [Validators.required, Validators.minLength(2)])
    );
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

  public getSelectedStoreName(): string {
    const id = this.checkoutForm.get('storeId')?.value;
    return this.stores().find((s) => s.id === id)?.name ?? '';
  }

  private storeIdAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      return of(control.value).pipe(
        delay(400),
        map((val) => {
          const isValid = this.stores().some((s) => s.id === val);
          return isValid ? null : { invalidStore: true };
        })
      );
    };
  }

  public placeOrder(): void {
    if (this.checkoutForm.invalid || this.isPlacingOrder()) return;
    this.isPlacingOrder.set(true);

    const { firstName, lastName, storeId, extraPickups } = this.checkoutForm.value;

    this.cartService
      .placeOrder({
        firstName: firstName!,
        lastName: lastName!,
        storeId: storeId!,
        extraPickups: (extraPickups as string[]) ?? [],
      })
      .pipe(
        finalize(() => {
          this.isPlacingOrder.set(false);
          console.log('Order flow finished');
        })
      )
      .subscribe({
        next: (receipt) => {
          this.checkoutForm.markAsPristine();
          this.router.navigate(['/mfe_checkout/thanks'], {
            queryParams: { orderId: receipt.id },
          });
        },
        error: (err) => {
          console.error('Error placing order:', err);
        },
      });
  }
}
