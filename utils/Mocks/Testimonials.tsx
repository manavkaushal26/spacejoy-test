const data = [
  {
    id: '3',
    name: 'Trinity Harding',
    dp: 'v1574266287/web/testimonial/TrinityHarding_kwc74s.jpg',
    address: 'Columbus, Georgia',
    roomType: 'Living Room',
    ratings: 5,
    bg: 'red',
    shortDescription:
      "I loved the design my designer created. It was warm and cozy all at once. I've already bought the table in the design.",
    description:
    "I love how easily Spacejoy recreated my favorite living room design from Pinterest and showed me how it would look in my space. I'm in love with my new living room!"
    ,
    before: {
      img: 'v1574266287/web/testimonial/Trinity_Before_wrtik7.jpg',
      alt: 'Spacejoy review of master bedroom room design by Trinity Harding ',
    },
    after: {
      img: 'v1574266288/web/testimonial/Trinity_After_l6cdjt.jpg',
      alt: "Master bedroom design for Trinity Harding by spacejoy's online interior designer",
    },
  },
  {
    id: '4',
    name: 'Erica & Kaleb',
    dp: 'v1574266287/web/testimonial/EricaKaleb_jpav9i.jpg',
    address: 'Salt Lake City, Utah',
    roomType: 'Nursery',
    ratings: 5,
    bg: 'yellow',
    shortDescription: 'Next time you need a fresh new look or a total redesign you have to check out Spacejoy',
    description:
      "I'm never shopping anywhere else! I’d been second-guessing which sofa to buy. On Spacejoy I could see the sofas I liked in an actual room. It helped me choose the right one for my space. Amazing!",

    before: {
      img: 'v1574266309/web/testimonial/Erica_Before_t0jt6b.jpg',
      alt: 'Spacejoy review of nursery design  by Kaleb and Erica',
    },
    after: {
      img: 'v1574266298/web/testimonial/Erica_After_a8zyco.jpg',
      alt: "Nursery design for Kaleb and Erica by spacejoy's online interior designer",
    },
  },
  {
    id: '5',
    name: 'Chelsey Shoup',
    dp: 'v1580125373/web/testimonial/Chelsey_h0v6g8.jpg',
    address: 'Plymouth, Massachusetts',
    roomType: 'Living room',
    ratings: 5,
    bg: 'red',
    shortDescription:
      'Will never paint or buy furnishing for another room without getting a design from Spacejoy first',
    description:
      "My designer understood exactly what I wanted and brought it to life with her beautiful designs. And the 3D renders are so life-like, I was thrilled to see my space before it was done!",
    before: {
      img: 'v1580125373/web/testimonial/Chelsey-Before_fvrb3v.jpg',
      alt: 'Spacejoy review of living room design by chelsey soup',
    },
    after: {
      img: 'v1580125374/web/testimonial/Chelsey-After_mlpqsw.jpg',
      alt: "Living room design for Chelsey Soup by Spacejoy's online interior designer ",
    },
  },
  {
    id: '6',
    name: 'Kimberly',
    dp: 'v1574864705/web/testimonial/Kim_gov4xx.jpg',
    address: 'New York',
    roomType: 'Living Room',
    ratings: 5,
    bg: 'green',
    shortDescription:
      "We decided to give Spacejoy a try and so glad we did. Couldn't be happier with how our room turned out.",
    description:
      "The furniture sets are just WOW. I had a corner in my home that I didn’t know what to do with. Then I found the most amazing design set on Spacejoy. Personalized it to fit my budget and done. That awkward corner is my new favorite nook in the house!",

    before: {
      img: 'v1574864758/web/testimonial/Kimberly_Before_y275vw.jpg',
      alt: 'Spacejoy review of living room design  by Kimberley in New York',
    },
    after: {
      img: 'v1574864751/web/testimonial/Kimberly_After_zhluna.jpg',
      alt: "Living room design for Kimberly  by spacejoy's online interior designer",
    },
  },
  {
    id: '1',
    name: 'Kayla',
    dp: 'v1595828399/web/testimonial/Kayla_j0mayq.jpg',
    address: 'Washington State',
    roomType: 'Living room',
    ratings: 5,
    bg: 'red',
    shortDescription:
      'It was so helpful seeing the room in 3D, and getting links to each of the products used made it so easy to order the exact products',
    description:
      '“I LOVE Spacejoy! They have the widest selection of products from all the top brands. I found everything I needed for my home, all in one place! Plus they give extra discounts which means more savings!',
    before: {
      img: 'v1595828656/web/testimonial/Kayla-Before_obtbsb.jpg',
      alt: 'Spacejoy review of living room design by Kayla',
    },
    after: {
      img: 'v1595828657/web/testimonial/Kayla-Render_euv1cj.jpg',
      alt: "Living room design for Kayla by Spacejoy's online interior designer ",
    },
  },
  {
    id: '2',
    name: 'Caroline Sferruzzo',
    dp: 'v1578230231/web/testimonial/Caroline_zcvlkh.jpg',
    address: 'Raleigh, NC',
    roomType: 'Bedroom',
    ratings: 5,
    bg: 'blue',
    shortDescription: 'We truly enjoyed working with the Spacejoy team',
    description:
      'I have zero design skills so Spacejoy’s furniture and decor sets made it really easy for me to furnish my home. I’ve bought sets for my living room, bedroom and will be coming back to furnish my entryway next!',
    before: {
      img: 'v1578230230/web/testimonial/Caroline-Before_pr4lym.jpg',
      alt: 'Spacejoy review of master bedroom room design by Caroline Stfanno ',
    },
    after: {
      img: 'v1578230229/web/testimonial/Caroline-After_bhhgtp.jpg',
      alt: "Master bedroom design for Caroline Stfanno by spacejoy's online interior designer ",
    },
  },
  // {
  //   id: '3',
  //   name: 'Trinity Harding',
  //   dp: 'v1574266287/web/testimonial/TrinityHarding_kwc74s.jpg',
  //   address: 'Columbus, Georgia',
  //   roomType: 'Living Room',
  //   ratings: 5,
  //   bg: 'red',
  //   shortDescription:
  //     "I loved the design my designer created. It was warm and cozy all at once. I've already bought the table in the design.",
  //   description:
  //     'I really like the design! It really feels warm and cozy even with the amount of grey that is currently in there. Funny enough, I have had my eye on that rug for such a long time and you used it in the design without knowing that, lol. I have also already bought the coffee table! and plan on buying most all things on there. My style has really changed over the years and I feel like this captures just the design I was looking for. Thank you so much for designing my space!',
  //   before: {
  //     img: 'v1574266287/web/testimonial/Trinity_Before_wrtik7.jpg',
  //     alt: 'Spacejoy review of master bedroom room design by Trinity Harding ',
  //   },
  //   after: {
  //     img: 'v1574266288/web/testimonial/Trinity_After_l6cdjt.jpg',
  //     alt: "Master bedroom design for Trinity Harding by spacejoy's online interior designer",
  //   },
  // },
  // {
  //   id: '4',
  //   name: 'Erica & Kaleb',
  //   dp: 'v1574266287/web/testimonial/EricaKaleb_jpav9i.jpg',
  //   address: 'Salt Lake City, Utah',
  //   roomType: 'Nursery',
  //   ratings: 5,
  //   bg: 'yellow',
  //   shortDescription: 'Next time you need a fresh new look or a total redesign you have to check out Spacejoy',
  //   description:
  //     'We gotta tell you about this room!!! So we wanted some ideas on designing and decorating our baby nursery! So we looked around and decided to use this awesome company Spacejoy We took some pictures of our room and they made a replica of our unique room and designed it on our interests and opinions. It was so easy and they were so great to work with. Next time you need a fresh new look or a total redesign you have to check out Spacejoy out and find joy in your space!!',

  //   before: {
  //     img: 'v1574266309/web/testimonial/Erica_Before_t0jt6b.jpg',
  //     alt: 'Spacejoy review of nursery design  by Kaleb and Erica',
  //   },
  //   after: {
  //     img: 'v1574266298/web/testimonial/Erica_After_a8zyco.jpg',
  //     alt: "Nursery design for Kaleb and Erica by spacejoy's online interior designer",
  //   },
  // },
  // {
  //   id: '5',
  //   name: 'Chelsey Shoup',
  //   dp: 'v1580125373/web/testimonial/Chelsey_h0v6g8.jpg',
  //   address: 'Plymouth, Massachusetts',
  //   roomType: 'Living room',
  //   ratings: 5,
  //   bg: 'red',
  //   shortDescription:
  //     'Will never paint or buy furnishing for another room without getting a design from Spacejoy first',
  //   description:
  //     "We decided to give Spacejoy a try and so glad we did. Couldn't be happier with how the room turned out - It's exactly the style we were going for but could never quite achieve. The process was easy  and fun, we also ended up doing our living room a little later. Spacejoy was able to seamlessly integrate out current furniture with the new designs. Will never paint or buy furnishing for another room without getting a design from Spacejoy first.",
  //   before: {
  //     img: 'v1580125373/web/testimonial/Chelsey-Before_fvrb3v.jpg',
  //     alt: 'Spacejoy review of living room design by chelsey soup',
  //   },
  //   after: {
  //     img: 'v1580125374/web/testimonial/Chelsey-After_mlpqsw.jpg',
  //     alt: "Living room design for Chelsey Soup by Spacejoy's online interior designer ",
  //   },
  // },
  // {
  //   id: '6',
  //   name: 'Kimberly',
  //   dp: 'v1574864705/web/testimonial/Kim_gov4xx.jpg',
  //   address: 'New York',
  //   roomType: 'Living Room',
  //   ratings: 5,
  //   bg: 'green',
  //   shortDescription:
  //     "We decided to give Spacejoy a try and so glad we did. Couldn't be happier with how our room turned out.",
  //   description:
  //     'I absolutely loved working with Spacejoy! From the technology that was able to render my apt to a tee, to the personalized 1:1 moments working with my designer Lauren, the whole experience was worth while. Lauren incorporated everything I said I needed and wanted I can’t believe my apt looks as amazing as it does. Can’t wait to update and utilize the space!',

  //   before: {
  //     img: 'v1574864758/web/testimonial/Kimberly_Before_y275vw.jpg',
  //     alt: 'Spacejoy review of living room design  by Kimberley in New York',
  //   },
  //   after: {
  //     img: 'v1574864751/web/testimonial/Kimberly_After_zhluna.jpg',
  //     alt: "Living room design for Kimberly  by spacejoy's online interior designer",
  //   },
  // },
  // {
  //   id: '1',
  //   name: 'Kayla',
  //   dp: 'v1595828399/web/testimonial/Kayla_j0mayq.jpg',
  //   address: 'Washington State',
  //   roomType: 'Living room',
  //   ratings: 5,
  //   bg: 'red',
  //   shortDescription:
  //     'It was so helpful seeing the room in 3D, and getting links to each of the products used made it so easy to order the exact products',
  //   description:
  //     'My experience with Spacejoy was fantastic! Our home was in need of a refresh and Spacejoy’s service was just what we were looking for! Our designer, Sarah completely matched the designs to our style and vision and was very responsive to all of our questions. It was so helpful seeing the room in 3D, and getting links to each of the products used made it so easy to order the exact products and make the design become a reality! We wouldn’t hesitate to hire Spacejoy again for all of our interior design needs!',
  //   before: {
  //     img: 'v1595828656/web/testimonial/Kayla-Before_obtbsb.jpg',
  //     alt: 'Spacejoy review of living room design by Kayla',
  //   },
  //   after: {
  //     img: 'v1595828657/web/testimonial/Kayla-Render_euv1cj.jpg',
  //     alt: "Living room design for Kayla by Spacejoy's online interior designer ",
  //   },
  // },
  // {
  //   id: '2',
  //   name: 'Caroline Sferruzzo',
  //   dp: 'v1578230231/web/testimonial/Caroline_zcvlkh.jpg',
  //   address: 'Raleigh, NC',
  //   roomType: 'Bedroom',
  //   ratings: 5,
  //   bg: 'blue',
  //   shortDescription: 'We truly enjoyed working with the Spacejoy team',
  //   description:
  //     'We truly enjoyed working with the Spacejoy team! Our master bedroom has never felt right and our designer, Lauren, was able to give us the vision that we were missing. Being able to see our room transformed in 3D made it so easy to decide on the design concept that best suited our style. The process is super simple, the team is quick and responsive and the overall results were impressive. Thank you Spacejoy!',
  //   before: {
  //     img: 'v1578230230/web/testimonial/Caroline-Before_pr4lym.jpg',
  //     alt: 'Spacejoy review of master bedroom room design by Caroline Stfanno ',
  //   },
  //   after: {
  //     img: 'v1578230229/web/testimonial/Caroline-After_bhhgtp.jpg',
  //     alt: "Master bedroom design for Caroline Stfanno by spacejoy's online interior designer ",
  //   },
  // },
];

export default data;
