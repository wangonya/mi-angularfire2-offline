import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  AfoListObservable,
  AngularFireOfflineDatabase} from 'angularfire2-offline/database';
  import { FormBuilder, FormGroup} from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { Toast } from '@ionic-native/toast';
import { Validator } from  '../../validators/validator';
/**
 * Generated class for the AddPPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-p',
  templateUrl: 'add-p.html',
})
export class AddPPage {
  slideOneForm: FormGroup;
  userId: any;
  public purchases: AfoListObservable<any[]>;
  public suppliers: AfoListObservable<any[]>;
  public products: AfoListObservable<any[]>;

  purchase={id:'',
  date: '',
  name: '',
  quantity: '',
  unit: '',
  bprice: '',
  sprice: '',
  supplier: '',
  addq: '',
  actualq: ''
  };
  constructor(private afoDatabase: AngularFireOfflineDatabase,
     public afAuth: AngularFireAuth,public navCtrl: NavController,
   public params: NavParams,private toast: Toast
 , public formBuilder: FormBuilder) {
       afAuth.authState.subscribe( user => {
    if (user) { this.userId = user.uid }
    this.purchases = afoDatabase.list(`/userProfile/${this.userId}/purchases`);
    this.suppliers = afoDatabase.list(`/userProfile/${this.userId}/suppliers`);
    this.products = afoDatabase.list(`/userProfile/${this.userId}/products`);

    this.purchase.id = this.params.get('key');
    this.purchase.date = this.params.get('date');
    this.purchase.name = this.params.get('name');
    this.purchase.quantity = this.params.get('quantity');
    this.purchase.unit = this.params.get('unit');
    this.purchase.bprice = this.params.get('bprice');
    this.purchase.sprice = this.params.get('sprice');
    this.purchase.supplier = this.params.get('supplier');
    this.purchase.addq = this.params.get('addq');
    this.purchase.actualq = this.params.get('actualq');

    this.slideOneForm = formBuilder.group({
        buyP: ['', Validator.isValid]
    });

  });
  }
  addPurchase(id,date,name,quantity,unit,bprice,sprice,supplier,addq) {
    if(id) {
      this.purchases.update(id, {
        date: date,
        name: name,
        quantity: quantity,
        unit: unit,
        bprice: bprice,
        sprice: sprice,
        supplier: supplier,
        addq: 0,
        salequantity: 0,
        salegreturn: 0,
        greturn: 0,
        saletotal: 0,
        profit: 0,
        total: (quantity*bprice),

      }).then( newPurchase => {
            this.toast.show('Product bought', '5000', 'center').subscribe(
              toast => {
                this.navCtrl.pop();
              }
            );
          })
          .catch(e => {
            console.log(e);
            this.toast.show(e, '5000', 'center').subscribe(
              toast => {
                console.log(toast);
              }
            );
          });

    }
  }
}
