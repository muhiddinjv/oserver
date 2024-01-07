import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { validatePhoneNumber } from 'src/validators';

@Injectable()
export class SmsService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.INFOBIP_API_KEY;
    this.baseUrl = process.env.INFOBIP_BASE_URL;
  }

  async sendSMS(phone_number: string, messages: string): Promise<any> {
    await this.checkPhoneNumber(phone_number)
    
    const data = {
      messages: [
        {
          destinations: [
            {
              to: phone_number,
            },
          ],
          from: 'Ollio app',
          text: messages,
        },
      ],
    };

    const headers = {
      Authorization: `App ${this.apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const response = await axios.post(this.baseUrl, data, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }

  async checkPhoneNumber(phone_number) {
    const isValid = validatePhoneNumber(phone_number);

    if (!isValid) {
      throw new BadRequestException('Invalid phone number');
    }
  }
}
