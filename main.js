/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoNgNARAzAdADDKFIEYDsAWATFgrFbAThCzTmLRAA5CUs4rtcGoqqoQOUNOMNkIABwAuAWgBGAJ2RwwwFGFmyFKgLqQAxmioBTZoQiqgA===
 */

import {
	ClassicEditor,
	Autosave,
	Essentials,
	Paragraph,
	Autoformat,
	TextTransformation,
	Link,
	Bold,
	Table,
	TableToolbar,
	Heading,
	Indent,
	IndentBlock,
	Italic,
	List,
	MediaEmbed,
	TodoList,
	Underline,
	Fullscreen,
	Strikethrough,
	FontColor,
	FontBackgroundColor,
	Alignment,
	GeneralHtmlSupport,
	ShowBlocks,
	SourceEditing
} from 'ckeditor5';

import translations from 'ckeditor5/translations/pt-br.js';

/**
 * Create a free account with a trial: https://portal.ckeditor.com/checkout?plan=free
 */
const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

const editorConfig = {
	attachTo: document.querySelector('#editor'),
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',
			'sourceEditing',
			'showBlocks',
			'fullscreen',
			'|',
			'heading',
			'|',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'|',
			'link',
			'mediaEmbed',
			'insertTable',
			'|',
			'alignment',
			'|',
			'bulletedList',
			'numberedList',
			'todoList',
			'outdent',
			'indent'
		],
		shouldNotGroupWhenFull: false
	},
	plugins: [
		Alignment,
		Autoformat,
		Autosave,
		Bold,
		Essentials,
		FontBackgroundColor,
		FontColor,
		Fullscreen,
		GeneralHtmlSupport,
		Heading,
		Indent,
		IndentBlock,
		Italic,
		Link,
		List,
		MediaEmbed,
		Paragraph,
		ShowBlocks,
		SourceEditing,
		Strikethrough,
		Table,
		TableToolbar,
		TextTransformation,
		TodoList,
		Underline
	],
	licenseKey: LICENSE_KEY,
	fullscreen: {
		onEnterCallback: container =>
			container.classList.add(
				'editor-container',
				'editor-container_classic-editor',
				'editor-container_include-fullscreen',
				'main-container'
			)
	},
	heading: {
		options: [
			{
				model: 'paragraph',
				title: 'Paragraph',
				class: 'ck-heading_paragraph'
			},
			{
				model: 'heading1',
				view: 'h1',
				title: 'Heading 1',
				class: 'ck-heading_heading1'
			},
			{
				model: 'heading2',
				view: 'h2',
				title: 'Heading 2',
				class: 'ck-heading_heading2'
			},
			{
				model: 'heading3',
				view: 'h3',
				title: 'Heading 3',
				class: 'ck-heading_heading3'
			},
			{
				model: 'heading4',
				view: 'h4',
				title: 'Heading 4',
				class: 'ck-heading_heading4'
			},
			{
				model: 'heading5',
				view: 'h5',
				title: 'Heading 5',
				class: 'ck-heading_heading5'
			},
			{
				model: 'heading6',
				view: 'h6',
				title: 'Heading 6',
				class: 'ck-heading_heading6'
			}
		]
	},
	htmlSupport: {
		allow: [
			{
				name: /^.*$/,
				styles: true,
				attributes: true,
				classes: true
			}
		]
	},
	language: 'pt-br',
	link: {
		addTargetToExternalLinks: true,
		defaultProtocol: 'https://',
		decorators: {
			toggleDownloadable: {
				mode: 'manual',
				label: 'Downloadable',
				attributes: {
					download: 'file'
				}
			}
		}
	},
	menuBar: {
		isVisible: true
	},
	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
	},
	translations: [translations]
};

ClassicEditor.create(editorConfig);
