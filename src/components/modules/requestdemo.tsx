'use client'

import {
	PortableText,
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from '@portabletext/react'
import { cn } from '@/lib/utils'
import * as m from 'motion/react-m'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'

type RequestDemoProps = {
	pretitle?: string
	title?: any
	description?: any
	fullNamePlaceholder?: string
	phonePlaceholder?: string
	companyPlaceholder?: string
	buttonText?: string
	successMessage?: string
	locale?: 'en' | 'ar'
}

const getRequestDemoFormSchema = (locale: 'en' | 'ar' = 'ar') => {
	const messages = {
		ar: {
			fullName: 'الاسم الكامل مطلوب',
			phone: 'رقم الهاتف مطلوب',
			phoneInvalid: 'رقم الهاتف غير صحيح',
			phoneFormat: 'رقم الهاتف يجب أن يكون 10 أرقام ويبدأ بـ 05',
			company: 'اسم الجهة مطلوب',
		},
		en: {
			fullName: 'Full name is required',
			phone: 'Phone number is required',
			phoneInvalid: 'Invalid phone number',
			phoneFormat: 'Phone number must be 10 digits and start with 05',
			company: 'Company name is required',
		},
	}

	const msg = messages[locale]

	return z.object({
		fullName: z.string().min(2, msg.fullName),
		phone: z
			.string()
			.min(1, msg.phone)
			.regex(/^05\d{8}$/, msg.phoneFormat),
		company: z.string().min(2, msg.company),
	})
}

type RequestDemoFormData = z.infer<ReturnType<typeof getRequestDemoFormSchema>>

export default function RequestDemo({
	pretitle,
	title,
	description,
	fullNamePlaceholder,
	phonePlaceholder,
	companyPlaceholder,
	buttonText,
	successMessage,
	locale = 'ar',
}: RequestDemoProps) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)
	const [otpCode, setOtpCode] = useState('')
	const [isSendingOtp, setIsSendingOtp] = useState(false)
	const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
	const [otpVerified, setOtpVerified] = useState(false)
	const [otpError, setOtpError] = useState('')
	const [countdown, setCountdown] = useState(0)
	const [phoneForOtp, setPhoneForOtp] = useState('')
	const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [selectedTime, setSelectedTime] = useState<string>('')
	const [selectedDay, setSelectedDay] = useState<string>('')
	const [selectedMonth, setSelectedMonth] = useState<string>('')
	const [selectedYear, setSelectedYear] = useState<string>('')

	const isRTL = locale === 'ar'

	// Sync selectedDate with day/month/year selects
	useEffect(() => {
		if (selectedDate) {
			setSelectedDay(String(selectedDate.getDate()))
			setSelectedMonth(String(selectedDate.getMonth() + 1))
			setSelectedYear(String(selectedDate.getFullYear()))
		} else {
			setSelectedDay('')
			setSelectedMonth('')
			setSelectedYear('')
		}
	}, [selectedDate])

	const translations = {
		ar: {
			fullName: 'الاسم الكامل *',
			fullNamePlaceholder: fullNamePlaceholder || 'أدخل اسمك الكامل',
			phone: 'رقم الهاتف *',
			phonePlaceholder: phonePlaceholder || '05XXXXXXXX',
			company: 'اسم الجهة *',
			companyPlaceholder: companyPlaceholder || 'اسم الشركة أو المؤسسة',
			buttonText: buttonText || 'اطلب عرض تجريبي',
			successMessage: successMessage || 'سيتم التواصل معك قريباً',
			submitting: 'جاري الإرسال...',
			sendOtp: 'إرسال رمز التحقق',
			otpTitle: 'أدخل رمز التحقق',
			otpDescription: 'تم إرسال رمز التحقق إلى رقم هاتفك',
			otpPlaceholder: 'أدخل الرمز المكون من 4 أرقام',
			verifyOtp: 'تحقق',
			resendOtp: 'إعادة إرسال',
			resendIn: 'إعادة إرسال خلال',
			seconds: 'ثانية',
			selectDate: 'اختر موعد التواصل',
			selectDateDescription: 'اختر التاريخ والوقت المناسب للتواصل معك',
			selectTime: 'اختر الوقت',
			confirm: 'تأكيد',
			cancel: 'إلغاء',
			dateRequired: 'الرجاء اختيار التاريخ',
			timeRequired: 'الرجاء اختيار الوقت',
		},
		en: {
			fullName: 'Full Name *',
			fullNamePlaceholder: fullNamePlaceholder || 'Enter your full name',
			phone: 'Phone Number *',
			phonePlaceholder: phonePlaceholder || '05XXXXXXXX',
			company: 'Company Name *',
			companyPlaceholder: companyPlaceholder || 'Company or organization name',
			buttonText: buttonText || 'Request Demo',
			successMessage: successMessage || 'We will contact you soon',
			submitting: 'Submitting...',
			sendOtp: 'Send Verification Code',
			otpTitle: 'Enter Verification Code',
			otpDescription: 'A verification code has been sent to your phone number',
			otpPlaceholder: 'Enter 4-digit code',
			verifyOtp: 'Verify',
			resendOtp: 'Resend',
			resendIn: 'Resend in',
			seconds: 'seconds',
			selectDate: 'Select Contact Date',
			selectDateDescription:
				'Choose the date and time that suits you for contact',
			selectTime: 'Select Time',
			confirm: 'Confirm',
			cancel: 'Cancel',
			dateRequired: 'Please select a date',
			timeRequired: 'Please select a time',
		},
	}

	const t = translations[locale]

	const components: PortableTextComponents = {
		types: {
			block: ({ value }: PortableTextTypeComponentProps<any>) => {
				if (value.style === 'h1') {
					return (
						<h1 className="bg-gradient-to-r from-cyan-950 via-teal-800 to-cyan-900 bg-clip-text text-xl leading-tight font-bold text-transparent transition-all duration-300 sm:text-2xl md:text-3xl lg:text-4xl">
							{value.children.map((child: any) => child.text).join('')}
						</h1>
					)
				}
				if (value.style === 'h2') {
					return (
						<h2 className="bg-gradient-to-r from-cyan-950 via-teal-800 to-cyan-900 bg-clip-text text-xl leading-tight font-bold text-transparent transition-all duration-300 sm:text-2xl md:text-3xl lg:text-4xl">
							{value.children.map((child: any) => child.text).join('')}
						</h2>
					)
				}
				return (
					<p className="text-sm leading-relaxed text-gray-700 transition-colors duration-300 sm:text-base md:text-lg">
						{value.children.map((child: any) => child.text).join('')}
					</p>
				)
			},
		},
	}

	const formSchema = getRequestDemoFormSchema(locale)

	const form = useForm<RequestDemoFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			phone: '',
			company: '',
		},
	})

	// Countdown timer for OTP resend
	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
			return () => clearTimeout(timer)
		}
	}, [countdown])

	// Send OTP function
	const sendOtp = async (phone: string) => {
		setIsSendingOtp(true)
		setOtpError('')

		try {
			// Extract phone number
			let phoneNumber = phone.replace(/\D+/g, '')
			if (phoneNumber.startsWith('966')) {
				phoneNumber = phoneNumber.substring(3)
			}

			const response = await fetch(
				'https://erp.wazen.sa/api/v1/new-crm/public-leads/send-verification-code',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						'X-Requested-With': 'XMLHttpRequest',
					},
					body: JSON.stringify({
						phone: phoneNumber,
						company_id: 801,
					}),
				},
			)

			let responseData: any = {}
			try {
				const text = await response.text()
				if (text) {
					responseData = JSON.parse(text)
				}
			} catch (parseError) {
				console.warn('⚠️ Could not parse OTP response as JSON:', parseError)
				responseData = { error: 'Invalid response from server' }
			}

			console.log('📥 OTP Send Response:', {
				status: response.status,
				statusText: response.statusText,
				data: responseData,
			})

			if (response.ok || response.status === 200 || response.status === 201) {
				setPhoneForOtp(phoneNumber)
				setIsOtpModalOpen(true)
				setCountdown(60) // 60 seconds countdown
				setOtpCode('')
				console.log('✅ OTP sent successfully')
			} else {
				throw new Error(
					responseData?.message || responseData?.error || locale === 'ar'
						? 'فشل إرسال رمز التحقق'
						: 'Failed to send OTP',
				)
			}
		} catch (error: any) {
			console.error('Error sending OTP:', error)
			setOtpError(
				error.message ||
					(locale === 'ar'
						? 'حدث خطأ أثناء إرسال رمز التحقق'
						: 'An error occurred while sending OTP'),
			)
		} finally {
			setIsSendingOtp(false)
		}
	}

	// Verify OTP function
	const verifyOtp = async () => {
		if (otpCode.length !== 4) {
			setOtpError(
				locale === 'ar'
					? 'الرجاء إدخال رمز التحقق المكون من 4 أرقام'
					: 'Please enter the 4-digit verification code',
			)
			return
		}

		setIsVerifyingOtp(true)
		setOtpError('')

		try {
			const response = await fetch(
				'https://erp.wazen.sa/api/v1/new-crm/public-leads/set-approved',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						'X-Requested-With': 'XMLHttpRequest',
					},
					body: JSON.stringify({
						phone: phoneForOtp,
						code: otpCode,
						company_id: 801,
					}),
				},
			)

			let responseData: any = {}
			try {
				const text = await response.text()
				if (text) {
					responseData = JSON.parse(text)
				}
			} catch (parseError) {
				console.warn(
					'⚠️ Could not parse OTP verification response as JSON:',
					parseError,
				)
				responseData = { error: 'Invalid response from server' }
			}

			console.log('📥 OTP Verify Response:', {
				status: response.status,
				statusText: response.statusText,
				data: responseData,
			})

			if (response.ok || response.status === 200 || response.status === 201) {
				setOtpVerified(true)
				setIsOtpModalOpen(false)
				// Show calendar modal after OTP verification
				// Pass skipOtpCheck=true to bypass OTP check since we just verified it
				const formData = form.getValues()
				onSubmit(formData, true)
				console.log('✅ OTP verified successfully, showing calendar...')
			} else {
				throw new Error(
					responseData?.message || responseData?.error || locale === 'ar'
						? 'رمز التحقق غير صحيح'
						: 'Invalid verification code',
				)
			}
		} catch (error: any) {
			console.error('Error verifying OTP:', error)
			setOtpError(
				error.message ||
					(locale === 'ar'
						? 'رمز التحقق غير صحيح'
						: 'Invalid verification code'),
			)
			setOtpCode('')
		} finally {
			setIsVerifyingOtp(false)
		}
	}

	const onSubmit = async (
		data: RequestDemoFormData,
		skipOtpCheck: boolean = false,
	) => {
		// Check if OTP is verified before submitting
		// Only skip OTP check if explicitly told to (e.g., after OTP verification)
		if (!skipOtpCheck) {
			if (!otpVerified) {
				console.log('📱 OTP not verified, sending OTP first...')
				// Send OTP first
				await sendOtp(data.phone)
				return
			}
		}

		// Final check: if OTP is not verified and we're not skipping the check, don't proceed
		if (!otpVerified && !skipOtpCheck) {
			console.error('❌ Cannot submit: OTP not verified')
			alert(
				locale === 'ar'
					? 'الرجاء التحقق من رقم الهاتف أولاً'
					: 'Please verify your phone number first',
			)
			return
		}

		console.log('✅ OTP verified, showing calendar...')
		// Show calendar modal before submitting
		setIsCalendarModalOpen(true)
		return
	}

	// Function to handle final submission after date/time selection
	const handleFinalSubmit = async (data: RequestDemoFormData) => {
		if (!selectedDate || !selectedTime) {
			alert(
				locale === 'ar'
					? 'الرجاء اختيار التاريخ والوقت'
					: 'Please select date and time',
			)
			return
		}

		setIsCalendarModalOpen(false)
		setIsSubmitting(true)
		try {
			// Extract phone number without country code
			let phoneNumber = data.phone.replace(/\D+/g, '')
			if (phoneNumber.startsWith('966')) {
				phoneNumber = phoneNumber.substring(3)
			}
			// Remove leading 0 if exists (05 -> 5)
			if (phoneNumber.startsWith('0')) {
				phoneNumber = phoneNumber.substring(1)
			}
			console.log('phoneNumber', phoneNumber, 'locale', locale)

			// Format date and time - use local date to avoid timezone issues
			const year = selectedDate.getFullYear()
			const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
			const day = String(selectedDate.getDate()).padStart(2, '0')
			const dateStr = `${year}-${month}-${day}` // YYYY-MM-DD
			const dateTimeStr = `${dateStr} ${selectedTime}:00` // YYYY-MM-DD HH:MM:SS

			// Prepare payload with all required fields
			const payload = {
				Lead_NmAr: locale === 'ar' || locale === 'en' ? data.fullName : '',
				Lead_Tel: phoneNumber,
				Lead_Cmp: data.company,
				Cmp_No: 801,
				Brn_No: 8101,
				stage_id: 9,
				Lead_status: 7,
				preferred_date: dateStr,
				preferred_time: selectedTime,
				contract_date: dateTimeStr,
			}

			const response = await fetch(
				'https://erp.wazen.sa/api/v1/new-crm/public-leads/request-demo',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						'X-Requested-With': 'XMLHttpRequest',
					},
					body: JSON.stringify(payload),
				},
			)

			// Try to parse response, but handle errors gracefully
			let responseData: any = {}
			let responseText = ''
			try {
				responseText = await response.text()
				console.log('📥 Raw Response Text:', responseText)
				if (responseText) {
					try {
						responseData = JSON.parse(responseText)
					} catch (parseError) {
						console.warn('⚠️ Could not parse response as JSON:', parseError)
						responseData = {
							error: responseText || 'Invalid response from server',
						}
					}
				}
			} catch (error) {
				console.error('❌ Error reading response:', error)
				responseData = { error: 'Failed to read response' }
			}

			// Log response
			console.log('📥 API Response:', {
				status: response.status,
				statusText: response.statusText,
				headers: Object.fromEntries(response.headers.entries()),
				data: responseData,
				rawText: responseText,
			})

			if (response.ok || response.status === 201 || response.status === 200) {
				setIsSubmitted(true)
				setOtpVerified(false)
				setSelectedDate(null)
				setSelectedTime('')
				form.reset()
				console.log('✅ Request demo successful!')
			} else {
				// Extract error message from response
				const errorMessage =
					responseData?.message ||
					responseData?.error ||
					responseData?.errors ||
					`Server error (${response.status}: ${response.statusText})`
				console.log('❌ Request demo failed:', errorMessage)
				throw new Error(errorMessage)
			}
		} catch (error: any) {
			console.error('❌ Error requesting demo:', error)

			// More detailed error message
			let errorMessage = error.message || 'يرجى المحاولة مرة أخرى'
			if (
				error.message?.includes('Failed to fetch') ||
				error.message?.includes('ERR_FAILED')
			) {
				errorMessage =
					locale === 'ar'
						? 'حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى'
						: 'Connection error. Please check your internet connection and try again'
			}

			alert(errorMessage)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className="section relative overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100/50 px-3 py-12 sm:px-4 sm:py-16 md:px-6 md:py-20 lg:px-8 lg:py-24 xl:px-12 xl:py-28">
			{/* Decorative background elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-teal-200/20 blur-3xl sm:-top-40 sm:-right-40 sm:h-80 sm:w-80" />
				<div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-cyan-200/20 blur-3xl sm:-bottom-40 sm:-left-40 sm:h-80 sm:w-80" />
			</div>

			<div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-3 text-center sm:gap-4 md:gap-5">
				{/* Pretitle Badge - Enhanced Design */}
				{pretitle && (
					<m.div
						className="group relative inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-teal-50 to-cyan-50 px-3 py-1.5 text-xs shadow-sm transition-all duration-300 hover:shadow-md sm:gap-2 sm:px-4 sm:py-2 md:gap-3 md:px-6 md:py-3 md:text-sm"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.3 }}
						variants={{
							hidden: { opacity: 0, scale: 0.9 },
							visible: {
								opacity: 1,
								scale: 1,
								transition: { duration: 0.5, ease: 'easeOut' },
							},
						}}
						whileHover={{
							scale: 1.05,
							transition: { duration: 0.3 },
						}}
					>
						{/* Animated dot */}
						<m.span
							className="relative flex size-2.5 items-center justify-center sm:size-3"
							animate={{
								scale: [1, 1.2, 1],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						>
							<span className="absolute size-2.5 rounded-full bg-teal-500 sm:size-3" />
							<span className="absolute size-2.5 animate-ping rounded-full bg-teal-400 opacity-75 sm:size-3" />
						</m.span>

						{/* Text */}
						<span className="text-small font-semibold text-teal-700 transition-colors duration-300 group-hover:text-teal-800">
							{pretitle}
						</span>

						{/* Decorative gradient */}
						<div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-100/50 via-transparent to-cyan-100/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					</m.div>
				)}

				{/* Title & Description - Modern Compact Design */}
				{(title || description) && (
					<m.div
						className="flex w-full max-w-3xl flex-col items-center gap-2 sm:gap-2.5 md:gap-3"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.3 }}
						variants={{
							hidden: { opacity: 0, y: 15 },
							visible: {
								opacity: 1,
								y: 0,
								transition: { duration: 0.5, ease: 'easeOut' },
							},
						}}
					>
						{/* Title */}
						{title && (
							<div className="w-full">
								<PortableText value={title} components={components} />
							</div>
						)}

						{/* Description */}
						{description && (
							<div className="w-full">
								<PortableText value={description} components={components} />
							</div>
						)}
					</m.div>
				)}

				{/* Request Demo Form */}
				{isSubmitted ? (
					<m.div
						className="flex w-full max-w-2xl flex-col items-center gap-3 rounded-xl bg-white p-6 shadow-xl sm:gap-4 sm:rounded-2xl sm:p-8"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
					>
						<div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg sm:size-16">
							<svg
								className="size-6 text-white sm:size-8"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<h3 className="text-base font-semibold text-cyan-950 sm:text-lg">
							{t.successMessage}
						</h3>
					</m.div>
				) : (
					<m.div
						className="w-full max-w-full sm:max-w-2xl md:max-w-3xl"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: false, amount: 0.3 }}
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: {
								opacity: 1,
								y: 0,
								transition: { duration: 0.6, delay: 0.3 },
							},
						}}
					>
						<form
							onSubmit={form.handleSubmit((data) => onSubmit(data, false))}
							className="group relative overflow-hidden rounded-2xl bg-white/90 p-5 shadow-xl backdrop-blur-xl transition-all duration-500 hover:shadow-2xl sm:rounded-3xl sm:p-6 md:p-8 lg:p-10"
							dir={isRTL ? 'rtl' : 'ltr'}
						>
							{/* Animated background gradient */}
							<div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-cyan-50/60 to-teal-100/40 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

							{/* Decorative corner accents */}
							<div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br from-teal-200/30 to-cyan-200/30 blur-3xl transition-all duration-700 group-hover:scale-150 sm:-top-20 sm:-right-20 sm:h-40 sm:w-40" />
							<div className="absolute -bottom-10 -left-10 h-20 w-20 rounded-full bg-gradient-to-tr from-cyan-200/30 to-teal-200/30 blur-3xl transition-all duration-700 group-hover:scale-150 sm:-bottom-20 sm:-left-20 sm:h-40 sm:w-40" />

							{/* Border gradient */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-200/0 via-teal-300/20 to-cyan-200/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-3xl" />

							{/* Form Content */}
							<div className="relative z-10 flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7">
								{/* Full Name and Company - Two columns */}
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
									{/* Full Name */}
									<m.div
										className="flex flex-col gap-2 sm:gap-3"
										initial="hidden"
										whileInView="visible"
										viewport={{ once: false }}
										variants={{
											hidden: { opacity: 0, x: isRTL ? 20 : -20 },
											visible: {
												opacity: 1,
												x: 0,
												transition: { duration: 0.5, delay: 0.4 },
											},
										}}
									>
										<label
											htmlFor="fullName"
											className="flex items-center gap-1.5 text-xs font-bold text-cyan-950 sm:gap-2 sm:text-sm"
										>
											<svg
												className="size-4 text-teal-600 sm:size-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/>
											</svg>
											{t.fullName}
										</label>
										<div className="relative">
											<Input
												id="fullName"
												type="text"
												placeholder={t.fullNamePlaceholder}
												dir={isRTL ? 'rtl' : 'ltr'}
												{...form.register('fullName')}
												className={cn(
													'h-12 w-full rounded-lg border-2 bg-white/80 pr-3 pl-10 text-sm transition-all duration-300 placeholder:text-gray-400 sm:h-14 sm:rounded-xl sm:pr-4 sm:pl-12 sm:text-base',
													isRTL && 'pr-10 pl-3 text-right sm:pr-12 sm:pl-4',
													form.formState.errors.fullName
														? 'border-red-400 bg-red-50/50 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-200'
														: 'border-gray-200 focus-visible:border-teal-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-teal-200',
												)}
											/>
											<div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 sm:left-4">
												<svg
													className="size-4 sm:size-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
													/>
												</svg>
											</div>
										</div>
										{form.formState.errors.fullName && (
											<m.p
												className="flex items-center gap-1 text-[10px] font-medium text-red-600 sm:gap-1.5 sm:text-xs"
												initial={{ opacity: 0, y: -5 }}
												animate={{ opacity: 1, y: 0 }}
											>
												<svg
													className="size-3 sm:size-4"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
														clipRule="evenodd"
													/>
												</svg>
												{form.formState.errors.fullName.message}
											</m.p>
										)}
									</m.div>

									{/* Company */}
									<m.div
										className="flex flex-col gap-2 sm:gap-3"
										initial="hidden"
										whileInView="visible"
										viewport={{ once: false }}
										variants={{
											hidden: { opacity: 0, x: isRTL ? -20 : 20 },
											visible: {
												opacity: 1,
												x: 0,
												transition: { duration: 0.5, delay: 0.5 },
											},
										}}
									>
										<label
											htmlFor="company"
											className="flex items-center gap-1.5 text-xs font-bold text-cyan-950 sm:gap-2 sm:text-sm"
										>
											<svg
												className="size-4 text-teal-600 sm:size-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
												/>
											</svg>
											{t.company}
										</label>
										<div className="relative">
											<Input
												id="company"
												type="text"
												placeholder={t.companyPlaceholder}
												dir={isRTL ? 'rtl' : 'ltr'}
												{...form.register('company')}
												className={cn(
													'h-12 w-full rounded-lg border-2 bg-white/80 pr-3 pl-10 text-sm transition-all duration-300 placeholder:text-gray-400 sm:h-14 sm:rounded-xl sm:pr-4 sm:pl-12 sm:text-base',
													isRTL && 'pr-10 pl-3 text-right sm:pr-12 sm:pl-4',
													form.formState.errors.company
														? 'border-red-400 bg-red-50/50 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-200'
														: 'border-gray-200 focus-visible:border-teal-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-teal-200',
												)}
											/>
											<div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 sm:left-4">
												<svg
													className="size-4 sm:size-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
													/>
												</svg>
											</div>
										</div>
										{form.formState.errors.company && (
											<m.p
												className="flex items-center gap-1 text-[10px] font-medium text-red-600 sm:gap-1.5 sm:text-xs"
												initial={{ opacity: 0, y: -5 }}
												animate={{ opacity: 1, y: 0 }}
											>
												<svg
													className="size-3 sm:size-4"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
														clipRule="evenodd"
													/>
												</svg>
												{form.formState.errors.company.message}
											</m.p>
										)}
									</m.div>
								</div>

								{/* Phone - Full width */}
								<m.div
									className="flex flex-col gap-1.5 sm:gap-2"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: false }}
									variants={{
										hidden: { opacity: 0, x: isRTL ? 20 : -20 },
										visible: {
											opacity: 1,
											x: 0,
											transition: { duration: 0.5, delay: 0.6 },
										},
									}}
								>
									<label
										htmlFor="phone"
										className="flex items-center gap-1.5 text-xs font-bold text-cyan-950 sm:gap-2 sm:text-sm"
									>
										<svg
											className="size-4 text-teal-600 sm:size-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
											/>
										</svg>
										{t.phone}
									</label>
									<div className="relative flex gap-2">
										<div className="relative flex-1">
											<Input
												id="phone"
												type="tel"
												placeholder={t.phonePlaceholder}
												dir={isRTL ? 'rtl' : 'ltr'}
												maxLength={10}
												inputMode="numeric"
												{...form.register('phone', {
													onChange: (e) => {
														// Only allow numbers
														let value = e.target.value.replace(/\D/g, '')

														// Limit to 10 digits
														value = value.slice(0, 10)

														// Update form value
														form.setValue('phone', value, {
															shouldValidate: true,
														})
													},
												})}
												className={cn(
													'h-12 w-full rounded-lg border-2 bg-white/80 pr-3 pl-10 text-sm transition-all duration-300 placeholder:text-gray-400 sm:h-14 sm:rounded-xl sm:pr-4 sm:pl-12 sm:text-base',
													isRTL && 'pr-10 pl-3 text-right sm:pr-12 sm:pl-4',
													form.formState.errors.phone
														? 'border-red-400 bg-red-50/50 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-200'
														: 'border-gray-200 focus-visible:border-teal-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-teal-200',
												)}
											/>
											<div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 sm:left-4">
												<svg
													className="size-4 sm:size-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
													/>
												</svg>
											</div>
										</div>
										<Button
											type="button"
											onClick={() => {
												const phoneValue = form.getValues('phone')
												if (
													phoneValue &&
													phoneValue.length === 10 &&
													phoneValue.startsWith('05')
												) {
													sendOtp(phoneValue)
												} else {
													form.setError('phone', {
														type: 'manual',
														message:
															locale === 'ar'
																? 'الرجاء إدخال رقم هاتف صحيح (10 أرقام تبدأ بـ 05)'
																: 'Please enter a valid phone number (10 digits starting with 05)',
													})
												}
											}}
											disabled={isSendingOtp || countdown > 0}
											className="h-12 shrink-0 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 px-4 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:from-teal-700 hover:to-cyan-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:rounded-xl sm:px-6 sm:text-sm"
										>
											{isSendingOtp ? (
												<svg
													className="size-4 animate-spin sm:size-5"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													/>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													/>
												</svg>
											) : countdown > 0 ? (
												`${countdown}s`
											) : (
												t.sendOtp
											)}
										</Button>
									</div>
									{form.formState.errors.phone && (
										<m.p
											className="flex items-center gap-1 text-[10px] font-medium text-red-600 sm:gap-1.5 sm:text-xs"
											initial={{ opacity: 0, y: -5 }}
											animate={{ opacity: 1, y: 0 }}
										>
											<svg
												className="size-3 sm:size-4"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													fillRule="evenodd"
													d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
													clipRule="evenodd"
												/>
											</svg>
											{form.formState.errors.phone.message}
										</m.p>
									)}
								</m.div>

								{/* Submit Button */}
								<m.div
									className="mt-2 flex justify-center sm:mt-3 md:mt-4"
									initial="hidden"
									whileInView="visible"
									viewport={{ once: false }}
									variants={{
										hidden: { opacity: 0, y: 20 },
										visible: {
											opacity: 1,
											y: 0,
											transition: { duration: 0.5, delay: 0.7 },
										},
									}}
								>
									<m.button
										type="submit"
										disabled={isSubmitting}
										className="group relative h-10 w-auto overflow-hidden rounded-lg bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 px-6 text-xs font-bold text-white shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:rounded-xl sm:px-8 sm:text-sm"
										whileHover={{
											scale: 1.05,
											boxShadow: '0 10px 25px -5px rgba(20, 184, 166, 0.4)',
											transition: { duration: 0.2 },
										}}
										whileTap={{
											scale: 0.98,
											transition: { duration: 0.1 },
										}}
										animate={{
											boxShadow: [
												'0 4px 6px -1px rgba(20, 184, 166, 0.2)',
												'0 10px 25px -5px rgba(20, 184, 166, 0.4)',
												'0 4px 6px -1px rgba(20, 184, 166, 0.2)',
											],
											transition: {
												duration: 2,
												repeat: Infinity,
												ease: 'easeInOut',
											},
										}}
									>
										{/* Animated gradient background */}
										<span className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-teal-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

										{/* Ripple effect */}
										<span className="absolute inset-0 scale-0 rounded-lg bg-white/20 opacity-0 transition-all duration-500 group-active:scale-100 group-active:opacity-100" />

										{/* Button content */}
										<span className="relative z-10 flex items-center justify-center gap-2">
											{isSubmitting ? (
												<>
													<svg
														className="size-4 animate-spin sm:size-5"
														fill="none"
														viewBox="0 0 24 24"
													>
														<circle
															className="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="4"
														/>
														<path
															className="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
														/>
													</svg>
													<span className="transition-all duration-300 group-hover:translate-x-1">
														{t.submitting}
													</span>
												</>
											) : (
												<>
													<span className="transition-all duration-300 group-hover:translate-x-1">
														{t.buttonText}
													</span>
													<svg
														className="size-4 transition-all duration-300 group-hover:translate-x-1 sm:size-5"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M13 7l5 5m0 0l-5 5m5-5H6"
														/>
													</svg>
												</>
											)}
										</span>
									</m.button>
								</m.div>
							</div>
						</form>
					</m.div>
				)}
			</div>

			{/* OTP Verification Dialog */}
			<Dialog open={isOtpModalOpen} onOpenChange={setIsOtpModalOpen}>
				<DialogContent
					className="max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
					dir={isRTL ? 'rtl' : 'ltr'}
				>
					<DialogHeader className="mb-6">
						<DialogTitle className="text-xl font-bold text-cyan-950 sm:text-2xl">
							{t.otpTitle}
						</DialogTitle>
						<DialogDescription className="text-sm text-gray-600 sm:text-base">
							{t.otpDescription}
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-4">
						{/* OTP Input */}
						<div className="flex flex-col gap-2">
							<label
								htmlFor="otp"
								className="text-sm font-semibold text-cyan-950 sm:text-base"
							>
								{t.otpPlaceholder}
							</label>
							<Input
								id="otp"
								type="text"
								inputMode="numeric"
								maxLength={4}
								value={otpCode}
								onChange={(e) => {
									const value = e.target.value.replace(/\D/g, '').slice(0, 4)
									setOtpCode(value)
									setOtpError('')
									// Auto-verify when 4 digits are entered
									if (value.length === 4) {
										setTimeout(() => verifyOtp(), 300)
									}
								}}
								placeholder="0000"
								dir="ltr"
								className={cn(
									'h-14 w-full rounded-xl border-2 bg-white text-center text-2xl font-bold tracking-widest transition-all duration-300 placeholder:text-gray-300 sm:h-16 sm:text-3xl',
									otpError
										? 'border-red-400 bg-red-50/50 focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-200'
										: 'border-gray-200 focus-visible:border-teal-500 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-teal-200',
								)}
							/>
							{otpError && (
								<m.p
									className="flex items-center gap-1.5 text-xs font-medium text-red-600 sm:text-sm"
									initial={{ opacity: 0, y: -5 }}
									animate={{ opacity: 1, y: 0 }}
								>
									<svg
										className="size-4"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
											clipRule="evenodd"
										/>
									</svg>
									{otpError}
								</m.p>
							)}
						</div>

						{/* Resend OTP */}
						<div className="flex items-center justify-center gap-2 text-sm text-gray-600">
							{countdown > 0 ? (
								<span>
									{t.resendIn} {countdown} {t.seconds}
								</span>
							) : (
								<button
									type="button"
									onClick={() => {
										const phoneValue = form.getValues('phone')
										if (phoneValue) {
											sendOtp(phoneValue)
										}
									}}
									disabled={isSendingOtp}
									className="font-semibold text-teal-600 transition-colors duration-300 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
								>
									{t.resendOtp}
								</button>
							)}
						</div>

						{/* Verify Button */}
						<Button
							type="button"
							onClick={verifyOtp}
							disabled={isVerifyingOtp || otpCode.length !== 4}
							className="h-12 w-full rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 font-semibold text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-cyan-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isVerifyingOtp ? (
								<>
									<svg
										className="mr-2 size-4 animate-spin"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									{locale === 'ar' ? 'جاري التحقق...' : 'Verifying...'}
								</>
							) : (
								t.verifyOtp
							)}
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			{/* Calendar Selection Dialog */}
			<Dialog open={isCalendarModalOpen} onOpenChange={setIsCalendarModalOpen}>
				<DialogContent
					className="max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
					dir={isRTL ? 'rtl' : 'ltr'}
				>
					<DialogHeader className="mb-6">
						<DialogTitle className="text-xl font-bold text-cyan-950 sm:text-2xl">
							{t.selectDate}
						</DialogTitle>
						<DialogDescription className="text-sm text-gray-600 sm:text-base">
							{t.selectDateDescription}
						</DialogDescription>
					</DialogHeader>

					<div className="flex flex-col gap-6">
						{/* Calendar */}
						<div className="flex flex-col gap-3">
							<label className="text-sm font-semibold text-cyan-950 sm:text-base">
								{locale === 'ar' ? 'اختر التاريخ' : 'Select Date'}
							</label>
							<div className="rounded-lg border-2 border-gray-200 p-4">
								{/* Custom Date Picker: Day, Month, Year */}
								<div className="flex flex-row gap-2 sm:gap-3">
									{/* Day Select */}
									<select
										value={selectedDay}
										onChange={(e) => {
											const newDay = e.target.value
											setSelectedDay(newDay)

											if (newDay && selectedMonth && selectedYear) {
												const day = Number(newDay)
												const month = Number(selectedMonth)
												const year = Number(selectedYear)
												const date = new Date(year, month - 1, day, 12, 0, 0)

												// Check if date is in the past
												const today = new Date()
												today.setHours(0, 0, 0, 0)
												if (date < today) {
													alert(
														locale === 'ar'
															? 'لا يمكن اختيار تاريخ في الماضي'
															: 'Cannot select a date in the past',
													)
													setSelectedDay('')
													setSelectedDate(null)
													setSelectedTime('')
													return
												}

												const dayOfWeek = date.getDay()

												if (dayOfWeek === 5 || dayOfWeek === 6) {
													alert(
														locale === 'ar'
															? 'الجمعة والسبت غير متاحين. يرجى اختيار يوم آخر'
															: 'Friday and Saturday are not available. Please select another day',
													)
													setSelectedDay('')
													setSelectedDate(null)
													setSelectedTime('')
													return
												}

												setSelectedDate(date)
												setSelectedTime('')
											}
										}}
										className="flex-1 rounded-lg border-2 border-gray-200 p-3 text-sm transition-all duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none sm:text-base"
									>
										<option value="">
											{locale === 'ar' ? 'اليوم' : 'Day'}
										</option>
										{Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
											<option key={day} value={day}>
												{String(day).padStart(2, '0')}
											</option>
										))}
									</select>

									{/* Month Select */}
									<select
										value={selectedMonth}
										onChange={(e) => {
											const newMonth = e.target.value
											setSelectedMonth(newMonth)
											setSelectedDay('') // Reset day when month changes
											setSelectedDate(null)
											setSelectedTime('')

											if (newMonth && selectedDay && selectedYear) {
												const day = Number(selectedDay)
												const month = Number(newMonth)
												const year = Number(selectedYear)
												const date = new Date(year, month - 1, day, 12, 0, 0)

												// Check if date is in the past
												const today = new Date()
												today.setHours(0, 0, 0, 0)
												if (date < today) {
													alert(
														locale === 'ar'
															? 'لا يمكن اختيار تاريخ في الماضي'
															: 'Cannot select a date in the past',
													)
													setSelectedDay('')
													setSelectedDate(null)
													setSelectedTime('')
													return
												}

												const dayOfWeek = date.getDay()

												if (dayOfWeek === 5 || dayOfWeek === 6) {
													alert(
														locale === 'ar'
															? 'الجمعة والسبت غير متاحين. يرجى اختيار يوم آخر'
															: 'Friday and Saturday are not available. Please select another day',
													)
													setSelectedDay('')
													setSelectedDate(null)
													setSelectedTime('')
													return
												}

												setSelectedDate(date)
												setSelectedTime('')
											}
										}}
										className="flex-1 rounded-lg border-2 border-gray-200 p-3 text-sm transition-all duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none sm:text-base"
									>
										<option value="">
											{locale === 'ar' ? 'الشهر' : 'Month'}
										</option>
										{Array.from({ length: 12 }, (_, i) => i + 1).map(
											(month) => (
												<option key={month} value={month}>
													{locale === 'ar'
														? new Date(2000, month - 1, 1).toLocaleDateString(
																'ar-SA',
																{
																	month: 'long',
																},
															)
														: new Date(2000, month - 1, 1).toLocaleDateString(
																'en-US',
																{
																	month: 'long',
																},
															)}
												</option>
											),
										)}
									</select>

									{/* Year Select */}
									<select
										value={selectedYear}
										onChange={(e) => {
											const newYear = e.target.value
											setSelectedYear(newYear)
											setSelectedDay('') // Reset day when year changes
											setSelectedDate(null)
											setSelectedTime('')

											if (newYear && selectedDay && selectedMonth) {
												const day = Number(selectedDay)
												const month = Number(selectedMonth)
												const year = Number(newYear)
												const date = new Date(year, month - 1, day, 12, 0, 0)

												// Check if date is in the past
												const today = new Date()
												today.setHours(0, 0, 0, 0)
												if (date < today) {
													alert(
														locale === 'ar'
															? 'لا يمكن اختيار تاريخ في الماضي'
															: 'Cannot select a date in the past',
													)
													setSelectedDay('')
													setSelectedDate(null)
													setSelectedTime('')
													return
												}

												const dayOfWeek = date.getDay()

												if (dayOfWeek === 5 || dayOfWeek === 6) {
													alert(
														locale === 'ar'
															? 'الجمعة والسبت غير متاحين. يرجى اختيار يوم آخر'
															: 'Friday and Saturday are not available. Please select another day',
													)
													setSelectedDay('')
													setSelectedDate(null)
													setSelectedTime('')
													return
												}

												setSelectedDate(date)
												setSelectedTime('')
											}
										}}
										className="flex-1 rounded-lg border-2 border-gray-200 p-3 text-sm transition-all duration-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none sm:text-base"
									>
										<option value="">
											{locale === 'ar' ? 'السنة' : 'Year'}
										</option>
										{Array.from(
											{ length: 5 },
											(_, i) => new Date().getFullYear() + i,
										).map((year) => (
											<option key={year} value={year}>
												{year}
											</option>
										))}
									</select>
								</div>
								{/* {selectedDate && (
									<p className="mt-2 text-xs text-gray-600 sm:text-sm">
										{locale === 'ar'
											? `تم اختيار: ${selectedDate.toLocaleDateString('ar-SA', {
													weekday: 'long',
													year: 'numeric',
													month: 'long',
													day: 'numeric',
													timeZone: 'Asia/Riyadh',
												})}`
											: `Selected: ${selectedDate.toLocaleDateString('en-US', {
													weekday: 'long',
													year: 'numeric',
													month: 'long',
													day: 'numeric',
													timeZone: 'Asia/Riyadh',
												})}`}
									</p>
								)} */}
							</div>
						</div>

						{/* Time Selection */}
						{selectedDate && (
							<div className="flex flex-col gap-3">
								<label className="text-sm font-semibold text-cyan-950 sm:text-base">
									{t.selectTime}
								</label>
								<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
									{Array.from({ length: 9 }, (_, i) => {
										const hour = 10 + i // 10 AM to 6 PM
										const timeStr = `${hour.toString().padStart(2, '0')}:00`
										return (
											<button
												key={timeStr}
												type="button"
												onClick={() => setSelectedTime(timeStr)}
												className={cn(
													'rounded-lg border-2 p-3 text-sm font-semibold transition-all duration-300 sm:p-4 sm:text-base',
													selectedTime === timeStr
														? 'border-teal-500 bg-teal-50 text-teal-700 shadow-md'
														: 'border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50/50',
												)}
											>
												{timeStr}
											</button>
										)
									})}
								</div>
							</div>
						)}

						{/* Action Buttons */}
						<div className="flex gap-3">
							<Button
								type="button"
								variant="outline"
								onClick={() => {
									setIsCalendarModalOpen(false)
									setSelectedDate(null)
									setSelectedTime('')
								}}
								className="flex-1 rounded-xl border-2 border-gray-200 font-semibold transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
							>
								{t.cancel}
							</Button>
							<Button
								type="button"
								onClick={() => {
									if (!selectedDate) {
										alert(t.dateRequired)
										return
									}
									if (!selectedTime) {
										alert(t.timeRequired)
										return
									}
									const formData = form.getValues()
									handleFinalSubmit(formData)
								}}
								disabled={!selectedDate || !selectedTime}
								className="flex-1 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 font-semibold text-white shadow-lg transition-all duration-300 hover:from-teal-700 hover:to-cyan-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
							>
								{t.confirm}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</section>
	)
}
