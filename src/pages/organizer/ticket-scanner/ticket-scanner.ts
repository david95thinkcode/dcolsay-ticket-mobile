import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, Platform, AlertController} from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
/**
 * Generated class for the TicketScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-ticket-scanner', templateUrl: 'ticket-scanner.html'})

export class TicketScannerPage implements OnInit {
  options : BarcodeScannerOptions;
  event : string;
  results : any;
  ticketfound : boolean;
  attendeesCount : number;
  attendeesNotCkeckedCount : number;

  constructor(private scanner : BarcodeScanner, public navCtrl : NavController, public navParams : NavParams, public alertCtrl : AlertController, public plateform : Platform) {

    this.event = this.navParams.get('event');
  
  }

  ngOnInit() {
    
    this.ticketfound = false;
    this.attendeesCount = 0;
    this.attendeesNotCkeckedCount = 0;
    this.ScanBarcode();
  }

  async ScanBarcode() {
    let test : string = 'http://www.github.io';

    if (this.plateform.is('core')) {
      this.NotifyWrongDeviceForScanFeature();
    } else {
      this.results = await this
        .scanner
        .scan();
      if (this.results.text == test) {
        this.ticketfound = true;
        this.attendeesCount++;
      } else {
        this.ticketfound = false;
        this.attendeesNotCkeckedCount++;
      }
      // Vérifier si le text retourné est dans la base de données des participants

    }
  }

  /**
   * Used to notify user when he'se trying to scan code on a desktop
   */
  NotifyWrongDeviceForScanFeature() {
    const alert = this
      .alertCtrl
      .create({
        title: 'Unable to scan code',
        subTitle: 'You cannot use this feature because you\'re not running this app on a smartphone' +
            '. If you want to use it, install it on a smartphone that use one of the followin' +
            'g OS : android, ios, windows',
        buttons: ['Dismiss']
      });

    alert.present();
  }

}
