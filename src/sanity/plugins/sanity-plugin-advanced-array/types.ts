import { ArrayOptions } from '@sanity/types'

/**
 * @public
 */
export type AdvancedArrayOptions = {
	select: boolean
	inline: 'collapsed' | 'expanded' | 'off'
	addItemSearch?: boolean
	__unstable_addItemHidden?: boolean | ((value?: { _key: string }[]) => boolean)
}

export interface AdvancedArrayDefinition extends ArrayOptions {
	options?: AdvancedArrayOptions & ArrayOptions
}

// declare module '@sanity/types' {
declare module 'sanity' {
	export interface ArrayDefinition extends AdvancedArrayDefinition {}
}
