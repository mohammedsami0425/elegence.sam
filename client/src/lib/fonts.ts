import { createGlobalStyle } from 'styled-components';

// Global styles for fonts to be used with Tailwind
const FontStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&display=swap');
`;

export default FontStyles;

// Extend Tailwind config with these fonts:
// fontFamily: {
//   'heading': ['Playfair Display', 'serif'],
//   'body': ['Montserrat', 'sans-serif'],
//   'accent': ['Cormorant Garamond', 'serif']
// }
