import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { MdInput } from '@angular/material';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/first';
import * as braintree from 'braintree-web';
declare var $: any;
@Component({
  selector: 'app-dropin',
  templateUrl: './dropin.component.html',
  styleUrls: ['./dropin.component.scss']
})
export class DropinComponent implements OnInit, AfterViewInit {
  message: string;
  authorization: any;

  //  @ViewChild('cardform') cardform: HTMLElement;
  //  @ViewChild('submit') submit: HTMLElement;
  //  @ViewChild('cardform') cardform;
  //  @ViewChild('submit') submit;


  constructor(public http: Http, private _zone: NgZone) {
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
    //  this.getToken();
    this.getToken();
  }

  makeTransaction() {
    let form: HTMLFormElement = (<HTMLFormElement>document.querySelector('#checkout-form'));
    let submit: HTMLElement = (<HTMLElement>document.getElementById('submitBtn'));


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
            'font-size': '16px',
            'font-family': 'roboto, verdana, sans-serif',
            'font-weight': 'lighter',
            'color': 'black'
          },
          ':focus': {
            'color': 'black'
          },
          '.valid': {
            'color': 'black'
          },
          '.invalid': {
            'color': 'black'
          }
        },
        fields: {
          number: {
            selector: '#card-number',
            placeholder: '1111 1111 1111 1111'
          },
          cvv: {
            selector: '#cvv',
            placeholder: '111'
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: 'MM/YY'
          },
          postalCode: {
            selector: '#postal-code',
            placeholder: '11111'
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
            submit.style.backgroundColor = '#E91E63';
             submit.removeAttribute('disabled');
             submit.setAttribute('class', 'pay-button');
          } else {
            submit.style.backgroundColor = 'rgba(0, 0, 0, .54)';
            submit.setAttribute('disabled', 'true');
             submit.setAttribute('class', 'pay-button-dence');
          }
        });

        hostedFieldsInstance.on('focus', function (event) {
          var field = event.fields[event.emittedBy];

          $(field.container).next('.hosted-field--label').addClass('label-float').removeClass('filled');
        });

        // Emulates floating label pattern
        hostedFieldsInstance.on('blur', function (event) {
          var field = event.fields[event.emittedBy];

          if (field.isEmpty) {
            $(field.container).next('.hosted-field--label').removeClass('label-float');
          } else if (event.isValid) {
            $(field.container).next('.hosted-field--label').addClass('filled');
          } else {
            $(field.container).next('.hosted-field--label').addClass('invalid');
          }
        });

        hostedFieldsInstance.on('empty', function (event) {
          var field = event.fields[event.emittedBy];

          $(field.container).next('.hosted-field--label').removeClass('filled').removeClass('invalid');
        });

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

          $.ajax({
            url: 'http://localhost:3000/checkout',
            type: 'POST',
            data: JSON.stringify({
              payment_method_nonce: payload.nonce
            }),
            contentType: 'application/json',
            success: function (data) {
              console.log(data.success);
              if (data.success) {
                alert('Payment authorized, thanks.');
              } else {
                alert('Payment failed: ' + data.message + ' Please refresh the page and try again.');
              }
            },
            error: function (error) {
              alert('Error: cannot connect to server. Please make sure your server is running.');
            }
          });
          //     var json = JSON.stringify([{"payment_method_nonce":payload.nonce}]);
          //    document.getElementById('payment-method-nonce').setAttribute('value', json);
          //       console.log('voor submit form' + $.parseJSON($('#inputF').val()));
          //console.log('voor submit form' + (<HTMLInputElement>document.getElementById('payment-method-nonce')).value);
          // Put `payload.nonce` into the `payment-method-nonce` input, and then
          // submit the form. Alternatively, you could send the nonce to your server
          // with AJAX.
          //    (<HTMLInputElement>document.querySelector('input[name="payment-method-nonce"]')).value = payload.nonce;
          //   form.action = 'http://localhost:3000/checkout';
          //       form.submit();
        });
      }, false);
    });
  });
}
}
