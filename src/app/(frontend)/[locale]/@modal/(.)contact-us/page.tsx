import { ContactUsTemplate } from '@/components/contact-us-template'
// import { Modal } from '@/components/Modal'

type Props = {
	params: Promise<{ locale: 'en' | 'ar' }>
}
export default async function Page({ params }: Props) {
	const { locale } = await params
	return (
		// <Modal>
			<ContactUsTemplate />
		// </Modal>
	)
}
