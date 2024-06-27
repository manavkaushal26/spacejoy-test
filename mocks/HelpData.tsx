import { company, oldSpacejoyUrl } from '@utils/config';

const data = [
  // {
  //   tag: 'Shopping',
  //   header: 'Shopping',
  //   question: 'Can I shop from the designs directly?',
  //   answer: `Spacejoy’s expert curators have arranged furniture and decor into sets that work well together both aesthetically and functionally. You can choose to buy the entire design set or buy individual pieces from the set that match your style and budget.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shopping',
  //   question: 'Can I place an order from different brands I see on Spacejoy?',
  //   answer: `Yes, you can! Think of Spacejoy as any other multi-brand store that houses products. Add to cart whatever you like and checkout. The best part about ordering on Spacejoy is that you don’t have to visit different brands to place your order.  Our concierge team will fulfill your order and send you regular updates. Just like they would if you ordered directly from the brand.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shopping',
  //   question: 'Is there a minimum cart value when I order on Spacejoy?',
  //   answer: `There is no minimum limit on your cart. Order as many products or as few as 1 product from Spacejoy. You’ll receive the same amount of care and attention from our concierge team regardless of the order value.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shopping',
  //   question: 'What is "The Spacejoy Advantage"?',
  //   answer: `Spacejoy offers a hassle-free experience by managing your order across different retailers. You can see your product-related updates all in one place on Spacejoy, under the 'My Project Orders' section. If you're unhappy with any of your purchases and want to initiate a refund or cancellation, you can initiate it across retailers, all on Spacejoy.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shopping',
  //   question:
  //     'If the prices on the retailer’s website and Spacejoy are different, will Spacejoy guarantee a price match?',
  //   answer: `At Spacejoy, we are committed to finding you the best prices on products.. The prices on our site are updated regularly to reflect any offers and promotions offered by the retailers. Sometimes, there may be a price difference due to dynamic changes. You can rest assured that Spacejoy will offer a refund if the prices on the retailers' site are lower than what you paid on Spacejoy at the time of processing your order. Spacejoy never adds any overheads to the cost of the product. This is Spacejoy's Price Match Guarantee.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shopping',
  //   question: "Are there any expectations or limitations to Spacejoy's Price Match Guarantee?",
  //   answer: `Once you place an order on Spacejoy, we execute a back-to-back order on the retailer's site. Once the order gets processed on the retailer's site, we cannot guarantee a price match.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shopping',
  //   question: 'What if the item arrives damaged?',
  //   answer:
  //     "When an item arrives at your doorstep, we encourage you to inspect the packaging to ensure it's not tampered with or damaged. If it is, then notify your courier and refuse the delivery. You can either write to us at hello@spacejoy.com and we will initiate a refund or replacement. If the product is already with you, please make sure to keep the original packaging and tags and write to us within 24 hours. Please include photos of the damaged product, and we'll help you with the next steps.",
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shopping',
  //   question: "Can I apply the promo code available at the retailer's sites?",
  //   answer:
  //     "As a part of Spacejoy's price match guarantee, we make sure that we offer you the lowest price. If you have any special promo codes from retailers available with you, please mention the same in the comment box while placing your order and we will ensure that we apply those codes and you get the best possible prices for your purchase. Sometimes, Spacejoy offers exclusive brand discounts, and you can also apply those promo codes while placing your order to get additional discounts.",
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shopping',
  //   question: 'Will I get regular updates until my products are delivered?',
  //   answer: `Our concierge team will send you regular email updates right from when you place an order with us and continue to send you regular updates until your products are delivered. `,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shopping',
  //   question: 'Will Spacejoy reach out to me for order approval?',
  //   answer: `When you place an order on Spacejoy, we authorize your card for the estimated price, which includes shipping and tax. At the time of processing your order, if we find that there is a price increase (on your product/shipping) or the product is out of stock and no longer available or if the shipping period is unusually long, Spacejoy will reach out to you with the updated information to discuss next steps. If there is a price drop, Spacejoy will process your order and will automatically initiate a refund for the difference in amount.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shopping',
  //   question: 'Will I get additional discounts for shopping at Spacejoy?',
  //   answer: `Spacejoy regularly runs promotional offers and all the discounts offered during this promotional period are over and above what the brands offer. Additionally we also pass on our trade discounts, regularly when your cart value exceeds a certain amount.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Cancellations and Returns',
  //   question: 'Can I initiate a return on Spacejoy?',
  //   answer: `You can make a return by going to your dashboard, under the 'My Product Orders' tab, select the product you want to initiate a return and click on return. Please make sure to have all the original packaging before you initiate a return request.<p>
  //     If the item is damaged, we require at least 3 reference photos to initiate your return with the vendor:
  //     <li> A photo of the entire item.</li>
  //     <li> A close-up photo of the damage.</li>
  //     <li> A photo of the package (so we can determine if it was damaged in transit).</li>
  //     </p>

  //     Please send these photos at returns@spacejoy.com for us to process the replacement with the retailer.
  //     `,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Cancellations and Returns',
  //   question: 'Can I initiate a cancellation on Spacejoy?',
  //   answer:
  //     'Once your order is placed, our order processing team begins placing orders right away. Please reach out to us at cs@spacejoy.com if you need to cancel or change the delivery information. Please note, we can not guarantee an order can be changed. If the order has been processed with the retailer, the products may be subject to fees if you need to return the items.',
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Cancellations and Returns',
  //   question: "What is Spacejoy's return policy?",
  //   answer: `Spacejoy doesn't have a return policy of its own. Whether or not a return will be accepted depends on the retailer's return policy. Please make sure to go through it before you initiate a return. Please note some sale or clearance items can not be returned.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Cancellations and Returns',
  //   question: 'Who is responsible for return shipping?',
  //   answer: `If there is an issue with your product, such as the product arrives damaged or is incorrect, the retailer will cover the shipping charges. If you're no longer interested in the product and have changed your mind, you will be responsible for return shipping.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shipping and Delivery',
  //   question: 'How are shipping costs calculated?',
  //   answer: `Spacejoy doesn’t add any overheads on shipping costs. Shipping costs are calculated by the retailer based on the type of shipping, location and size of the product. What you see during checkout is an estimation and the actual shipping costs may vary when we process the order. If the difference between the estimated costs and the final cost varies significantly we will reach out to you for approval or with alternative suggestions. If there is a price drop, Spacejoy will process the order and initiate a refund.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shipping and Delivery',
  //   question: 'Will I get regular updates until my products are delivered?',
  //   answer: `Our concierge team will send you regular email updates right from when you place an order with us and continue to send you regular updates until your products are delivered.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shipping and Delivery',
  //   question: 'Can I change my delivery address?',
  //   answer: `In most cases, once you place an order changing your delivery address will not be possible. Please make sure to select the correct address before you place an order. If you do realize that you provided an incorrect address, please reach out to orders@spacejoy.com and we will do our best to accommodate the change.`,
  // },
  // {
  //   tag: 'Shopping',
  //   header: 'Shipping and Delivery',
  //   question: 'Does Spacejoy work with freight forwarding companies?',
  //   answer: `At the moment Spacejoy doesn’t directly work with any freight forwarding companies. Should this change we’ll update our policy.`,
  // },
  {
    tag: 'Services',
    question: 'How do I get started on Spacejoy?',
    answer:
      "Simply select the room you wish to have designed and answer a few initial design questions! Once you purchase your design package you will then fill out our requirements quiz which will provide the designer with your design brief. This quiz is where you will share the details of the room we're designing together. Be sure to share the floor plan with dimensions of the room, room images, pictures of inspiration, and any furniture you'd like to keep!",
  },
  {
    tag: 'Services',
    question: 'How is the design service priced?',
    answer: `There are 3 different design packages you can choose from. Find the details on our pricing page (<a href="https://designs.spacejoy.com/pricing" target="_blank">https://designs.spacejoy.com/pricing</a>)`,
  },
  {
    tag: 'Services',
    question: 'How long does Spacejoy take to design a room?',
    answer: `Once you sign up for a design package, we will require up to 48 hours to verify your design brief. We will reach out to you if any additional details are required prior to assigning your project to a designer. Once your project is assigned, your initial room designs will be delivered in 7-10 business days. Revised designs are delivered within 5-7 business days. Spacejoy is the fastest and easiest way to design your room online!`,
  },
  {
    tag: 'Services',
    question: 'What design packages does Spacejoy offer?',
    answer: `<p>Spacejoy currently has three different design packages for you to choose from Delight, Bliss, and Euphoria.</p><p>With the Delight design package, you will receive one design concept and two revisions. With the Bliss design package, you will get two design concepts, with two design revisions of your most preferred design concept. Our Delight and Bliss design packages are delivered within a 10 business day timeline.</p><p>In the Euphoria design package, you will receive 2 design concepts and 4 LIVE revisions. This is our most exclusive design package with the first two design concepts delivered within a 7 -10 business day timeline.</p><p>Once we start your project, you will receive your designs within 7-10 business days. However, if you are in a hurry, just reach out to your designer to see if they can expedite the design process.</p>`,
  },
  {
    tag: 'Services',
    question: 'What is a LIVE revision?',
    answer: `In a LIVE revision your designer will address your design feedback in real time via our 3D app. You will be able to see your design in your 3D room model and can discuss anything from layout, color palettes, products and paint colors. Once the LIVE revision has been completed, your designer will continue to work on the design and will deliver your revision rendered in 3D within 5-7 business days. LIVE revisions are 20 min 1:1 time with your designer.`,
  },
  {
    tag: 'Services',
    question: 'Can I design any room on Spacejoy, or is there a limitation?',
    answer: `<p>With Spacejoy, you can design most rooms! (Living Room, Bedroom, Dining Room, Office, Studio, Basement, Nursery, Kids Room, Entryway, Open Living-Dining Room, Outdoor Patio/Balcony, Kitchen and Bathroom) We also help design multifunctional spaces so that you can get the most out of your space!</p><p>For Kitchen and Bathroom structural changes, we can provide the visuals, but you will need to sort a third party contractor to ensure the correct amount of materials are ordered and the design is up to code.</p>`,
  },
  {
    tag: 'Services',
    question: 'Can I purchase multiple design packages at once for different rooms in my home?',
    answer: `Yes, you can! For each room design you will need to purchase the design package and select the room type so that you can provide your designer with a design brief for each space. To ensure design cohesion throughout your home, your room designs will be assigned to the same designer unless you say otherwise! Based on the availability of your designer we may not start the designs at the same time. Reach out to us at <a href="mailto:hello@spacejoy.com" target="_blank" rel="noopener noreferrer">hello@spacejoy.com</a> for any additional questions and for a multiroom discount!`,
  },
  {
    tag: 'Services',
    question: 'What is the maximum room size for Spacejoy design packages?',
    answer: `<p>The maximum room size for the Delight and Bliss design package is 400 square feet. For our Euphoria design package the maximum room size is 600 square feet. If your space exceeds 600 square feet you can reach out to us at <a href="mailto:hello@spacejoy.com" target="_blank" rel="noopener noreferrer">hello@spacejoy.com</a> so we can discuss a custom design package to meet your needs.</p><p>Bathroom and kitchen renovations, as well as open living/dining room projects are completed in our Euphoria package due to the additional design processes required to bring these projects to life!</p>`,
  },
  {
    tag: 'Services',
    question: 'Who are Spacejoy designers?',
    answer: `Our interior designers are professionals from across the United States. Our designer’s credentials are reviewed by our leadership team and they must pass our assessment test and training prior to working with any customer.  If you select our Euphoria design package you will be working with one of our top tier designers. Top tier designers have had their work featured in publications.`,
  },
  {
    tag: 'Services',
    question: 'What styles can Spacejoy design?',
    answer: `Spacejoy will help you design your room in a style you love! Think Mid-Century Modern, Farmhouse, Scandinavian, Industrial, Rustic, French Country, Eclectic, Transitional, or a combination of design styles. Our designers stay up to date with the latest design trends and will handle your style requests with ease. Not sure what your design style is? Take our style quiz <a href="https://designs.spacejoy.com/style-quiz" target="_blank">here!</a>`,
  },
  {
    tag: 'Services',
    question: 'Can my existing products be featured in my design?',
    answer: `If we don't have your exact furniture item in our 3D catalog we will use a placeholder item that best represents your existing piece. If you wish to see your exact item featured in your design you can reach out to <a href="mailto:hello@spacejoy.com" target="_blank" rel="noopener noreferrer">hello@spacejoy.com</a> so we can gather the information required to model your existing item and discuss the 3d modelling fee. Please be aware that this may extend your design timeline.`,
  },
  {
    tag: 'Services',
    question: 'Why do you request design inspiration?',
    answer: `We ask for this as it will help your designer greatly understand the style you are drawn too and the vision for your space. It also helps us pair you with a designer who specializes in your design style. The design inspiration you provide can be in the form of an image or a Pinterest link. If you don't have any inspiration images you can take our <a href="https://designs.spacejoy.com/style-quiz" target="_blank">inspiration quiz</a> or you can browse through our <a href="https://www.spacejoy.com/interior-designs" target="_blank">completed designs</a>.`,
  },
  {
    tag: 'Services',
    question: 'Does Spacejoy help with paint recommendations?',
    answer: `Don't we all know how daunting this can be? All of our design packages include paint recommendations. Your Spacejoy designer will not only select the right color for your space but show you how it looks in your actual room design. We work with Sherwin Williams and Benjamin Moore.`,
  },
  {
    tag: 'Services',
    question: 'If I purchase a design package do I have to use it right away?',
    answer: `You have up to a year from the date of your design package purchase to initiate the design process. If your project has passed the one year mark, reach out to us at <a href="mailto:hello@spacejoy.com" target="_blank" rel="noopener noreferrer">hello@spacejoy.com</a> so we can process your refund.`,
  },
  {
    tag: 'Services',
    question: 'How will I be able to communicate with my designer?',
    answer: `As a Spacejoy customer, you will work 1:1 with your designer. Our Bliss and Euphoria design packages come with a call, which can be used before or after receiving the initial designs. You will also have unlimited access to your designer during working hours using the chat feature you will find in your project dashboard. Please allow 2 business days for a response. If you need to get in touch with your designer sooner, please reach out to our team at <a href="mailto:hello@spacejoy.com" target="_blank" rel="noopener noreferrer">hello@spacejoy.com</a>`,
  },
  {
    tag: 'Services',
    question: 'How do I chat with my designer',
    answer: `Sign into your Spacejoy account. There is a drop down menu next to your name. Click on ‘My designs’. On the bottom of the page you will see a chat box. Please allow 2 business days for a response. If you need to get in touch with your designer sooner, please reach out to our team at <a href="mailto:hello@spacejoy.com" target="_blank" rel="noopener noreferrer">hello@spacejoy.com</a>`,
  },
  {
    tag: 'Services',
    question: 'How long do I have to submit a revision request?',
    answer: `We offer multiple redesigns to make sure you fall in love with your new space. Make sure to send in your feedback with design changes within 30 days of receiving your latest design concept. If we don't hear from you within 30 days, your designer will close your project. If you, however, want to request changes after 30 days, your request will undergo a review before we can commit. You can email <a href="mailto:hello@spacejoy.com" target="_blank" rel="noopener noreferrer">hello@spacejoy.com</a> to discuss re-opening your project.`,
  },
  {
    tag: 'Services',
    question: 'How do I purchase furniture in my design?',
    answer: `With every Spacejoy package you choose, you receive a customized shopping list that includes everything you need for your design. Spacejoy works with design retailers such as Pottery Barn, West Elm, Crate & Barrel, CB2, Article, Wayfair, and more. You are able to purchase your products directly from the retailer. For products featured in our Spacejoy curated collection, our support team is here to help. Simply place your order on our shop page and we will take care of the rest.`,
  },
  {
    tag: 'Services',
    question: 'What is Spacejoy’s curated collection?',
    answer: `Elevate your space with our trendsetting, well-crafted, and affordable curated collections. Hand picked by designers our four collections Aurora Home, Luna & Luxe, Empyrean Living and Harper Studios will be sure to inspire and transform your home! Shop our collection <a href="https://store.spacejoy.com/" target="_blank" rel="noopener noreferrer">here</a>.`,
  },
  {
    tag: 'Services',
    question: 'What happens if the items in my shopping list go out of stock?',
    answer: `Handpicking furniture from thousands of products that suit your style and budget is not an easy feat to achieve. Your designer will ensure your products are in stock when the initial designs are released to you. Unfortunately, we can't guarantee the stock status of items in your design. We encourage you to buy what you love as soon as you can so you don’t miss out! For those products that do go out of stock, during the duration of your design package, we encourage you to reach out to your designer so they can assist with reselecting products.`,
  },
  {
    tag: 'Services',
    question: 'Does Spacejoy design commercial spaces?',
    answer: `We design commercial spaces on a case by case basis. The majority of our projects are residential, so if you are comfortable ordering from our residential retailers, we'd love to discuss your project with you! Connect with us at <a href="mailto:hello@spacejoy.com" target="_blank" rel="noopener noreferrer">hello@spacejoy.com</a> and share with us your project specifics (inspiration, budget, timeline, etc.)`,
  },
  {
    tag: 'Services',
    question: 'Does Spacejoy do renovation projects?',
    answer: `We offer assistance with selection and visualization only. For finishes, built-ins and cabinetry, the material and labor costs must be determined by a 3rd party contractor. For Kitchen and Bathroom structural changes, we can provide the visuals, but you will need to sort a third party contractor to ensure the correct amount of materials are ordered and the design is up to code.`,
  },
  {
    tag: 'Services',
    question: 'Why does the delivery timeline extend for renovation projects?',
    answer: `Renovation projects require additional design processes and more team collaboration to bring your design to life. Due to this the timeline may extend. Your designer will keep you updated on the timeline. We appreciate your patience!`,
  },
  {
    tag: 'Services',
    question: 'If I live outside of the US, can Spacejoy design my space?',
    answer: `<p>We can complete a design for your space outside of the US however, as a US based company the products that will be used in your design are from US retailers. This would mean that you would have to source products in your own country and would not be able to purchase directly from your shopping list as we only deliver within the US.</p><p>For our Canadian customers we do work with a few retailers available in Canada, such as Wayfair, CB2, Crate &amp; Barrel, Pottery Barn, Article, Anthropologie and West Elm however, these products would be from the US Store and may differ in style and price. Other than this our entire design process is the same for our customers residing outside of the US.</p>`,
  },
  {
    tag: 'Services',
    question: "How do I locate the design packages I've paid for?",
    answer: `Once you have logged into your account select ‘My designs’ from the drop down menu. All of your design packages are located in one convenient place!`,
  },
  {
    tag: 'Services',
    question: 'Can you retroactively apply promo codes to my order?',
    answer: `Our promo codes should always be applied before placing an order with us. Be sure to submit them during checkout, so you can get the best price!`,
  },
  {
    tag: 'Services',
    question: 'What If I am unhappy with my design?',
    answer: `Our designers are experts at translating your wants and needs into reality. In rare cases where we cannot deliver designs you love, our leadership team will reassign your project or refund based on our <a href="https://www.spacejoy.com/refund-policy" target="_blank">refund policy</a>. You can email us at <a href="mailto:hello@spacejoy.com" target="_blank" rel="noopener noreferrer">hello@spacejoy.com</a>.`,
  },
  {
    tag: 'About Us',
    question: 'What is Spacejoy?',
    answer:
      // 'Spacejoy is a design-led e-commerce platform that enables a superior shopping experience by instantly visualizing your space with the products you want to buy. As a one-stop shop, Spacejoy allows you to discover unlimited options from your favorite home brands to furnish your space with ease. With professionally arranged furniture sets, users with all different styles and budgets can personalize their space with products they want to shop for.',
      'Spacejoy is an online interior design platform celebrated by top publications as one of the premier platforms in the industry. At Spacejoy, we help you create a home that showcases your personality! Trust our interior design professionals to make your home design journey enjoyable and stress-free. We create stunning designs and curate quality items that embrace your style and functionality needs. Communicate your vision, see expertly crafted designs, and fall in love with the complete look before you start shopping—eliminating the stress of returns!',
  },
  {
    tag: 'About Us',
    question: 'Why Spacejoy?',
    answer:
      'Spacejoy is on a mission to change the way people shop for their homes. We personalize the entire shopping experience by simplifying how you discover products and visualize them in a room. Shopping for home furnishings all in one place has never been easier, especially with Spacejoy’s integrated platform. Spacejoy is a great way to try different styles from multiple brands in a room before shopping. We offer the ultimate online home shopping experience. We make sure your purchase will be exactly what you want. Spacejoy gets you everything you want for your home.',
  },
  {
    tag: 'About Us',
    question: 'Connect with us ',
    answer: `Write to us at 
      <a style="color:blue;" href="mailto:hello@spacejoy.com?subject=&body=" target="_blank">hello@spacejoy.com</a> or schedule a call.
      Instagram <a style="color:blue;" href="https://www.instagram.com/spacejoyapp/" target="_blank">https://www.instagram.com/spacejoyapp/</a>
      Pinterest <a style="color:blue;" href="https://pinterest.com/spacejoyapp/" target="_blank">https://pinterest.com/spacejoyapp/</a>`,
  },
];

const groupedData = data.reduce((acc, entry) => {
  if (!acc[entry.tag]) {
    acc[entry.tag] = [entry];
  } else acc[entry.tag].push(entry);

  return acc;
}, {});

export default groupedData;
