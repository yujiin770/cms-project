export interface Watch {
  id: string;
  name: string;
  brand: string;
  price: number | 'Request';
  material: string;
  description: string;
  image_url: string;
  category: 'rolex' | 'patek' | 'audemars' | 'cartier';
  is_new: boolean;
  created_at?: string;
}