// import { Component, Inject } from '@angular/core';
// import {
//   MatDialogRef,
//   MAT_DIALOG_DATA
// } from '@angular/material/dialog';

// @Component({
//   selector: 'app-marketing-popup',
//   templateUrl: './marketing-popup.component.html',
//   styleUrl: './marketing-popup.component.scss'
// })
// export class MarketingPopupComponent {
//   constructor(
//   // readonly dialogRef = inject(MatDialogRef<MarketingPopupComponent>)
//   readonly dialogRef: MatDialogRef<MarketingPopupComponent>,
//   @Inject(MAT_DIALOG_DATA) public data: any) {}
//   // onNoClick(): void {
//   //   this.dialogRef.close();
//   // }

//   close() {
//     console.log('Close button clicked');
//     this.dialogRef.close();
//   }


// }
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectionStrategy, computed, inject, model, signal } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
@Component({
  selector: 'app-inbox-popup',
  templateUrl: './inbox-popup.component.html',
  styleUrls: ['./inbox-popup.component.scss']
})
export class InboxPopupComponent {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly currentFruit = model('');
  readonly fruits = signal(['Lemon']);
  readonly allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  readonly filteredFruits = computed(() => {
    const currentFruit = this.currentFruit().toLowerCase();
    return currentFruit
      ? this.allFruits.filter(fruit => fruit.toLowerCase().includes(currentFruit))
      : this.allFruits.slice();
  });
  readonly announcer = inject(LiveAnnouncer);

  constructor(
    public dialogRef: MatDialogRef<InboxPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    console.log('Close button clicked');
    this.dialogRef.close();
  }

  onClickOutside() {
    console.log('Clicked outside the dialog');
    this.dialogRef.close();
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.update(fruits => [...fruits, value]);
    }

    // Clear the input value
    this.currentFruit.set('');
  }

  remove(fruit: string): void {
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit}`);
      return [...fruits];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.update(fruits => [...fruits, event.option.viewValue]);
    this.currentFruit.set('');
    event.option.deselect();
  }
}
