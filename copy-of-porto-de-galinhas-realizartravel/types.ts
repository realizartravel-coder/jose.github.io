
export interface Tour {
  id: string;
  title: string;
  description: string;
  items: string[];
  imageUrl: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
}
