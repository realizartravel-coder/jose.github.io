import { Tour, FAQItem, Testimonial } from './types';

export const TOURS: Tour[] = [
  {
    id: 'maragogi',
    title: 'Maragogi',
    description: 'O Caribe Brasileiro espera por você com águas cristalinas e o famoso Caminho de Moisés.',
    items: [
      'Transporte ida e volta',
      'Embarcação para o Caminho de Moisés',
      'Visita às piscinas naturais',
      'Tempo livre para fotos e mergulho'
    ],
    imageUrl: 'https://hoteisabeiramar.com.br/wp-content/uploads/2022/09/passeio-de-helicoptero-em-maragogi.jpg'
  },
  {
    id: 'santo-aleixo',
    title: 'Ilha de Santo Aleixo',
    description: 'Um refúgio exclusivo de origem vulcânica com águas mornas e muita tranquilidade.',
    items: [
      'Transporte ida e volta',
      'Travessia de lancha rápida',
      'Trilha ecológica com guia local',
      'Day use no receptivo da ilha'
    ],
    imageUrl: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/a4/a0/8e.jpg'
  },
  {
    id: 'carneiros',
    title: 'Praia dos Carneiros + Bora Bora',
    description: 'A famosa igrejinha pé na areia e o conforto do melhor receptivo da região.',
    items: [
      'Transporte ida e volta',
      'Day use no receptivo Bora Bora'
    ],
    imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.1_x1dh1t9lUUDeKO3xfzxgHaEK?pid=Api&P=0&h=180'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'Quais as formas de pagamento?',
    answer: 'Aceitamos pix e débito, cartões de crédito em até 12x com acréscimo.'
  },
  {
    question: 'Posso agendar os passeios para dias diferentes?',
    answer: 'Sim! Você pode realizar os 3 passeios em dias consecutivos ou alternados, conforme sua disponibilidade.'
  },
  {
    question: 'O que levar nos passeios?',
    answer: 'Recomendamos protetor solar, toalha, roupas leves, chinelo e claro, sua câmera ou celular para registrar tudo!'
  },
  {
    question: 'Crianças pagam valor integral?',
    answer: 'Crianças até 2 anos no colo não pagam. De 3 a 7 anos possuem desconto especial. Consulte-nos no WhatsApp.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Mariana Silva',
    rating: 5,
    comment: 'Foi a melhor escolha da nossa viagem! Tudo perfeito, organizado e sem dor de cabeça.'
  },
  {
    id: 2,
    name: 'Ricardo Gomes',
    rating: 5,
    comment: 'Economizamos bastante e conhecemos lugares incríveis. O atendimento é nota 10!'
  },
  {
    id: 3,
    name: 'Ana Paula',
    rating: 5,
    comment: 'Santo Aleixo é um paraíso! O guia foi super atencioso e o transporte muito pontual.'
  }
];