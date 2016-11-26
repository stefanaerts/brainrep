import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import * as braintree from 'braintree-web';
declare var $: any;

@Component({
  selector: 'app-card-picker',
  templateUrl: './card-picker.component.html',
  styleUrls: ['./card-picker.component.scss']
})
export class CardPickerComponent implements OnInit {
message: string;
  authorization: any;

  constructor(public http: Http) {
    this.message = "...Loading";
  }
 getToken() {
    this.http.get('http://localhost:3000/api/v1/token').first().subscribe(
      data => {

        if (data.status === 200) {
          //      this.createClient(data.text());
          this.authorization = data.text();
          //   this.message = data.text();
          this.makeTransaction();
        }
        else {
          console.log("error in getToken, status =" + data.status + "REASON: " + data.statusText);
        }
      }, (error: any) => {
        console.log("error in subscribe gettoken=" + error);
      }
    );
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    //   this.amount.focus();
    this.getToken();
  }

  makeTransaction() {
    let form: HTMLFormElement = (<HTMLFormElement>document.querySelector('#checkout-form'));
    let submit: HTMLElement = (<HTMLElement>document.querySelector('input[type="submit"]'));


    console.info('author=' + this.authorization);


    braintree.client.create({
      authorization: this.authorization
    }, function (err, clientInstance) {
      if (err) {
        console.error(err);
        return;
      }
      //   braintree.hostedFields.create({
      // Create input fields and add text styles
      braintree.hostedFields.create({
        client: clientInstance,
         styles: {
      'input': {
        'color': '#282c37',
        'font-size': '16px',
        'transition': 'color 0.1s',
        'line-height': '3'
      },
      // Style the text of an invalid input
      'input.invalid': {
        'color': '#E53A40'
      },
      // placeholder styles need to be individually adjusted
      '::-webkit-input-placeholder': {
        'color': 'rgba(0,0,0,0.6)'
      },
      ':-moz-placeholder': {
        'color': 'rgba(0,0,0,0.6)'
      },
      '::-moz-placeholder': {
        'color': 'rgba(0,0,0,0.6)'
      },
      ':-ms-input-placeholder ': {
        'color': 'rgba(0,0,0,0.6)'
      }

    },
    // Add information for individual fields
    fields: {
      number: {
        selector: '#card-number',
        placeholder: '1111 1111 1111 1111'
      },
      cvv: {
        selector: '#cvv',
        placeholder: '123'
      },
      expirationDate: {
        selector: '#expiration-date',
        placeholder: '10 / 2019'
      }
    }
      }, function (hostedFieldsErr, hostedFieldsInstance) {

        if (hostedFieldsErr) {
          console.error(hostedFieldsErr);
          return;
        }
hostedFieldsInstance.on('validityChange', function (event) {
      // Check if all fields are valid, then show submit button
      var formValid = Object.keys(event.fields).every(function (key) {
        return event.fields[key].isValid;
      });

      if (formValid) {
        $('#button-pay').addClass('show-button');
      } else {
        $('#button-pay').removeClass('show-button');
      }
    });

    hostedFieldsInstance.on('empty', function (event) {
      $('header').removeClass('header-slide');
      $('#card-image').removeClass();
      $(form).removeClass();
    });

    hostedFieldsInstance.on('cardTypeChange', function (event) {
      // Change card bg depending on card type
      if (event.cards.length === 1) {
        $(form).removeClass().addClass(event.cards[0].type);
        $('#card-image').removeClass().addClass(event.cards[0].type);
        $('header').addClass('header-slide');

        // Change the CVV length for AmericanExpress cards
        if (event.cards[0].code.size === 4) {
          hostedFieldsInstance.setPlaceholder('cvv', '1234');
        }
      } else {
        hostedFieldsInstance.setPlaceholder('cvv', '123');
      }
    });


        submit.removeAttribute('disabled');
        submit.style.backgroundColor = '#E91E63';
        form.addEventListener('submit', function (event) {
          event.preventDefault();

          hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
            if (tokenizeErr) {
              console.error('tokenizeErr=' + JSON.stringify(tokenizeErr));

              return;
            }
 // If this was a real integration, this is where you would
              // send the nonce to your server.
              console.log('Got a nonce: ' + payload.nonce);

            // Put `payload.nonce` into the `payment-method-nonce` input, and then
            // submit the form. Alternatively, you could send the nonce to your server
            // with AJAX.
            (<HTMLInputElement>document.querySelector('input[name="payment-method-nonce"]')).value = payload.nonce;
            form.action = 'http://localhost:3000/checkout';
            form.submit();
            console.info('na submit form');
          });
        }, false);
      });
    });
  }
}


