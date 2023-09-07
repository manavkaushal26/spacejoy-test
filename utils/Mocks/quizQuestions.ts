import { imageKit } from '@utils/config';

const questions = {
  1: {
    question: {
      prefix: 'How have you',
      suffix: 'decorated your space in the past?',
    },

    helper: "We'd love to know",
    answers: [
      // /fl_lossy,q_auto/w_60,h_60,c_pad
      {
        id: 111,
        answer: 'I am decorating for the first time',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1571132514/web/designIteration/3_ppmgnc.svg`,
      },
      {
        id: 211,
        answer: 'I have used Pinterest, Instagram, and other online sources ',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1571132514/web/designIteration/1_fdsq8l.svg`,
      },
      {
        id: 311,
        answer: 'My friends/family have helped me with ideas',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1571132514/web/designIteration/4_kcdwlx.svg`,
      },
      {
        id: 411,
        answer: 'I have used the services of an Interior Designer',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1571132514/web/designIteration/2_gojy9s.svg`,
      },
    ],
  },
  2: {
    question: {
      prefix: "What's the",
      suffix: 'occasion?',
    },

    helper: 'We build our vision around your purpose!',
    answers: [
      // /fl_lossy,q_auto/w_60,h_60,c_pad
      {
        id: 112,
        answer: 'Just moved to a new house',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1572878520/web/designPurpose/5_tbgtrn.svg`,
      },
      {
        id: 212,
        answer: "Haven't updated the look of my room in years",
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1572878520/web/designPurpose/2_vhuwlo.svg`,
      },
      {
        id: 312,
        answer: 'Entertaining family and friends',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1572878520/web/designPurpose/party_1_vm85lg.svg`,
      },
      {
        id: 412,
        answer: 'Kids have grown up. Want a fresh look',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1572878520/web/designPurpose/9_mg5o6h.svg`,
      },
      {
        id: 416,
        answer: 'Budget now allows for new furniture',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1572878520/web/designPurpose/10_ykyivs.svg`,
      },
      {
        id: 417,
        answer: 'All grown up. Time to impress family',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1572878520/web/designPurpose/0_r5mqhn.svg`,
      },
      {
        id: 418,
        answer: 'Just moved to a new city',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1572878520/web/designPurpose/3_dyfdlj.svg`,
      },
      {
        id: 419,
        answer: 'Baby on the way',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1572878520/web/designPurpose/6_egrt26.svg`,
      },
      {
        id: 4212,
        answer: 'Just got hitched',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1572878520/web/designPurpose/4_srap5o.svg`,
      },
      {
        id: 4214,
        answer: 'Welcoming our new furry friend',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1572878520/web/designPurpose/8_yus1mt.svg`,
      },
      {
        id: 4215,
        answer: 'Other',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1572878520/web/designPurpose/dots_uiwgog.svg`,
      },
    ],
  },
  3: {
    question: {
      prefix: 'When should your',
      suffix: 'space be ready?',
    },

    helper: 'A timeline will help us work towards your goal',
    answers: [
      // /fl_lossy,q_auto/w_60,h_60,c_pad
      {
        id: 111231,
        answer: 'Within the next 7 to 14 days',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1571132514/web/designTime/1_b77uev.svg`,
      },
      {
        id: 223411,
        answer: 'Within a month',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1571132514/web/designTime/2_snr3yp.svg`,
      },
      {
        id: 3423411,
        answer: 'I have a couple of months to set everything up',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1571132514/web/designTime/3_eccnbq.svg`,
      },
      {
        id: 412341,
        answer: 'Other',
        selected: false,
        icon: `${imageKit.baseDeliveryUrl}/v1571132514/web/designTime/dots_sdd36i.svg`,
      },
    ],
  },

  4: {
    question: {
      prefix: 'Which room',
      suffix: 'would you like to focus on first?',
    },

    helper: '',
    answers: [],
  },
};

export default questions;
