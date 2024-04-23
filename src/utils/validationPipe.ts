import { ValidationPipe } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  async transform(value, metadata) {
    const errors = super.transform(value, metadata);
    console.log(await errors,4444);
    
    if (errors) {
      return this.formatErrors(errors); 
    }
    
    return value;
  }

  async formatErrors(errors) {
    const formattedErrors = [];

    errors && errors.map(error => {
      formattedErrors.push({
        [error.property]: Object.values(error.constraints)[0]  
      });
    });

    return {
      message: formattedErrors,
      error: 'Bad Request',
      statusCode: 400,
    };
  }

}
