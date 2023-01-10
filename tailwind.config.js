/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors:{
        amznOrange:{
          50:'#febd69',
          100:'#f3a847'
        },
      },
      backgroundColor:{
        'amznDarkBlue':'#131A22',
        'amznLightBlue':'#232F3E'
      },
      fontFamily:{
        emberLt:['ember-light','arial'],
        emberRg:['ember-reg','arial'],
        emberBd:['ember-bold','arial'],
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require('tw-elements/dist/plugin'),
  ],
};
