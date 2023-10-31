
import { Injectable } from '@nestjs/common';
import axios from 'axios';



@Injectable()
export class InfobipService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey ="4062b60f62db380646bea69bb6148fe6-79ae0579-3711-490b-aaf8-9c4b412800d9" ;
    this.baseUrl = "https://xlke8g.api.infobip.com/sms/2/text/advanced";
  }

  async sendSMS(phoneNumber: string,messages:string): Promise<any> {

    const data = {
      messages: [
      {
      destinations: [
      {
      to:phoneNumber
      }
      ],
      from: "Ollio app",
      text:messages 
      }
      ]
      }

    const headers = {
      Authorization: `App ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    try {
      const response = await axios.post(this.baseUrl, data, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }


}