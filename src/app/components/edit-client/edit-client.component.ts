import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import {SettingsService} from '../../services/settings.service';

import { Client } from '../../models/Client';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnEdit: boolean;


  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService

  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    // get id from url
    this.id = this.route.snapshot.params['id'];

    //get the client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });


  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {

    if (!valid) {
      // show error
      this.flashMessage.show('Please fill out the form correctly',
        { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      // add id to client
      value.id = this.id;

      // add new client
      this.clientService.updateClient(value);

      // show message
      this.flashMessage.show('Client updated',
        { cssClass: 'alert-success', timeout: 4000 });

      // redirect to dash
      this.router.navigate([`/client/${this.id}`]);
    }


  }
}
