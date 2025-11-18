'use client'

import Link from 'next/link'

const WHATSAPP_URL =
	'https://wa.me/966920008293?text=%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%D9%85'

export default function WhatsAppButton() {
	return (
		<Link
			href={WHATSAPP_URL}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Contact us on WhatsApp"
			className="fixed bottom-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-colors hover:bg-green-600 ltr:right-6 rtl:left-6"
		>
			{/* WhatsApp Icon */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="h-7 w-7"
				aria-hidden
			>
				<path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5.03.2 5.31.2 11.87c0 2.09.55 4.14 1.6 5.95L0 24l6.35-1.77a11.85 11.85 0 0 0 5.71 1.5h.01c6.55 0 11.86-5.29 11.89-11.84.02-3.18-1.22-6.17-3.44-8.41ZM12.07 21.2h-.01a9.95 9.95 0 0 1-5.07-1.38l-.36-.21-3.77 1.05 1.04-3.66-.24-.38a9.98 9.98 0 0 1-1.56-5.34c0-5.5 4.48-9.97 9.99-9.99a9.9 9.9 0 0 1 7.08 2.93 9.9 9.9 0 0 1 2.94 7.08c-.02 5.5-4.5 9.97-10.04 9.97Zm5.73-7.46c-.31-.16-1.83-.9-2.12-1-.28-.1-.49-.16-.7.16-.2.31-.8 1-.98 1.2-.18.2-.36.22-.67.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.54-1.84-1.72-2.16-.18-.31-.02-.48.13-.64.13-.13.31-.36.46-.54.16-.18.2-.31.31-.51.1-.2.05-.38-.02-.54-.16-.16-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53l-.6-.01c-.2 0-.51.07-.78.38-.27.31-1.02 1-1.02 2.43s1.05 2.82 1.2 3.02c.16.2 2.07 3.16 5.02 4.43.7.3 1.24.48 1.66.62.7.22 1.35.19 1.86.12.57-.09 1.83-.75 2.09-1.47.26-.73.26-1.36.18-1.49-.07-.13-.27-.2-.58-.36Z" />
			</svg>
		</Link>
	)
}
