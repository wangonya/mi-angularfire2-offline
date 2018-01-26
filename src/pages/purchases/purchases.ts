import { Component } from '@angular/core';
import { NavController, AlertController,
  ActionSheetController } from 'ionic-angular';
import { AddStockPage } from '../add-stock/add-stock';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-purchases',
  templateUrl: 'purchases.html'
})
export class PurchasesPage {
  userId: any;

  public products: AfoListObservable<any[]>;
  filteredPurchases: AfoListObservable<any[]>;
  constructor(public navCtrl: NavController,private afoDatabase: AngularFireOfflineDatabase,
    public alertCtrl: AlertController, public afAuth: AngularFireAuth,
  public actionSheetCtrl: ActionSheetController) {
      afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);

    this.filteredPurchases = this.afoDatabase.list(`/userProfile/${this.userId}/products`, {
      query: {
        orderByChild: 'type',
        equalTo: 'purchase'
      }
    });

  });
  }
  editProduct(product){
    console.log(product);
    this.navCtrl.push(AddStockPage, {
      key: product.$key,
      date: product.date,
      type: product.type,
      name: product.name,
      quantity: product.quantity,
      unit: product.unit,
      price: product.price,
      supplier: product.supplier
    });
  }

  presentConfirm(key: string) {
  let alert = this.alertCtrl.create({
    title: 'Confirm delete',
    message: 'Are you sure?',
    cssClass: 'alertcss',

    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',

        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Delete',
        cssClass: 'buttoncss',

        handler: () => {

            this.products.remove(key);

          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
}
}
