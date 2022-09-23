export const BASE_URL = "https://pokeapi.co/api/v2/";

export const capitaliseStr = (str) => {
  const capitalisedStr = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalisedStr;
};

// let object = {
//   baby_trigger_item: null,
//   chain: {
//     evolution_details: [],
//     evolves_to: [
//       {
//         evolution_details: [
//           {
//             gender: null,
//             held_item: null,
//             item: null,
//             known_move: null,
//             known_move_type: null,
//             location: null,
//             min_affection: null,
//             min_beauty: null,
//             min_happiness: null,
//             min_level: 16,
//             needs_overworld_rain: false,
//             party_species: null,
//             party_type: null,
//             relative_physical_stats: null,
//             time_of_day: "",
//             trade_species: null,
//             trigger: {
//               name: "level-up",
//               url: "https://pokeapi.co/api/v2/evolution-trigger/1/",
//             },
//             turn_upside_down: false,
//           },
//         ],
//         evolves_to: [
//           {
//             evolution_details: [
//               {
//                 gender: null,
//                 held_item: null,
//                 item: null,
//                 known_move: null,
//                 known_move_type: null,
//                 location: null,
//                 min_affection: null,
//                 min_beauty: null,
//                 min_happiness: null,
//                 min_level: 32,
//                 needs_overworld_rain: false,
//                 party_species: null,
//                 party_type: null,
//                 relative_physical_stats: null,
//                 time_of_day: "",
//                 trade_species: null,
//                 trigger: {
//                   name: "level-up",
//                   url: "https://pokeapi.co/api/v2/evolution-trigger/1/",
//                 },
//                 turn_upside_down: false,
//               },
//             ],
//             evolves_to: [],
//             is_baby: false,
//             species: {
//               name: "venusaur",
//               url: "https://pokeapi.co/api/v2/pokemon-species/3/",
//             },
//           },
//         ],
//         is_baby: false,
//         species: {
//           name: "ivysaur",
//           url: "https://pokeapi.co/api/v2/pokemon-species/2/",
//         },
//       },
//     ],
//     is_baby: false,
//     species: {
//       name: "bulbasaur",
//       url: "https://pokeapi.co/api/v2/pokemon-species/1/",
//     },
//   },
//   id: 1,
// };

// let names = [];

// const iterateObject = (obj) => {
//   for (const prop in obj) {
//     if (typeof obj[prop] == "object") {
//       iterateObject(obj[prop]);
//     } else {
//       if (prop === "name" && obj[prop] !== "level-up") {
//         names.push(obj[prop]);
//       }
//     }
//   }
// };

// iterateObject(object);
// console.log(names)
