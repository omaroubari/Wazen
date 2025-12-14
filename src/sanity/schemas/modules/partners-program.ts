import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'partners-program',
	title: 'Partners Program Section',
	icon: TfiLayoutCtaCenter,
	type: 'object',

	fields: [
		{
			name: 'pretitle',
			title: 'Tagline / Badge Text',
			type: 'string',
			description:
				'النص الذي يظهر في الشارة الخضراء (مثل: "برنامج شركاء وازن ERP")',
		},
		{
			name: 'content',
			title: 'المحتوى الرئيسي (العنوان)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي',
		},
		{
			name: 'subcontent',
			title: 'الوصف',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'الوصف الرئيسي',
		},
		{
			name: 'benefits',
			title: 'قائمة المميزات (النقاط)',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'text',
							title: 'النص',
							type: 'string',
						},
					],
				},
			],
			description: 'قائمة المميزات التي تظهر كنقاط (3 نقاط)',
		},
		{
			name: 'ctas',
			title: 'أزرار',
			type: 'array',
			of: [{ type: 'cta' }],
			description: 'الأزرار (مثل: "طلب الانضمام" و "تعرف على التفاصيل")',
		},
		{
			name: 'additionalInfo',
			title: 'معلومات إضافية (أسفل الأزرار)',
			type: 'array',
			of: [{ type: 'block' }],
			description:
				'النص الإضافي الذي يظهر أسفل الأزرار (مثل: "موجه لشركات حلول التقنية...")',
		},
		// Card Section (Left Side)
		{
			name: 'cardTitle',
			title: 'عنوان الكارد (على اليسار)',
			type: 'string',
			description: 'عنوان الكارد الأبيض (مثل: "ما الذي يقدمه برنامج الشركاء؟")',
		},
		{
			name: 'cardDescription',
			title: 'وصف الكارد',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'الوصف داخل الكارد',
		},
		{
			name: 'cardBenefits',
			title: 'نقاط الكارد',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'text',
							title: 'النص',
							type: 'string',
						},
					],
				},
			],
			description: 'قائمة النقاط داخل الكارد (3 نقاط)',
		},
		// About Program Section
		{
			name: 'aboutPretitle',
			title: 'Tagline / Badge Text (قسم عن البرنامج)',
			type: 'string',
			description: 'النص الذي يظهر في الشارة الخضراء (مثل: "عن البرنامج")',
		},
		{
			name: 'aboutTitle',
			title: 'العنوان الرئيسي (قسم عن البرنامج)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي (مثل: "برنامج شراكة يركّز على القيمة والنتائج")',
		},
		{
			name: 'aboutDescription1',
			title: 'الوصف الأول (قسم عن البرنامج)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'الفقرة الأولى من الوصف',
		},
		{
			name: 'aboutDescription2',
			title: 'الوصف الثاني (قسم عن البرنامج)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'الفقرة الثانية من الوصف',
		},
		// Cards Section
		{
			name: 'featureCards',
			title: 'البطاقات (3 بطاقات)',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'title',
							title: 'عنوان البطاقة',
							type: 'string',
						},
						{
							name: 'description',
							title: 'وصف البطاقة',
							type: 'text',
						},
					],
				},
			],
			validation: (Rule: any) => Rule.max(3),
			description: '3 بطاقات تعرض المميزات',
		},
		// Benefits Section
		{
			name: 'benefitsPretitle',
			title: 'Tagline / Badge Text (قسم المزايا)',
			type: 'string',
			description: 'النص الذي يظهر في الشارة الخضراء (مثل: "مزايا الشراكة")',
		},
		{
			name: 'benefitsTitle',
			title: 'العنوان الرئيسي (قسم المزايا)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي (مثل: "ماذا يقدم لك برنامج شركاء وازن؟")',
		},
		{
			name: 'benefitsDescription',
			title: 'الوصف التمهيدي (قسم المزايا)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'الفقرة التمهيدية قبل البطاقات',
		},
		{
			name: 'benefitCards',
			title: 'بطاقات المزايا (6 بطاقات)',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'title',
							title: 'عنوان البطاقة',
							type: 'string',
						},
						{
							name: 'description',
							title: 'وصف البطاقة',
							type: 'text',
						},
					],
				},
			],
			description: 'بطاقات المزايا (6 بطاقات أو أكثر)',
		},
		// Who Can Join Section
		{
			name: 'whoCanJoinPretitle',
			title: 'Tagline / Badge Text (قسم من يمكنه الانضمام)',
			type: 'string',
			description: 'النص الذي يظهر في الشارة (مثل: "من يمكنه الانضمام؟")',
		},
		{
			name: 'whoCanJoinTitle',
			title: 'العنوان الرئيسي (قسم من يمكنه الانضمام)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي (مثل: "شركاء يخدمون قطاع الأعمال ويركزون على الحلول")',
		},
		{
			name: 'whoCanJoinDescription1',
			title: 'الوصف الأول (قسم من يمكنه الانضمام)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'الفقرة الأولى من الوصف',
		},
		{
			name: 'whoCanJoinDescription2',
			title: 'الوصف الثاني (قسم من يمكنه الانضمام)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'الفقرة الثانية من الوصف',
		},
		// How To Start Section
		{
			name: 'howToStartPretitle',
			title: 'Tagline / Badge Text (قسم كيف تبدأ)',
			type: 'string',
			description: 'النص الذي يظهر في الشارة (مثل: "كيف تبدأ؟")',
		},
		{
			name: 'howToStartTitle',
			title: 'العنوان الرئيسي (قسم كيف تبدأ)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي (مثل: "ثلاث خطوات للانضمام إلى برنامج شركاء وازن")',
		},
		{
			name: 'howToStartDescription',
			title: 'الوصف التمهيدي (قسم كيف تبدأ)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'الفقرة التمهيدية قبل الخطوات',
		},
		{
			name: 'steps',
			title: 'الخطوات (3 خطوات)',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'number',
							title: 'رقم الخطوة',
							type: 'number',
							description: 'رقم الخطوة (1، 2، 3)',
						},
						{
							name: 'title',
							title: 'عنوان الخطوة',
							type: 'string',
							description: 'عنوان الخطوة (مثل: "تعبئة نموذج طلب الشراكة")',
						},
						{
							name: 'description',
							title: 'وصف الخطوة',
							type: 'text',
							description: 'الوصف التفصيلي للخطوة',
						},
					],
				},
			],
			validation: (Rule: any) => Rule.max(3),
			description: '3 خطوات للانضمام',
		},
		// Application Form Section
		{
			name: 'formPretitle',
			title: 'Tagline / Badge Text (قسم النموذج)',
			type: 'string',
			description: 'النص الذي يظهر في الشارة (مثل: "طلب الانضمام")',
		},
		{
			name: 'formTitle',
			title: 'العنوان الرئيسي (قسم النموذج)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي (مثل: "قدم طلبك للانضمام إلى برنامج شركاء وازن")',
		},
		{
			name: 'formDescription',
			title: 'الوصف التمهيدي (قسم النموذج)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'الفقرة التمهيدية قبل النموذج',
		},
		// FAQ Section
		{
			name: 'faqPretitle',
			title: 'Tagline / Badge Text (قسم الأسئلة الشائعة)',
			type: 'string',
			description: 'النص الذي يظهر في الشارة (مثل: "أسئلة شائعة")',
		},
		{
			name: 'faqTitle',
			title: 'العنوان الرئيسي (قسم الأسئلة الشائعة)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي (مثل: "استفسارات متكررة حول برنامج الشركاء")',
		},
		{
			name: 'faqItems',
			title: 'الأسئلة الشائعة',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'question',
							title: 'السؤال',
							type: 'string',
						},
						{
							name: 'answer',
							title: 'الإجابة',
							type: 'text',
						},
					],
				},
			],
			description: 'قائمة الأسئلة الشائعة',
		},
	],
	preview: {
		select: {
			content: 'content',
			pretitle: 'pretitle',
		},
		prepare: ({ content, pretitle }: any) => ({
			title: getBlockText(content) || pretitle || 'Partners Program Section',
			subtitle: 'Partners Program Section',
		}),
	},
}
