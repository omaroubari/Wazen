'use client'

import { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import { PortableText } from '@portabletext/react'
import { useEffect } from 'react'

type JobTab = {
	label: string
	sublabel?: string
	type: 'form' | 'text'
	mainTitle?: string
	subtitle?: string
	introText?: any
	description?: any
	requirements?: any
	benefits?: any
	button?: {
		text?: string
		link?: string
	}
	seats?: number
	addedDate?: string
}

export default function JobApplicationTabs({
	title,
	subtitle,
	tabs,
}: {
	title: string
	subtitle?: string
	tabs: JobTab[]
}) {
	const [activeTab, setActiveTab] = useState(0)
	const [expanded, setExpanded] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [step, setStep] = useState(1)
	const [successMessage, setSuccessMessage] = useState<string>('')
	interface SelectOption {
		id: string | number
		name: string
	}

	interface CountryOption {
		Cntry_No: string | number
		Cntry_NmAr: string
	}

	interface CityOption {
		id: string | number
		City_NmAr: string
	}

	const [gender, setGender] = useState<SelectOption[]>([])
	const [idType, setIdType] = useState<SelectOption[]>([])
	const [astCountry, setAstCountry] = useState<CountryOption[]>([])
	const [astCity, setAstCity] = useState<CityOption[]>([])
	const [formData, setFormData] = useState({
		Cmp_No: '801',
		Seeker_NmAr: '',
		Birth_Dt: '',
		id_type: '',
		Gender: '',
		Nation_No: '',
		country_of_residence: '',
		Age: '',
		Phone1: '',
		Specialization_Name: '',
		National_ID: '',
		Email: '',
		educational_qualification: '',
		City_No: '',
		notes: '',
	})
	const [apiErrors, setApiErrors] = useState<{ [key: string]: string }>({})
	const [mainError, setMainError] = useState<string>('')
	const [file, setFile] = useState<File | null>(null)
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
		setApiErrors((prev) => ({ ...prev, [e.target.name]: '' }))
		setMainError('')
		// Keep success message visible until new form submission
		// setSuccessMessage('')
	}

	// عند اختيار ملف
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0])
			// Clear file error when a new file is selected
			setApiErrors((prev) => ({ ...prev, file: '' }))
		}
	}
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://erp.wazen.sa/api/v1/emp/init-data',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ Cmp_No: 801 }),
					},
				)

				if (!response.ok) {
					throw new Error('حدث خطأ أثناء جلب البيانات من السيرفر')
				}

				const data = await response.json()
				console.log('Fetched Data:', data)
				setGender(data.gender || [])
				setIdType(data.idType || [])
				setAstCountry(data.astCountry || [])
				setAstCity(data.astCity || [])
			} catch (err) {
				console.error('Error fetching data:', err)
			} finally {
				console.log('Data fetch attempt finished.')
			}
		}

		fetchData()
	}, [])
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const form = new FormData()
			Object.entries(formData).forEach(([key, value]) => {
				form.append(key, value)
			})
			if (file) form.append('file', file)

			const response = await fetch(
				'https://erp.wazen.sa/api/v1/emp/set-new-seeker',
				{
					method: 'POST',
					body: form,
				},
			)

			const data = await response.json()

			if (response.ok) {
				console.log('Response Data:', data)
				if (data.status === 200 && data.message) {
					console.log('Setting success message:', data.message)
					setSuccessMessage(data.message)
					setApiErrors({})
					setMainError('')
					// Reset form data
					setFormData({
						Cmp_No: '801',
						Seeker_NmAr: '',
						Birth_Dt: '',
						id_type: '',
						Gender: '',
						Nation_No: '',
						country_of_residence: '',
						Age: '',
						Phone1: '',
						Specialization_Name: '',
						National_ID: '',
						Email: '',
						educational_qualification: '',
						City_No: '',
						notes: '',
					})
					// Reset file input
					setFile(null)
					// Clear success message after 5 seconds
					setTimeout(() => {
						setSuccessMessage('')
					}, 5000)
				} else if (data.status === 400) {
					// Handle known validation messages
					const fieldErrors: { [key: string]: string } = {}
					if (data.message.includes('الاسم الثلاثي'))
						fieldErrors.Seeker_NmAr = data.message
					if (data.message.includes('رقم الهوية'))
						fieldErrors.National_ID = data.message
					if (data.message.includes('التخصص'))
						fieldErrors.Specialization_Name = data.message
					if (
						data.message.includes('رقم الجوال') ||
						data.message.includes('رقما')
					) {
						fieldErrors.Phone1 = data.message
					}
					if (data.message.includes('البريد الإلكتروني'))
						fieldErrors.Email = data.message
					if (data.message.includes('الجنسية'))
						fieldErrors.Nation_No = data.message

					if (
						data.message.includes('حجم الملف يجب أن لا يتجاوز 5 ميجابايت') ||
						data.message.includes('السيرة الذاتية')
					) {
						fieldErrors.file = data.message
					}
					if (data.message.includes('الجنس')) fieldErrors.Gender = data.message
					if (data.message.includes('تاريخ الميلاد'))
						fieldErrors.Birth_Dt = data.message
					setApiErrors(fieldErrors)
					setMainError('')
					setSuccessMessage('')
				}
			} else {
				console.error('Error Response Data:', data)
			}
		} catch (error) {
			console.error('Submission Error:', error)
		} finally {
			console.log('Form submission attempt finished.')
		}
	}
	return (
		<main id="main-content" className="font-[Cairo]">
			<section
				className="pt-12 md:pt-16 lg:pt-28"
				style={{
					backgroundImage: `
        linear-gradient(transparent, white),
        radial-gradient(at center top, rgb(21, 94, 117) 0%, rgb(45, 212, 191) 60%, rgb(255, 255, 255) 100%)
      `,
				}}
			>
				<div className="2xl:max-w-8xl container mx-auto max-w-7xl px-3 sm:px-4 md:px-6 xl:px-8">
					{(title || subtitle) && (
						<div className="mb-8 text-center md:mb-10">
							{title && (
								<h1 className="h1 mx-auto max-w-4xl text-2xl text-balance text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl ltr:leading-tight rtl:leading-snug">
									{title}
								</h1>
							)}
							{subtitle && (
								<p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-gray-800 sm:text-base md:text-lg xl:text-xl">
									{subtitle}
								</p>
							)}
						</div>
					)}

					{/* الشبكة الرئيسية */}
					<div className="grid grid-cols-1 gap-6 rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:grid-cols-[1fr_2.5fr] xl:grid-cols-[1fr_3fr]">
						{/* التابات الجانبية */}
						<aside className="flex flex-col gap-3 lg:sticky lg:top-6 lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto">
							{tabs.map((tab, idx) => {
								const isFirst = idx === 0
								const isActive = activeTab === idx

								let buttonClass =
									'border border-gray-200 bg-white hover:bg-gray-50 text-[#170F49]'
								if (isFirst) {
									buttonClass =
										'border-transparent bg-gradient-to-l from-[#02B6BE] to-[#5FC19C] text-white shadow-md'
								} else if (isActive) {
									buttonClass =
										'border-2 border-[#2DD4BF] bg-white shadow-md text-[#170F49]'
								}

								const getTimeAgo = (dateString: string) => {
									if (!dateString) return ''
									const now = new Date()
									const added = new Date(dateString)
									const diffDays = Math.floor(
										(now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24),
									)
									if (diffDays === 0) return 'اليوم'
									if (diffDays === 1) return 'منذ يوم'
									if (diffDays === 2) return 'منذ يومين'
									if (diffDays < 7) return `منذ ${diffDays} أيام`
									const diffWeeks = Math.floor(diffDays / 7)
									if (diffWeeks === 1) return 'منذ أسبوع'
									return `منذ ${diffWeeks} أسابيع`
								}

								return (
									<button
										key={idx}
										onClick={() => {
											setActiveTab(idx)
											setExpanded(false)
										}}
										className={`rounded-xl px-3 py-3 text-right text-sm font-semibold transition-all sm:px-4 sm:text-base ${buttonClass}`}
									>
										<div className="flex flex-col">
											{!isFirst && (
												<div className="mb-2 flex items-center justify-between">
													<div className="flex items-center gap-2">
														<div className="h-5 w-5 rounded-full bg-[#2DD4BF] sm:h-6 sm:w-6"></div>
														<span className="font-['Rubik'] text-xs text-[#8C8F8E] sm:text-sm">
															وازن المالية
														</span>
													</div>

													{tab.seats && (
														<span className="font-[Rubik] text-xs text-[#363938]">
															{tab.seats}{' '}
															{tab.seats === 1
																? 'وظيفة'
																: tab.seats <= 10
																	? 'وظائف'
																	: 'وظيفة'}
														</span>
													)}
												</div>
											)}

											{/* 🔹 العنوان الرئيسي */}
											<div
												className={`flex items-center justify-between ${
													!isFirst ? 'mb-2' : ''
												}`}
											>
												<span className="text-right font-[Cairo] text-[24px] leading-[46px] font-bold text-[#170F49]">
													{tab.label}
												</span>

												{/* 🟢 الزر في التاب الأول فقط */}
												{isFirst && tab.button?.text && (
													<a
														href="#"
														className="inline-flex items-center justify-center gap-1 rounded-full border border-white px-4 py-1.5 font-[Cairo] text-[10px] font-bold text-white transition hover:bg-white hover:text-[#155E75]"
													>
														{tab.button.text}
													</a>
												)}
											</div>

											{tab.sublabel && (
												<span className="text-right text-xs text-[#3F3F3F] sm:text-sm">
													{tab.sublabel}
												</span>
											)}

											{!isFirst && tab.button?.text && (
												<div className="mt-3 flex items-center justify-between">
													<a
														href="#"
														className="inline-flex items-center justify-center gap-1 rounded-full border border-[#2DD4BF] px-3 py-1.5 text-xs font-bold text-[#2DD4BF] transition hover:bg-[#2DD4BF] hover:text-white sm:px-4 sm:text-sm"
													>
														{tab.button.text}
													</a>

													{tab.addedDate && (
														<span className="hidden items-center gap-1 text-xs text-[#6B7280] sm:flex">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={1.8}
																stroke="currentColor"
																className="h-4 w-4 text-[#2DD4BF]"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
																/>
															</svg>
															{getTimeAgo(tab.addedDate)}
														</span>
													)}
												</div>
											)}
										</div>
									</button>
								)
							})}
						</aside>

						{/* المحتوى */}
						<div className="rounded-xl border border-gray-100 bg-white p-4 text-right shadow-inner transition-all sm:p-6">
							{/* === نموذج التقديم === */}
							{tabs[activeTab].type === 'form' ? (
								<section className="mx-auto max-w-5xl transition-all duration-500">
									<div className="mb-8 flex items-start justify-between">
										{/* ✅ القسم الأيسر: شعار وازن + العنوان والنص */}
										<div className="flex flex-col items-start gap-4">
											<div className="flex items-center gap-2">
												<div className="h-8 w-8 rounded-full bg-[#2DD4BF]"></div>

												<span className="font-['Rubik'] text-[20px] font-[14px] text-[#2DD4BF]">
													وازن المالية
												</span>
											</div>

											{/* 👇 النصوص أسفل وازن المالية */}
											<div className="text-right">
												<h2 className="mb-1 text-3xl font-bold text-[#170F49]">
													فرص جديدة بانتظارك
												</h2>
												<p className="text-gray-600">
													نسعى دوماً في وازن باستقطاب الطاقات التي تؤمن بالتطوير
													المستمر وتمتلك شغف التغيير.
												</p>
											</div>
										</div>

										{/* ✅ الأزرار في الجهة اليمنى */}
										<div className="flex flex-col items-end gap-3">
											{/* 🔘 زر التكبير */}
											<button
												onClick={() => setExpanded(!expanded)}
												className={`rounded-md p-2 shadow-md transition ${
													expanded
														? 'bg-[#2DD4BF] text-white hover:bg-[#14b8a6]'
														: 'bg-white text-gray-700 hover:bg-gray-100'
												}`}
												title={expanded ? 'تصغير' : 'تكبير'}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="h-5 w-5"
												>
													{expanded ? (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M20 12H4"
														/>
													) : (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M4 8V4h4M4 16v4h4m12-12V4h-4m4 12v4h-4"
														/>
													)}
												</svg>
											</button>
											<button
												type="submit"
												form="jobApplyForm"
												className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#02B6BE] to-[#5FC19C] px-8 py-3 font-['Rubik'] text-[16px] leading-[120%] font-[600] tracking-[0%] text-[#000C06] shadow-sm transition hover:opacity-90"
											>
												إرسال الطلب
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="h-5 w-5 text-[#000C06]"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M13 10V3L4 14h7v7l9-11h-7z"
													/>
												</svg>
											</button>
											{/* ⚡ زر إرسال الطلب */}
										</div>
									</div>

									<div className="mb-6 flex border-b border-gray-200">
										<button className="border-b-2 border-[#2DD4BF] px-4 pb-2 text-lg font-bold text-[#2DD4BF]">
											البيانات الأساسية
										</button>
										{/* <button className="px-4 pb-2 text-lg font-semibold text-gray-400">
											المرفقات
										</button> */}
									</div>
									{/* ✅ المحتوى القابل للتمدد فقط */}
									<div
										className={`transition-all duration-700 ease-in-out ${
											expanded
												? 'max-h-[4000px] opacity-100'
												: 'max-h-[700px] overflow-hidden opacity-100'
										}`}
									>
										{successMessage && (
											<div className="fixed top-0 right-0 left-0 z-50 mx-auto max-w-2xl rounded-b-lg border border-green-300 bg-green-100 px-4 py-3 text-center font-bold text-green-800 shadow-lg">
												{successMessage}
											</div>
										)}
										<form
											id="jobApplyForm"
											onSubmit={handleSubmit}
											className="grid grid-cols-1 gap-6 p-4 text-right sm:grid-cols-2 sm:p-6 md:p-8 lg:grid-cols-3 xl:gap-8"
										>
											{/* الاسم بالكامل */}
											<div>
												<label className="mb-1 block font-semibold text-gray-700">
													الاسم بالكامل
												</label>
												<input
													type="text"
													name="Seeker_NmAr"
													value={formData.Seeker_NmAr}
													onChange={handleChange}
													placeholder="حسام محمد"
													className={`w-full rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF] ${apiErrors?.Seeker_NmAr ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Seeker_NmAr}
												/>
												{apiErrors?.Seeker_NmAr && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.Seeker_NmAr}
													</div>
												)}
											</div>

											{/* تاريخ الميلاد */}
											<div>
												<label className="mb-1 block font-semibold text-gray-700">
													تاريخ الميلاد
												</label>
												<input
													type="date"
													name="Birth_Dt"
													value={formData.Birth_Dt}
													onChange={handleChange}
													placeholder="5-8-1996"
													className={`w-full rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF] ${apiErrors?.Birth_Dt ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Birth_Dt}
												/>
												{apiErrors?.Birth_Dt && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.Birth_Dt}
													</div>
												)}
											</div>

											{/* النوع */}
											<div>
												<label className="mb-1 block font-semibold text-gray-700">
													النوع
												</label>
												<select
													name="Gender"
													value={formData.Gender}
													onChange={handleChange}
													className={`w-full rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF] ${apiErrors?.Gender ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Gender}
												>
													<option value="">اختر النوع</option>
													{gender.map((item) => (
														<option key={item.id} value={item.id}>
															{item.name}
														</option>
													))}
												</select>

												{apiErrors?.Gender && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.Gender}
													</div>
												)}
											</div>
											{/* بلد الاقامة */}
											<div>
												<label className="mb-1 block font-semibold text-gray-700">
													بلد الاقامة{' '}
												</label>
												<select
													name="country_of_residence"
													value={formData.country_of_residence}
													onChange={handleChange}
													className="w-full rounded-lg border border-gray-200 bg-white p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
												>
													<option value="">اختر الدولة</option>
													{astCountry.map((country) => (
														<option
															key={country.Cntry_No}
															value={country.Cntry_No}
														>
															{country.Cntry_NmAr}
														</option>
													))}
												</select>
											</div>

											{/* المدينة */}
											<div>
												<label className="mb-1 block font-semibold text-gray-700">
													المدينة
												</label>
												<select
													name="City_No"
													value={formData.City_No}
													onChange={handleChange}
													className="w-full rounded-lg border border-gray-200 bg-white p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
												>
													<option value="">اختر المدينة</option>
													{astCity.map((city) => (
														<option key={city.id} value={city.id}>
															{city.City_NmAr}
														</option>
													))}
												</select>
											</div>

											{/* العمر */}
											<div>
												<label className="mb-1 block font-semibold text-gray-700">
													العمر
												</label>
												<input
													name="Age"
													value={formData.Age}
													onChange={handleChange}
													type="number"
													placeholder="30 عاماً"
													className={`w-full rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF] ${apiErrors?.Age ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Age}
												/>
												{apiErrors?.Age && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.Age}
													</div>
												)}
											</div>

											{/* رقم الهاتف */}
											<div>
												<label className="mb-1 block font-semibold text-gray-700">
													رقم الهاتف
												</label>
												<input
													type="text"
													name="Phone1"
													value={formData.Phone1}
													onChange={handleChange}
													placeholder="51236789"
													className={`w-full rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF] ${apiErrors?.Phone1 ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Phone1}
												/>
												{apiErrors?.Phone1 && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.Phone1}
													</div>
												)}
											</div>

											{/* 6التخصص */}
											<div>
												<label className="mb-1 block font-semibold text-gray-700">
													التخصص
												</label>
												<input
													name="Specialization_Name"
													value={formData.Specialization_Name}
													onChange={handleChange}
													type="text"
													placeholder="محلل بيانات"
													className={`w-full rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF] ${apiErrors?.Specialization_Name ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Specialization_Name}
												/>
												{apiErrors?.Specialization_Name && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.Specialization_Name}
													</div>
												)}
											</div>

											{/* الجنسية */}
											<div>
												<label className="mb-1 block font-semibold text-gray-700">
													الجنسية
												</label>
												<select
													name="Nation_No"
													onChange={handleChange}
													value={formData.Nation_No}
													className="w-full rounded-lg border border-gray-200 bg-white p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
												>
													<option value="">اختر الدولة</option>
													{astCountry.map((country) => (
														<option
															key={country.Cntry_No}
															value={country.Cntry_No}
														>
															{country.Cntry_NmAr}
														</option>
													))}
												</select>
											</div>

											{/* نوع الهوية */}
											<div>
												<label className="mb-1 block font-semibold text-gray-700">
													نوع الهوية (اختياري)
												</label>
												<select
													name="id_type"
													onChange={handleChange}
													value={formData.id_type}
													className="w-full rounded-lg border border-gray-200 bg-white p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF]"
												>
													<option value="">اختر نوع الهوية</option>

													{/* ✅ عرض البيانات القادمة من السيرفر */}
													{idType.map((type) => (
														<option key={type.id} value={type.id}>
															{type.name}
														</option>
													))}
												</select>
											</div>

											{/* رقم الهوية */}
											<div>
												<label className="mb-1 block font-semibold text-gray-700">
													رقم الهوية (اختياري)
												</label>
												<input
													type="text"
													name="National_ID"
													value={formData.National_ID}
													onChange={handleChange}
													placeholder="1234567890"
													className={`w-full rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF] ${apiErrors?.National_ID ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.National_ID}
												/>
												{apiErrors?.National_ID && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.National_ID}
													</div>
												)}
											</div>

											{/* البريد الإلكتروني */}
											<div>
												<label className="mb-1 block font-semibold text-gray-700">
													البريد الإلكتروني
												</label>
												<input
													type="email"
													name="Email"
													value={formData.Email}
													onChange={handleChange}
													placeholder="Hossam@example.com"
													className={`w-full rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-[#2DD4BF] ${apiErrors?.Email ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Email}
												/>
												{apiErrors?.Email && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.Email}
													</div>
												)}
											</div>

											{/* ✅ قسم رفع الملفات */}
											<div className="col-span-1 mt-12 w-full sm:col-span-2 lg:col-span-3">
												<h3 className="mb-4 text-right text-2xl font-bold text-[#170F49]">
													إرفاق المستندات
												</h3>
												<p className="mb-6 text-right leading-relaxed text-gray-500">
													يرجى إرفاق سيرتك الذاتية المحدثة بدقة، إلى جانب صورة
													شخصية واضحة،
													<br className="hidden sm:block" />
													وشهادات الخبرة أو شهادات الدورات التدريبية ذات الصلة.
												</p>

												{/* منطقة رفع الملفات */}
												<label
													htmlFor="file"
													className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed ${
														apiErrors?.file
															? 'border-red-400'
															: 'border-[#2DD4BF]'
													} bg-[#F9FAFB] p-8 text-center transition hover:bg-[#F0FDFA] sm:p-10`}
												>
													<FileUpload
														formData={formData}
														onFileChange={handleFileChange}
													/>
												</label>
												{apiErrors?.file && (
													<div className="mt-3 text-center text-sm text-red-600">
														{apiErrors.file}
													</div>
												)}

												{/* الرسالة الإضافية */}
												<textarea
													name="notes"
													value={formData.notes}
													onChange={handleChange}
													placeholder="رسالة أو ملاحظات إضافية"
													className={`mt-6 w-full rounded-md border border-cyan-300 bg-[#14B8A617] px-4 py-3 text-gray-800 outline-none placeholder:text-gray-400 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF] ${apiErrors?.notes ? 'border-red-400' : ''}`}
													rows={10}
												></textarea>
												{apiErrors?.notes && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.notes}
													</div>
												)}
											</div>
										</form>
									</div>
									{/* ✅ أزرار عرض المزيد/أقل خارج الحاوية المقتصّة */}
									<div className="mt-4 flex justify-center">
										{!expanded ? (
											<button
												onClick={() => setExpanded(true)}
												className="rounded-full bg-gradient-to-l from-[#02B6BE] to-[#5FC19C] px-6 py-2 text-sm font-bold text-white shadow-md transition hover:opacity-90"
											>
												👁 عرض المزيد
											</button>
										) : (
											<button
												onClick={() => setExpanded(false)}
												className="rounded-full bg-gray-100 px-6 py-2 text-sm font-bold text-gray-700 shadow-md transition hover:bg-gray-200"
											>
												إخفاء
											</button>
										)}
									</div>
								</section>
							) : (
								// === قسم النصوص ===
								<div className="space-y-6 sm:space-y-8">
									{/* رأس القسم */}
									<div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
										<div className="text-right">
											<div className="flex items-center gap-2">
												<div className="h-6 w-6 rounded-full bg-[#2DD4BF] sm:h-8 sm:w-8"></div>
												<span className="text-sm text-[#2DD4BF] sm:text-base">
													وازن المالية
												</span>
											</div>

											{tabs[activeTab].mainTitle && (
												<h3 className="text-xl font-bold text-cyan-900 sm:text-2xl">
													{tabs[activeTab].mainTitle}
												</h3>
											)}
											{tabs[activeTab].subtitle && (
												<p className="text-sm text-gray-600 sm:text-base">
													{tabs[activeTab].subtitle}
												</p>
											)}
										</div>

										<div className="flex flex-row items-center gap-3 sm:flex-col sm:items-end">
											<button
												onClick={() => setExpanded(!expanded)}
												className={`rounded-md p-2 shadow-md transition ${
													expanded
														? 'bg-[#2DD4BF] text-white hover:bg-[#14b8a6]'
														: 'bg-white text-gray-700 hover:bg-gray-100'
												}`}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="h-5 w-5"
												>
													{expanded ? (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M20 12H4"
														/>
													) : (
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M4 8V4h4M4 16v4h4m12-12V4h-4m4 12v4h-4"
														/>
													)}
												</svg>
											</button>

											<a
												href="#"
												onClick={() => setShowModal(true)}
												className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#02B6BE] to-[#5FC19C] px-5 py-2 text-sm font-bold text-[#000C06] shadow-sm transition hover:opacity-90 sm:px-8 sm:py-3 sm:text-base"
											>
												انضم الآن
											</a>
										</div>
									</div>

									{/* المحتوى */}
									<div
										className={`transition-all duration-700 ease-in-out ${
											expanded
												? 'max-h-[4000px] opacity-100'
												: 'max-h-[300px] overflow-hidden opacity-70'
										}`}
									>
										{tabs[activeTab].introText && (
											<div>
												<h4 className="mb-2 text-lg font-semibold text-cyan-800">
													مقدمة
												</h4>
												<PortableText value={tabs[activeTab].introText} />
											</div>
										)}
										{tabs[activeTab].description && (
											<div>
												<h4 className="mb-2 text-lg font-semibold text-cyan-800">
													الوصف
												</h4>
												<PortableText value={tabs[activeTab].description} />
											</div>
										)}
										{tabs[activeTab].requirements && (
											<div>
												<h4 className="mb-2 text-lg font-semibold text-cyan-800">
													المتطلبات
												</h4>
												<PortableText value={tabs[activeTab].requirements} />
											</div>
										)}
										{tabs[activeTab].benefits && (
											<div>
												<h4 className="mb-2 text-lg font-semibold text-cyan-800">
													المميزات
												</h4>
												<PortableText value={tabs[activeTab].benefits} />
											</div>
										)}
									</div>
									{!expanded && (
										<div className="flex justify-center">
											<button
												onClick={() => setExpanded(true)}
												className="rounded-full bg-gradient-to-l from-[#02B6BE] to-[#5FC19C] px-6 py-2 text-sm font-bold text-white shadow-md transition hover:opacity-90"
											>
												👁 عرض المزيد
											</button>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* قسم الخطوات السفلية */}
			<section className="w-full bg-white px-3 py-12 text-center sm:px-6 sm:py-16">
				<p className="mb-2 text-xs font-medium text-gray-400 sm:text-sm">
					مراحل دورة التوظيف الكاملة
				</p>
				<h2 className="mb-10 text-xl font-bold text-cyan-950 sm:mb-12 sm:text-2xl md:text-3xl">
					تعرف على الخطوات الأساسية <br className="hidden sm:block" /> في دورة
					التوظيف
				</h2>

				<div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 md:grid-cols-5">
					{[
						{
							title: 'التحضير',
							img: 'https://cdn.sanity.io/images/m7bjawr3/production/b584f13dac2886c80f1bd6ebe3df096206e4e9c8-110x110.png',
						},
						{
							title: 'الاستقطاب',
							img: 'https://cdn.sanity.io/images/m7bjawr3/production/9fc9d5b971392da393e019787a7e2560ecc24a69-102x117.png',
						},
						{
							title: 'الفرز',
							img: 'https://cdn.sanity.io/images/m7bjawr3/production/d9065bd03d399134f8e977117aa5ad672c4a2faa-122x118.png',
						},
						{
							title: 'الإختيار',
							img: 'https://cdn.sanity.io/images/m7bjawr3/production/0797b12c8699908d73465feb8433b8e2a7ceaea2-122x116.png',
						},
						{
							title: 'التعيين',
							img: 'https://cdn.sanity.io/images/m7bjawr3/production/15f12d6557ae665987c44d9efd836a7060faf42e-121x117.png',
						},
					].map((step, i) => (
						<div
							key={i}
							className="flex flex-col items-center gap-3 text-center transition-transform hover:scale-105"
						>
							<img
								src={step.img}
								alt={step.title}
								className="h-20 w-20 object-contain sm:h-24 sm:w-24 md:h-32 md:w-32"
							/>
							<p className="text-lg font-semibold text-[#14B8A6] sm:text-xl md:text-2xl">
								{step.title}
							</p>
						</div>
					))}
				</div>
			</section>
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 backdrop-blur-sm sm:px-6">
					<div className="animate-fadeIn relative w-full max-w-4xl rounded-[30px] bg-transparent p-3 text-right sm:p-6 md:p-8">
						{/* زر الإغلاق */}
						<button
							onClick={() => setShowModal(false)}
							className="absolute top-3 left-4 text-xl text-gray-400 hover:text-gray-700 sm:top-4 sm:left-6 sm:text-2xl"
						>
							✕
						</button>

						{/* ✅ شريط الخطوات */}
						<div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#170F49] sm:gap-3 sm:text-sm">
							{[
								'البيانات الأساسية',
								'بيانات التواصل',
								'المؤهلات والتخصص',
								'رفع المرفقات',
								'إرسال الطلب',
							].map((label, i) => (
								<button
									key={i}
									onClick={() => setStep(i + 1)}
									className={`flex items-center gap-1 rounded-full border px-3 py-1.5 transition-all duration-300 sm:gap-2 sm:px-5 sm:py-2 ${
										step === i + 1
											? 'border-[#14B8A6] bg-[#14B8A6] text-white shadow-sm'
											: 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
									}`}
								>
									<span className="w-4 text-center">{i + 1}</span>
									<span>{label}</span>
								</button>
							))}
						</div>

						{/* ✅ جسم النموذج مع Scroll داخلي */}
						<div className="scrollbar-thin scrollbar-thumb-[#14B8A6]/60 scrollbar-track-gray-100 max-h-[80vh] overflow-y-auto rounded-[24px] bg-white p-5 shadow-2xl sm:p-8 md:p-10">
							{successMessage && (
								<div className="mb-6 rounded-lg border border-green-300 bg-green-100 px-4 py-3 text-center font-bold text-green-800">
									{successMessage}
								</div>
							)}
							<form
								className="space-y-6"
								onSubmit={handleSubmit}
								id="jobApplyFormpopup"
							>
								{/* 🟢 الخطوة 1 */}
								{step === 1 && (
									<>
										<h2 className="mb-3 text-center text-3xl font-bold text-[#170F49]">
											المعلومات الأساسية
										</h2>
										<p className="mx-auto mb-8 max-w-2xl text-center leading-relaxed text-gray-500">
											المعلومات الأساسية التي تساعدنا نتعرف عليك بشكل أفضل.
											<br />
											هذه البيانات تعتبر الخطوة الأولى لبناء ملفك الشخصي لدينا.
										</p>

										<div className="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-xl md:grid-cols-3 md:divide-x md:divide-y-0">
											<div className="p-4">
												<label className="mb-1 block text-sm font-semibold text-gray-700">
													الاسم بالكامل
												</label>
												<input
													type="text"
													name="Seeker_NmAr"
													value={formData.Seeker_NmAr}
													onChange={handleChange}
													placeholder="أحمد محمد عبدالعزيز"
													className={`w-full rounded-xl border bg-[#F1FAF9] p-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#14B8A6] ${apiErrors?.Seeker_NmAr ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Seeker_NmAr}
												/>
												{apiErrors?.Seeker_NmAr && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.Seeker_NmAr}
													</div>
												)}
											</div>

											<div className="p-4">
												<label className="mb-1 block text-sm font-semibold text-gray-700">
													النوع
												</label>

												<select
													name="Gender"
													value={formData.Gender}
													onChange={handleChange}
													className={`w-full rounded-xl border bg-[#F1FAF9] p-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#14B8A6] ${apiErrors?.Gender ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Gender}
												>
													<option value="">اختر النوع</option>
													{gender.map((item) => (
														<option key={item.id} value={item.id}>
															{item.name}
														</option>
													))}
												</select>
											</div>

											<div className="p-4">
												<label className="mb-1 block text-sm font-semibold text-gray-700">
													بلد الإقامة
												</label>

												<select
													name="country_of_residence"
													value={formData.country_of_residence}
													onChange={handleChange}
													className="focus:ring-[#14B8A6 w-full rounded-xl border border-gray-200 bg-[#F1FAF9] p-3 text-gray-800 outline-none focus:ring-2"
												>
													<option value="">اختر الدولة</option>
													{astCountry.map((country) => (
														<option
															key={country.Cntry_No}
															value={country.Cntry_No}
														>
															{country.Cntry_NmAr}
														</option>
													))}
												</select>
											</div>

											<div className="p-4">
												<label className="mb-1 block text-sm font-semibold text-gray-700">
													تاريخ الميلاد
												</label>
												<input
													type="date"
													name="Birth_Dt"
													value={formData.Birth_Dt}
													onChange={handleChange}
													className={`w-full rounded-xl border bg-[#F1FAF9] p-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#14B8A6] ${apiErrors?.Birth_Dt ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Birth_Dt}
												/>
												{apiErrors?.Birth_Dt && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.Birth_Dt}
													</div>
												)}
											</div>

											<div className="p-4">
												<label className="mb-1 block text-sm font-semibold text-gray-700">
													المدينة
												</label>

												<select
													name="City_No"
													value={formData.City_No}
													onChange={handleChange}
													className="w-full rounded-xl border border-gray-200 bg-[#F1FAF9] p-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#14B8A6]"
												>
													<option value="">اختر المدينة</option>
													{astCity.map((city) => (
														<option key={city.id} value={city.id}>
															{city.City_NmAr}
														</option>
													))}
												</select>
											</div>

											<div className="p-4">
												<label className="mb-1 block text-sm font-semibold text-gray-700">
													الجنسية
												</label>

												<select
													name="Nation_No"
													onChange={handleChange}
													value={formData.Nation_No}
													className="w-full rounded-xl border border-gray-200 bg-[#F1FAF9] p-3 text-gray-800 outline-none focus:ring-2 focus:ring-[#14B8A6]"
												>
													<option value="">اختر الدولة</option>
													{astCountry.map((country) => (
														<option
															key={country.Cntry_No}
															value={country.Cntry_No}
														>
															{country.Cntry_NmAr}
														</option>
													))}
												</select>
											</div>
										</div>
									</>
								)}

								{/* 🟢 الخطوة 2 */}
								{step === 2 && (
									<>
										<h2 className="mb-3 text-center text-3xl font-bold text-[#170F49]">
											بيانات التواصل
										</h2>
										<p className="mx-auto mb-8 max-w-2xl text-center leading-relaxed text-gray-500">
											هنا نجمع بيانات الاتصال الخاصة بك حتى نقدر نتواصل معك
											بسهولة.
										</p>

										<div className="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-xl md:grid-cols-2 md:divide-x md:divide-y-0">
											<div className="p-4">
												<label className="mb-1 block text-sm font-semibold text-gray-700">
													رقم الهاتف
												</label>
												<input
													type="text"
													name="Phone1"
													value={formData.Phone1}
													onChange={handleChange}
													placeholder="+966 876 4322 234"
													className={`w-full rounded-xl border bg-[#F1FAF9] p-3 outline-none focus:ring-2 focus:ring-[#14B8A6] ${apiErrors?.Phone1 ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Phone1}
												/>
												{apiErrors?.Phone1 && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.Phone1}
													</div>
												)}
											</div>

											<div className="p-4">
												<label className="mb-1 block text-sm font-semibold text-gray-700">
													البريد الإلكتروني
												</label>
												<input
													type="email"
													name="Email"
													value={formData.Email}
													onChange={handleChange}
													placeholder="Hossam@wazen.sa"
													className={`w-full rounded-xl border bg-[#F1FAF9] p-3 outline-none focus:ring-2 focus:ring-[#14B8A6] ${apiErrors?.Email ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Email}
												/>
												{apiErrors?.Email && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.Email}
													</div>
												)}
											</div>

											<div className="p-4">
												<label className="mb-1 block text-sm font-semibold text-gray-700">
													نوع الهوية{' '}
													<span className="text-xs text-gray-400">
														(اختياري)
													</span>
												</label>

												<select
													name="id_type"
													onChange={handleChange}
													value={formData.id_type}
													className="w-full rounded-xl border border-gray-200 bg-[#F1FAF9] p-3 outline-none focus:ring-2 focus:ring-[#14B8A6]"
												>
													<option value="">اختر نوع الهوية</option>
													{idType.map((type) => (
														<option key={type.id} value={type.id}>
															{type.name}
														</option>
													))}
												</select>
											</div>

											<div className="p-4">
												<label className="mb-1 block text-sm font-semibold text-gray-700">
													رقم الهوية{' '}
													<span className="text-xs text-gray-400">
														(اختياري)
													</span>
												</label>
												<input
													type="text"
													name="National_ID"
													value={formData.National_ID}
													onChange={handleChange}
													placeholder="1234567890"
													className="w-full rounded-xl border border-gray-200 bg-[#F1FAF9] p-3 outline-none focus:ring-2 focus:ring-[#14B8A6]"
												/>
											</div>
										</div>
									</>
								)}

								{/* 🟢 الخطوة 3 */}
								{step === 3 && (
									<>
										<h2 className="mb-3 text-center text-3xl font-bold text-[#170F49]">
											المؤهلات والتخصص
										</h2>
										<p className="mx-auto mb-8 max-w-2xl text-center leading-relaxed text-gray-500">
											أخبرنا عن مؤهلاتك الدراسية وخبراتك السابقة.
										</p>

										<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
											<div>
												<label className="mb-1 block text-sm font-semibold text-gray-700">
													المؤهل الدراسي
												</label>
												<input
													type="text"
													name="educational_qualification"
													value={formData.educational_qualification}
													onChange={handleChange}
													placeholder="بكالوريوس علوم الحاسب"
													className="w-full rounded-xl border border-gray-200 bg-[#F1FAF9] p-3 outline-none focus:ring-2 focus:ring-[#14B8A6]"
												/>
											</div>
											<div>
												<label className="mb-1 block text-sm font-semibold text-gray-700">
													التخصص
												</label>
												<input
													type="text"
													name="Specialization_Name"
													value={formData.Specialization_Name}
													onChange={handleChange}
													placeholder="تحليل بيانات"
													className={`w-full rounded-xl border bg-[#F1FAF9] p-3 outline-none focus:ring-2 focus:ring-[#14B8A6] ${apiErrors?.Specialization_Name ? 'border-red-400' : 'border-gray-200'}`}
													aria-invalid={!!apiErrors?.Specialization_Name}
												/>
												{apiErrors?.Specialization_Name && (
													<div className="mt-1 text-sm text-red-600">
														{apiErrors.Specialization_Name}
													</div>
												)}
											</div>
										</div>
									</>
								)}

								{/* 🟢 الخطوة 4 */}
								{step === 4 && (
									<>
										<h2 className="mb-3 text-center text-3xl font-bold text-[#170F49]">
											رفع المرفقات
										</h2>
										<p className="mx-auto mb-8 max-w-2xl text-center leading-relaxed text-gray-500">
											قم برفع سيرتك الذاتية (CV) والملفات المساندة إن وجدت.
										</p>

										<div
											className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed ${apiErrors?.file ? 'border-red-400' : 'border-gray-300'} bg-[#F9FAFB] p-10 text-center transition hover:border-[#14B8A6]`}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke={apiErrors?.file ? '#EF4444' : '#14B8A6'}
												className="mb-3 h-10 w-10"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5m-9-12v12m0-12l-3.75 3.75M12 4.5l3.75 3.75"
												/>
											</svg>

											<label
												htmlFor="cvUpload"
												className={`cursor-pointer rounded-full ${apiErrors?.file ? 'bg-red-500' : 'bg-[#14B8A6]'} px-8 py-3 font-bold text-white shadow-md transition hover:opacity-90`}
											>
												رفع CV
											</label>

											<input
												id="cvUpload"
												type="file"
												name="cv"
												accept=".pdf,.doc,.docx"
												className="hidden"
												onChange={handleFileChange}
												aria-invalid={!!apiErrors?.file}
											/>

											<p className="mt-3 text-sm text-gray-500">
												الصيغ المدعومة: PDF, DOC, DOCX — الحجم الأقصى 5MB
											</p>
											{apiErrors?.file && (
												<div className="mt-2 text-sm text-red-600">
													{apiErrors.file}
												</div>
											)}
										</div>
									</>
								)}

								{/* ✅ أزرار التنقل */}
								<div className="mt-10 flex flex-col items-center justify-center gap-3 sm:relative sm:flex-row sm:justify-center sm:gap-0">
									{step > 1 && (
										<button
											type="button"
											onClick={() => setStep(step - 1)}
											className="order-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F3F1] text-[#14B8A6] shadow-sm transition hover:bg-[#d1ece8] sm:absolute sm:left-0 sm:order-1"
											title="الخطوة السابقة"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={2}
												stroke="currentColor"
												className="h-5 w-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15 19l-7-7 7-7"
												/>
											</svg>
										</button>
									)}

									{step < 5 ? (
										<button
											type="button"
											onClick={() => setStep(step + 1)}
											className="order-1 w-full rounded-full bg-[#14B8A6] px-10 py-3 font-bold text-white shadow-md transition hover:bg-[#0d9488] sm:order-2 sm:w-auto"
										>
											التالي
										</button>
									) : (
										<button
											type="submit"
											form="jobApplyFormpopup"
											className="order-1 w-full rounded-full bg-[#14B8A6] px-10 py-3 font-bold text-white shadow-md transition hover:bg-[#0d9488] sm:order-2 sm:w-auto"
										>
											إرسال الطلب
										</button>
									)}

									{step < 5 && (
										<button
											type="button"
											onClick={() => setStep(step + 1)}
											className="order-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F3F1] text-[#14B8A6] shadow-sm transition hover:bg-[#d1ece8] sm:absolute sm:right-0 sm:order-3"
											title="الخطوة التالية"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={2}
												stroke="currentColor"
												className="h-5 w-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</main>
	)
}
