import type { Config } from "tailwindcss";
import animate from 'tailwindcss-animate';
export default {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "1rem",
            screens: {
                "2xl": "1410px",
            },
        },
        extend: {
            screens: {
                "2xl": "1600px",
            },
            colors: {
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "hsl(var(--primary-foreground))",
                    secondary: "var(--primary-secondary)",
                    border: "hsla(var(--primary-border))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                tiny: {
                    DEFAULT: "var(--tiny)",
                    border: "var(--tiny-border)",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                third: {
                    DEFAULT: "var(--third)",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                section: "#EEF6FD",
                "border-primary": "#C1D4E8",
                lightBlue: "#F0F7FF",
                sub: "var(--sub)",
                desc: "var(--desc)",
                popup: "var(--popup)",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                "source-san": ["var(--font-source-sans-3)"],
                "stix-two": ["var(--font-stix-two-text)"],
                "plus-jakarta": ["var(--font-plus-jakarta-sans)"],
            },
            fontSize: {
                xs: "12px", // Văn bản phụ nhỏ nhất
                sm: ["0.875rem", { lineHeight: "1.25rem" }], // Văn bản phụ nhỏ ~ 14px
                base: ["1rem", { lineHeight: "1.25rem" }], // Văn bản phụ thông thường ~ 16px - 20px: line-height
                lg: ["1.125rem", { lineHeight: "1.5625rem" }], // Văn bản cơ bản (trung bình) ~ 18px - 25px: line-height
                xl: ["1.25rem", { lineHeight: "1.5625rem" }], // Văn bản lớn ~ 20px - 25px: line-height
                "2xl": ["1.375rem", { lineHeight: "1.75rem" }], // Văn bản lớn ~ 22px - 28px: line-height
                "3xl": ["1.75rem", { lineHeight: "2.3125rem" }], // Tên cho heading nhỏ ~ 28px
                "4xl": ["2.375rem", { lineHeight: "2.9375rem" }], // Tên cho heading lớn ~ 38px
                "5xl": ["2.8125rem", { lineHeight: "3.4025rem" }], // Tiêu đề trong banner ~ 45px
                "6xl": ["3.125rem", { lineHeight: "3.5rem" }], // Tiêu đề nổi bật (lớn) ~ 50px
                "7xl": ["3.4375rem", { lineHeight: "3.5rem" }], // Tiêu đề nổi bật (lớn nhất) ~ 55px
            },
            boxShadow: {
                custom: "0px 4px 30px #0000000D",
            },
            keyframes: {
                "slide-up": {
                    "0%": {
                        transform: "translate(-50%, 100%)",
                        left: "50%",
                        top: "100%",
                    },
                    "100%": {
                        transform: "translate(-50%, -50%)",
                        left: "50%",
                        top: "50%",
                    },
                },
                "slide-down": {
                    "0%": {
                        transform: "translate(-50%, -50%)",
                        left: "50%",
                        top: "50%",
                    },
                    "100%": {
                        transform: "translate(-50%, 100%)",
                        left: "50%",
                        top: "100%",
                    },
                },
                bounceVertical: {
                    "0%, 100%": { transform: "translateX(-5px) rotate(90deg)" },
                    "50%": { transform: "translateX(5px) rotate(90deg)" },
                },
            },
            animation: {
                "slide-up": "slide-up .5s linear",
                "slide-down": "slide-down .5s linear",
                "bounce-vertical": "bounceVertical 1.5s infinite",
            },
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
