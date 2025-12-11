'use client'
import * as z from 'zod'
import { formSchema } from '@/lib/form-schema'
import { serverAction } from '@/actions/form-server-action'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAction } from 'next-safe-action/hooks'
import * as m from 'motion/react-m'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { useState } from 'react'
import Image from 'next/image'

type Schema = z.infer<typeof formSchema>

export function ContactUsTemplate() {
	const form = useForm<Schema>({
		resolver: zodResolver(formSchema as any),
		defaultValues: { agree: true },
	})
	const t = useTranslations('ContactUs')
	const formAction = useAction(serverAction, {
		onSuccess: () => {
			// TODO: show success message
			form.reset()
		},
		onError: () => {
			// TODO: show error message
		},
	})
	const [showForm, setShowForm] = useState(false)
	const handleSubmit = form.handleSubmit(async (data: Schema) => {
		formAction.execute(data)
	})

	const { isExecuting, hasSucceeded } = formAction

	if (hasSucceeded) {
		return (
			<div className="w-full gap-2 rounded-md border p-2 sm:p-5 md:p-8">
				<m.div
					initial={{ opacity: 0, y: -16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
					className="h-full px-3 py-6"
				>
					<m.div
						initial={{ scale: 0.5 }}
						animate={{ scale: 1 }}
						transition={{
							delay: 0.3,
							type: 'spring',
							stiffness: 500,
							damping: 15,
						}}
						className="mx-auto mb-4 flex w-fit justify-center rounded-full border p-2"
					>
						<Check className="size-8" />
					</m.div>
					<h2 className="mb-2 text-center text-2xl font-bold text-pretty">
						{t('Thank you')}
					</h2>
					<p className="text-muted-foreground text-center text-lg text-pretty">
						{t('Submission Success')}
					</p>
				</m.div>
			</div>
		)
	}

	return (
		<div className="flex w-full flex-col gap-4">
			{!showForm && (
				<div className="flex w-full flex-col py-6">
					<DialogHeader className="mb-12">
						<DialogTitle className="h3 mb-2 text-center text-cyan-950">
							{t('Contact Us')}
						</DialogTitle>
						<DialogDescription className="text-center text-(length:--text-larger) text-cyan-950/60">
							{t('Please fill the form below to contact us')}
						</DialogDescription>
					</DialogHeader>
					<Image
						src="/envelope-icon.png"
						alt="envelope"
						width="300"
						height="300"
						className="mb-6 h-[300px] w-auto object-cover object-center"
						quality={100}
					/>
					<Button
						variant="primary"
						size="lg"
						className="mx-auto w-fit text-base shadow-lg max-md:w-fit"
						onClick={() => {
							setShowForm(true)
						}}
					>
						املأ النموذج
					</Button>
				</div>
			)}
			{showForm && (
				<Form {...form}>
					<form
						onSubmit={handleSubmit}
						className="fade-in-20 animate-in flex w-full flex-col gap-4"
					>
						<div className="flex w-full flex-wrap items-center justify-between gap-2 sm:flex-nowrap">
							<FormField
								control={form.control}
								name="firstName"
								rules={{ required: true }}
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>{`${t('First Name')} *`}</FormLabel>
										<FormControl>
											<Input
												type="text"
												value={field.value}
												onChange={(e) => {
													const val = e.target.value
													field.onChange(val)
												}}
												placeholder={t('First Name Placeholder')}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								rules={{ required: true }}
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>{t('Last Name')}</FormLabel>
										<FormControl>
											<Input
												type="text"
												value={field.value}
												onChange={(e) => {
													const val = e.target.value
													field.onChange(val)
												}}
												placeholder={t('Last Name Placeholder')}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex w-full flex-wrap items-center justify-between gap-2 sm:flex-nowrap">
							<FormField
								control={form.control}
								name="email"
								rules={{ required: true }}
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>{`${t('Email')} *`}</FormLabel>
										<FormControl>
											<Input
												type="email"
												value={field.value}
												onChange={(e) => {
													const val = e.target.value
													field.onChange(val)
												}}
												placeholder={t('Email Placeholder')}
												autoComplete="email"
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="mobileNumber"
								rules={{ required: true }}
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>{`${t('Contact Number')} *`}</FormLabel>
										<FormControl>
											<Input
												type="tel"
												value={field.value}
												onChange={(e) => {
													const val = e.target.value
													field.onChange(val)
												}}
												placeholder={t('Mobile Placeholder')}
												autoComplete="mobile tel-country-code"
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex w-full flex-wrap items-center justify-between gap-2 sm:flex-nowrap">
							<FormField
								control={form.control}
								name="companyName"
								rules={{ required: true }}
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>{t('Company Name')}</FormLabel>
										<FormControl>
											<Input
												type="text"
												value={field.value}
												onChange={(e) => {
													const val = e.target.value
													field.onChange(val)
												}}
												placeholder={t('Company Name')}
												autoComplete="organization"
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="industry"
								rules={{ required: true }}
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>{t('Business Field')}</FormLabel>
										<FormControl>
											<Input
												type="text"
												value={field.value}
												onChange={(e) => {
													const val = e.target.value
													field.onChange(val)
												}}
												placeholder={t('Industry Placeholder')}
												autoComplete=""
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="message"
							rules={{ required: true }}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('Message')}</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder={t('Message Placeholder')}
											className="resize-none"
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							rules={{ required: true }}
							name="agree"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-y-0 space-x-1">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											required
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>
											{t('I agree to the terms and conditions')}
										</FormLabel>
										<FormMessage />
									</div>
								</FormItem>
							)}
						/>
						<div className="flex w-full items-center justify-end pt-3">
							<Button className="rounded-lg" size="md">
								{isExecuting ? t('Submitting') : t('Submit')}
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	)
}
