import { defineConfig } from 'sanity'
import { projectId, dataset, apiVersion } from './src/sanity/lib/env'

import { structure } from './src/sanity/src/structure'
import { presentation } from './src/sanity/src/presentation'
import { schemaTypes } from './src/sanity/schemas'

import {
	dashboardTool,
	projectInfoWidget,
	projectUsersWidget,
} from '@sanity/dashboard'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { documentInternationalization } from '@sanity/document-internationalization'
import { languageFilter } from '@sanity/language-filter'
import { iconify } from 'sanity-plugin-iconify'
import { table } from '@sanity/table'

import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input'
import { advancedArray } from './src/sanity/plugins/sanity-plugin-advanced-array'
import { Logo } from './src/sanity/static/wazen-logo'

const singletonTypes = ['site']

export default defineConfig({
	name: 'default',
	title: 'Wazen',
	icon: Logo,
	projectId,
	dataset,
	apiVersion,
	basePath: '/admin',

	plugins: [
		structure,
		presentation,
		dashboardTool({
			title: 'Deployment',
			widgets: [projectInfoWidget(), projectUsersWidget()],
		}),
		visionTool({
			title: 'GROQ',
		}),
		documentInternationalization({
			// Required configuration
			supportedLanguages: [
				{ id: 'ar', title: 'Arabic' },
				{ id: 'en', title: 'English' },
			],
			schemaTypes: [
				'site',
				'navigation',
				'page',
				'app.store.app',
				'call.to.action.doc',
				'pricing',
			],
		}),
		languageFilter({
			supportedLanguages: [
				{ id: 'ar', title: 'Arabic' },
				{ id: 'en', title: 'English' },
			],
			defaultLanguages: ['ar'],
			documentTypes: ['blog.category'],
		}),
		inlineSvgInput(),
		iconify({
			collections: ['ph'],
			showName: true,
		}),
		advancedArray(),
		table(),
		codeInput(),
	],

	tasks: { enabled: false },

	scheduledPublishing: {
		enabled: false,
	},

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(
				({ schemaType }) => !singletonTypes.includes(schemaType),
			),
	},

	document: {
		actions: (input, { schemaType }) =>
			singletonTypes.includes(schemaType)
				? input.filter(
						({ action }) =>
							action &&
							['publish', 'discardChanges', 'restore'].includes(action),
					)
				: input,
	},
})
