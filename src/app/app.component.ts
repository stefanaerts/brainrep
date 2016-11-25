//import * as braintree from 'braintree-web';

import { Component } from '@angular/core';
 import * as jsSHA from 'jssha';

// braintree = require('braintree-web');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {

    }

  //clientDidCreate(err, client) {
  //  console.log('in clientdidcreate');
 // }
}
    /*braintree.hostedFields.create({
      client: client,
      styles: {
        'input': {
          'font-size': '16pt',
          'color': '#3A3A3A'
        },

        '.number': {
          'font-family': 'monospace'
        },

        '.valid': {
          'color': 'green'
        }
      },
      fields: {
        number: {
          selector: '#card-number'
        },
        cvv: {
          selector: '#cvv'
        },
        expirationDate: {
          selector: '#expiration-date'
        }
      }
    }, this.hostedFieldsDidCreate);
  };

  hostedFieldsDidCreate(err, hostedFields) {
    this.submitBtn.addEventListener('click', this.submitHandler.bind(null, hostedFields));
    this.submitBtn.removeAttribute('disabled');
  }

  submitHandler(hostedFields, event) {
    event.preventDefault();
    this.submitBtn.setAttribute('disabled', 'disabled');

    hostedFields.tokenize(function (err, payload) {
      if (err) {
        this.submitBtn.removeAttribute('disabled');
        console.error(err);
      } else {
        this.form['payment_method_nonce'].value = payload.nonce;
        this.form.submit();
      }
    });
  }
}*/

