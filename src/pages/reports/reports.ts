import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import { AddStockPage } from '../add-stock/add-stock';
import { EditProductPage } from '../edit-product/edit-product'
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {
  userId: any;
  public sales: AfoListObservable<any[]>;

    constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
      public alertCtrl: AlertController, public afAuth: AngularFireAuth,
    public actionSheetCtrl: ActionSheetController) {
        afAuth.authState.subscribe( user => {
      if (user) { this.userId = user.uid }
      this.sales = afoDatabase.list(`/userProfile/${this.userId}/sales`);
    });
    }

}
