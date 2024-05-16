import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     colors: {
      "Dark": "#161616",
      "Dark_gray": "#d2d2d2",
      "Gray": "#d9d9d9",
      "Yellow": "#FCA311",
      "Light_blue": "#32A6FE",
      "f6": "#f6f6f6",
      "Red" : "#d90429"
     }
    },
    fontFamily: {
      Exo_2: [ 'var(--font-Exo-2)' ],
      Grandstander : [ 'var(--font-Grandstander)' ],
      Kanit : [ '--font-Kanit' ],
      Unbounded : [ '--font-Unbounded' ]
    },
    container : {
      center : true,
      padding: "2rem"
    },
  },
  plugins: [],
}
export default config;
