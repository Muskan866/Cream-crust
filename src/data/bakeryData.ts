import heroImg from '../assets/images/hero_artisan_spread_1790261910143.jpg';
import belgianCakeImg from '../assets/images/belgian_chocolate_cake_1790261924273.jpg';
import croissantImg from '../assets/images/french_butter_croissant_1790261938454.jpg';
import bakerStoryImg from '../assets/images/bakery_story_baker_1790261950995.jpg';
import redVelvetImg from '../assets/images/red_velvet_cake_1790262644589.jpg';
import trufflePastryImg from '../assets/images/chocolate_truffle_pastry_1790262658430.jpg';
import strawberryCupcakeImg from '../assets/images/strawberry_cream_cupcake_1790262673163.jpg';
import doubleCookieImg from '../assets/images/double_chocolate_cookie_1790262686253.jpg';
import sourdoughBreadImg from '../assets/images/artisan_sourdough_bread_1790262700831.jpg';
import macaronsImg from '../assets/images/french_macarons_dessert_1790262714898.jpg';
import latteImg from '../assets/images/artisan_hazelnut_coffee_1790262726088.jpg';
import bakeryInteriorImg from '../assets/images/bakery_interior_cafe_1790262747306.jpg';
import cheesecakeImg from '../assets/images/berry_cheesecake_slice_1790262761831.jpg';

export interface Product {
  id: string;
  name: string;
  category: 'Cakes' | 'Pastries' | 'Cupcakes' | 'Cookies' | 'Breads' | 'Desserts' | 'Beverages';
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  ingredients: string[];
  image: string;
  badge?: string;
  isBestSeller?: boolean;
  prepTime?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: string;
  description: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'Cakes',
    name: 'Cakes',
    icon: '🍰',
    count: '6 Varieties',
    description: 'Layered masterpieces crafted for unforgettable celebrations',
    image: belgianCakeImg,
  },
  {
    id: 'Pastries',
    name: 'Pastries',
    icon: '🥐',
    count: '5 Varieties',
    description: 'Flaky, buttery viennoiseries and delicate French pastries',
    image: croissantImg,
  },
  {
    id: 'Cupcakes',
    name: 'Cupcakes',
    icon: '🧁',
    count: '4 Varieties',
    description: 'Velvety sponge topped with swirled buttercream and berries',
    image: strawberryCupcakeImg,
  },
  {
    id: 'Cookies',
    name: 'Cookies',
    icon: '🍪',
    count: '4 Varieties',
    description: 'Soft-baked, chewy centers loaded with chunks of Belgian cocoa',
    image: doubleCookieImg,
  },
  {
    id: 'Breads',
    name: 'Breads',
    icon: '🥖',
    count: '4 Varieties',
    description: 'Slow-fermented artisan sourdoughs and crusty rustic boules',
    image: sourdoughBreadImg,
  },
  {
    id: 'Desserts',
    name: 'Desserts',
    icon: '🍫',
    count: '5 Varieties',
    description: 'Silky mousses, fruit tarts, macarons, and rich chocolate pots',
    image: macaronsImg,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Belgian Chocolate Cake',
    category: 'Cakes',
    price: 699,
    rating: 4.9,
    reviewsCount: 342,
    description: 'Decadent multi-layered sponge loaded with 70% dark Belgian ganache, finished with hand-curled cocoa ribbons and gold dust.',
    ingredients: ['Valrhona 70% Cocoa', 'Normandy Butter', 'Organic Brown Sugar', 'Bourbon Vanilla Bean', 'Farm Eggs'],
    image: belgianCakeImg,
    badge: 'Signature',
    isBestSeller: true,
    prepTime: 'Freshly Baked at 6 AM',
  },
  {
    id: 'p2',
    name: 'Red Velvet Cake',
    category: 'Cakes',
    price: 749,
    rating: 4.8,
    reviewsCount: 289,
    description: 'Silky crimson crumb with delicate notes of Dutch cocoa, layered luxuriously with whipped cream cheese frosting.',
    ingredients: ['Dutch Cocoa', 'Buttermilk', 'Madagascar Vanilla', 'Philadelphia Cream Cheese', 'Unsalted Butter'],
    image: redVelvetImg,
    badge: 'Customer Favorite',
    isBestSeller: true,
    prepTime: 'Fresh Daily',
  },
  {
    id: 'p3',
    name: 'Butter Croissant',
    category: 'Pastries',
    price: 129,
    rating: 4.9,
    reviewsCount: 512,
    description: 'Authentic 27-layer French viennoiserie, golden and shatteringly crisp outside with a tender, buttery honeycomb interior.',
    ingredients: ['French Lescure Butter', 'T55 Flour', 'Slow-rise Yeast', 'Sea Salt', 'Whole Milk'],
    image: croissantImg,
    badge: 'Morning Special',
    isBestSeller: true,
    prepTime: 'Baked Hourly',
  },
  {
    id: 'p4',
    name: 'Chocolate Truffle Pastry',
    category: 'Pastries',
    price: 149,
    rating: 4.8,
    reviewsCount: 215,
    description: 'Individual slice of rich chocolate fudge cake drenched in dark truffle glaze and crowned with a dusted cocoa sphere.',
    ingredients: ['Dark Truffle Ganache', 'Cocoa Liqueur Extract', 'Espresso Powder', 'Cane Sugar', 'Heavy Cream'],
    image: trufflePastryImg,
    isBestSeller: true,
    prepTime: 'Chilled & Ready',
  },
  {
    id: 'p5',
    name: 'Strawberry Cream Cupcake',
    category: 'Cupcakes',
    price: 119,
    rating: 4.7,
    reviewsCount: 184,
    description: 'Fluffy vanilla sponge infused with fresh organic strawberry puree, crowned with swirl frosting and a strawberry slice.',
    ingredients: ['Fresh Mahabaleshwar Strawberries', 'Pure Vanilla Pod', 'Whipped Mascarpone', 'Cake Flour'],
    image: strawberryCupcakeImg,
    badge: 'Seasonal Pick',
    isBestSeller: true,
    prepTime: 'Made Daily',
  },
  {
    id: 'p6',
    name: 'Double Chocolate Cookie',
    category: 'Cookies',
    price: 89,
    rating: 4.9,
    reviewsCount: 430,
    description: 'Thick, chewy dark chocolate cookie stuffed with melted pools of bittersweet and milk chocolate chips, finished with Maldon sea salt.',
    ingredients: ['Maldon Sea Salt', 'Semi-sweet Belgian Chips', 'Cocoa Nibs', 'Grass-fed Butter', 'Dark Brown Sugar'],
    image: doubleCookieImg,
    badge: 'Hot Seller',
    isBestSeller: true,
    prepTime: 'Warm from Oven',
  },
  {
    id: 'p7',
    name: 'Almond Frangipane Croissant',
    category: 'Pastries',
    price: 159,
    rating: 4.9,
    reviewsCount: 178,
    description: 'Twice-baked butter croissant generously filled with sweet almond cream and topped with toasted almond slices and powdered sugar.',
    ingredients: ['Sweet Almond Frangipane', 'Roasted Almond Flakes', 'Vanilla Sugar Syrup', 'French Butter'],
    image: croissantImg,
  },
  {
    id: 'p8',
    name: 'New York Baked Cheesecake',
    category: 'Cakes',
    price: 799,
    rating: 4.9,
    reviewsCount: 310,
    description: 'Dense, ultra-smooth slow-baked cheesecake on a cinnamon graham cracker crust, served with spiced wild berry coulis.',
    ingredients: ['Artisan Cream Cheese', 'Graham Crackers', 'Wild Blueberries', 'Sour Cream', 'Cinnamon'],
    image: cheesecakeImg,
    badge: 'Chef Special',
  },
  {
    id: 'p9',
    name: 'Artisan Country Sourdough',
    category: 'Breads',
    price: 199,
    rating: 4.9,
    reviewsCount: 220,
    description: 'Naturally leavened 36-hour wild sourdough boule featuring an airy blistered crust and pleasant gentle tang.',
    ingredients: ['Stoneground Whole Wheat', 'Heritage Sourdough Starter', 'Filtered Spring Water', 'Pink Himalayan Salt'],
    image: sourdoughBreadImg,
  },
  {
    id: 'p10',
    name: 'French Crusty Baguette',
    category: 'Breads',
    price: 99,
    rating: 4.8,
    reviewsCount: 160,
    description: 'Traditional long French baguette with a resonant crunchy golden crust and tender, open crumb ideal for spreads.',
    ingredients: ['Imported French Wheat', 'Sea Salt', 'Natural Sourdough Poolish'],
    image: sourdoughBreadImg,
  },
  {
    id: 'p11',
    name: 'Salted Caramel Macaron Box (6 pcs)',
    category: 'Desserts',
    price: 349,
    rating: 4.8,
    reviewsCount: 195,
    description: 'Crisp Parisian almond meringue shells sandwiched with burnt butter caramel and fleur de sel crystals.',
    ingredients: ['California Almond Flour', 'Fleur de Sel', 'House Burnt Caramel', 'Pure Cane Sugar'],
    image: macaronsImg,
  },
  {
    id: 'p12',
    name: 'Wild Blueberry Danish',
    category: 'Pastries',
    price: 139,
    rating: 4.7,
    reviewsCount: 142,
    description: 'Laminated puff pastry tart centered with velvety vanilla custard and mountain wild blueberries.',
    ingredients: ['Fresh Blueberries', 'Crème Pâtissière', 'Puff Pastry Layers', 'Apricot Glaze'],
    image: croissantImg,
  },
  {
    id: 'p13',
    name: 'Tiramisu Dolce Cup',
    category: 'Desserts',
    price: 189,
    rating: 4.9,
    reviewsCount: 260,
    description: 'Italian savoiardi biscuits soaked in single-origin espresso and marsala, layered with mascarpone sabayon.',
    ingredients: ['Italian Ladyfingers', 'Single-origin Espresso', 'Bel Paese Mascarpone', 'Dusted Cocoa'],
    image: trufflePastryImg,
  },
  {
    id: 'p14',
    name: 'Pistachio Rose Cupcake',
    category: 'Cupcakes',
    price: 129,
    rating: 4.8,
    reviewsCount: 168,
    description: 'Cardamom-scented sponge topped with Iranian pistachio praline buttercream and edible candied rose petals.',
    ingredients: ['Iranian Pistachios', 'Organic Rosewater', 'Green Cardamom', 'Unsalted Sweet Butter'],
    image: strawberryCupcakeImg,
  },
  {
    id: 'p15',
    name: 'Oatmeal Cinnamon Raisin Cookie',
    category: 'Cookies',
    price: 79,
    rating: 4.7,
    reviewsCount: 135,
    description: 'Nutty rolled whole oats paired with plump golden raisins and aromatic Sri Lankan cinnamon bark.',
    ingredients: ['Rolled Oats', 'Golden Sultanas', 'Ceylon Cinnamon', 'Grass-fed Butter', 'Dark Molasses'],
    image: doubleCookieImg,
  },
  {
    id: 'p16',
    name: 'Artisan Hazelnut Latte',
    category: 'Beverages',
    price: 169,
    rating: 4.8,
    reviewsCount: 210,
    description: 'Double shot of locally roasted Arabica espresso blended with steamed whole milk and roasted hazelnut syrup.',
    ingredients: ['100% Arabica Beans', 'Organic Hazelnut Extract', 'Steamed Whole Milk'],
    image: latteImg,
  },
  {
    id: 'p17',
    name: 'Belgium Hot Chocolate with Marshmallows',
    category: 'Beverages',
    price: 189,
    rating: 4.9,
    reviewsCount: 290,
    description: 'Melted dark and milk Belgian couverture chocolate frothed into creamy whole milk with toasted vanilla marshmallows.',
    ingredients: ['Belgian Couverture', 'Cacao Butter', 'Vanilla Bean Marshmallow', 'Whole Milk'],
    image: trufflePastryImg,
  },
  {
    id: 'p18',
    name: 'Iced Vanilla Cold Brew',
    category: 'Beverages',
    price: 159,
    rating: 4.7,
    reviewsCount: 175,
    description: '18-hour cold steeped coffee steeped with Bourbon vanilla pods, poured over crystal clear ice with sweet cream float.',
    ingredients: ['Ethiopian Yirgacheffe Beans', 'Vanilla Pods', 'Heavy Sweet Cream'],
    image: latteImg,
  },
];

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  item: string;
  avatar: string;
  date: string;
}

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Priya Sharma',
    rating: 5,
    comment: 'Absolutely loved the chocolate cake! It was fresh, soft, rich without being cloying, and perfectly balanced. Everyone at the party asked where it was from.',
    item: 'Belgian Chocolate Cake',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: 'Yesterday',
  },
  {
    id: 'r2',
    name: 'Rohan Mehra',
    rating: 5,
    comment: 'The croissants are amazing. Everything tastes freshly baked right out of a Paris boulangerie. The buttery honeycomb layers are unbelievable.',
    item: 'Butter Croissant',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: '3 days ago',
  },
  {
    id: 'r3',
    name: 'Ananya Kapoor',
    rating: 5,
    comment: 'Beautiful presentation and delicious desserts. Delivered within 30 minutes in pristine condition. Definitely ordering again for our anniversary!',
    item: 'Red Velvet Cake & Tarts',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    date: '5 days ago',
  },
  {
    id: 'r4',
    name: 'Vikram Joshi',
    rating: 5,
    comment: 'Their sourdough bread has transformed my morning toast ritual. The crust crackles and the crumb is delightfully soft and airy.',
    item: 'Artisan Country Sourdough',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    date: '1 week ago',
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Signature Belgian Ganache Celebration Cake',
    category: 'Cakes',
    image: belgianCakeImg,
    description: 'Handcrafted with 70% dark Belgian chocolate and dusted with edible 24k gold leaf.',
  },
  {
    id: 'g2',
    title: 'Golden French Viennoiseries',
    category: 'Pastries',
    image: croissantImg,
    description: 'Laminated with cultured Normandy butter and baked every dawn.',
  },
  {
    id: 'g3',
    title: 'Strawberry Cream & Berry Swirl Cupcakes',
    category: 'Cupcakes',
    image: strawberryCupcakeImg,
    description: 'Light sponge crowned with mascarpone frosting and seasonal berries.',
  },
  {
    id: 'g4',
    title: 'Sea-Salted Double Chocolate Cookies',
    category: 'Cookies',
    image: doubleCookieImg,
    description: 'Crisp chewy edges with melted chocolate pools inside.',
  },
  {
    id: 'g5',
    title: 'Artisan Crusty Sourdough & Boules',
    category: 'Breads',
    image: sourdoughBreadImg,
    description: 'Slow 36-hour cold fermented bread baked in steam hearth ovens.',
  },
  {
    id: 'g6',
    title: 'Bakery Atelier & Cozy Dining Room',
    category: 'Interior',
    image: bakeryInteriorImg,
    description: 'Sunlit warm oak tables, gentle aromas, and cozy reading corners.',
  },
  {
    id: 'g7',
    title: 'Master Chef Kneading Artisan Brioche',
    category: 'Kitchen',
    image: bakerStoryImg,
    description: 'Care, patience, and traditional European techniques.',
  },
  {
    id: 'g8',
    title: 'Velvety Hazelnut Latte & Fresh Croissant',
    category: 'Coffee & Pastry',
    image: latteImg,
    description: 'The quintessential morning pairing made with passion.',
  },
];

export const INSTAGRAM_POSTS = [
  {
    id: 'insta1',
    image: belgianCakeImg,
    likes: '1.4k',
    caption: 'Velvety layers, glossy ganache, and Sunday vibes 🍰✨',
  },
  {
    id: 'insta2',
    image: croissantImg,
    likes: '2.1k',
    caption: 'Listen to that crunch! Fresh out of the oven at 7 AM 🥐',
  },
  {
    id: 'insta3',
    image: strawberryCupcakeImg,
    likes: '980',
    caption: 'Berry sweet moments today at Crème & Crust 🍓🧁',
  },
  {
    id: 'insta4',
    image: doubleCookieImg,
    likes: '1.8k',
    caption: 'Maldon salt flakes meeting warm Belgian chocolate chips 🍪🤎',
  },
  {
    id: 'insta5',
    image: sourdoughBreadImg,
    likes: '850',
    caption: 'The smell of golden crust sourdough is pure therapy 🥖🍞',
  },
  {
    id: 'insta6',
    image: bakeryInteriorImg,
    likes: '3.2k',
    caption: 'Step inside our warm bakery boutique on 24 Baker Street 👨‍🍳💛',
  },
];

export const COUPONS: Record<string, { type: 'percent' | 'flat'; value: number; label: string }> = {
  BAKERY10: { type: 'percent', value: 10, label: '10% OFF' },
  SWEET50: { type: 'flat', value: 50, label: '₹50 OFF' },
  WELCOME15: { type: 'percent', value: 15, label: '15% OFF (First Order)' },
};
