import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../../services/theme.service';
import { environment } from '../../../../environments/environment';
import { ConfirmPasswordComponent } from '../SetPassword/confirmPassword.component';
import { MatDialog } from '@angular/material/dialog';

declare var bootstrap: any; // Declare bootstrap
declare var google: any; // Declare google

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  @ViewChild('invalidCredMessage') invalidCredMessage!: ElementRef;
  @ViewChild('registerForm') registerForm!: NgForm; // Define registerForm using ViewChild


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  countries = [
    { id: 1, country_name: 'Switzerland' },
    { id: 2, country_name: 'Germany' },
    { id: 3, country_name: 'France' },
    { id: 4, country_name: 'Italy' },
    { id: 5, country_name: 'Portugal' },
    { id: 6, country_name: 'England' },
    { id: 7, country_name: 'Spain' },
    { id: 8, country_name: 'Belgium' },
    { id: 9, country_name: 'Sweden' },
    { id: 10, country_name: 'Denmark' }
  ];

//    countries = [
//             {
//                 "id": "1",
//                 "country_name": "Afghanistan",
//                 "country_code": "AFG",
//                 "country_flag": "Afghanistan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:08:18",
//                 "created_at": "2024-07-10 07:34:40"
//             },
//             {
//                 "id": "2",
//                 "country_name": "Australia",
//                 "country_code": "AUS",
//                 "country_flag": "Australien.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:09:25",
//                 "created_at": "2024-07-10 07:35:20"
//             },
//             {
//                 "id": "3",
//                 "country_name": "Bahrain",
//                 "country_code": "BHR",
//                 "country_flag": "Bahrain.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:09:52",
//                 "created_at": "2024-07-10 07:35:56"
//             },
//             {
//                 "id": "4",
//                 "country_name": "Bangladesh",
//                 "country_code": "BAN",
//                 "country_flag": "Bangladesh.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:10:29",
//                 "created_at": "2024-07-10 07:36:23"
//             },
//             {
//                 "id": "5",
//                 "country_name": "Bhutan",
//                 "country_code": "BHU",
//                 "country_flag": "Bhutan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:13:01",
//                 "created_at": "2024-07-10 07:36:54"
//             },
//             {
//                 "id": "6",
//                 "country_name": " Brunei",
//                 "country_code": "BRU",
//                 "country_flag": "Brunei.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:16:24",
//                 "created_at": "2024-07-11 08:16:24"
//             },
//             {
//                 "id": "7",
//                 "country_name": "Chinese Taipei",
//                 "country_code": "TPE",
//                 "country_flag": "Chinese-Taipei.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:24:31",
//                 "created_at": "2024-07-11 08:24:31"
//             },
//             {
//                 "id": "8",
//                 "country_name": "Guam",
//                 "country_code": "GUM",
//                 "country_flag": "Guam.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:26:27",
//                 "created_at": "2024-07-11 08:26:27"
//             },
//             {
//                 "id": "9",
//                 "country_name": "Hong Kong",
//                 "country_code": "HKG",
//                 "country_flag": "Hong-Kong.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 09:19:09",
//                 "created_at": "2024-07-11 08:27:34"
//             },
//             {
//                 "id": "10",
//                 "country_name": "India",
//                 "country_code": "IND",
//                 "country_flag": "India.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:29:10",
//                 "created_at": "2024-07-11 08:29:10"
//             },
//             {
//                 "id": "11",
//                 "country_name": "Indonesia",
//                 "country_code": "IDN",
//                 "country_flag": "Indonesia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:30:34",
//                 "created_at": "2024-07-11 08:30:34"
//             },
//             {
//                 "id": "12",
//                 "country_name": "Iraq",
//                 "country_code": "IRQ",
//                 "country_flag": "Iraq.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:36:58",
//                 "created_at": "2024-07-11 08:36:58"
//             },
//             {
//                 "id": "13",
//                 "country_name": "Iran",
//                 "country_code": "IRN",
//                 "country_flag": "Iran.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:38:29",
//                 "created_at": "2024-07-11 08:38:29"
//             },
//             {
//                 "id": "14",
//                 "country_name": "Japan",
//                 "country_code": "JPN",
//                 "country_flag": "Japan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:39:40",
//                 "created_at": "2024-07-11 08:39:40"
//             },
//             {
//                 "id": "15",
//                 "country_name": "Yemen",
//                 "country_code": "YEM",
//                 "country_flag": "Yemen.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:40:39",
//                 "created_at": "2024-07-11 08:40:39"
//             },
//             {
//                 "id": "16",
//                 "country_name": "Jordan",
//                 "country_code": "JOR",
//                 "country_flag": "Jordan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:42:01",
//                 "created_at": "2024-07-11 08:42:01"
//             },
//             {
//                 "id": "17",
//                 "country_name": "Cambodia",
//                 "country_code": "CAM",
//                 "country_flag": "Cambodia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:43:15",
//                 "created_at": "2024-07-11 08:43:15"
//             },
//             {
//                 "id": "18",
//                 "country_name": "Qatar",
//                 "country_code": "QAT",
//                 "country_flag": "Qatar.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:43:58",
//                 "created_at": "2024-07-11 08:43:58"
//             },
//             {
//                 "id": "19",
//                 "country_name": "Kyrgyzstan",
//                 "country_code": "KGZ",
//                 "country_flag": "Kyrgyzstan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:46:43",
//                 "created_at": "2024-07-11 08:46:43"
//             },
//             {
//                 "id": "20",
//                 "country_name": "Kuwait",
//                 "country_code": "KUW",
//                 "country_flag": "Kuwait.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:47:47",
//                 "created_at": "2024-07-11 08:47:47"
//             },
//             {
//                 "id": "21",
//                 "country_name": "Laos",
//                 "country_code": "LAO",
//                 "country_flag": "Laos.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:48:28",
//                 "created_at": "2024-07-11 08:48:28"
//             },
//             {
//                 "id": "22",
//                 "country_name": "Lebanon",
//                 "country_code": "LBN",
//                 "country_flag": "Lebanon.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:53:48",
//                 "created_at": "2024-07-11 08:53:48"
//             },
//             {
//                 "id": "23",
//                 "country_name": "Macau",
//                 "country_code": "MAC",
//                 "country_flag": "Macau.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 08:58:16",
//                 "created_at": "2024-07-11 08:58:16"
//             },
//             {
//                 "id": "24",
//                 "country_name": "Malaysia",
//                 "country_code": "MAS",
//                 "country_flag": "Malaysia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:26:22",
//                 "created_at": "2024-07-11 08:59:09"
//             },
//             {
//                 "id": "25",
//                 "country_name": "Maldives",
//                 "country_code": "MDV",
//                 "country_flag": "Maldives.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:03:59",
//                 "created_at": "2024-07-11 09:03:59"
//             },
//             {
//                 "id": "26",
//                 "country_name": "Mongolia",
//                 "country_code": "MNG",
//                 "country_flag": "Mongolia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:06:25",
//                 "created_at": "2024-07-11 09:06:25"
//             },
//             {
//                 "id": "27",
//                 "country_name": "Myanmar",
//                 "country_code": "MYA",
//                 "country_flag": "Myanmar.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:07:34",
//                 "created_at": "2024-07-11 09:07:34"
//             },
//             {
//                 "id": "28",
//                 "country_name": "Nepal",
//                 "country_code": "NEP",
//                 "country_flag": "Nepal.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:08:32",
//                 "created_at": "2024-07-11 09:08:32"
//             },
//             {
//                 "id": "29",
//                 "country_name": "North Korea",
//                 "country_code": "PRK",
//                 "country_flag": "North-korea.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:09:42",
//                 "created_at": "2024-07-11 09:09:42"
//             },
//             {
//                 "id": "30",
//                 "country_name": "Oman",
//                 "country_code": "OMA",
//                 "country_flag": "Oman.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:10:20",
//                 "created_at": "2024-07-11 09:10:20"
//             },
//             {
//                 "id": "31",
//                 "country_name": "East Timor",
//                 "country_code": "TLS",
//                 "country_flag": "East-timor.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:11:58",
//                 "created_at": "2024-07-11 09:11:58"
//             },
//             {
//                 "id": "32",
//                 "country_name": "Pakistan",
//                 "country_code": "PAK",
//                 "country_flag": "Pakistan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:21:20",
//                 "created_at": "2024-07-11 09:21:20"
//             },
//             {
//                 "id": "33",
//                 "country_name": "Philippines",
//                 "country_code": "PHI",
//                 "country_flag": "Philippines.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:22:56",
//                 "created_at": "2024-07-11 09:22:56"
//             },
//             {
//                 "id": "34",
//                 "country_name": "Saudi Arabia",
//                 "country_code": "KSA",
//                 "country_flag": "Saudi-arabia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:26:53",
//                 "created_at": "2024-07-11 09:24:58"
//             },
//             {
//                 "id": "35",
//                 "country_name": "Singapore",
//                 "country_code": "SIN",
//                 "country_flag": "Singapore.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:28:26",
//                 "created_at": "2024-07-11 09:28:26"
//             },
//             {
//                 "id": "36",
//                 "country_name": "Sri Lanka",
//                 "country_code": "SRI",
//                 "country_flag": "Sri-lanka.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:28:51",
//                 "created_at": "2024-07-11 09:28:51"
//             },
//             {
//                 "id": "37",
//                 "country_name": "South Korea",
//                 "country_code": "KOR",
//                 "country_flag": "South-korea.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:29:41",
//                 "created_at": "2024-07-11 09:29:41"
//             },
//             {
//                 "id": "38",
//                 "country_name": "Syria",
//                 "country_code": "SYR",
//                 "country_flag": "Syria.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:30:17",
//                 "created_at": "2024-07-11 09:30:17"
//             },
//             {
//                 "id": "39",
//                 "country_name": "Tajikistan",
//                 "country_code": "TJK",
//                 "country_flag": "Tajikistan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:30:53",
//                 "created_at": "2024-07-11 09:30:53"
//             },
//             {
//                 "id": "40",
//                 "country_name": "Thailand",
//                 "country_code": "THA",
//                 "country_flag": "Thailand.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:37:12",
//                 "created_at": "2024-07-11 09:37:12"
//             },
//             {
//                 "id": "41",
//                 "country_name": "Turkmenistan",
//                 "country_code": "TKM",
//                 "country_flag": "Turkmenistan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:38:14",
//                 "created_at": "2024-07-11 09:38:14"
//             },
//             {
//                 "id": "42",
//                 "country_name": "Uzbekistan",
//                 "country_code": "UZB",
//                 "country_flag": "Uzbekistan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:39:25",
//                 "created_at": "2024-07-11 09:39:25"
//             },
//             {
//                 "id": "43",
//                 "country_name": "United Arab Emirates",
//                 "country_code": "UAE",
//                 "country_flag": "United-arab-emirates.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:40:40",
//                 "created_at": "2024-07-11 09:40:40"
//             },
//             {
//                 "id": "44",
//                 "country_name": "Vietnam",
//                 "country_code": "VIE",
//                 "country_flag": "Vietnam.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:41:19",
//                 "created_at": "2024-07-11 09:41:19"
//             },
//             {
//                 "id": "45",
//                 "country_name": "China",
//                 "country_code": "CHN",
//                 "country_flag": "China.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:59:27",
//                 "created_at": "2024-07-11 09:42:02"
//             },
//             {
//                 "id": "46",
//                 "country_name": "Egypt",
//                 "country_code": "EGY",
//                 "country_flag": "Egypt.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:42:45",
//                 "created_at": "2024-07-11 09:42:45"
//             },
//             {
//                 "id": "47",
//                 "country_name": "Algeria",
//                 "country_code": "ALG",
//                 "country_flag": "Algeria.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:43:23",
//                 "created_at": "2024-07-11 09:43:23"
//             },
//             {
//                 "id": "48",
//                 "country_name": "Angola",
//                 "country_code": "ANG",
//                 "country_flag": "Angola.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 15:22:41",
//                 "created_at": "2024-07-11 09:44:08"
//             },
//             {
//                 "id": "49",
//                 "country_name": "Equatorial Guinea",
//                 "country_code": "EQG",
//                 "country_flag": "Equatorial-guinea.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:49:13",
//                 "created_at": "2024-07-11 09:49:13"
//             },
//             {
//                 "id": "50",
//                 "country_name": "Ethiopia",
//                 "country_code": "ETH",
//                 "country_flag": "Ethiopia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:51:33",
//                 "created_at": "2024-07-11 09:51:33"
//             },
//             {
//                 "id": "51",
//                 "country_name": "Benin",
//                 "country_code": "BEN",
//                 "country_flag": "Benin.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 09:52:07",
//                 "created_at": "2024-07-11 09:52:07"
//             },
//             {
//                 "id": "52",
//                 "country_name": "Botswana",
//                 "country_code": "BOT",
//                 "country_flag": "Botswana.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:02:40",
//                 "created_at": "2024-07-11 10:02:40"
//             },
//             {
//                 "id": "53",
//                 "country_name": "Burkina Faso",
//                 "country_code": "BFA",
//                 "country_flag": "Burkina-faso.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:03:41",
//                 "created_at": "2024-07-11 10:03:41"
//             },
//             {
//                 "id": "54",
//                 "country_name": "Ivory Coast",
//                 "country_code": "CIV",
//                 "country_flag": "Ivory-coast.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:04:45",
//                 "created_at": "2024-07-11 10:04:45"
//             },
//             {
//                 "id": "55",
//                 "country_name": "Eritrea ",
//                 "country_code": "ERI",
//                 "country_flag": "Eritrea.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:06:21",
//                 "created_at": "2024-07-11 10:06:21"
//             },
//             {
//                 "id": "56",
//                 "country_name": "Gabon",
//                 "country_code": "GAB",
//                 "country_flag": "Gabon.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:07:30",
//                 "created_at": "2024-07-11 10:07:30"
//             },
//             {
//                 "id": "57",
//                 "country_name": "Gambia",
//                 "country_code": "GAM",
//                 "country_flag": "Gambia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:08:38",
//                 "created_at": "2024-07-11 10:08:38"
//             },
//             {
//                 "id": "58",
//                 "country_name": "Guinea",
//                 "country_code": "GUI",
//                 "country_flag": "Guinea.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:12:18",
//                 "created_at": "2024-07-11 10:12:18"
//             },
//             {
//                 "id": "59",
//                 "country_name": "Cameroon",
//                 "country_code": "CMR",
//                 "country_flag": "Cameroon.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:13:11",
//                 "created_at": "2024-07-11 10:13:11"
//             },
//             {
//                 "id": "60",
//                 "country_name": "Kenya",
//                 "country_code": "KEN",
//                 "country_flag": "Kenya.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:14:01",
//                 "created_at": "2024-07-11 10:14:01"
//             },
//             {
//                 "id": "61",
//                 "country_name": "Democratic Republic of the Congo",
//                 "country_code": "COD",
//                 "country_flag": "Democratic-republic-of-the-congo.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:15:17",
//                 "created_at": "2024-07-11 10:15:17"
//             },
//             {
//                 "id": "62",
//                 "country_name": "Lesotho",
//                 "country_code": "LES",
//                 "country_flag": "Lesotho.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:16:08",
//                 "created_at": "2024-07-11 10:16:08"
//             },
//             {
//                 "id": "63",
//                 "country_name": "Burundi",
//                 "country_code": "BDI",
//                 "country_flag": "Burundi.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:17:38",
//                 "created_at": "2024-07-11 10:17:38"
//             },
//             {
//                 "id": "64",
//                 "country_name": "Djibouti",
//                 "country_code": "DJI",
//                 "country_flag": "Djibouti.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:18:17",
//                 "created_at": "2024-07-11 10:18:17"
//             },
//             {
//                 "id": "65",
//                 "country_name": "Eswatini",
//                 "country_code": "SWZ",
//                 "country_flag": "Eswatini.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:20:58",
//                 "created_at": "2024-07-11 10:20:58"
//             },
//             {
//                 "id": "66",
//                 "country_name": "Ghana",
//                 "country_code": "GHA",
//                 "country_flag": "Ghana.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:21:45",
//                 "created_at": "2024-07-11 10:21:45"
//             },
//             {
//                 "id": "67",
//                 "country_name": "Guinea Bissau",
//                 "country_code": "GNB",
//                 "country_flag": "Guinea-Bissau.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:24:04",
//                 "created_at": "2024-07-11 10:24:04"
//             },
//             {
//                 "id": "68",
//                 "country_name": "Cape Verde",
//                 "country_code": "CPV",
//                 "country_flag": "Cape-verde.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:24:47",
//                 "created_at": "2024-07-11 10:24:47"
//             },
//             {
//                 "id": "69",
//                 "country_name": "Comoros",
//                 "country_code": "COM",
//                 "country_flag": "Comoros.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:25:40",
//                 "created_at": "2024-07-11 10:25:40"
//             },
//             {
//                 "id": "70",
//                 "country_name": "Liberia",
//                 "country_code": "LBR",
//                 "country_flag": "Liberia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:26:20",
//                 "created_at": "2024-07-11 10:26:20"
//             },
//             {
//                 "id": "71",
//                 "country_name": "Libya",
//                 "country_code": "LBY",
//                 "country_flag": "Libya.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 10:27:33",
//                 "created_at": "2024-07-11 10:27:33"
//             },
//             {
//                 "id": "72",
//                 "country_name": "Madagascar",
//                 "country_code": "MAD",
//                 "country_flag": "Madagascar.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 11:16:36",
//                 "created_at": "2024-07-11 11:16:36"
//             },
//             {
//                 "id": "73",
//                 "country_name": "Malawi",
//                 "country_code": "MWI",
//                 "country_flag": "Malawi.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 11:17:11",
//                 "created_at": "2024-07-11 11:17:11"
//             },
//             {
//                 "id": "74",
//                 "country_name": "Mali",
//                 "country_code": "MLI",
//                 "country_flag": "Mali.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 11:17:46",
//                 "created_at": "2024-07-11 11:17:46"
//             },
//             {
//                 "id": "75",
//                 "country_name": "Morocco",
//                 "country_code": "MAR",
//                 "country_flag": "Morocco.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 11:18:53",
//                 "created_at": "2024-07-11 11:18:53"
//             },
//             {
//                 "id": "76",
//                 "country_name": "Mauritania",
//                 "country_code": "MTN",
//                 "country_flag": "Mauritania.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 11:19:58",
//                 "created_at": "2024-07-11 11:19:58"
//             },
//             {
//                 "id": "77",
//                 "country_name": "Mauritiu",
//                 "country_code": "MRI",
//                 "country_flag": "Mauritiu.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 11:20:31",
//                 "created_at": "2024-07-11 11:20:31"
//             },
//             {
//                 "id": "78",
//                 "country_name": "Mozambique",
//                 "country_code": "MOZ",
//                 "country_flag": "Mozambique.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 11:32:18",
//                 "created_at": "2024-07-11 11:32:18"
//             },
//             {
//                 "id": "79",
//                 "country_name": "Namibia",
//                 "country_code": "NAM",
//                 "country_flag": "Namibia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 11:33:39",
//                 "created_at": "2024-07-11 11:33:39"
//             },
//             {
//                 "id": "80",
//                 "country_name": "Niger",
//                 "country_code": "NIG",
//                 "country_flag": "Niger.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 11:36:44",
//                 "created_at": "2024-07-11 11:36:44"
//             },
//             {
//                 "id": "81",
//                 "country_name": "Nigeria",
//                 "country_code": "NGA",
//                 "country_flag": "Nigeria.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 11:37:18",
//                 "created_at": "2024-07-11 11:37:18"
//             },
//             {
//                 "id": "82",
//                 "country_name": "Republic of Congo",
//                 "country_code": "CGO",
//                 "country_flag": "Republic-of-congo.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 09:15:46",
//                 "created_at": "2024-07-11 11:47:59"
//             },
//             {
//                 "id": "83",
//                 "country_name": "Reunion",
//                 "country_code": "REU",
//                 "country_flag": "Reunion.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 09:16:15",
//                 "created_at": "2024-07-11 11:50:54"
//             },
//             {
//                 "id": "84",
//                 "country_name": "Rwanda",
//                 "country_code": "RWA",
//                 "country_flag": "Rwanda.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 09:16:40",
//                 "created_at": "2024-07-11 11:51:51"
//             },
//             {
//                 "id": "86",
//                 "country_name": "Zambia",
//                 "country_code": "ZAM",
//                 "country_flag": "Zambia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 11:57:43",
//                 "created_at": "2024-07-11 11:57:43"
//             },
//             {
//                 "id": "87",
//                 "country_name": "Zanzibar",
//                 "country_code": "ZAN",
//                 "country_flag": "Zanzibar.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 11:58:20",
//                 "created_at": "2024-07-11 11:58:20"
//             },
//             {
//                 "id": "88",
//                 "country_name": "Sao Tome and Principe",
//                 "country_code": "STP",
//                 "country_flag": "Sao-tome-and-principe.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:10:02",
//                 "created_at": "2024-07-11 12:10:02"
//             },
//             {
//                 "id": "89",
//                 "country_name": "Senegal",
//                 "country_code": "SEN",
//                 "country_flag": "Senegal.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:11:22",
//                 "created_at": "2024-07-11 12:11:22"
//             },
//             {
//                 "id": "90",
//                 "country_name": "Seychelles",
//                 "country_code": "SEY",
//                 "country_flag": "Seychelles.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:12:35",
//                 "created_at": "2024-07-11 12:12:35"
//             },
//             {
//                 "id": "91",
//                 "country_name": "Sierra Leone",
//                 "country_code": "SLE",
//                 "country_flag": "Sierra-leone.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:13:56",
//                 "created_at": "2024-07-11 12:13:56"
//             },
//             {
//                 "id": "92",
//                 "country_name": "Zimbabwe",
//                 "country_code": "ZIM",
//                 "country_flag": "Zimbabwe.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:17:42",
//                 "created_at": "2024-07-11 12:17:42"
//             },
//             {
//                 "id": "93",
//                 "country_name": "Somalia",
//                 "country_code": "SOM",
//                 "country_flag": "Somalia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:18:23",
//                 "created_at": "2024-07-11 12:18:23"
//             },
//             {
//                 "id": "94",
//                 "country_name": "South Africa ",
//                 "country_code": "RSA",
//                 "country_flag": "South-africa.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:21:35",
//                 "created_at": "2024-07-11 12:21:35"
//             },
//             {
//                 "id": "95",
//                 "country_name": "Sudan",
//                 "country_code": "SDN",
//                 "country_flag": "Sudan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:26:10",
//                 "created_at": "2024-07-11 12:26:10"
//             },
//             {
//                 "id": "96",
//                 "country_name": "South Sudan",
//                 "country_code": "SSD",
//                 "country_flag": "South-sudan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:28:16",
//                 "created_at": "2024-07-11 12:28:16"
//             },
//             {
//                 "id": "97",
//                 "country_name": "Tanzania",
//                 "country_code": "TAN",
//                 "country_flag": "Tanzania.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:29:00",
//                 "created_at": "2024-07-11 12:29:00"
//             },
//             {
//                 "id": "98",
//                 "country_name": "Togo",
//                 "country_code": "TOG",
//                 "country_flag": "Togo.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:30:23",
//                 "created_at": "2024-07-11 12:30:23"
//             },
//             {
//                 "id": "99",
//                 "country_name": "Chad",
//                 "country_code": "CHA",
//                 "country_flag": "Chad.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:31:04",
//                 "created_at": "2024-07-11 12:31:04"
//             },
//             {
//                 "id": "100",
//                 "country_name": "Tunisia",
//                 "country_code": "TUN",
//                 "country_flag": "Tunisia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:31:48",
//                 "created_at": "2024-07-11 12:31:48"
//             },
//             {
//                 "id": "101",
//                 "country_name": "Uganda",
//                 "country_code": "UGA",
//                 "country_flag": "Uganda.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:37:50",
//                 "created_at": "2024-07-11 12:37:50"
//             },
//             {
//                 "id": "102",
//                 "country_name": "Central African Republic",
//                 "country_code": "CTA",
//                 "country_flag": "Central-african-republic.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:44:20",
//                 "created_at": "2024-07-11 12:43:21"
//             },
//             {
//                 "id": "103",
//                 "country_name": "American Virgin Islands",
//                 "country_code": "VIR",
//                 "country_flag": "American-virgin-islands.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:46:32",
//                 "created_at": "2024-07-11 12:46:05"
//             },
//             {
//                 "id": "104",
//                 "country_name": "Anguilla",
//                 "country_code": "AIA",
//                 "country_flag": "Anguilla.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:47:28",
//                 "created_at": "2024-07-11 12:47:28"
//             },
//             {
//                 "id": "105",
//                 "country_name": "Antigua and Barbuda",
//                 "country_code": "ATG",
//                 "country_flag": "Antigua-and-barbuda.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:49:07",
//                 "created_at": "2024-07-11 12:49:07"
//             },
//             {
//                 "id": "106",
//                 "country_name": "Aruba",
//                 "country_code": "ARU",
//                 "country_flag": "Aruba.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:49:47",
//                 "created_at": "2024-07-11 12:49:47"
//             },
//             {
//                 "id": "107",
//                 "country_name": "Bahamas",
//                 "country_code": "BAH",
//                 "country_flag": "Bahamas.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:51:29",
//                 "created_at": "2024-07-11 12:50:57"
//             },
//             {
//                 "id": "108",
//                 "country_name": "Barbados",
//                 "country_code": "BRB",
//                 "country_flag": "Barbados.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:52:14",
//                 "created_at": "2024-07-11 12:52:14"
//             },
//             {
//                 "id": "109",
//                 "country_name": "Belize",
//                 "country_code": "BLZ",
//                 "country_flag": "Belize.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:52:54",
//                 "created_at": "2024-07-11 12:52:54"
//             },
//             {
//                 "id": "110",
//                 "country_name": "Bermuda",
//                 "country_code": "BER",
//                 "country_flag": "Bermuda.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:53:54",
//                 "created_at": "2024-07-11 12:53:54"
//             },
//             {
//                 "id": "111",
//                 "country_name": "British Virgin Islands",
//                 "country_code": "VGB",
//                 "country_flag": "British-virgin-islands.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:58:38",
//                 "created_at": "2024-07-11 12:58:11"
//             },
//             {
//                 "id": "112",
//                 "country_name": "Bonaire",
//                 "country_code": "BON",
//                 "country_flag": "Bonaire.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 12:59:45",
//                 "created_at": "2024-07-11 12:59:45"
//             },
//             {
//                 "id": "113",
//                 "country_name": "Costa Rica",
//                 "country_code": "CRC",
//                 "country_flag": "Costa-rica.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:00:26",
//                 "created_at": "2024-07-11 13:00:26"
//             },
//             {
//                 "id": "114",
//                 "country_name": "Curaçao",
//                 "country_code": "CUW",
//                 "country_flag": "Curaçao.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:08:24",
//                 "created_at": "2024-07-11 13:08:24"
//             },
//             {
//                 "id": "115",
//                 "country_name": "Dominica",
//                 "country_code": "DMA",
//                 "country_flag": "Dominica.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:09:22",
//                 "created_at": "2024-07-11 13:09:22"
//             },
//             {
//                 "id": "116",
//                 "country_name": "Dominican Republic",
//                 "country_code": "DOM",
//                 "country_flag": "Dominican-republic.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:16:53",
//                 "created_at": "2024-07-11 13:16:53"
//             },
//             {
//                 "id": "117",
//                 "country_name": "El Salvador ",
//                 "country_code": "SLV",
//                 "country_flag": "El-salvador.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:18:24",
//                 "created_at": "2024-07-11 13:18:24"
//             },
//             {
//                 "id": "118",
//                 "country_name": "French Guiana",
//                 "country_code": "GYF",
//                 "country_flag": "French-guiana.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:19:30",
//                 "created_at": "2024-07-11 13:19:30"
//             },
//             {
//                 "id": "119",
//                 "country_name": "Grenada",
//                 "country_code": "GRN",
//                 "country_flag": "Grenada.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:20:16",
//                 "created_at": "2024-07-11 13:20:16"
//             },
//             {
//                 "id": "120",
//                 "country_name": "Guadeloupe",
//                 "country_code": "GPE",
//                 "country_flag": "Guadeloupe.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:21:42",
//                 "created_at": "2024-07-11 13:21:42"
//             },
//             {
//                 "id": "121",
//                 "country_name": "Guatemala",
//                 "country_code": "GUA",
//                 "country_flag": "Guatemala.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:22:20",
//                 "created_at": "2024-07-11 13:22:20"
//             },
//             {
//                 "id": "122",
//                 "country_name": "Guyana",
//                 "country_code": "GUY",
//                 "country_flag": "Guyana.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:22:59",
//                 "created_at": "2024-07-11 13:22:59"
//             },
//             {
//                 "id": "123",
//                 "country_name": "Haiti",
//                 "country_code": "HAI",
//                 "country_flag": "Haiti.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:26:25",
//                 "created_at": "2024-07-11 13:26:25"
//             },
//             {
//                 "id": "124",
//                 "country_name": "Honduras",
//                 "country_code": "HON",
//                 "country_flag": "Honduras.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:28:12",
//                 "created_at": "2024-07-11 13:28:12"
//             },
//             {
//                 "id": "125",
//                 "country_name": "Jamaica",
//                 "country_code": "JAM",
//                 "country_flag": "Jamaica.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:28:44",
//                 "created_at": "2024-07-11 13:28:44"
//             },
//             {
//                 "id": "126",
//                 "country_name": "Cayman Islands",
//                 "country_code": "CAY",
//                 "country_flag": "Cayman-islands.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:29:48",
//                 "created_at": "2024-07-11 13:29:48"
//             },
//             {
//                 "id": "127",
//                 "country_name": "Canada",
//                 "country_code": "CAN",
//                 "country_flag": "Canada.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:30:28",
//                 "created_at": "2024-07-11 13:30:28"
//             },
//             {
//                 "id": "128",
//                 "country_name": "Cuba",
//                 "country_code": "CUB",
//                 "country_flag": "Cuba.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:00:56",
//                 "created_at": "2024-07-11 13:31:32"
//             },
//             {
//                 "id": "129",
//                 "country_name": "Martinique",
//                 "country_code": "MTQ",
//                 "country_flag": "Martinique.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:32:25",
//                 "created_at": "2024-07-11 13:32:25"
//             },
//             {
//                 "id": "130",
//                 "country_name": "Mexico",
//                 "country_code": "MEX",
//                 "country_flag": "Mexico.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:38:04",
//                 "created_at": "2024-07-11 13:38:04"
//             },
//             {
//                 "id": "131",
//                 "country_name": "Montserrat",
//                 "country_code": "MSR",
//                 "country_flag": "Montserrat.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:01:16",
//                 "created_at": "2024-07-11 13:38:41"
//             },
//             {
//                 "id": "132",
//                 "country_name": "Nicaragua",
//                 "country_code": "NCA",
//                 "country_flag": "Nicaragua.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:40:16",
//                 "created_at": "2024-07-11 13:40:16"
//             },
//             {
//                 "id": "133",
//                 "country_name": "Panama",
//                 "country_code": "PAN",
//                 "country_flag": "Panama.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:41:57",
//                 "created_at": "2024-07-11 13:41:57"
//             },
//             {
//                 "id": "134",
//                 "country_name": "Puerto Rico",
//                 "country_code": "PUR",
//                 "country_flag": "Puerto-rico.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:51:45",
//                 "created_at": "2024-07-11 13:51:45"
//             },
//             {
//                 "id": "135",
//                 "country_name": "Saint Martin",
//                 "country_code": "SMT",
//                 "country_flag": "Saint-Martin.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:52:22",
//                 "created_at": "2024-07-11 13:52:22"
//             },
//             {
//                 "id": "136",
//                 "country_name": "Sint Maarten",
//                 "country_code": "SXM",
//                 "country_flag": "Sint-maarten.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:53:11",
//                 "created_at": "2024-07-11 13:53:11"
//             },
//             {
//                 "id": "137",
//                 "country_name": "St. Kitts and Nevis ",
//                 "country_code": "SKN",
//                 "country_flag": "St-Kitts-and-nevis.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:54:06",
//                 "created_at": "2024-07-11 13:54:06"
//             },
//             {
//                 "id": "138",
//                 "country_name": "St. Lucia",
//                 "country_code": "LCA",
//                 "country_flag": "St-lucia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:54:56",
//                 "created_at": "2024-07-11 13:54:56"
//             },
//             {
//                 "id": "139",
//                 "country_name": "St. Vincent and the Grenadines",
//                 "country_code": "VIN",
//                 "country_flag": "St-vincent-and-the-grenadines.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 13:56:39",
//                 "created_at": "2024-07-11 13:55:56"
//             },
//             {
//                 "id": "140",
//                 "country_name": "Suriname",
//                 "country_code": "SUR",
//                 "country_flag": "Suriname.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:02:52",
//                 "created_at": "2024-07-11 14:02:52"
//             },
//             {
//                 "id": "141",
//                 "country_name": "Trinidad and Tobago",
//                 "country_code": "TRI",
//                 "country_flag": "Trinidad-and-tobago.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:54:39",
//                 "created_at": "2024-07-11 14:07:24"
//             },
//             {
//                 "id": "142",
//                 "country_name": "Turks and Caicos Islands",
//                 "country_code": "TCA",
//                 "country_flag": "Turks-and-caicos-islands.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:08:23",
//                 "created_at": "2024-07-11 14:08:23"
//             },
//             {
//                 "id": "143",
//                 "country_name": "USA",
//                 "country_code": "USA",
//                 "country_flag": "usa.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:09:32",
//                 "created_at": "2024-07-11 14:09:32"
//             },
//             {
//                 "id": "144",
//                 "country_name": "Argentina",
//                 "country_code": "ARG",
//                 "country_flag": "Argentina.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:09:49",
//                 "created_at": "2024-07-11 14:09:49"
//             },
//             {
//                 "id": "145",
//                 "country_name": "Bolivia",
//                 "country_code": "BOL",
//                 "country_flag": "Bolivia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:20:02",
//                 "created_at": "2024-07-11 14:20:02"
//             },
//             {
//                 "id": "146",
//                 "country_name": "Brazil",
//                 "country_code": "BRA",
//                 "country_flag": "Brazil.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:25:19",
//                 "created_at": "2024-07-11 14:25:19"
//             },
//             {
//                 "id": "147",
//                 "country_name": "Chile",
//                 "country_code": "CHI",
//                 "country_flag": "Chile.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:26:04",
//                 "created_at": "2024-07-11 14:26:04"
//             },
//             {
//                 "id": "148",
//                 "country_name": "Ecuador",
//                 "country_code": "ECU",
//                 "country_flag": "Ecuador.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:27:26",
//                 "created_at": "2024-07-11 14:26:31"
//             },
//             {
//                 "id": "149",
//                 "country_name": "Colombia",
//                 "country_code": "COL",
//                 "country_flag": "Colombia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 15:25:17",
//                 "created_at": "2024-07-11 14:27:43"
//             },
//             {
//                 "id": "150",
//                 "country_name": "Paraguay",
//                 "country_code": "PAR",
//                 "country_flag": "Paraguay.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:30:02",
//                 "created_at": "2024-07-11 14:30:02"
//             },
//             {
//                 "id": "151",
//                 "country_name": "Peru",
//                 "country_code": "PER",
//                 "country_flag": "Peru.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:30:31",
//                 "created_at": "2024-07-11 14:30:31"
//             },
//             {
//                 "id": "152",
//                 "country_name": "Uruguay",
//                 "country_code": "URU",
//                 "country_flag": "Uruguay.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:31:40",
//                 "created_at": "2024-07-11 14:31:40"
//             },
//             {
//                 "id": "153",
//                 "country_name": "Venezuela",
//                 "country_code": "VEN",
//                 "country_flag": "Venezuela.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:38:26",
//                 "created_at": "2024-07-11 14:38:26"
//             },
//             {
//                 "id": "154",
//                 "country_name": "American Samoa",
//                 "country_code": "ASA",
//                 "country_flag": "American-samoa.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:39:07",
//                 "created_at": "2024-07-11 14:39:07"
//             },
//             {
//                 "id": "155",
//                 "country_name": "Cook Islands",
//                 "country_code": "COK",
//                 "country_flag": "Cook-islands.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:40:22",
//                 "created_at": "2024-07-11 14:40:22"
//             },
//             {
//                 "id": "156",
//                 "country_name": "Fiji",
//                 "country_code": "FIJ",
//                 "country_flag": "Fiji.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:48:31",
//                 "created_at": "2024-07-11 14:48:31"
//             },
//             {
//                 "id": "157",
//                 "country_name": "Kiribati",
//                 "country_code": "KIR",
//                 "country_flag": "Kiribati.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:49:10",
//                 "created_at": "2024-07-11 14:49:10"
//             },
//             {
//                 "id": "158",
//                 "country_name": "New Caledonia",
//                 "country_code": "NCL",
//                 "country_flag": "New-caledonia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:49:53",
//                 "created_at": "2024-07-11 14:49:53"
//             },
//             {
//                 "id": "159",
//                 "country_name": "New Zealand",
//                 "country_code": "NZL",
//                 "country_flag": "New-zealand.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:57:13",
//                 "created_at": "2024-07-11 14:57:13"
//             },
//             {
//                 "id": "160",
//                 "country_name": "Papua New Guinea",
//                 "country_code": "PNG",
//                 "country_flag": "Papua-new-guinea.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 14:57:52",
//                 "created_at": "2024-07-11 14:57:52"
//             },
//             {
//                 "id": "161",
//                 "country_name": "Solomon Islands",
//                 "country_code": "SOL",
//                 "country_flag": "Solomon.islands.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 15:07:29",
//                 "created_at": "2024-07-11 15:07:29"
//             },
//             {
//                 "id": "162",
//                 "country_name": "Samoa",
//                 "country_code": "SAM",
//                 "country_flag": "Samoa.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 15:13:08",
//                 "created_at": "2024-07-11 15:13:08"
//             },
//             {
//                 "id": "163",
//                 "country_name": "Tahiti",
//                 "country_code": "TAH",
//                 "country_flag": "Tahiti.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-11 15:20:21",
//                 "created_at": "2024-07-11 15:19:43"
//             },
//             {
//                 "id": "164",
//                 "country_name": "Tonga",
//                 "country_code": "TGA",
//                 "country_flag": "Tonga.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 06:43:23",
//                 "created_at": "2024-07-12 06:43:23"
//             },
//             {
//                 "id": "165",
//                 "country_name": "Tuvalu",
//                 "country_code": "TUV",
//                 "country_flag": "Tuvalu.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 06:43:57",
//                 "created_at": "2024-07-12 06:43:57"
//             },
//             {
//                 "id": "166",
//                 "country_name": "Vanuatu",
//                 "country_code": "VAN",
//                 "country_flag": "Vanuatu.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:55:20",
//                 "created_at": "2024-07-12 06:49:33"
//             },
//             {
//                 "id": "167",
//                 "country_name": "Albania",
//                 "country_code": "ALB",
//                 "country_flag": "Albania.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:55:38",
//                 "created_at": "2024-07-12 06:52:24"
//             },
//             {
//                 "id": "168",
//                 "country_name": "Andorra",
//                 "country_code": "AND",
//                 "country_flag": "Andorra.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 06:53:21",
//                 "created_at": "2024-07-12 06:53:21"
//             },
//             {
//                 "id": "169",
//                 "country_name": "Armenia",
//                 "country_code": "ARM",
//                 "country_flag": "Armenia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 06:55:44",
//                 "created_at": "2024-07-12 06:55:44"
//             },
//             {
//                 "id": "170",
//                 "country_name": "Azerbaijan",
//                 "country_code": "AZE",
//                 "country_flag": "Azerbaijan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:09:33",
//                 "created_at": "2024-07-12 07:05:24"
//             },
//             {
//                 "id": "171",
//                 "country_name": "Belarus",
//                 "country_code": "BLR",
//                 "country_flag": "Belarus.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:10:15",
//                 "created_at": "2024-07-12 07:10:15"
//             },
//             {
//                 "id": "172",
//                 "country_name": "Belgium",
//                 "country_code": "BEL",
//                 "country_flag": "Belgium.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:12:59",
//                 "created_at": "2024-07-12 07:12:59"
//             },
//             {
//                 "id": "173",
//                 "country_name": "Bosnia and Herzegovina",
//                 "country_code": "BIH",
//                 "country_flag": "Bosnia-and-herzegovina.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:19:41",
//                 "created_at": "2024-07-12 07:19:41"
//             },
//             {
//                 "id": "174",
//                 "country_name": "Bulgaria",
//                 "country_code": "BUL",
//                 "country_flag": "Bulgaria.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:22:54",
//                 "created_at": "2024-07-12 07:22:54"
//             },
//             {
//                 "id": "175",
//                 "country_name": "Denmark",
//                 "country_code": "DEN",
//                 "country_flag": "Denmark.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:56:03",
//                 "created_at": "2024-07-12 07:29:24"
//             },
//             {
//                 "id": "176",
//                 "country_name": "Germany",
//                 "country_code": "GER",
//                 "country_flag": "Germany.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:56:18",
//                 "created_at": "2024-07-12 07:30:16"
//             },
//             {
//                 "id": "177",
//                 "country_name": "England",
//                 "country_code": "ENG",
//                 "country_flag": "England.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:31:58",
//                 "created_at": "2024-07-12 07:31:58"
//             },
//             {
//                 "id": "178",
//                 "country_name": "Estonia",
//                 "country_code": "EST",
//                 "country_flag": "Estonia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:56:44",
//                 "created_at": "2024-07-12 07:32:14"
//             },
//             {
//                 "id": "179",
//                 "country_name": "Faroe Islands",
//                 "country_code": "FRO",
//                 "country_flag": "Faroe-islands.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:38:11",
//                 "created_at": "2024-07-12 07:38:11"
//             },
//             {
//                 "id": "180",
//                 "country_name": "Finland",
//                 "country_code": "FIN",
//                 "country_flag": "Finland.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:40:48",
//                 "created_at": "2024-07-12 07:39:37"
//             },
//             {
//                 "id": "181",
//                 "country_name": "France",
//                 "country_code": "FRA",
//                 "country_flag": "France.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:41:20",
//                 "created_at": "2024-07-12 07:41:20"
//             },
//             {
//                 "id": "182",
//                 "country_name": "Georgia",
//                 "country_code": "GEO",
//                 "country_flag": "Georgia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:41:53",
//                 "created_at": "2024-07-12 07:41:53"
//             },
//             {
//                 "id": "183",
//                 "country_name": "Gibraltar Gibraltar ",
//                 "country_code": "GIB",
//                 "country_flag": "Gibraltar-gibraltar.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:42:34",
//                 "created_at": "2024-07-12 07:42:34"
//             },
//             {
//                 "id": "184",
//                 "country_name": "Greece",
//                 "country_code": "GRE",
//                 "country_flag": "Greece.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:43:21",
//                 "created_at": "2024-07-12 07:43:21"
//             },
//             {
//                 "id": "185",
//                 "country_name": "Ireland",
//                 "country_code": "IRL",
//                 "country_flag": "Ireland.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:43:45",
//                 "created_at": "2024-07-12 07:43:45"
//             },
//             {
//                 "id": "186",
//                 "country_name": "Iceland",
//                 "country_code": "ISL",
//                 "country_flag": "Iceland.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:44:15",
//                 "created_at": "2024-07-12 07:44:15"
//             },
//             {
//                 "id": "187",
//                 "country_name": "Israel",
//                 "country_code": "ISR",
//                 "country_flag": "Israel.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:46:02",
//                 "created_at": "2024-07-12 07:46:02"
//             },
//             {
//                 "id": "188",
//                 "country_name": "Italy",
//                 "country_code": "ITA",
//                 "country_flag": "Italy.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:47:39",
//                 "created_at": "2024-07-12 07:47:39"
//             },
//             {
//                 "id": "189",
//                 "country_name": "Kazakhstan",
//                 "country_code": "KAZ",
//                 "country_flag": "Kazakhstan.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 07:56:46",
//                 "created_at": "2024-07-12 07:56:46"
//             },
//             {
//                 "id": "190",
//                 "country_name": "Kosovo",
//                 "country_code": "KVX",
//                 "country_flag": "Kosovo.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:00:07",
//                 "created_at": "2024-07-12 08:00:07"
//             },
//             {
//                 "id": "191",
//                 "country_name": "Croatia",
//                 "country_code": "CRO",
//                 "country_flag": "Croatia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:05:04",
//                 "created_at": "2024-07-12 08:05:04"
//             },
//             {
//                 "id": "192",
//                 "country_name": "Latvia",
//                 "country_code": "LVA",
//                 "country_flag": "Latvia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:05:38",
//                 "created_at": "2024-07-12 08:05:38"
//             },
//             {
//                 "id": "193",
//                 "country_name": "Liechtenstein",
//                 "country_code": "LIE",
//                 "country_flag": "Liechtenstein.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:06:26",
//                 "created_at": "2024-07-12 08:06:26"
//             },
//             {
//                 "id": "194",
//                 "country_name": "Lithuania",
//                 "country_code": "LTU",
//                 "country_flag": "Lithuania.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:06:54",
//                 "created_at": "2024-07-12 08:06:54"
//             },
//             {
//                 "id": "195",
//                 "country_name": "Luxembourg",
//                 "country_code": "LUX",
//                 "country_flag": "Luxembourg.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:07:43",
//                 "created_at": "2024-07-12 08:07:43"
//             },
//             {
//                 "id": "196",
//                 "country_name": "Malta",
//                 "country_code": "MLT",
//                 "country_flag": "Malta.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:08:25",
//                 "created_at": "2024-07-12 08:08:25"
//             },
//             {
//                 "id": "197",
//                 "country_name": "Moldova",
//                 "country_code": "MDA",
//                 "country_flag": "Moldova.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:09:01",
//                 "created_at": "2024-07-12 08:09:01"
//             },
//             {
//                 "id": "198",
//                 "country_name": "Montenegro",
//                 "country_code": "MNE",
//                 "country_flag": "Montenegro.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:10:42",
//                 "created_at": "2024-07-12 08:10:42"
//             },
//             {
//                 "id": "199",
//                 "country_name": "Niederlande Niederlande",
//                 "country_code": "NED",
//                 "country_flag": "Niederlande-niederlande.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:14:34",
//                 "created_at": "2024-07-12 08:14:34"
//             },
//             {
//                 "id": "200",
//                 "country_name": "Northern Ireland",
//                 "country_code": "NIR",
//                 "country_flag": "Northern-ireland.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:16:50",
//                 "created_at": "2024-07-12 08:16:50"
//             },
//             {
//                 "id": "201",
//                 "country_name": "North Macedonia",
//                 "country_code": "MKD",
//                 "country_flag": "North-macedonia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:19:37",
//                 "created_at": "2024-07-12 08:19:37"
//             },
//             {
//                 "id": "202",
//                 "country_name": "Norway",
//                 "country_code": "NOP",
//                 "country_flag": "Norway.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:24:12",
//                 "created_at": "2024-07-12 08:24:12"
//             },
//             {
//                 "id": "203",
//                 "country_name": "Austria",
//                 "country_code": "AUT",
//                 "country_flag": "Austria.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:28:38",
//                 "created_at": "2024-07-12 08:28:38"
//             },
//             {
//                 "id": "204",
//                 "country_name": "Poland",
//                 "country_code": "POL",
//                 "country_flag": "Poland.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:34:09",
//                 "created_at": "2024-07-12 08:34:09"
//             },
//             {
//                 "id": "205",
//                 "country_name": "Portugal",
//                 "country_code": "POR",
//                 "country_flag": "Portugal.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:44:30",
//                 "created_at": "2024-07-12 08:44:30"
//             },
//             {
//                 "id": "206",
//                 "country_name": "Romania",
//                 "country_code": "ROU",
//                 "country_flag": "Romania.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:45:04",
//                 "created_at": "2024-07-12 08:45:04"
//             },
//             {
//                 "id": "207",
//                 "country_name": "Russia",
//                 "country_code": "RUS",
//                 "country_flag": "Russia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:46:53",
//                 "created_at": "2024-07-12 08:46:53"
//             },
//             {
//                 "id": "208",
//                 "country_name": "San Marino",
//                 "country_code": "SMR",
//                 "country_flag": "San-marino.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:47:34",
//                 "created_at": "2024-07-12 08:47:34"
//             },
//             {
//                 "id": "209",
//                 "country_name": "Scotland",
//                 "country_code": "SCO",
//                 "country_flag": "Scotland.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:48:19",
//                 "created_at": "2024-07-12 08:48:19"
//             },
//             {
//                 "id": "210",
//                 "country_name": "Sweden Sweden",
//                 "country_code": "SWE",
//                 "country_flag": "Sweden-sweden.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:49:02",
//                 "created_at": "2024-07-12 08:49:02"
//             },
//             {
//                 "id": "211",
//                 "country_name": "Switzerland",
//                 "country_code": "SUI",
//                 "country_flag": "Switzerland.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:53:47",
//                 "created_at": "2024-07-12 08:53:47"
//             },
//             {
//                 "id": "212",
//                 "country_name": "Serbia",
//                 "country_code": "SRB",
//                 "country_flag": "Serbia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:57:47",
//                 "created_at": "2024-07-12 08:57:47"
//             },
//             {
//                 "id": "213",
//                 "country_name": "Slovakia",
//                 "country_code": "SVK",
//                 "country_flag": "Slovakia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 08:58:45",
//                 "created_at": "2024-07-12 08:58:45"
//             },
//             {
//                 "id": "214",
//                 "country_name": "Slovenia",
//                 "country_code": "SVN",
//                 "country_flag": "Slovenia.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 09:00:47",
//                 "created_at": "2024-07-12 09:00:47"
//             },
//             {
//                 "id": "215",
//                 "country_name": "Spain",
//                 "country_code": "ESP",
//                 "country_flag": "Spain.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 09:01:33",
//                 "created_at": "2024-07-12 09:01:33"
//             },
//             {
//                 "id": "216",
//                 "country_name": "Czech Republic",
//                 "country_code": "CZE",
//                 "country_flag": "Czech-republic.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 09:03:53",
//                 "created_at": "2024-07-12 09:03:53"
//             },
//             {
//                 "id": "217",
//                 "country_name": "Turkey",
//                 "country_code": "TUR",
//                 "country_flag": "Turkey.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 09:04:44",
//                 "created_at": "2024-07-12 09:04:44"
//             },
//             {
//                 "id": "218",
//                 "country_name": "Ukraine",
//                 "country_code": "UKR",
//                 "country_flag": "Ukraine.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 09:05:15",
//                 "created_at": "2024-07-12 09:05:15"
//             },
//             {
//                 "id": "219",
//                 "country_name": "Hungary",
//                 "country_code": "HUN",
//                 "country_flag": "Hungary.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 09:05:55",
//                 "created_at": "2024-07-12 09:05:55"
//             },
//             {
//                 "id": "220",
//                 "country_name": "Wales",
//                 "country_code": "WAL",
//                 "country_flag": "Wales.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 09:06:43",
//                 "created_at": "2024-07-12 09:06:43"
//             },
//             {
//                 "id": "221",
//                 "country_name": "Cyprus",
//                 "country_code": "CYP",
//                 "country_flag": "Cyprus.svg",
//                 "status": "1",
//                 "updated_at": "2024-07-12 09:07:36",
//                 "created_at": "2024-07-12 09:07:36"
//             }
//         ]

  selectedCountry: number | null = null;

  onCountryChange(event: any) {
    this.selectedCountry = +event.target.value;
    console.log('Selected country ID:', this.selectedCountry);
  }

 activeIndex: number = 1; // -1 means no button is active initially
  isVisible: boolean = true;
  setActive(index: number): void {
    this.activeIndex = index; // Set the activeIndex to the index of the clicked button
    this.role = index === 1 ? 4 : index === 2 ? 2 : 3; // Update role based on activeIndex

  }
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  role: number = 4; // Initialize role to 4 (Player)
  email: string = '';
  language: string = '1';
  newsletter: boolean = false;
  userDomain: string = '1';
  confirmPassword: string = '';
  privacyPolicy: boolean = false;
  loginButtonClicked: boolean = false;
  invalidCred: string = '';

  registerFormSubmitted: boolean = false;
  registerError: string = '';
  forgotPasswordEmail: string = '';
  forgotPasswordMessage: string = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
     private route: ActivatedRoute,
      private router: Router, 
      private translateService: TranslateService, 
      public dialog: MatDialog
     ) {}

  lang:string = '';
  token= '';
  tokenVerified = false;

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en'
      // Check if the google.accounts.id library is loaded
      if (typeof google !== 'undefined' && typeof google.accounts !== 'undefined' && typeof google.accounts.id !== 'undefined') {
        // Initialize Google Sign-In
        this.initializeGoogleSignIn();
      } else {
        // Google API script might not be loaded yet; wait for it to load
        console.warn('Google API script is not fully loaded.');
      }
  this.route.queryParams.subscribe(params => {
      this.token = params['confirm-token'] || '';
      console.log('Magic Token:', this.token);

      if (this.token) {
        // Call authService to verify magic token
        this.authService.magicLogin(this.token).subscribe(
          (response: any) => {
            console.log('Magic Login Response:', response);
            if (response.success) {
              this.tokenVerified = true;
              this.openModal();
            } else {
              this.tokenVerified = false;
              console.log('Token is not verified please check');
              this.notverifyed();
              console.log("popup is not open")
            }
          },
          (error) => {
            console.error('Error verifying token:', error);
            this.tokenVerified = false;
            this.notverifyed();
          }
        );
      } else {
        this.tokenVerified = false;
        console.log('Token is not provided');
      }
    });

    
   
  }

  performMagicLogin(token: string) {
    this.authService.magicLogin(token).subscribe(
      magicLoginResponse => {
        console.log('Magic login response:', magicLoginResponse);
        if (magicLoginResponse.status === true) {
          this.openModal();
          
        } else {
          console.error('Auto-login failed:', magicLoginResponse.message);
          console.log("Token is not verified");
        }
      },
      error => {
        console.error('An error occurred during auto-login:', error);
        // Handle error scenario if needed
      }
    );
  }

  ChangeLang(lang:any){
    const selectedLanguage = lang.target.value;
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage)
  }

  toggleTheme(event: Event) {
    event.preventDefault();
    this.themeService.toggleTheme();
  }


  login() {
    this.loginButtonClicked = true;

    if (!this.email || !this.password) {
      console.error('Please fill in all required fields.');
      return;
    }

    const selectedLanguage = localStorage.getItem('lang') || '';
    const domain = environment.targetDomain?.domain || 'ch';

    const loginData = {
      email: this.email,
      password: this.password,
      lang: selectedLanguage,
      domain: domain,
      
    };

    this.authService.login(loginData).subscribe(
      response => {
        console.log('Login response:', response);
        if (response.status === false) {
          console.error('Login failed:', response.message);
          this.invalidCred = response.message;
          this.showInvalidCredMessage();
        } else {
          console.log('Login successful.');
          const token = response.data.token;
          const userData = response.data.user_data;
        
          console.log(userData,"check user data index ")


          localStorage.setItem('authToken', token);
        
          const storedToken = localStorage.getItem('authToken');
          localStorage.setItem('userData', JSON.stringify(userData));
        
          if (storedToken === token) {
            console.log('Token successfully saved to local storage.');

            this.translateService.use(selectedLanguage);

            // const selectedLanguage = localStorage.getItem('lang');
            // if (selectedLanguage) {
            //   this.translateService.use(selectedLanguage);
            // }

            // let targetDomain = '';
            //   if (selectedLanguage === 'en') {
            //     targetDomain = environment.targetDomain.en;
            //   } else if (selectedLanguage === 'de') {
            //     targetDomain = environment.targetDomain.de;
            //   }
            //   console.log(targetDomain, "domain");
            //   console.log(selectedLanguage, "check language")

            let modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal-login'));
            if (modal) {
              modal.hide();
            }
            this.router.navigate(['/Admin/Dashboard']);
            // window.location.href = `${targetDomain}/Admin/Dashboard`;
          } else {
            console.error('Failed to save token to local storage.');
          }
        }
      },
      error => {
        console.error('An error occurred while logging in:', error);
      }
    );
  }

  private showInvalidCredMessage() {
    if (this.invalidCredMessage) {
      this.invalidCredMessage.nativeElement.style.display = 'block';
    }
  }

  register() {
    this.registerFormSubmitted = true;

    if (!this.isFormValid()) {
      console.error('Please fill in all required fields.');
      return;
    }

    const selectedLanguage = localStorage.getItem('lang') || '';
    const domain = environment.targetDomain?.domain || 'ch';

    const registrationData = {
      first_name: this.firstName,
      last_name: this.lastName,
      username: this.username,
      role: this.role,
      email: this.email,
      newsletter: this.newsletter,
      user_domain: this.userDomain,
      password: this.password,
      password_confirm: this.confirmPassword,
      privacy_policy: this.privacyPolicy,
      lang: selectedLanguage, 
      domain: domain
    };


    this.authService.register(registrationData).subscribe(
      response => {
        console.log('Registration response:', response);
        if (response.status === true) {
          const registerModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal1'));
          if (registerModal) {
            registerModal.hide();
          }
          const loginModal = new bootstrap.Modal(document.getElementById('exampleModal-login'));
          loginModal.show();
        } else {
          let errorMessage = '';
          // Check if response.message is an object
          if (typeof response.message === 'object') {
            // Loop through each error message and concatenate them
            Object.keys(response.message).forEach(key => {
              errorMessage += response.message[key] + ' ';
            });
          } else {
            errorMessage = response.message;
          }
          this.registerError = errorMessage.trim(); // Trim to remove any leading or trailing spaces
          this.registerFormSubmitted = false; // Reset form submission flag to allow re-submission
        }
      },
      error => {
        console.error('Registration failed:', error);
        if (error && error.status === 400 && error.error && error.error.data) {
          const errorData = error.error.data;
          if (errorData.username) {
            this.registerForm.controls['username'].setErrors({ usernameExists: true });
          }
          if (errorData.email) {
            this.registerForm.controls['email'].setErrors({ emailExists: true });
          }
          this.registerError = errorData.message || 'An error occurred during registration.';
        } else {
          console.error('An error occurred while registering:', error);
          this.registerError = 'An error occurred during registration. Please try again.';
        }
        this.registerFormSubmitted = false; // Reset form submission flag to allow re-submission
      }
    );
  }

  isFormValid(): boolean {
    return (
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.username.trim() !== '' &&
      this.role !== null &&
      this.email.trim() !== '' &&
      this.language !== null &&
      this.newsletter !== null &&
      this.userDomain.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.privacyPolicy !== false
    );
  }

  forgotPassword() {
    if (!this.forgotPasswordEmail.trim()) {
      console.error('Email is required for password recovery.');
      this.forgotPasswordMessage = 'Please provide a valid email address.';
      return;
    }

    this.authService.forgotPassword(this.forgotPasswordEmail).subscribe(
      response => {
        console.log('Password recovery response:', response);
        if (response.status === true) {
            const magicToken = response.data.magic_link_url;
            const magic_link_url = `http://localhost:4200/Index?confirm-token=${magicToken}`;
             console.log("Magic link URL:", magic_link_url);
          this.authService.magicLogin(magic_link_url).subscribe(
            magicLoginResponse => {
              console.log('Magic login response:', magicLoginResponse);
              if (magicLoginResponse.status === true) {
                console.log('Auto-login successful.');
                this.router.navigate(['/Admin/Dashboard']);
              } else {
                console.error('Auto-login failed:', magicLoginResponse.message);
                this.forgotPasswordMessage = 'Auto-login failed. Please try again.';
              }
            },
            magicLoginError => {
              console.error('An error occurred during auto-login:', magicLoginError);
              this.forgotPasswordMessage = 'An error occurred during auto-login. Please try again later.';
            }
          );
        } else {
          console.error('Password recovery failed:', response.message);
          this.forgotPasswordMessage = response.message;
        }
      },
      error => {
        console.error('An error occurred while requesting password recovery:', error);
        this.forgotPasswordMessage = 'An error occurred. Please try again later.';
      }
    );
  }




  // forgotPassword(): void {
  //   if (!this.forgotPasswordEmail.trim()) {
  //     console.error('Email is required for password recovery.');
  //     this.forgotPasswordMessage = 'Please provide a valid email address.';
  //     return;
  //   }

  //   this.authService.forgotPassword(this.forgotPasswordEmail).subscribe(
  //     response => {
  //       console.log('Password recovery response:', response);
  //       if (response.status === true && response.data.magic_link_url) {
  //         const magicToken = response.data.magic_link_url;
  //         const magicLinkUrl = `http://localhost:4200/Index?confirm-token=${magicToken}`;
  //         console.log("Magic link URL:", magicLinkUrl);

  //         // Redirect to magic link URL
  //         this.router.navigateByUrl(magicLinkUrl).then(nav => {
  //           console.log('Navigation to magic link:', nav);
  //           if (!nav) {
  //             console.error('Navigation to magic link failed.');
  //             this.forgotPasswordMessage = 'Failed to navigate to magic link. Please try again.';
  //           }
  //         });
  //       } else {
  //         console.error('Password recovery failed or magic token not received:', response.message);
  //         this.forgotPasswordMessage = response.message || 'Magic token not received. Please try again.';
  //       }
  //     },
  //     error => {
  //       console.error('An error occurred while requesting password recovery:', error);
  //       this.forgotPasswordMessage = 'An error occurred. Please try again later.';
  //     }
  //   );
  // }
  


  initializeGoogleSignIn(): void {
    if (typeof google !== 'undefined' && typeof google.accounts !== 'undefined' && typeof google.accounts.id !== 'undefined') {
      // Initialize Google Sign-In
      google.accounts.id.initialize({
        client_id: '156115430884-qbtnhb5dlnn6fnqtj2k6vh7khol2p7e8.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleSignIn(response)
      });
      // Render Google Sign-In button in a hidden div
      google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        {
          theme: 'outline',
          size: 'large',
          promptParentId: 'googleSignInButton',
          prompt: 'select_account'
        }
      );
    } else {
      // Google API script might not be loaded yet; wait for it to load
      console.warn('Google API script is not fully loaded.');
    }
  }

  handleGoogleSignIn(response: any): void {
    const idToken = response.credential;
    const user = this.parseJwt(idToken);
    if (user) {
      console.log('Google login successful:', user);
      // Save user data or token as needed, for example:
      localStorage.setItem('authToken', idToken);
      console.log('Token saved in localStorage:', idToken); // <-- Logging statement
      let modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal-login'));
      if (modal) {
        modal.hide();
      }
      // this.router.navigate(['/Admin/Dashboard']);
    } else {
      console.error('Failed to decode Google ID token');
      this.invalidCred = 'Failed to log in with Google';
      this.showInvalidCredMessage();
    }
  }

  private parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to parse JWT:', error);
      return null;
    }
  }


//   editpassword():void  {
//     console.log("hiii ")
//   this.dialog.open(ConfirmPasswordComponent)
// }

openModal() {
  this.dialog.open(ConfirmPasswordComponent, {
    width:'500px',
    // data: { token: this.token }
  });
}
notverifyed()
{
  this.dialog.open(ConfirmPasswordComponent, {
    width:'500px',
    // data: { token: this.token }
  });
}
}
