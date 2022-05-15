export type Payment = {
  id: string;
  user_id: string;
  created_at?: Date;
  description: string;
  currency: 'USD' | 'CAD' | 'GBP' | 'EUR' | 'BRL';
  amount: number;
};
