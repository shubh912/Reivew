import type { FaqItem } from '../lib/schema';

export type ServiceIcon =
  | 'house'
  | 'office'
  | 'package'
  | 'loading'
  | 'bike'
  | 'truck'
  | 'local'
  | 'route';

export interface ServiceDef {
  key: string;
  path: string;
  name: string;
  cardTitle: string;
  cardText: string;
  icon: ServiceIcon;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  intro: string[];
  includedTitle: string;
  included: string[];
  localNote: { title: string; text: string };
  faqs: FaqItem[];
  related: string[];
}

export const SERVICES: ServiceDef[] = [
  {
    key: 'house-shifting',
    path: '/house-shifting-ayodhya',
    name: 'House Shifting Services',
    cardTitle: 'House Shifting',
    cardText:
      'Complete house shifting assistance in Ayodhya — packing, loading, transportation and unloading for homes of every size.',
    icon: 'house',
    image: '/uploads/house-shifting-services-ayodhya.jpg',
    imageAlt: 'Family unpacking boxes after house shifting in Ayodhya',
    metaTitle: 'House Shifting Services in Ayodhya | Saket Packers and Movers',
    metaDescription:
      'House shifting services in Ayodhya – careful packing, loading, transportation and unloading assistance for 1 BHK to 4+ BHK homes. Call Saket Packers and Movers on 9838494871 for a free quote.',
    h1: 'House Shifting Services in Ayodhya',
    tagline: 'Home shifting assistance from packing to unloading — across Ayodhya and to other cities.',
    intro: [
      'Shifting a house means moving everything your daily life depends on — furniture, appliances, kitchen items, clothes, documents and memories. Saket Packers and Movers Ayodhya provides house shifting services in Ayodhya with assistance at every stage: packing, loading, transportation and unloading, so your household goods are handled in an organised way from your old door to your new one.',
      'Whether you live in a 1 BHK near Cantt Road, a family house in Civil Lines or a larger home anywhere in Ayodhya, we plan the move around your items. Goods are packed according to what they are — sturdy cartons for household items, wrapping for furniture and extra care for fragile kitchenware — and a suitable vehicle is arranged based on the volume of your goods and availability.',
      'Based at Niyawa on Cantt Road, we handle local house shifting within Ayodhya as well as intercity home relocations from Ayodhya to other cities, subject to availability. Tell us your pickup location, destination and preferred date, and we will share a clear quotation before any work begins.',
    ],
    includedTitle: 'What our house shifting service includes',
    included: [
      'Packing of household items, furniture and appliances as per requirements',
      'Careful loading of goods into a suitable vehicle',
      'Transportation for local and intercity home shifting from Ayodhya',
      'Unloading assistance at your new address',
      'Optional bike transportation along with your household items',
      'Quotation discussed and shared before the move',
    ],
    localNote: {
      title: 'House shifting across Ayodhya & beyond',
      text: 'We serve homes across Ayodhya — including Niyawa, Cantt Road, Civil Lines, Deokali, Rekabganj, Faizabad Road and nearby areas — and handle intercity house shifting from Ayodhya to cities such as Lucknow, Gorakhpur, Varanasi, Prayagraj and Sultanpur, subject to vehicle availability.',
    },
    faqs: [
      {
        q: 'Do you shift 1 BHK and 2 BHK homes in Ayodhya?',
        a: 'Yes. We shift homes of all sizes — 1 BHK, 2 BHK, 3 BHK and 4+ BHK — with packing, loading, transportation and unloading assistance planned according to the volume of your goods.',
      },
      {
        q: 'Can you pack fragile kitchen items and furniture?',
        a: 'Yes. Items are packed according to their type — cartons for household goods, wrapping for furniture and careful packing for fragile items such as kitchenware.',
      },
      {
        q: 'Do you provide house shifting from Ayodhya to other cities?',
        a: 'Yes. We provide intercity house shifting from Ayodhya to other cities, subject to availability of a suitable vehicle. Share your destination while requesting a quote and we will confirm.',
      },
    ],
    related: ['packing-moving', 'loading-unloading', 'bike-transportation'],
  },
  {
    key: 'office-shifting',
    path: '/office-shifting-ayodhya',
    name: 'Office Shifting Services',
    cardTitle: 'Office Shifting',
    cardText:
      'Organised office relocation in Ayodhya — furniture, equipment, files and other items moved as per your plan.',
    icon: 'office',
    image: '/uploads/office-shifting-services-ayodhya.jpg',
    imageAlt: 'Office items being packed in boxes during office shifting in Ayodhya',
    metaTitle: 'Office Shifting Services in Ayodhya | Saket Packers and Movers',
    metaDescription:
      'Office shifting services in Ayodhya – relocation of office furniture, equipment, files and other items with proper packing and transportation. Call 9838494871 for a business relocation quote.',
    h1: 'Office Shifting Services in Ayodhya',
    tagline: 'Business and office relocation — planned around your furniture, equipment, files and timeline.',
    intro: [
      'An office move has to be planned, not improvised. Saket Packers and Movers Ayodhya provides office shifting services in Ayodhya that cover the relocation of office furniture, equipment, files and other items — packed and moved according to your requirements so the transition to your new workspace stays organised.',
      'Desks, chairs, cabinets, computers, documents and pantry items all need different handling. We pack items category-wise, label cartons so placement at the new office is easy, and load them systematically into a suitable vehicle. If you only need transportation for already-packed office goods, we can arrange that as well.',
      'We serve offices, shops, clinics, coaching centres and other commercial spaces across Ayodhya — near Cantt Road, Niyawa and other business areas — and also handle office shifting from Ayodhya to other cities, subject to availability. Share your inventory and preferred date on call or WhatsApp to get a quotation.',
    ],
    includedTitle: 'What our office shifting service includes',
    included: [
      'Packing and moving of office furniture — desks, chairs, cabinets and partitions',
      'Packing assistance for equipment and electronics as per requirements',
      'Organised packing and labelling of files and documents',
      'Loading and unloading support at both locations',
      'Transportation in a vehicle suited to your office goods',
      'Scheduling planned with you to keep disruption low',
    ],
    localNote: {
      title: 'Office relocation in Ayodhya’s business areas',
      text: 'We shift offices across Ayodhya — Cantt Road, Niyawa, Civil Lines, Faizabad Road and other commercial areas — and manage intercity office moves from Ayodhya to cities across Uttar Pradesh and India, subject to availability.',
    },
    faqs: [
      {
        q: 'Can you shift office furniture and equipment together?',
        a: 'Yes. We handle furniture, equipment, files and other items in the same planned move, with packing done category-wise for organised unloading at your new office.',
      },
      {
        q: 'Do you provide office shifting outside Ayodhya?',
        a: 'Yes, intercity office relocation from Ayodhya is available subject to vehicle availability. Share your destination and inventory and we will discuss the arrangement.',
      },
      {
        q: 'Can the move be planned to avoid work disruption?',
        a: 'We discuss your preferred date and timing while planning the move and coordinate the packing and transport accordingly. Share your schedule with us when you request a quote.',
      },
    ],
    related: ['packing-moving', 'loading-unloading', 'transport-service'],
  },
  {
    key: 'packing-moving',
    path: '/packing-moving-ayodhya',
    name: 'Packing & Moving Services',
    cardTitle: 'Packing & Moving',
    cardText:
      'Careful packing and moving in Ayodhya — goods packed according to requirements and transported safely.',
    icon: 'package',
    image: '/uploads/packing-services-ayodhya-cardboard-boxes.jpg',
    imageAlt: 'Carton box being sealed with tape during packing service in Ayodhya',
    metaTitle: 'Packing and Moving Services in Ayodhya | Saket Packers and Movers',
    metaDescription:
      'Packing and moving services in Ayodhya – cartons, wrapping and labelling done as per your items, followed by careful transportation. Request a free quote on 9838494871.',
    h1: 'Packing and Moving Services in Ayodhya',
    tagline: 'Good packing decides how safely your goods travel — we pack as per your items, not shortcuts.',
    intro: [
      'Most damage during shifting happens because of poor packing, not poor driving. Saket Packers and Movers Ayodhya provides packing and moving services in Ayodhya where the packing is planned around your goods — sturdy cartons for household items, wrapping for furniture and appliances, and careful handling for fragile pieces — before everything is loaded and transported.',
      'You can book complete packing and moving, where our team packs your home or office from start to finish, or packing assistance only for specific items. Cartons are labelled room-wise or category-wise so unloading and settling at the destination is faster and more organised.',
      'After packing, goods are loaded into a suitable vehicle and moved to your destination — within Ayodhya or to another city, subject to availability. You get packing and transportation together from one team, so nothing falls between two vendors.',
    ],
    includedTitle: 'What our packing & moving service includes',
    included: [
      'Packing done according to item type — cartons, wrapping and padding as needed',
      'Room-wise or category-wise labelling of packed boxes',
      'Furniture and appliance wrapping for transit protection',
      'Loading into a suitable vehicle and safe placement of goods',
      'Transportation within Ayodhya or to other cities, subject to availability',
      'Unloading assistance at the destination',
    ],
    localNote: {
      title: 'Packing support for homes and offices in Ayodhya',
      text: 'Our packing team works across Ayodhya — Niyawa, Cantt Road, Civil Lines and nearby areas — for household and commercial goods. Packing can be combined with our loading-unloading and transportation services for a complete move.',
    },
    faqs: [
      {
        q: 'Can I book only packing, without transportation?',
        a: 'Yes. You can book packing assistance for specific items or your entire home or office, even if transportation is arranged separately. Tell us your requirement and we will quote accordingly.',
      },
      {
        q: 'What packing materials do you use?',
        a: 'Packing is done according to the items — cartons, wrapping material and padding are used as needed for household goods, furniture, appliances and fragile items.',
      },
      {
        q: 'Do you unpack at the destination?',
        a: 'We provide unloading assistance at the destination and place goods as directed. Discuss any specific placement requirements with the team while planning your move.',
      },
    ],
    related: ['house-shifting', 'office-shifting', 'loading-unloading'],
  },
  {
    key: 'loading-unloading',
    path: '/loading-unloading-ayodhya',
    name: 'Loading & Unloading Services',
    cardTitle: 'Loading & Unloading',
    cardText:
      'Systematic loading and unloading of household and commercial goods in Ayodhya — heavy items handled with care.',
    icon: 'loading',
    image: '/uploads/loading-unloading-services-ayodhya.jpg',
    imageAlt: 'Mover carrying stacked cartons during loading work in Ayodhya',
    metaTitle: 'Loading and Unloading Services in Ayodhya | Saket Packers and Movers',
    metaDescription:
      'Loading unloading services in Ayodhya for household and commercial goods – systematic loading, safe placement and unloading assistance at destination. Call 9838494871.',
    h1: 'Loading and Unloading Services in Ayodhya',
    tagline: 'Heavy lifting done systematically — household and commercial goods loaded and unloaded with care.',
    intro: [
      'Loading is where strength has to meet method. Saket Packers and Movers Ayodhya provides loading and unloading services in Ayodhya for household and commercial goods — furniture, appliances, cartons, machinery and other items loaded in a planned order so the vehicle space is used properly and goods stay stable during transit.',
      'Our team handles lifting, carrying and placement of goods between your premises and the vehicle, at both pickup and destination. Heavy items are handled with proper grip and coordination, and fragile cartons are kept in suitable positions inside the vehicle. If your goods are already packed and you only need loading or unloading help, that can be booked separately.',
      'The service is available across Ayodhya — from homes near Cantt Road and Niyawa to shops, offices and warehouses — and pairs naturally with our packing and transportation services for a complete shifting arrangement.',
    ],
    includedTitle: 'What our loading & unloading service includes',
    included: [
      'Loading of household goods — furniture, appliances and packed cartons',
      'Loading of commercial goods and equipment as per requirements',
      'Systematic placement of goods inside the vehicle for stable transit',
      'Unloading at the destination with placement as directed',
      'Loading-only or unloading-only bookings if transport is arranged separately',
      'Coordination with our packing and transportation teams for complete moves',
    ],
    localNote: {
      title: 'Loading & unloading support throughout Ayodhya',
      text: 'We provide loading and unloading assistance across Ayodhya — Niyawa, Cantt Road, Civil Lines, Deokali, Faizabad Road and nearby areas — for local shifting as well as goods arriving from or heading to other cities.',
    },
    faqs: [
      {
        q: 'Do you provide only loading or only unloading?',
        a: 'Yes. You can book loading-only or unloading-only assistance if your transportation is arranged separately. Share the location and goods details and we will arrange the team accordingly.',
      },
      {
        q: 'Can you load heavy items like wardrobes and refrigerators?',
        a: 'Yes. Heavy household and commercial items are loaded with proper lifting coordination and placed securely inside the vehicle for transit.',
      },
      {
        q: 'Is unloading included in your shifting packages?',
        a: 'Yes. Unloading assistance at the destination is part of our house shifting and office shifting services, along with placement of goods as directed.',
      },
    ],
    related: ['packing-moving', 'house-shifting', 'transport-service'],
  },
  {
    key: 'bike-transportation',
    path: '/bike-transportation-ayodhya',
    name: 'Bike Transportation Services',
    cardTitle: 'Bike Transportation',
    cardText:
      'Bike packing and transportation from Ayodhya — two-wheelers moved as per requirements, locally or intercity.',
    icon: 'bike',
    image: '/uploads/bike-transportation-ayodhya.jpg',
    imageAlt: 'Two-wheelers arranged in a row before bike transportation from Ayodhya',
    metaTitle: 'Bike Transportation in Ayodhya | Saket Packers and Movers',
    metaDescription:
      'Bike transportation in Ayodhya – bike packing and transportation for two-wheelers, local and intercity from Ayodhya subject to requirements. Call or WhatsApp 9838494871.',
    h1: 'Bike Transportation in Ayodhya',
    tagline: 'Two-wheeler packing and transportation from Ayodhya — planned around your bike and your route.',
    intro: [
      'Riding a bike hundreds of kilometres to your new city is not always practical. Saket Packers and Movers Ayodhya provides bike transportation services in Ayodhya — your two-wheeler is packed with protective covering as per requirements and transported to your destination, so it arrives ready to ride instead of road-worn.',
      'The process is straightforward. Share your bike details, pickup location and destination with us on call or WhatsApp. We discuss the packing arrangement, the suitable vehicle and the schedule, and share a quotation before the move. Bike transportation can be booked on its own or along with your household shifting, so your bike travels with your goods.',
      'We handle bike transportation within Ayodhya as well as intercity routes from Ayodhya to other cities, subject to availability. Scooters, motorcycles and other two-wheelers are handled as per their packing requirements.',
    ],
    includedTitle: 'What our bike transportation service includes',
    included: [
      'Bike packing with protective covering as per requirements',
      'Careful loading of the two-wheeler into a suitable vehicle',
      'Transportation within Ayodhya or to other cities, subject to availability',
      'Option to move your bike along with household shifting',
      'Unloading assistance at the destination',
      'Quotation shared after discussing bike details and route',
    ],
    localNote: {
      title: 'Bike transport from Ayodhya to your next city',
      text: 'We arrange bike transportation from Ayodhya — Niyawa, Cantt Road and all nearby areas — to destinations across Uttar Pradesh and India, subject to availability. Intercity bike transport is commonly booked along with house shifting from Ayodhya.',
    },
    faqs: [
      {
        q: 'How is my bike protected during transportation?',
        a: 'The bike is packed with protective covering as per requirements before being loaded, so the body and parts stay protected during transit.',
      },
      {
        q: 'Can my bike be transported along with my household goods?',
        a: 'Yes. Bike transportation can be combined with your house shifting so the two-wheeler travels in the same arrangement. Mention it while requesting your quote.',
      },
      {
        q: 'Do you transport bikes to other states?',
        a: 'Yes, intercity and all-India bike transportation from Ayodhya is available subject to availability of a suitable vehicle. Share your destination and we will confirm.',
      },
    ],
    related: ['house-shifting', 'transport-service', 'packing-moving'],
  },
  {
    key: 'transport-service',
    path: '/transport-service-ayodhya',
    name: 'Pickup & DCM Transportation',
    cardTitle: 'Pickup & DCM Transportation',
    cardText:
      'Transport service in Ayodhya with pickup, DCM and other suitable vehicles based on your goods and availability.',
    icon: 'truck',
    image: '/uploads/pickup-dcm-transportation-ayodhya.jpg',
    imageAlt: 'Pickup trucks ready for goods transportation service in Ayodhya',
    metaTitle: 'Transport Service in Ayodhya | Pickup & DCM | Saket Packers and Movers',
    metaDescription:
      'Transport service in Ayodhya – pickup and DCM transportation for household and commercial goods, with a suitable vehicle based on your goods and availability. Call 9838494871.',
    h1: 'Transport Service in Ayodhya — Pickup & DCM Transportation',
    tagline: 'The right vehicle for your goods — pickup, DCM and suitable transport options from Ayodhya.',
    intro: [
      'Not every move needs the same truck. Saket Packers and Movers Ayodhya provides transport services in Ayodhya with pickup, DCM and other suitable vehicles arranged based on the volume and type of your goods, and availability. From a few cartons and appliances to a full household or commercial consignment, the vehicle is matched to the load.',
      'This service works for transportation-only requirements as well — if your goods are packed and ready, we arrange the vehicle and the movement. For complete moves, transportation is combined with our packing, loading and unloading services so one team stays responsible from pickup to delivery.',
      'We run local transport within Ayodhya and intercity transportation from Ayodhya to other cities, subject to availability. Share your goods list, pickup point and destination, and we will suggest the suitable vehicle and share a quotation.',
    ],
    includedTitle: 'What our transport service includes',
    included: [
      'Pickup, DCM and suitable vehicles based on goods and availability',
      'Transportation for household goods, furniture and appliances',
      'Transportation for commercial goods and office items',
      'Local transport within Ayodhya and nearby areas',
      'Intercity transportation from Ayodhya, subject to availability',
      'Loading and unloading assistance available along with transport',
    ],
    localNote: {
      title: 'Goods transport in and from Ayodhya',
      text: 'Vehicles can be arranged across Ayodhya — Niyawa, Cantt Road, Civil Lines, Deokali and nearby areas — for local trips as well as intercity routes from Ayodhya to Lucknow, Gorakhpur, Varanasi, Prayagraj and other cities, subject to availability.',
    },
    faqs: [
      {
        q: 'Which vehicle will be provided for my goods?',
        a: 'The vehicle is decided based on the volume and type of your goods and availability — pickup, DCM or a larger vehicle as suitable. We confirm the vehicle while planning your move.',
      },
      {
        q: 'Can I book only transportation, without packing?',
        a: 'Yes. If your goods are already packed, you can book transportation-only service. Loading and unloading assistance can also be added if required.',
      },
      {
        q: 'Do you provide transport for commercial goods?',
        a: 'Yes. We transport both household and commercial goods from Ayodhya, with the vehicle arranged as per the consignment and availability.',
      },
    ],
    related: ['loading-unloading', 'bike-transportation', 'office-shifting'],
  },
  {
    key: 'local-intercity',
    path: '/packers-and-movers-ayodhya',
    name: 'Packers and Movers in Ayodhya',
    cardTitle: 'Local & Intercity Shifting',
    cardText:
      'Local shifting within Ayodhya and nearby areas, plus intercity and all-India moving from Ayodhya, subject to availability.',
    icon: 'route',
    image: '/uploads/transport-service-ayodhya-truck-highway.jpg',
    imageAlt: 'Truck on highway moving goods from Ayodhya to another city',
    metaTitle: 'Packers and Movers in Ayodhya | Local & Intercity | Saket Packers and Movers',
    metaDescription:
      'Packers and movers in Ayodhya for local shifting and intercity/all-India moving – house shifting, office shifting, packing, loading and transportation. Call 9838494871.',
    h1: 'Packers and Movers in Ayodhya — Local & Intercity Moving Services',
    tagline: 'One team for your complete move — within Ayodhya, to nearby areas, or from Ayodhya to anywhere in India.',
    intro: [
      'If you are searching for packers and movers in Ayodhya, the real question is whether one team can handle everything your move needs. At Saket Packers and Movers Ayodhya, packing, moving, loading, unloading and transportation are handled together, so your shifting stays coordinated from the first carton to the last.',
      'For local shifting, we move households and offices within Ayodhya and nearby areas — from Niyawa and Cantt Road to Civil Lines, Deokali, Rekabganj, Faizabad Road and beyond. For intercity requirements, we provide transportation from Ayodhya to cities across Uttar Pradesh and all-India routes, subject to availability of a suitable vehicle.',
      'Every move starts with your details: pickup location, destination, items and preferred date. We discuss the required services, arrange the vehicle as per your goods, and share a quotation before work begins — no hidden steps, no confusion about who is responsible for what.',
    ],
    includedTitle: 'What our packers and movers service includes',
    included: [
      'Local shifting within Ayodhya and nearby areas',
      'Intercity and all-India moving from Ayodhya, subject to availability',
      'Household shifting — packing, loading, transport and unloading assistance',
      'Office and commercial shifting as per requirements',
      'Bike transportation along with or separate from household goods',
      'Suitable vehicle options — pickup, DCM and larger vehicles as per goods',
    ],
    localNote: {
      title: 'Based in Ayodhya, connected to every route',
      text: 'Our base is at Cantt Road, Niyawa — in front of Sterling Hotel, Ayodhya 224001. From here we serve all Ayodhya localities and run intercity routes from Ayodhya to Lucknow, Gorakhpur, Varanasi, Prayagraj, Sultanpur and other cities, subject to availability.',
    },
    faqs: [
      {
        q: 'Are you local packers and movers in Ayodhya?',
        a: 'Yes. Saket Packers and Movers Ayodhya is based at Cantt Road, Niyawa, Ayodhya and provides local moving services across Ayodhya and nearby areas.',
      },
      {
        q: 'Do you provide all-India moving from Ayodhya?',
        a: 'Yes. We provide intercity and all-India transportation from Ayodhya, subject to availability of a suitable vehicle. Share your destination while requesting a quote and we will confirm the arrangement.',
      },
      {
        q: 'How do I book packers and movers in Ayodhya?',
        a: 'Call 9838494871, message us on WhatsApp, or fill the quote form on this website with your pickup, destination and moving date. We will discuss your requirement and share a quotation.',
      },
    ],
    related: ['house-shifting', 'office-shifting', 'transport-service'],
  },
];

export const SERVICE_CARDS_EXTRA: ServiceDef = {
  key: 'local-shifting',
  path: '/packers-and-movers-ayodhya#local',
  name: 'Local Shifting',
  cardTitle: 'Local Shifting',
  cardText: 'Shifting within Ayodhya and nearby areas — planned packing, loading and transport for local moves.',
  icon: 'local',
  image: '/uploads/local-shifting-ayodhya-tempo-van.jpg',
  imageAlt: 'Truck on the road providing local shifting service in Ayodhya',
  metaTitle: 'Packers and Movers in Ayodhya | Local & Intercity | Saket Packers and Movers',
  metaDescription:
    'Packers and movers in Ayodhya for local shifting and intercity moving – call 9838494871.',
  h1: 'Packers and Movers in Ayodhya — Local & Intercity Moving Services',
  tagline: '',
  intro: [],
  includedTitle: '',
  included: [],
  localNote: { title: '', text: '' },
  faqs: [],
  related: [],
};

export function getService(key: string): ServiceDef {
  const found = SERVICES.find((s) => s.key === key);
  if (!found) throw new Error(`Unknown service: ${key}`);
  return found;
}

/** Card pointing to the intercity section of the main movers page. */
export const INTERCITY_CARD: ServiceDef = {
  ...SERVICE_CARDS_EXTRA,
  key: 'intercity',
  path: '/packers-and-movers-ayodhya#intercity',
  name: 'Intercity / All-India Transportation',
  cardTitle: 'Intercity / All-India Transport',
  cardText:
    'Moving from Ayodhya to another city? Intercity and all-India transportation arranged subject to availability.',
  icon: 'route',
  image: '/uploads/transport-service-ayodhya-truck-highway.jpg',
  imageAlt: 'Truck carrying goods from Ayodhya to another city in India',
};

/** The 8 service cards shown on the homepage and services page. */
export const SERVICE_CARD_LIST: ServiceDef[] = [
  ...SERVICES.slice(0, 6),
  SERVICE_CARDS_EXTRA,
  INTERCITY_CARD,
];
