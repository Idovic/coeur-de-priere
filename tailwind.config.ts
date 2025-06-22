
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'nunito': ['Nunito', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Couleurs spécifiques pour l'application de prière - Palette moderne bleu-violet
				prayer: {
					50: '#f8faff',
					100: '#f0f4ff',
					200: '#e6edff',
					300: '#d1ddfe',
					400: '#a5b8fc',
					500: '#7c7af2',
					600: '#6366f1',
					700: '#5855ea',
					800: '#4c46d6',
					900: '#413bb8',
				},
				serenity: {
					50: '#f8fafe',
					100: '#f1f5fd',
					200: '#e8effa',
					300: '#d4e2f6',
					400: '#a8c5ed',
					500: '#7ca8e4',
					600: '#5084d1',
					700: '#3d68bd',
					800: '#2e4f99',
					900: '#1f3575',
				},
				mystic: {
					50: '#faf8ff',
					100: '#f3f0ff',
					200: '#ede5ff',
					300: '#ddd0ff',
					400: '#c4a7ff',
					500: '#a67eff',
					600: '#8b5cf6',
					700: '#7c3aed',
					800: '#6b21e3',
					900: '#581c87',
				},
				harmony: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backdropBlur: {
				'xs': '2px',
				'xl': '24px',
				'2xl': '40px',
			},
			boxShadow: {
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				'prayer': '0 4px 20px 0 rgba(124, 122, 242, 0.25)',
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				'glow': '0 0 20px rgba(124, 122, 242, 0.3)',
				'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'prayer-gradient': 'linear-gradient(135deg, #7c7af2 0%, #a67eff  50%, #5084d1 100%)',
				'mystic-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #7c7af2 50%, #0ea5e9 100%)',
				'harmony-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #7dd3fc 50%, #c4a7ff 100%)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(124, 122, 242, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 30px rgba(124, 122, 242, 0.5)'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
