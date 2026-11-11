export interface User {
  id: string;
  name: string;
  email: string;
  password_hash?: string;
  role_id: string;
  status: 'active' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string;
  is_system?: string;
  created_at: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category?: string;
  thumbnail_path?: string;
  status: 'draft' | 'published';
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  ticket_number: string;
  user_id?: string;
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  customer_address: string;
  service_product_name: string;
  product_id?: string;
  quantity: number;
  total_price: number;
  status: 'menunggu_konfirmasi' | 'dikonfirmasi' | 'dibatalkan';
  payment_proof_path?: string;
  notes?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}
