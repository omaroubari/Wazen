import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default {
	name: 'subscribe',
	title: 'Subscribe Section',
	icon: TfiLayoutCtaCenter,
	type: 'object',

	fields: [
		{
			name: 'pretitle',
			title: 'Tagline / Badge Text',
			type: 'string',
			description: 'النص الذي يظهر في الشارة (مثل: "اشترك الآن")',
			initialValue: 'اشترك الآن',
		},
		{
			name: 'title',
			title: 'العنوان الرئيسي',
			type: 'array',
			of: [{ type: 'block' }],
			description:
				'العنوان الرئيسي (مثل: "احصل على حلول ERP متكاملة لتحويل أعمالك")',
		},
		{
			name: 'description',
			title: 'الوصف',
			type: 'array',
			of: [{ type: 'block' }],
			description:
				'الوصف التمهيدي (مثل: "سجّل بياناتك الآن واحصل على معلومات عن حلولنا المتكاملة والعروض الحصرية")',
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
			description: 'النص الذي يظهر في حقل الهاتف (مثل: "+9665XXXXXXXX")',
			initialValue: '+9665XXXXXXXX',
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
			description: 'نص زر الاشتراك (مثل: "اشترك")',
			initialValue: 'اشترك',
		},
		{
			name: 'successMessage',
			title: 'رسالة النجاح',
			type: 'string',
			description: 'الرسالة التي تظهر بعد الاشتراك بنجاح',
			initialValue: 'سيتم تواصل معاك لتصميم تجربتك المجانية',
		},
	],
	preview: {
		select: {
			title: 'title',
			pretitle: 'pretitle',
		},
		prepare: ({ title, pretitle }: any) => ({
			title: getBlockText(title) || pretitle || 'Subscribe Section',
			subtitle: 'Subscribe Section',
		}),
	},
}
