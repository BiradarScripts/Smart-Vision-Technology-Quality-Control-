import axios from 'axios';
import dotenv from 'dotenv';
import { NutrientInfo } from '@/app/nutrient-info/page';
import { ExpiryItem } from '@/app/expiry-detection/page';
import { AnalysisResult } from '@/app/freshness-detection/page';

// Load environment variables
dotenv.config();

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Helper function to preprocess objects
const preprocessObject = <T>(obj: T, defaults: Partial<T>): T => {
  return { ...defaults, ...obj };
};

// Helper function to preprocess arrays
const preprocessArray = <T>(arr: T[], defaults: Partial<T>): T[] => {
  return arr.map(item => preprocessObject(item, defaults));
};

const formUrl = (endpoint: string) => {
  if (!BASE_URL) {
    throw new Error('BASE_URL is not defined in the environment variables.');
  }
  const formattedBaseUrl = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
  return new URL(endpoint, formattedBaseUrl).href;
};

// ExpiryItem API function
export const sendExpiryItems = async (items: ExpiryItem[]): Promise<any> => {
  // Ensure all nullable fields have default values
  const sanitizedItems = items.map(item => ({
    ...item,
    mrp: item.mrp ?? '0',
    expiryDate: item.expiryDate ?? '',
    netwt: item.netwt ?? '0',
  }));

  const response = await axios.post(formUrl('/api/expiry'), JSON.stringify(sanitizedItems), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

// AnalysisResult API function
export const sendAnalysisResults = async (results: AnalysisResult[]): Promise<any> => {
  // Ensure all nullable fields have default values
  const sanitizedResults = results.map(result => ({
    ...result,
    freshnessIndex: result.freshnessIndex ?? 0, // Replace null with 0
    texture: result.texture ?? 'Unknown', // Provide default for optional fields
    visualColor: result.visualColor ?? 'Unknown',
    firmness: result.firmness ?? 'Unknown',
    packagingCondition: result.packagingCondition ?? 'Unknown',
    estimatedShelfLife: result.estimatedShelfLife ?? 'Unknown',
    recommendation: result.recommendation ?? 'Unknown',
  }));

  console.log(JSON.stringify(sanitizedResults));

  const response = await axios.post(formUrl('/api/analysis'), JSON.stringify(sanitizedResults), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

// NutrientInfo API function
export const sendNutrientInfo = async (nutrients: NutrientInfo | null): Promise<any> => {
  // Ensure all nullable fields have default values
  const sanitizedNutrients = nutrients ? {
    ...nutrients,
    category: nutrients.category ?? 'Unknown',
    nutrients: nutrients.nutrients ?? 'Unknown',
    ingredients: nutrients.ingredients ?? 'Unknown',
  } : {
    id: '0',
    name: 'Unknown',
    category: 'Unknown',
    nutrients: 'Unknown',
    ingredients: 'Unknown',
  };

  const response = await axios.post(formUrl('/api/nutrient'), JSON.stringify(sanitizedNutrients), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};