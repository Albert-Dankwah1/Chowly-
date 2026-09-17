import type {
  Address,
  Banner,
  Category,
  Delivery,
  DriverSummary,
  Order,
  Restaurant,
  User,
} from "./api";

export const mockCustomerUser: User = {
  _id: "66d000000000000000000002",
  name: "Sarah Jenkins",
  email: "customer@chowly.app",
  phone: "+1 (555) 987-6543",
  role: "customer",
  isActive: true,
  createdAt: "2026-06-20T09:00:00.000Z",
  updatedAt: "2026-09-01T10:00:00.000Z",
};

export const mockDriverUser: User = {
  _id: "66d000000000000000000003",
  name: "Alex Taylor",
  email: "driver@chowly.app",
  phone: "+1 (555) 321-7654",
  role: "driver",
  isActive: true,
  createdAt: "2026-06-15T08:30:00.000Z",
  updatedAt: "2026-09-01T10:00:00.000Z",
};

export const mockAddresses: Address[] = [
  {
    _id: "addr_1",
    userId: "66d000000000000000000002",
    label: "Home",
    line1: "742 Evergreen Terrace",
    line2: "Apt 4B",
    city: "San Francisco",
    postcode: "94103",
    instructions: "Buzzer 4B, 4th floor.",
    location: { type: "Point", coordinates: [-122.4194, 37.7749] },
    isDefault: true,
    createdAt: "2026-06-20T09:10:00.000Z",
    updatedAt: "2026-06-20T09:10:00.000Z",
  },
  {
    _id: "addr_2",
    userId: "66d000000000000000000002",
    label: "Work",
    line1: "500 Howard St",
    city: "San Francisco",
    postcode: "94105",
    isDefault: false,
    createdAt: "2026-07-01T10:00:00.000Z",
    updatedAt: "2026-07-01T10:00:00.000Z",
  },
];

export const mockBanners: Banner[] = [
  {
    _id: "ban_1",
    title: "Free Delivery This Weekend",
    subtitle: "On all orders above $25 from top local spots",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
    categorySlug: "burgers",
  },
  {
    _id: "ban_2",
    title: "Fresh Artisanal Pizza",
    subtitle: "Woodfired sourdough crusts crafted daily",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&auto=format&fit=crop&q=80",
    categorySlug: "pizza",
  },
];

export const mockCategories: Category[] = [
  {
    _id: "cat_1",
    name: "Burgers",
    slug: "burgers",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80",
    backgroundColor: "#FEE2E2",
    sortOrder: 1,
    isActive: true,
  },
  {
    _id: "cat_2",
    name: "Pizza",
    slug: "pizza",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80",
    backgroundColor: "#FEF3C7",
    sortOrder: 2,
    isActive: true,
  },
  {
    _id: "cat_3",
    name: "Asian",
    slug: "asian-ramen",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop&q=80",
    backgroundColor: "#DCFCE7",
    sortOrder: 3,
    isActive: true,
  },
  {
    _id: "cat_4",
    name: "Mexican",
    slug: "mexican",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop&q=80",
    backgroundColor: "#F3E8FF",
    sortOrder: 4,
    isActive: true,
  },
];

export const mockRestaurants: Restaurant[] = [
  {
    _id: "rest_1",
    name: "Burger Craft & Co.",
    slug: "burger-craft-co",
    description: "Handcrafted artisan smash burgers made with 100% grass-fed Angus beef.",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Burgers", "American"],
    categories: [{ _id: "cat_1", name: "Burgers", slug: "burgers" }],
    rating: 4.8,
    ratingCount: 312,
    prepTimeMinMinutes: 15,
    prepTimeMaxMinutes: 25,
    deliveryFee: 299,
    minOrder: 1500,
    address: "142 Market St, San Francisco, CA",
    closesAt: "23:00",
    isOpen: true,
  },
  {
    _id: "rest_2",
    name: "Napoli Woodfired Pizza",
    slug: "napoli-woodfired-pizza",
    description: "Authentic Neapolitan sourdough pizza baked in a woodfired stone oven.",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Pizza", "Italian"],
    categories: [{ _id: "cat_2", name: "Pizza", slug: "pizza" }],
    rating: 4.9,
    ratingCount: 428,
    prepTimeMinMinutes: 20,
    prepTimeMaxMinutes: 30,
    deliveryFee: 349,
    minOrder: 2000,
    address: "88 Columbus Ave, San Francisco, CA",
    closesAt: "22:30",
    isOpen: true,
  },
  {
    _id: "rest_3",
    name: "Tokyo Ramen House",
    slug: "tokyo-ramen-house",
    description: "Slow-simmered 18-hour tonkotsu broth with handmade springy noodles.",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80",
    cuisines: ["Ramen", "Japanese"],
    categories: [{ _id: "cat_3", name: "Asian", slug: "asian-ramen" }],
    rating: 4.7,
    ratingCount: 195,
    prepTimeMinMinutes: 15,
    prepTimeMaxMinutes: 25,
    deliveryFee: 299,
    minOrder: 1800,
    address: "512 Geary St, San Francisco, CA",
    closesAt: "22:00",
    isOpen: true,
  },
];

export const mockRestaurantDishes = [
  {
    _id: "dish_1",
    restaurantId: "rest_1",
    name: "Truffle Smash Double",
    description: "Two 4oz smashed beef patties, truffle garlic aioli, aged cheddar, pickles on a brioche bun.",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    price: 1350,
    allergens: ["Gluten", "Dairy"],
    section: "Burgers",
    isAvailable: true,
    isPopular: true,
    optionGroups: [
      {
        _id: "og_1",
        name: "Bun Choice",
        type: "single" as const,
        required: true,
        options: [
          { _id: "opt_1", name: "Toasted Brioche Bun", priceDelta: 0, isDefault: true },
          { _id: "opt_2", name: "Gluten-Free Bun", priceDelta: 150, isDefault: false },
        ],
      },
    ],
  },
  {
    _id: "dish_2",
    restaurantId: "rest_1",
    name: "Rosemary Sea Salt Fries",
    description: "Crispy skin-on russet potatoes tossed in freshly chopped rosemary and sea salt.",
    imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80",
    price: 550,
    allergens: [],
    section: "Sides",
    isAvailable: true,
    isPopular: true,
    optionGroups: [],
  },
];

export const mockOrders: Order[] = [
  {
    _id: "ord_101",
    reference: "CH-2481",
    restaurantId: "rest_1",
    restaurantName: "Burger Craft & Co.",
    restaurantImageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80",
    restaurantAddress: "142 Market St, San Francisco, CA",
    items: [
      {
        _id: "it_1",
        dishId: "dish_1",
        name: "Truffle Smash Double",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200",
        unitPrice: 1350,
        quantity: 2,
        optionIds: ["opt_1"],
        optionNames: ["Toasted Brioche Bun"],
      },
    ],
    subtotal: 2700,
    deliveryFee: 299,
    serviceFee: 135,
    total: 3134,
    currency: "USD",
    deliveryAddress: {
      line1: "742 Evergreen Terrace",
      line2: "Apt 4B",
      city: "San Francisco",
      postcode: "94103",
    },
    contactName: "Sarah Jenkins",
    driver: {
      name: "Alex Taylor",
      phone: "+1 (555) 321-7654",
      rating: 4.9,
    },
    includeCutlery: true,
    status: "out_for_delivery",
    statusHistory: [
      { _id: "sh_1", status: "confirmed", at: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
      { _id: "sh_2", status: "preparing", at: new Date(Date.now() - 20 * 60 * 1000).toISOString() },
      { _id: "sh_3", status: "ready", at: new Date(Date.now() - 10 * 60 * 1000).toISOString() },
      { _id: "sh_4", status: "out_for_delivery", at: new Date(Date.now() - 5 * 60 * 1000).toISOString(), note: "Rider picked up order" },
    ],
    deliveryCode: "4821",
    prepTimeMinMinutes: 15,
    prepTimeMaxMinutes: 25,
    estimatedDeliveryAt: new Date(Date.now() + 12 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
];

export const mockDriverDeliveries: Delivery[] = [
  {
    order: {
      ...mockOrders[0],
      _id: "del_1",
      reference: "CH-2480",
      status: "ready",
      restaurantLocation: { lat: 37.7749, lng: -122.4194 },
      deliveryLocation: { lat: 37.7833, lng: -122.4167 },
    },
    payout: {
      base: 350,
      distance: 180,
      total: 530, // $5.30
      distanceKm: 3.0,
    },
  },
  {
    order: {
      ...mockOrders[0],
      _id: "del_2",
      reference: "CH-2479",
      restaurantName: "Napoli Woodfired Pizza",
      status: "ready",
      restaurantLocation: { lat: 37.7983, lng: -122.4075 },
      deliveryLocation: { lat: 37.8024, lng: -122.4058 },
    },
    payout: {
      base: 350,
      distance: 120,
      total: 470,
      distanceKm: 2.0,
    },
  },
];

export const mockDriverSummary: DriverSummary = {
  deliveries: 6,
  earnings: 3480, // $34.80 in cents
  isOnline: true,
};
