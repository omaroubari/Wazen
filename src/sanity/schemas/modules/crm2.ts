import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'crm2',
	title: 'CRM Section',
	icon: TfiLayoutCtaCenter,
	type: 'object',

	fields: [
		{
			name: 'pretitle',
			title: 'Tagline / Badge Text',
			type: 'string',
			description:
				'النص الذي يظهر في الشارة الخضراء (مثل: "موديول CRM مستقل من منظومة وازن ERP")',
		},
		{
			name: 'content',
			title: 'المحتوى الرئيسي',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي والنصوص الوصفية',
		},
		{
			name: 'subcontent',
			title: 'المحتوى الفرعي',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'محتوى فرعي إضافي (اختياري)',
		},
		{
			name: 'image',
			title: 'صورة Hero',
			type: 'image',
			description: 'صورة أو فيديو للوحة تحكم CRM (اختياري)',
			fields: [
				{
					name: 'alt',
					title: 'النص البديل للصورة',
					type: 'string',
				},
			],
		},
		{
			name: 'ctaTagline',
			title: 'Tagline للأزرار',
			type: 'string',
			description: 'نص Tagline يظهر قبل الأزرار (اختياري)',
		},
		{
			name: 'ctas',
			title: 'أزرار',
			type: 'array',
			of: [{ type: 'cta' }],
			description: 'الأزرار (مثل: "ابدأ الآن مجانا" و "اشترك الآن")',
		},
		{
			name: 'additionalInfo',
			title: 'معلومات إضافية',
			type: 'array',
			of: [{ type: 'block' }],
			description:
				'النص الإضافي الذي يظهر أسفل الأزرار (مثل: "تجربة سحابية فورية بدون بطاقة ائتمان...")',
		},
		// Second Section Fields
		{
			name: 'secondPretitle',
			title: 'Tagline / Badge Text (السكشن الثاني)',
			type: 'string',
			description: 'النص الذي يظهر في الشارة الخضراء للسكشن الثاني',
		},
		{
			name: 'secondContent',
			title: 'المحتوى الرئيسي (السكشن الثاني)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي والنصوص الوصفية للسكشن الثاني',
		},
		{
			name: 'secondSubcontent',
			title: 'المحتوى الفرعي (السكشن الثاني)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'محتوى فرعي إضافي للسكشن الثاني (اختياري)',
		},
		{
			name: 'secondThirdContent',
			title: 'المحتوى الثالث (السكشن الثاني)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'محتوى ثالث إضافي للسكشن الثاني (اختياري)',
		},
		{
			name: 'secondImage',
			title: 'صورة Hero (السكشن الثاني)',
			type: 'image',
			description: 'صورة أو فيديو للسكشن الثاني (اختياري)',
			fields: [
				{
					name: 'alt',
					title: 'النص البديل للصورة',
					type: 'string',
				},
			],
		},
		// Third Section Fields
		{
			name: 'thirdPretitle',
			title: 'Tagline / Badge Text (السكشن الثالث)',
			type: 'string',
			description: 'النص الذي يظهر في الشارة الخضراء للسكشن الثالث',
		},
		{
			name: 'thirdContent',
			title: 'المحتوى الرئيسي (السكشن الثالث)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي والنصوص الوصفية للسكشن الثالث',
		},
		{
			name: 'thirdSubcontent',
			title: 'المحتوى الفرعي (السكشن الثالث)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'محتوى فرعي إضافي للسكشن الثالث (اختياري)',
		},
		{
			name: 'thirdThirdContent',
			title: 'المحتوى الثالث (السكشن الثالث)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'محتوى ثالث إضافي للسكشن الثالث (اختياري)',
		},
		{
			name: 'thirdImage',
			title: 'صورة Hero (السكشن الثالث)',
			type: 'image',
			description: 'صورة أو فيديو للسكشن الثالث (اختياري)',
			fields: [
				{
					name: 'alt',
					title: 'النص البديل للصورة',
					type: 'string',
				},
			],
		},
		// Fourth Section Fields
		{
			name: 'fourthPretitle',
			title: 'Tagline / Badge Text (السكشن الرابع)',
			type: 'string',
			description: 'النص الذي يظهر في الشارة الخضراء للسكشن الرابع',
		},
		{
			name: 'fourthContent',
			title: 'المحتوى الرئيسي (السكشن الرابع)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي والنصوص الوصفية للسكشن الرابع',
		},
		{
			name: 'fourthSubcontent',
			title: 'المحتوى الفرعي (السكشن الرابع)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'محتوى فرعي إضافي للسكشن الرابع (اختياري)',
		},
		{
			name: 'fourthThirdContent',
			title: 'المحتوى الثالث (السكشن الرابع)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'محتوى ثالث إضافي للسكشن الرابع (اختياري)',
		},
		{
			name: 'fourthImage',
			title: 'صورة Hero (السكشن الرابع)',
			type: 'image',
			description: 'صورة أو فيديو للسكشن الرابع (اختياري)',
			fields: [
				{
					name: 'alt',
					title: 'النص البديل للصورة',
					type: 'string',
				},
			],
		},
		// Fifth Section Fields
		{
			name: 'fifthPretitle',
			title: 'Tagline / Badge Text (السكشن الخامس)',
			type: 'string',
			description: 'النص الذي يظهر في الشارة الخضراء للسكشن الخامس',
		},
		{
			name: 'fifthContent',
			title: 'المحتوى الرئيسي (السكشن الخامس)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي والنصوص الوصفية للسكشن الخامس',
		},
		{
			name: 'fifthSubcontent',
			title: 'المحتوى الفرعي (السكشن الخامس)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'محتوى فرعي إضافي للسكشن الخامس (اختياري)',
		},
		{
			name: 'fifthThirdContent',
			title: 'المحتوى الثالث (السكشن الخامس)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'محتوى ثالث إضافي للسكشن الخامس (اختياري)',
		},
		{
			name: 'fifthImage',
			title: 'صورة Hero (السكشن الخامس)',
			type: 'image',
			description: 'صورة أو فيديو للسكشن الخامس (اختياري)',
			fields: [
				{
					name: 'alt',
					title: 'النص البديل للصورة',
					type: 'string',
				},
			],
		},
		// Features Section
		{
			name: 'featuresPretitle',
			title: 'عنوان صغير (سكشن المميزات)',
			type: 'string',
			description: 'العنوان الصغير (مثل: "كل ما تحتاجه في CRM واحد")',
		},
		{
			name: 'featuresContent',
			title: 'المحتوى الرئيسي (سكشن المميزات)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي والوصف',
		},
		{
			name: 'features',
			title: 'المميزات / البطاقات',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'icon',
							title: 'صورة / أيقونة',
							type: 'image',
							description: 'صورة أو أيقونة للبطاقة',
							fields: [
								{
									name: 'alt',
									title: 'النص البديل للصورة',
									type: 'string',
								},
							],
						},
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
			description: 'بطاقات المميزات (4 بطاقات)',
		},
		// Integration Section
		{
			name: 'integrationPretitle',
			title: 'عنوان صغير (سكشن التكامل)',
			type: 'string',
			description: 'العنوان الصغير (مثل: "تكامل مع منظومة وازن")',
		},
		{
			name: 'integrationContent',
			title: 'المحتوى الرئيسي (سكشن التكامل)',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي والوصف',
		},
		{
			name: 'integrationSubtitle',
			title: 'عنوان فرعي (سكشن التكامل)',
			type: 'string',
			description:
				'العنوان الفرعي قبل الأزرار (مثل: "يتكامل مع وحدات عمل رئيسية في وازن:")',
		},
		{
			name: 'integrationModules',
			title: 'الوحدات / الأزرار',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'englishTitle',
							title: 'العنوان بالإنجليزية',
							type: 'string',
							description: 'مثل: POS, CRM, HR, ERP',
						},
						{
							name: 'arabicTitle',
							title: 'العنوان بالعربية',
							type: 'string',
						},
						{
							name: 'description',
							title: 'الوصف',
							type: 'text',
							rows: 3,
						},
						{
							name: 'icon',
							title: 'صورة الوحدة',
							type: 'image',
							options: {
								hotspot: true,
							},
						},
					],
				},
			],
			description: 'قائمة الوحدات المتكاملة (مثل: المبيعات، الاشتراكات، إلخ)',
		},
	],
	preview: {
		select: {
			content: 'content',
			pretitle: 'pretitle',
		},
		prepare: ({ content, pretitle }: any) => ({
			title: getBlockText(content) || pretitle || 'CRM Section',
			subtitle: 'CRM Section',
		}),
	},
}
