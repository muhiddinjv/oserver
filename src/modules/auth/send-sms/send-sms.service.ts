// src/infobip/infobip.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class InfobipService {
  private readonly infobipBaseUrl = 'https://api.infobip.com';
  private readonly apiKey = '4062b60f62db380646bea69bb6148fe6-79ae0579-3711-490b-aaf8-9c4b412800d9';

  async sendSMS(phoneNumber: string) {
    
    const code = await this.generateRandomCode()
   
    const url = `${this.infobipBaseUrl}/sms/1/text/single`;

    const messege = `Authorization code:${code}`;
    const data = {
      from: 'Ollio App',
      to: phoneNumber,
      text:messege
    };



    

    const config = {
      headers: {
        'Authorization': `App ${this.apiKey}`,
      },
    };

    try {
      await axios.post(url, data, config);
      return  {status:200, body:code}
    } catch (error) {
      throw new Error('Failed to send SMS');
    }
  }

  async generateRandomCode() {
    const randomNumbers = [];
    for (let i = 0; i < 6; i++) {
      const randomNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
      randomNumbers.push(randomNumber);
    }
    return randomNumbers.join("");
  }
}
