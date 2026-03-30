import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AIService {
  async generateProductDescription(name: string): Promise<string> {
    const apiUrl = 'https://api.openai.com/v1/completions'; 
    const apiKey = 'your-api-key'; 
    

    
    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt: `Generate a product description for: ${name}`,
          max_tokens: 100,
          model: 'text-davinci-003',
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to generate product description');
    }
  }
}