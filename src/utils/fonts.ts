import localFont from "next/font/local";

const Exo_2 = localFont({
    display: 'swap',
    variable: '--font-Exo-2',
    src: [
        {
            path: "../../public/fonts/Exo_2/static/Exo2-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/Exo_2/static/Exo2-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/Exo_2/static/Exo2-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/Exo_2/static/Exo2-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/Exo_2/static/Exo2-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/fonts/Exo_2/static/Exo2-Black.ttf",
            weight: "900",
            style: "normal",
        },
    ]
})

const Grandstander = localFont({
    display: 'swap',
    variable: '--font-Grandstander',
    src: [
        {
            path: "../../public/fonts/Grandstander/static/Grandstander-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/Grandstander/static/Grandstander-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/Grandstander/static/Grandstander-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/Grandstander/static/Grandstander-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/Grandstander/static/Grandstander-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/fonts/Grandstander/static/Grandstander-Black.ttf",
            weight: "900",
            style: "normal",
        },
    ]
})

const Kanit = localFont({
    display: 'swap',
    variable: '--font-Kanit',
    src: [
        {
            path: "../../public/fonts/Kanit/Kanit-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/Kanit/Kanit-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/Kanit/Kanit-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/Kanit/Kanit-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/Kanit/Kanit-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/fonts/Kanit/Kanit-Black.ttf",
            weight: "900",
            style: "normal",
        },
    ]
})

const Unbounded = localFont({
    display: 'swap',
    variable: '--font-Unbounded',
    src: [
        {
            path: "../../public/fonts/Unbounded/static/Unbounded-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/Unbounded/static/Unbounded-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/Unbounded/static/Unbounded-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts//Unbounded/static/Unbounded-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/Unbounded/static/Unbounded-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/fonts/Unbounded/static/Unbounded-Black.ttf",
            weight: "900",
            style: "normal",
        },
    ]
})


export const FONTS = ` 
                        ${ Exo_2.variable } 
                        ${ Grandstander.variable } 
                        ${ Kanit.variable } 
                        ${ Unbounded.variable } 
                    `