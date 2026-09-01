// Shared across About.js and Contact.js — update a handle here once,
// not in two places.

/*
* I'm thinking about adding logos to the social links. 
Each link with the desried logo. (Thinking of transparent logos for each social media link)
*/

import { FaInstagram, FaPinterest, FaTiktok, FaYoutube } from 'react-icons/fa';

const SOCIAL_LINKS = [
  { label: 'Instagram', url: 'https://instagram.com/kaptured.moment', Icon: FaInstagram },
  { label: 'Pinterest', url: 'https://pinterest.com/kapturedmoment', Icon: FaPinterest },
  { label: 'TikTok', url: 'https://www.tiktok.com/@kaptured.moment', Icon: FaTiktok },
  { label: 'YouTube', url: 'https://youtube.com/@kaptured.moment', Icon: FaYoutube },
];

export default SOCIAL_LINKS;
