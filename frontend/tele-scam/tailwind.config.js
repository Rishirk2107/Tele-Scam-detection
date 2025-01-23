// // tailwind.config.js
// export default {
//     darkMode: 'class', // Enable dark mode using the 'class' strategy
//     theme: {
//       extend: {
//         colors: {
//           lightBg: '#ffffff',      // Light mode background
//           darkBg: '#181818',       // Dark mode background
//           primary: '#646cff',      // Primary color
//           primaryHover: '#535bf2', // Primary hover color
//           textDark: '#333333',     // Dark mode text
//           textLight: '#ffffff',    // Light mode text
//           darkCard: '#1a1a1a',     // Dark card background
//           lightCard: '#f9f9f9',    // Light card background
//           mutedText: '#cbd5e1',    // Muted text for secondary info
//           danger: '#dc2626',       // Danger red
//           safe: '#22c55e',         // Safe green
//         },
//         backgroundImage: {
//           gradientBg: 'linear-gradient(to bottom right, #1e293b, #0f172a)', // Dashboard background
//           dangerGradient: 'linear-gradient(to bottom right, #dc2626, #991b1b)', // For flagged cards
//           safeGradient: 'linear-gradient(to bottom right, #22c55e, #15803d)', // For safe cards
//         },
//         boxShadow: {
//           card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Custom card shadow
//         },
//         fontSize: {
//           '2xs': '0.7rem',        // Extra small font
//           '3xl': '1.875rem',      // Dashboard headings
//           '5xl': '3rem',          // Large hero text
//         },
//         spacing: {
//           18: '4.5rem',           // Custom spacing value
//           88: '22rem',            // Custom height/width
//         },
//         borderRadius: {
//           lg: '0.5rem',           // Large rounded corners for cards
//         },
//         transitionProperty: {
//           scale: 'transform',     // Enable scaling transitions
//         },
//       },
//     },
//     plugins: [],
//   };
export const darkMode = 'class';
export const theme = {
    extend: {
        colors: {
            darkBg: '#121212',
            lightBg: '#ffffff',
            textLight: '#ffffff',
            textDark: '#212121',
        },
    },
};
  