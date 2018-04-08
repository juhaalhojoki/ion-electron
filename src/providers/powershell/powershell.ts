import { Injectable } from '@angular/core';
import * as powershell from 'node-powershell';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the Powershellr provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class Powershell {

  ps = new powershell({
    executionPolicy: 'Bypass',
    noProfile: true,
    usePwsh: true
  });

  constructor(public http: HttpClient) {
  }

  invokePowerShellScript(script, params) {
    window.URL = window.URL;

    return new Promise((resolve, reject) => {
      this.ps.addCommand(`./www/assets/ps-scripts/${script}`, params);
      this.ps.invoke()
        .then(output => {
          resolve(output);
        })
        .catch(err => {
          this.ps.dispose();
          reject(err);
        });

    });
  }

}
