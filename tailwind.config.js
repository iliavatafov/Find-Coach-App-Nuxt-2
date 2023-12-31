const plugin = require('tailwindcss/plugin')

export default {
  content: ['./pages/**/*.{html,js}', './components/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        blue: '#1fb6ff',
        purple: '#3a0061',
        violet: '#faf6ff',
        pink: '#ff49db',
        orange: '#ff7849',
        green: '#13ce66',
        yellow: '#ffc82c',
        'gray-dark': '#273444',
        gray: '#ccc',
        'gray-light': '#d3dce6',
        red: '#FF0000',
        white: '#fff',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      height: {
        '10vh': '10vh',
        '20vh': '20vh',
        '30vh': '30vh',
        '40vh': '40vh',
        '50vh': '50vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '100vh': '100vh',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.custom-top': {
          top: '20vh',
        },
        '.default-shadow': {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
        },
        '.base-input': {
          display: 'block',
          width: '100%',
          font: 'inherit',
          border: '1px solid #ccc',
          padding: '0.15rem',
          '&:focus': {
            borderColor: '#3d008d',
            backgroundColor: '#faf6ff',
            outline: 'none',
          },
        },
        '.base-textarea': {
          display: 'block',
          width: '100%',
          font: 'inherit',
          border: '1px solid #ccc',
          padding: '0.15rem',
          '&:focus': {
            borderColor: '#3d008d',
            backgroundColor: '#faf6ff',
            outline: 'none',
          },
        },
        '.base-label': {
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          display: 'block',
        },
        '.base-btn': {
          textDecoration: 'none',
          padding: '0.75rem 1.5rem',
          font: 'inherit',
          backgroundColor: '#3a0061',
          border: '1px solid #3a0061',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '30px',
          marginRight: '0.5rem',
          display: 'inline-block',
          '&:hover': {
            backgroundColor: '#270041',
            borderColor: '#270041',
          },
        },
        '.green-btn': {
          textDecoration: 'none',
          padding: '0.75rem 1.5rem',
          font: 'inherit',
          backgroundColor: 'green',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '30px',
          marginRight: '0.5rem',
          display: 'inline-block',
          '&:hover': {
            backgroundColor: 'white',
            border: '2px solid green',
            color: 'green',
          },
          '&:active': {
            backgroundColor: 'white',
            border: '2px solid green',
            color: 'green',
          },
        },
        '.red-btn': {
          textDecoration: 'none',
          padding: '0.75rem 1.5rem',
          font: 'inherit',
          backgroundColor: 'red',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '30px',
          marginRight: '0.5rem',
          display: 'inline-block',
          '&:hover': {
            backgroundColor: 'white',
            border: '2px solid red',
            color: 'red',
          },
          '&:active': {
            backgroundColor: 'white',
            border: '2px solid red',
            color: 'red',
          },
        },
        '.refresh-btn': {
          textDecoration: 'none',
          padding: '0.75rem 1.5rem',
          font: 'inherit',
          backgroundColor: 'transperant',
          border: '2px solid #270041',
          color: '#270041',
          cursor: 'pointer',
          borderRadius: '30px',
          marginRight: '0.5rem',
          display: 'inline-block',
          '&:hover': {
            backgroundColor: '#edd2ff',
          },
          '&:active': {
            backgroundColor: '#edd2ff',
          },
        },
      })
    }),
  ],
}
