import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get BASE_URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export interface BrandItem {
  id: string;
  name: string;
  brand: string;
  category?: string;
  count: number;
  confidence: number;
}

const formUrl = (endpoint: string) => {
  if (!BASE_URL) {
    throw new Error("BASE_URL is not defined in the environment variables.");
  }

  // Ensure the BASE_URL ends with a slash
  const formattedBaseUrl = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

  // Combine BASE_URL and the endpoint
  return new URL(endpoint, formattedBaseUrl).href;
};

export const sendBrandItems = async (brandItems: BrandItem[]) => {
  try {
    const response = await axios.post(formUrl('/api/brand-items'), brandItems);
    return response.data;
  } catch (error) {
    console.error('Error sending brand items:', error);
    throw error;
  }
};
