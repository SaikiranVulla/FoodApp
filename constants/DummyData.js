import icons from "./icons";
import images from "./images";

export const initialCurrentLocation = {
  streetName: "Kuching",
  gps: {
    latitude: 1.5496614931250685,
    longitude: 110.36381866919922,
  },
};

export const categoryData = [
  {
    id: 1,
    name: "All",
    icon: icons.fire,
  },
  {
    id: 2,
    name: "Rice",
    icon: icons.rice_bowl,
  },
  {
    id: 3,
    name: "Noodles",
    icon: icons.noodle,
  },
  {
    id: 4,
    name: "Hot Dogs",
    icon: icons.hotdog,
  },
  {
    id: 5,
    name: "Salads",
    icon: icons.salad,
  },
  {
    id: 6,
    name: "Burgers",
    icon: icons.hamburger,
  },
  {
    id: 7,
    name: "Pizza",
    icon: icons.pizza,
  },
  {
    id: 8,
    name: "Snacks",
    icon: icons.fries,
  },
  {
    id: 9,
    name: "Sushi",
    icon: icons.sushi,
  },
  {
    id: 10,
    name: "Desserts",
    icon: icons.donut,
  },
  {
    id: 11,
    name: "Drinks",
    icon: icons.drink,
  },
];

export const inGridents = [
  {
    id: 1,
    name: "Butter",
    icon: icons.butter,
  },
  {
    id: 2,
    name: "Cheese",
    icon: icons.cheese,
  },
  {
    id: 3,
    name: "Chicken",
    icon: icons.chicken,
  },
  {
    id: 4,
    name: "Curry",
    icon: icons.curry,
  },
  {
    id: 5,
    name: "Food",
    icon: icons.food,
  },
  {
    id: 6,
    name: "Ginger",
    icon: icons.ginger,
  },
  {
    id: 7,
    name: "Onion",
    icon: icons.onion,
  },
  {
    id: 8,
    name: "Salt",
    icon: icons.salt,
  },
  {
    id: 9,
    name: "Tomato",
    icon: icons.tomato,
  },
  {
    id: 10,
    name: "Tomato Sauce",
    icon: icons.tomato_sauce,
  },
];

// price rating
export const affordable = 1;
export const fairPrice = 2;
export const expensive = 3;

export const restaurantData = [
  {
    id: 1,
    name: "Burger King",
    rating: 4.8,
    categories: [1, 6, 8],
    priceRating: affordable,
    photo: images.burger_restaurant_1,
    duration: "30 - 45 min",
    location: {
      latitude: 1.5347282806345879,
      longitude: 110.35632207358996,
    },
    courier: {
      avatar: images.avatar_1,
      name: "Amy",
    },
    menu: [
      {
        menuId: 1,
        name: "Crispy Chicken Burger",
        photo: images.crispy_chicken_burger,
        description: "Burger with crispy chicken, cheese and lettuce",
        calories: 200,
        price: 10,
      },
      {
        menuId: 2,
        name: "Crispy Chicken Burger with Honey Mustard",
        photo: images.honey_mustard_chicken_burger,
        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
        calories: 250,
        price: 15,
      },
      {
        menuId: 3,
        name: "Crispy Baked French Fries",
        photo: images.baked_fries,
        description: "Crispy Baked French Fries",
        calories: 194,
        price: 8,
      },
    ],
  },
  {
    id: 2,
    name: "Pizza Hut",
    rating: 4.8,
    categories: [1, 3, 5, 7],
    priceRating: expensive,
    photo: images.pizza_restaurant,
    duration: "15 - 20 min",
    location: {
      latitude: 1.556306570595712,
      longitude: 110.35504616746915,
    },
    courier: {
      avatar: images.avatar_2,
      name: "Jackson",
    },
    menu: [
      {
        menuId: 4,
        name: "Hawaiian Pizza",
        photo: images.hawaiian_pizza,
        description: "Canadian bacon, homemade pizza crust, pizza sauce",
        calories: 250,
        price: 15,
      },
      {
        menuId: 5,
        name: "Tomato & Basil Pizza",
        photo: images.pizza,
        description:
          "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
        calories: 250,
        price: 20,
      },
      {
        menuId: 6,
        name: "Tomato Pasta",
        photo: images.tomato_pasta,
        description: "Pasta with fresh tomatoes",
        calories: 100,
        price: 10,
      },
      {
        menuId: 7,
        name: "Mediterranean Chopped Salad ",
        photo: images.salad,
        description: "Finely chopped lettuce, tomatoes, cucumbers",
        calories: 100,
        price: 10,
      },
    ],
  },
  {
    id: 3,
    name: "Hotdogs",
    rating: 4.8,
    categories: [1, 4],
    priceRating: expensive,
    photo: images.hot_dog_restaurant,
    duration: "20 - 25 min",
    location: {
      latitude: 1.5238753474714375,
      longitude: 110.34261833833622,
    },
    courier: {
      avatar: images.avatar_3,
      name: "James",
    },
    menu: [
      {
        menuId: 8,
        name: "Chicago Style Hot Dog",
        photo: images.chicago_hot_dog,
        description: "Fresh tomatoes, all beef hot dogs",
        calories: 100,
        price: 20,
      },
    ],
  },
  {
    id: 4,
    name: "Chinese Sushi",
    rating: 4.8,
    categories: [1, 9],
    priceRating: expensive,
    photo: images.japanese_restaurant,
    duration: "10 - 15 min",
    location: {
      latitude: 1.5578068150528928,
      longitude: 110.35482523764315,
    },
    courier: {
      avatar: images.avatar_4,
      name: "Ahmad",
    },
    menu: [
      {
        menuId: 9,
        name: "Sushi sets",
        photo: images.sushi,
        description: "Fresh salmon, sushi rice, fresh juicy avocado",
        calories: 100,
        price: 50,
      },
    ],
  },
  {
    id: 5,
    name: "The Cuisine",
    rating: 4.8,
    categories: [2, 3],
    priceRating: affordable,
    photo: images.noodle_shop,
    duration: "15 - 20 min",
    location: {
      latitude: 1.558050496260768,
      longitude: 110.34743759630511,
    },
    courier: {
      avatar: images.avatar_4,
      name: "Muthu",
    },
    menu: [
      {
        menuId: 10,
        name: "Kolo Mee",
        photo: images.kolo_mee,
        description: "Noodles with char siu",
        calories: 200,
        price: 5,
      },
      {
        menuId: 11,
        name: "Sarawak Laksa",
        photo: images.sarawak_laksa,
        description: "Vermicelli noodles, cooked prawns",
        calories: 300,
        price: 8,
      },
      {
        menuId: 12,
        name: "Nasi Lemak",
        photo: images.nasi_lemak,
        description: "A traditional Malay rice dish",
        calories: 300,
        price: 8,
      },
      {
        menuId: 13,
        name: "Nasi Briyani with Mutton",
        photo: images.nasi_briyani_mutton,
        description: "A traditional Indian rice dish with mutton",
        calories: 300,
        price: 8,
      },
    ],
  },
  {
    id: 6,
    name: "Dessets",
    rating: 4.9,
    categories: [1, 10, 11],
    priceRating: affordable,
    photo: images.kek_lapis_shop,
    duration: "35 - 40 min",
    location: {
      latitude: 1.5573478487252896,
      longitude: 110.35568783282145,
    },
    courier: {
      avatar: images.avatar_1,
      name: "Jessie",
    },
    menu: [
      {
        menuId: 12,
        name: "Teh C Peng",
        photo: images.teh_c_peng,
        description: "Three Layer Teh C Peng",
        calories: 100,
        price: 2,
      },
      {
        menuId: 13,
        name: "ABC Ice Kacang",
        photo: images.ice_kacang,
        description: "Shaved Ice with red beans",
        calories: 100,
        price: 3,
      },
      {
        menuId: 14,
        name: "Kek Lapis",
        photo: images.kek_lapis,
        description: "Layer cakes",
        calories: 300,
        price: 20,
      },
    ],
  },
];
