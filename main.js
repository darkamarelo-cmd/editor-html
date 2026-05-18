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

function formatHTML(html) {

	const tab = '  ';
	let result = '';
	let indent = '';

	html
		.replace(/>\s*</g, '><')
		.split(/(?=<)|(?<=>)/g)
		.forEach(node => {

			if (!node.trim()) return;

			if (node.match(/^<\/\w/)) {
				indent = indent.substring(tab.length);
			}

			result += indent + node.trim() + '\n';

			if (
				node.match(/^<\w[^>]*[^/]>/) &&
				!node.startsWith('<input') &&
				!node.startsWith('<br') &&
				!node.startsWith('<img')
			) {
				indent += tab;
			}
		});

	return result.trim();
}

function convertLists(html) {

	function toRoman(num) {

		const roman = [
			'i','ii','iii','iv','v',
			'vi','vii','viii','ix','x'
		];

		return roman[num - 1] || num;
	}

	// ======================
	// BULLET LIST
	// ======================

	html = html.replace(
		/<ul[^>]*>(.*?)<\/ul>/gs,
		(match, content) => {

			const items =
				[
					...content.matchAll(
						/<li([^>]*)>(.*?)<\/li>/gs
					)
				];

			return items.map(item => {

				const attrs = item[1];
				const text =
					item[2]
						.trim()
						.replace(/\n/g, '');

				let symbol = '•';

				// indentação
				if (
					attrs.includes(
						'list-indent-1'
					)
				) {
					symbol = '○';
				}
				else if (
					attrs.includes(
						'list-indent-2'
					)
				) {
					symbol = '■';
				}

				return `<p>${symbol} ${text}</p>`;

			}).join('');
		}
	);

	// ======================
	// NUMBERED LIST
	// ======================

	html = html.replace(
		/<ol[^>]*>(.*?)<\/ol>/gs,
		(match, content) => {

			const items =
				[
					...content.matchAll(
						/<li([^>]*)>(.*?)<\/li>/gs
					)
				];

			let numeric = 0;
			let alpha = 0;
			let roman = 0;

			return items.map(item => {

				const attrs = item[1];

				const text =
					item[2]
						.trim()
						.replace(/\n/g, '');

				let prefix = '';

				// nível 0
				if (
					!attrs.includes(
						'list-indent-'
					)
				) {

					numeric++;
					alpha = 0;
					roman = 0;

					prefix =
						numeric + '.';
				}

				// nível 1
				else if (
					attrs.includes(
						'list-indent-1'
					)
				) {

					alpha++;
					roman = 0;

					prefix =
						String.fromCharCode(
							96 + alpha
						) + '.';
				}

				// nível 2
				else {

					roman++;

					prefix =
						toRoman(roman)
						+ '.';
				}

				return `<p>${prefix} ${text}</p>`;

			}).join('');
		}
	);

	return html;
}

ClassicEditor
	.create(editorConfig)
	.then(editor => {

		window.editor = editor;

		const output =
			document.getElementById('output');

		function updateHTML() {
		
			if (!output) return;
		
			let html =
				editor.getData();
		
			// Conversão de negrito legado
			html = html
				.replace(
					/<strong>/g,
					'<span style="font-weight:bold;">'
				)
				.replace(
					/<\/strong>/g,
					'</span>'
				)
				.replace(
					/<b>/g,
					'<span style="font-weight:bold;">'
				)
				.replace(
					/<\/b>/g,
					'</span>'
				);
			html =
				formatHTML(html);
			
			html =
				convertLists(html);
			
			html =
				`<div style="text-align:left;">${html}</div>`;
			
			output.value = html;
		}

		// Atualiza em tempo real
		editor.model.document.on(
			'change:data',
			updateHTML
		);

		// Atualiza ao abrir
		updateHTML();

		window.copyHTML = function () {

			navigator.clipboard
				.writeText(output.value)
				.then(() => {
					alert('HTML copiado!');
				});
		};

	})
	.catch(error => {
		console.error(error);
	});
