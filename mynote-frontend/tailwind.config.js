/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
      },
      colors:{
        blue:{
          light: "#EBFBFC",
          default:"#CDF8FA",
          dark:"#00BBC5",
        },
        custom:{
          morelight:"#E8F5F5",
          light:"#bededd",
          default:"#bededd",
          dark:"#639696",
          moredark:"#126F6C",
        }
        
        // green:{
        //   light: "#8fbc8f",
        //   default:"",
        //   dark:"#355e3b",
        // },
        // red:{
        //   light: "",
        //   default:"",
        //   dark:"",
        // },
        // pink:{
        //   light: "",
        //   default:"",
        //   dark:"",
        // },
      }
    },
  },
  plugins: [],
}

