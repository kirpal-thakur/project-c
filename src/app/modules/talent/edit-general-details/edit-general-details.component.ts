import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TalentService } from '../../../services/talent.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-general-details',
  templateUrl: './edit-general-details.component.html',
  styleUrls: ['./edit-general-details.component.scss']
})
export class EditGeneralDetailsComponent {
  
  positions: any[] = [];

  // Define the variables here
  in_team_since: Date | null = null;
  currency: string = '';
  international_player: any;
  last_change: Date | null = null;
  main_position: string = '';
  market_value: any;
  other_positions: string[] = []; // Changed to array
  social_facebook: string = '';
  social_instagram: string = '';
  social_tiktok: string = '';
  social_vimeo: string = '';
  social_x: string = ''; // assuming this is for Twitter (X)
  social_youtube: string = '';
  speed_unit: string = 'km/h';
  top_speed: number = 0;
  sm_x:any = "";
  sm_facebook:any = "";
  sm_instagram:any = "";
  sm_youtube:any = "";
  sm_tiktok:any = "";
  sm_vimeo:any = "";
  currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' }
  ];
  countries: any;
  user: any = localStorage.getItem('userInfo');
  isLoading : boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<EditGeneralDetailsComponent>,
    public dialog: MatDialog,
    private talentService: TalentService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Initialize user data from passed-in data
    this.user = JSON.parse(this.user);
  
    this.loadPositions(); // Call to load positions, which now includes setUserPositions() call inside it
    this.loadCountries();
  
    // Assign user data to component variables
    this.in_team_since = this.user?.meta?.in_team_since || null;
    this.currency = this.user?.currency || '';
    this.international_player = this.user?.meta.international_player;
    this.last_change = this.user?.meta.market_value_last_updated || null;
    this.market_value = this.user?.meta.market_value || 0;
    this.social_facebook = this.user?.meta.sm_facebook || '';
    this.social_instagram = this.user?.meta.sm_instagram || '';
    this.social_tiktok = this.user?.meta.sm_tiktok || '';
    this.social_vimeo = this.user?.meta.sm_vimeo || '';
    this.social_x = this.user?.meta.sm_x || '';
    this.social_youtube = this.user?.meta.sm_youtube || '';
    this.speed_unit = this.user?.meta.top_speed_unit || '';
    this.top_speed = this.user?.meta.top_speed || 0;
  }
  
  loadPositions(): void {
    this.talentService.getPositions().subscribe(
      (response: any) => {
        if (response.status) {
          this.positions = response.data.positions;
          console.log('Positions:', this.positions);
          
          // Now that positions are loaded, set user positions
          this.setUserPositions();
        } else {
          console.error('No data found');
        }
      },
      (error: any) => {
        console.error('Error fetching positions:', error);
      }
    );
  }
  

  setUserPositions(): void {
    this.user.positions = JSON.parse(this.user?.positions);
  
    console.log('User positions:', this.user.positions);
    
    const mainPositionObj = this.user.positions.find(
      (pos: any) => pos.main_position === 1
    );
    const otherPositionObjs = this.user.positions.filter(
      (pos: any) => pos.main_position === null
    );
  
    // Set main position ID if available
    if (mainPositionObj) {
      this.main_position = mainPositionObj.position_id.toString();
      console.log('Main position set:', this.main_position); // Debugging log
    }
    
    // Set other positions array with IDs
    this.other_positions = otherPositionObjs.map((pos: any) =>
      pos.position_id.toString()
    );
    console.log('Other positions set:', this.other_positions); // Debugging log
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }

  loadCountries(): void {
    this.talentService.getCountries().subscribe(
      (response: any) => {
        if (response && response.status) {
          this.countries = response.data.countries;
        }
      },
      (error: any) => {
        console.error('Error fetching countries:', error);
      }
    );
  }

  onSave(form: NgForm): void {
    this.dialogRef.close(this.user);
  }

  onSubmit(myForm: NgForm): void {
    if (myForm.valid) {
      // Enable loading and notify user
      this.isLoading = true;
      this.toastr.info('Submitting your profile...', 'Please wait');

      const formData = new FormData();

      // Append each field to FormData
      formData.append('user[in_team_since]', this.in_team_since ? this.in_team_since.toString() : '');
      formData.append('user[currency]', this.currency);
      formData.append('user[international_player]', this.international_player ? this.international_player : '0');
      formData.append('user[market_value_last_updated]', this.last_change ? this.last_change.toString() : '');
      formData.append('user[main_position]', this.main_position);
      formData.append('user[market_value]', this.market_value);
      formData.append('user[market_value_unit]', '1');

      // Append each position in `other_positions` as an array
      this.other_positions.forEach(position => {
        formData.append('user[other_position][]', position);
      });

      // Append social media links and additional fields
      formData.append('user[sm_facebook]', this.social_facebook);
      formData.append('user[top_speed]', this.top_speed.toString());
      formData.append('user[top_speed_unit]', 'km/h');
      formData.append('user[sm_youtube]', this.social_youtube);
      formData.append('user[sm_x]', this.social_x);
      formData.append('user[sm_vimeo]', this.social_vimeo);
      formData.append('user[sm_tiktok]', this.social_tiktok);
      formData.append('user[sm_instagram]', this.social_instagram);
      formData.append('lang', 'en');

      // API call for updating profile
      this.talentService.updateGeneralProfile(formData).subscribe(
        (response: any) => {
          if (response?.status) {
            this.toastr.success('Profile updated successfully!', 'Success');
            this.dialogRef.close(response.data);
          } else {
            this.toastr.error('Unexpected error occurred. Please try again.', 'Submission Failed');
            console.error('API response error:', response);
          }
        },
        (error: any) => {
          this.toastr.error('Failed to submit profile. Please try again.', 'Error');
          console.error('Error submitting the form:', error);
        },
        () => {
          // Disable loading state after request completion
          this.isLoading = false;
        }
      );
    } else {
      this.toastr.warning('Please fill out all required fields.', 'Form Incomplete');
    }
  }
}
