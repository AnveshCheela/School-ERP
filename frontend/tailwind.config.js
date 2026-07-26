/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-container": "#eaedff",
                        "secondary-container": "#76dcff",
                        "on-tertiary-container": "#78f591",
                        "on-tertiary": "#ffffff",
                        "on-secondary": "#ffffff",
                        "on-secondary-fixed": "#001f28",
                        "tertiary": "#005522",
                        "outline": "#777587",
                        "surface": "#faf8ff",
                        "on-primary-container": "#dad7ff",
                        "error-container": "#ffdad6",
                        "secondary-fixed-dim": "#6cd3f7",
                        "on-primary-fixed": "#0f0069",
                        "surface-container-lowest": "#ffffff",
                        "on-secondary-container": "#006077",
                        "tertiary-container": "#00702f",
                        "on-primary-fixed-variant": "#3323cc",
                        "surface-tint": "#4d44e3",
                        "tertiary-fixed": "#7ffc97",
                        "on-error-container": "#93000a",
                        "on-surface-variant": "#464555",
                        "primary-fixed-dim": "#c3c0ff",
                        "primary": "#3525cd",
                        "tertiary-fixed-dim": "#62df7d",
                        "surface-container-high": "#e2e7ff",
                        "error": "#ba1a1a",
                        "surface-dim": "#d2d9f4",
                        "inverse-primary": "#c3c0ff",
                        "primary-fixed": "#e2dfff",
                        "outline-variant": "#c7c4d8",
                        "on-surface": "#131b2e",
                        "inverse-on-surface": "#eef0ff",
                        "on-tertiary-fixed-variant": "#005320",
                        "background": "#faf8ff",
                        "on-tertiary-fixed": "#002109",
                        "inverse-surface": "#283044",
                        "on-primary": "#ffffff",
                        "on-error": "#ffffff",
                        "surface-container-highest": "#dae2fd",
                        "surface-variant": "#dae2fd",
                        "on-secondary-fixed-variant": "#004e61",
                        "on-background": "#131b2e",
                        "secondary-fixed": "#b7eaff",
                        "surface-bright": "#faf8ff",
                        "primary-container": "#4f46e5",
                        "surface-container-low": "#f2f3ff",
                        "secondary": "#006780"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "container-max": "1280px",
                        "xl": "2rem",
                        "gutter": "24px",
                        "md": "1rem",
                        "margin-mobile": "16px",
                        "xs": "0.25rem",
                        "sm": "0.5rem",
                        "2xl": "3rem",
                        "lg": "1.5rem"
                    },
                    "fontFamily": {
                        "headline-lg": ["Inter"],
                        "display-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "headline-sm": ["Inter"],
                        "body-sm": ["Inter"],
                        "headline-lg-mobile": ["Inter"],
                        "body-md": ["Inter"],
                        "body-lg": ["Inter"],
                        "label-sm": ["Inter"],
                        "headline-md": ["Inter"]
                    },
                    "fontSize": {
                        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-md": ["14px", { "lineHeight": "20px", "fontWeight": "600" }],
                        "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                        "headline-lg-mobile": ["28px", { "lineHeight": "36px", "fontWeight": "700" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.01em", "fontWeight": "600" }],
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }]
                    }
                }
            }
        }.theme,
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
