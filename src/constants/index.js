import {
  // blackImg,
  // blueImg,
  highlightFirstVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  highlightFourthVideo,  // Ensure this video is defined
  highlightFifthVideo,   // Ensure this video is defined
  highlightSixthVideo,   // Ensure this video is defined
  // whiteImg,
  yellowImg,
  ic4Img,
} from "../utils";

export const navLists = [
  "Store", 
  "Mac", 
  "iPad", 
  "iPhone", 
  "Watch", 
  "AirPods", 
  "TV&Home", 
  "Entertainment", 
  "Accessories", 
  "Support"
];

export const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      "The first iPhone designed for",
      "Apple Intelligence. Personal, private,",
      "powerful.",
    ],
    video: highlightFirstVideo,
    videoDuration: 5, // Duration in seconds
  },
  {
    id: 2,
    textLists: [
      "So fast. So fluid. Get a feel for", 
      "the all-new Camera Control."
    ],
    video: highlightSecondVideo,
    videoDuration: 5, // Duration in seconds
  },
  {
    id: 3,
    textLists: [
      "4K 120 fps Dolby Vision.",
      "4 studio-quality mics.",
      "A Pro studio in your pocket.",
    ],
    video: highlightThirdVideo,
    videoDuration: 7, // Duration in seconds
  },
  {
    id: 4,
    textLists: [
      "Our thinnest borders yet — for even",
      "larger displays. Brilliant."
    ],
    video: highlightFourthVideo, // Use video instead of image
    videoDuration: 3, // Set an appropriate duration for the video
  },
  {
    id: 5,
    textLists: [
      "All-new A18 Pro chip powers",
      "unrivalled intelligence. And",
      "unprecedented performance.",
    ],
    video: highlightFifthVideo, // Use video instead of image
    videoDuration: 7, // Set an appropriate duration for the video
  },
  {
    id: 6,
    textLists: [
      "A huge leap in battery life. Game on.",
      "Experience longer usage without charging."
    ],
    video: highlightSixthVideo, // Use video instead of image
    videoDuration: 3, // Set an appropriate duration for the video
  },
];

export const models = [
  {
    id: 0,
    title: "15.93 cm (6.3″) iPhone 16 Pro in four colours",
    color: ["rgba(66, 66, 69, 0.8)"],
    img: yellowImg,
  },
  {
    id: 1,
    title: "17.43 cm (6.9″) iPhone 16 Pro Max & 15.93 cm (6.3″) iPhone 16 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  },
  {
    id: 2,
    title: "17.43 cm (6.9″) iPhone 16 Pro Max & 15.93 cm (6.3″) iPhone 16 Pro in Blue Titanium",
    color: ["#392e5e", "#6395ff", "#21242e"],
    img: yellowImg,  
  },
  {
    id: 3,
    title: "17.43 cm (6.9″) iPhone 16 Pro Max & 15.93 cm (6.3″) iPhone 16 Pro in Desert Titanium",
    color: ["#C9C8C2", "#ffffff", "#C9C8C2"],
    img: yellowImg,
  },
  {
    id: 4,
    title: "17.43 cm (6.9″) iPhone 16 Pro Max & 15.93 cm (6.3″) iPhone 16 Pro in Black Titanium",
    color: ["#454749", "#3b3b3b", "#181819"],
    img: yellowImg,
  },
];

export const sizes = [
  { label: '6.1"', value: "small" },
  { label: '6.7"', value: "large" },
];

export const footerLinks = [
  "Privacy Policy",
  "Terms of Use",
  "Sales Policy",
  "Legal",
  "Site Map",
];