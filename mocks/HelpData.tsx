import { company, oldSpacejoyUrl } from '@utils/config';

const data = [
  {
    tag: 'Shopping',
    header: 'Shopping',
    question: 'Can I shop from the designs directly?',
    answer: `Spacejoy’s expert curators have arranged furniture and decor into sets that work well together both aesthetically and functionally. You can choose to buy the entire design set or buy individual pieces from the set that match your style and budget.`,
  },
  {
    tag: 'Shopping',
    header: 'Shopping',
    question: 'Can I place an order from different brands I see on Spacejoy?',
    answer: `Yes, you can! Think of Spacejoy as any other multi-brand store that houses products. Add to cart whatever you like and checkout. The best part about ordering on Spacejoy is that you don’t have to visit different brands to place your order.  Our concierge team will fulfill your order and send you regular updates. Just like they would if you ordered directly from the brand.`,
  },
  {
    tag: 'Shopping',
    header: 'Shopping',
    question: 'Is there a minimum cart value when I order on Spacejoy?',
    answer: `There is no minimum limit on your cart. Order as many products or as few as 1 product from Spacejoy. You’ll receive the same amount of care and attention from our concierge team regardless of the order value.`,
  },
  {
    tag: 'Shopping',
    header: 'Shopping',
    question: 'What is "The Spacejoy Advantage"?',
    answer: `Spacejoy offers a hassle-free experience by managing your order across different retailers. You can see your product-related updates all in one place on Spacejoy, under the 'My Project Orders' section. If you're unhappy with any of your purchases and want to initiate a refund or cancellation, you can initiate it across retailers, all on Spacejoy.`,
  },
  {
    tag: 'Shopping',
    header: 'Shopping',
    question:
      'If the prices on the retailer’s website and Spacejoy are different, will Spacejoy guarantee a price match?',
    answer: `At Spacejoy, we are committed to finding you the best prices on products.. The prices on our site are updated regularly to reflect any offers and promotions offered by the retailers. Sometimes, there may be a price difference due to dynamic changes. You can rest assured that Spacejoy will offer a refund if the prices on the retailers' site are lower than what you paid on Spacejoy at the time of processing your order. Spacejoy never adds any overheads to the cost of the product. This is Spacejoy's Price Match Guarantee.`,
  },
  {
    tag: 'Shopping',
    header: 'Shopping',
    question: "Are there any expectations or limitations to Spacejoy's Price Match Guarantee?",
    answer: `Once you place an order on Spacejoy, we execute a back-to-back order on the retailer's site. Once the order gets processed on the retailer's site, we cannot guarantee a price match.`,
  },
  {
    tag: 'Shopping',
    header: 'Shopping',
    question: 'What if the item arrives damaged?',
    answer:
      "When an item arrives at your doorstep, we encourage you to inspect the packaging to ensure it's not tampered with or damaged. If it is, then notify your courier and refuse the delivery. You can either write to us at hello@spacejoy.com and we will initiate a refund or replacement. If the product is already with you, please make sure to keep the original packaging and tags and write to us within 24 hours. Please include photos of the damaged product, and we'll help you with the next steps.",
  },
  {
    tag: 'Shopping',
    header: 'Shopping',
    question: "Can I apply the promo code available at the retailer's sites?",
    answer:
      "As a part of Spacejoy's price match guarantee, we make sure that we offer you the lowest price. If you have any special promo codes from retailers available with you, please mention the same in the comment box while placing your order and we will ensure that we apply those codes and you get the best possible prices for your purchase. Sometimes, Spacejoy offers exclusive brand discounts, and you can also apply those promo codes while placing your order to get additional discounts.",
  },
  {
    tag: 'Shopping',
    header: 'Shopping',
    question: 'Will I get regular updates until my products are delivered?',
    answer: `Our concierge team will send you regular email updates right from when you place an order with us and continue to send you regular updates until your products are delivered. `,
  },
  {
    tag: 'Shopping',
    header: 'Shopping',
    question: 'Will Spacejoy reach out to me for order approval?',
    answer: `When you place an order on Spacejoy, we authorize your card for the estimated price, which includes shipping and tax. At the time of processing your order, if we find that there is a price increase (on your product/shipping) or the product is out of stock and no longer available or if the shipping period is unusually long, Spacejoy will reach out to you with the updated information to discuss next steps. If there is a price drop, Spacejoy will process your order and will automatically initiate a refund for the difference in amount.`,
  },
  {
    tag: 'Shopping',
    header: 'Shopping',
    question: 'Will I get additional discounts for shopping at Spacejoy?',
    answer: `Spacejoy regularly runs promotional offers and all the discounts offered during this promotional period are over and above what the brands offer. Additionally we also pass on our trade discounts, regularly when your cart value exceeds a certain amount.`,
  },
  {
    tag: 'Shopping',
    header: 'Cancellations and Returns',
    question: 'Can I initiate a return on Spacejoy?',
    answer: `You can make a return by going to your dashboard, under the 'My Product Orders' tab, select the product you want to initiate a return and click on return. Please make sure to have all the original packaging before you initiate a return request.<p>
      If the item is damaged, we require at least 3 reference photos to initiate your return with the vendor:
      <li> A photo of the entire item.</li>
      <li> A close-up photo of the damage.</li>
      <li> A photo of the package (so we can determine if it was damaged in transit).</li>
      </p>
      
      Please send these photos at returns@spacejoy.com for us to process the replacement with the retailer.
      `,
  },
  {
    tag: 'Shopping',
    header: 'Cancellations and Returns',
    question: 'Can I initiate a cancellation on Spacejoy?',
    answer:
      'Once your order is placed, our order processing team begins placing orders right away. Please reach out to us at cs@spacejoy.com if you need to cancel or change the delivery information. Please note, we can not guarantee an order can be changed. If the order has been processed with the retailer, the products may be subject to fees if you need to return the items.',
  },
  {
    tag: 'Shopping',
    header: 'Cancellations and Returns',
    question: "What is Spacejoy's return policy?",
    answer: `Spacejoy doesn't have a return policy of its own. Whether or not a return will be accepted depends on the retailer's return policy. Please make sure to go through it before you initiate a return. Please note some sale or clearance items can not be returned.`,
  },
  {
    tag: 'Shopping',
    header: 'Cancellations and Returns',
    question: 'Who is responsible for return shipping?',
    answer: `If there is an issue with your product, such as the product arrives damaged or is incorrect, the retailer will cover the shipping charges. If you're no longer interested in the product and have changed your mind, you will be responsible for return shipping.`,
  },
  {
    tag: 'Shopping',
    header: 'Shipping and Delivery',
    question: 'How are shipping costs calculated?',
    answer: `Spacejoy doesn’t add any overheads on shipping costs. Shipping costs are calculated by the retailer based on the type of shipping, location and size of the product. What you see during checkout is an estimation and the actual shipping costs may vary when we process the order. If the difference between the estimated costs and the final cost varies significantly we will reach out to you for approval or with alternative suggestions. If there is a price drop, Spacejoy will process the order and initiate a refund.`,
  },
  {
    tag: 'Shopping',
    header: 'Shipping and Delivery',
    question: 'Will I get regular updates until my products are delivered?',
    answer: `Our concierge team will send you regular email updates right from when you place an order with us and continue to send you regular updates until your products are delivered.`,
  },
  {
    tag: 'Shopping',
    header: 'Shipping and Delivery',
    question: 'Can I change my delivery address?',
    answer: `In most cases, once you place an order changing your delivery address will not be possible. Please make sure to select the correct address before you place an order. If you do realize that you provided an incorrect address, please reach out to orders@spacejoy.com and we will do our best to accommodate the change.`,
  },
  {
    tag: 'Shopping',
    header: 'Shipping and Delivery',
    question: 'Does Spacejoy work with freight forwarding companies?',
    answer: `At the moment Spacejoy doesn’t directly work with any freight forwarding companies. Should this change we’ll update our policy.`,
  },
  {
    tag: 'Services',
    question: 'How do I get started on Spacejoy?',
    answer: `Select the room you’d like to furnish. If you have a Pinterest board full of inspiration and would like to find products from it then connect your Pinterest board to get started.  If not, you can get started by browsing Spacejoy's curated design sets that feature furniture and decor pairings that work well together both functionally and aesthetically. Select a design set that best suits your need to get started. `,
  },
  {
    tag: 'Services',
    question: 'Connect your Pinterest board to shop products from your favorite pins',
    answer:
      'Connect your Pinterest board or any public board to find products from inspiration pins. Our AI assistant will help you find the exact products and alternatives. You can see these products in a room and match it with other products  from our store to see how it looks in a room.',
  },
  {
    tag: 'Services',
    question: 'What are design sets?',
    answer: `Design sets are furniture and decor arrangements created by Spacejoy's experts based on various factors such as room type, style, color, budget, usability, and layout. The products you see in a design set are handpicked from popular and smaller chic brands that our designers have spent hours curating. Design sets help you discover products and show you how to match them with other furniture pieces and decor. The design sets are arranged in a room to help you visualize. Every design set is 100% customizable and showcases the list of products used to create it. You can click on the products to see more details and add to cart.`,
  },
  {
    tag: 'Services',
    question: 'How to personalise and shop a design set?',
    answer: `Select a design set to open it. Click on personalize to start swapping individual products. Click on the product you'd like to swap, and we'll populate a range of alternatives. Once you're happy with how you've personalized it, you can save it and shop the complete design set or individual pieces from the set.​​`,
  },
  {
    tag: 'Services',
    question: 'How can I get in touch with Spacejoy’s design team?',
    answer: `To get in touch with our design team, sign up for a design package <a style="color:blue;" href='${oldSpacejoyUrl}/pricing' target="_blank">package</a>! Once you’ve completed your purchase and design quiz, you’ll have access to your designers using the chat feature in your project dashboard. Please allow your designers 24-48 hours to respond. If you need to get in touch with your designer quicker, feel free to e-mail us at hello@spacejoy.com <a style="color:blue;" href="mailto:hello@spacejoy.com?subject=&body=">hello@spacejoy.com</a>
    `,
  },
  {
    tag: 'Services',
    question: 'Does Spacejoy offer swatches?',
    answer: `If you're looking to buy a sofa or a rug and need to be entirely sure of the fabric, you can email us at   <a href='mailto:hello@spacejoy.com?subject=&body='>hello@spacejoy.com</a> and ask for a swatch. We'll coordinate with the retailer and have it delivered to you if the retailer offers this service. `,
  },
  {
    tag: 'Services',
    question: 'Can you work with a designer to design your room? ',
    answer: `Yes. Spacejoy’s in-house designers will transform any room of your home within 7 days. See your exact room designed in 3D with products you can shop. Work with your designer to edit the designs until you’re satisfied. All you have to do is submit pictures of your room, tell us your requirements and leave the heavy lifting to our designers. `,
  },
  {
    tag: 'Services',
    question: 'What kind of spaces can Spacejoy design for me?',
    answer: `We can design your living room, bedroom, dining area, sunroom and entryway. If you however have any special requests we’ll be happy to discuss. Email us at <a style="color:blue;" href="mailto:hello@spacejoy.com?subject=&body=">hello@spacejoy.com</a>
    `,
  },
  {
    tag: 'Services',
    question: 'How is the design service priced?',
    answer: `There are 3 different design packages you can choose from. Find the details on our Pricing page (<a href="${oldSpacejoyUrl}/pricing" target="_blank" style="color:blue;">${oldSpacejoyUrl}/pricing</a>)`,
  },
  {
    tag: 'Services',
    question: 'Who are your designers?',
    answer:
      "Our interior designers are professionals from across the United States. Designers' credentials are reviewed by our leadership team and they must pass our assessment test and training prior to working with any customer.",
  },
  {
    tag: 'Services',
    question: 'Can Spacejoy work within my budget?',
    answer:
      'Yes, we can work within your budget. We believe quality design can happen at any price point, and our super curators will scout stores across the internet to ensure that your space gets the best makeover within your budget.',
  },
  {
    tag: 'Services',
    question: 'What If I am unhappy with my design?',
    answer: `Our designers are experts at translating your wants and needs into reality. In rare cases where we cannot deliver designs you love, our leadership team will reassign your project or refund your money. You can email us at <a href="mailto:hello@spacejoy.com?subject=&body=" style="color:blue;" target="_blank">hello@spacejoy.com</a>.`,
  },
  {
    tag: 'About Us',
    question: 'What is Spacejoy?',
    answer:
      'Spacejoy is a design-led e-commerce platform that enables a superior shopping experience by instantly visualizing your space with the products you want to buy. As a one-stop shop, Spacejoy allows you to discover unlimited options from your favorite home brands to furnish your space with ease. With professionally arranged furniture sets, users with all different styles and budgets can personalize their space with products they want to shop for.',
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
    }else acc[entry.tag].push(entry);

    
  return acc;
}, {});

export default groupedData;
