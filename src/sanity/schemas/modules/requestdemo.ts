import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'requestdemo',
	title: 'Request Demo Section',
	icon: TfiLayoutCtaCenter,
	type: 'object',

	fields: [
		{
			name: 'pretitle',
			title: 'Tagline / Badge Text',
			type: 'string',
			description: 'النص الذي يظهر في الشارة (مثل: "اطلب عرض تجريبي")',
			initialValue: 'اطلب عرض تجريبي',
		},
		{
			name: 'title',
			title: 'العنوان الرئيسي',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'العنوان الرئيسي (مثل: "احصل على عرض تجريبي مجاني")',
		},
		{
			name: 'description',
			title: 'الوصف',
			type: 'array',
			of: [{ type: 'block' }],
			description:
				'الوصف التمهيدي (مثل: "سجّل بياناتك الآن واحصل على عرض تجريبي مجاني")',
		},
		{
			name: 'fullNamePlaceholder',
			title: 'نص placeholder للاسم',
			type: 'string',
			description: 'النص الذي يظهر في حقل الاسم (مثل: "أدخل اسمك الكامل")',
			initialValue: 'أدخل اسمك الكامل',
		},
		{
			name: 'phonePlaceholder',
			title: 'نص placeholder للهاتف',
			type: 'string',
			description: 'النص الذي يظهر في حقل الهاتف (مثل: "05XXXXXXXX")',
			initialValue: '05XXXXXXXX',
		},
		{
			name: 'companyPlaceholder',
			title: 'نص placeholder لاسم الجهة',
			type: 'string',
			description:
				'النص الذي يظهر في حقل اسم الجهة (مثل: "اسم الشركة أو المؤسسة")',
			initialValue: 'اسم الشركة أو المؤسسة',
		},
		{
			name: 'buttonText',
			title: 'نص الزر',
			type: 'string',
			description: 'نص زر الطلب (مثل: "اطلب عرض تجريبي")',
			initialValue: 'اطلب عرض تجريبي',
		},
		{
			name: 'successMessage',
			title: 'رسالة النجاح',
			type: 'string',
			description: 'الرسالة التي تظهر بعد الطلب بنجاح',
			initialValue: 'سيتم التواصل معك قريباً',
		},
	],
	preview: {
		select: {
			title: 'title',
			pretitle: 'pretitle',
		},
		prepare: ({ title, pretitle }: any) => ({
			title: getBlockText(title) || pretitle || 'Request Demo Section',
			subtitle: 'Request Demo Section',
		}),
	},
}
