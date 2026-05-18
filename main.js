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
		Underline,
		TableBorderPlugin
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

	const parser =
		new DOMParser();

	const doc =
		parser.parseFromString(
			html,
			'text/html'
		);

	let result = '';

	function processList(list, level = 0) {

		let counter = 0;

		list
			.querySelectorAll(':scope > li')
			.forEach(li => {

				counter++;

				let prefix = '';

				// BULLET / TODO LIST
				if (list.tagName === 'UL') {
				
					// lista checkbox do CKEditor
					const isTodoList =
						list.classList.contains('todo-list');
				
					// checkbox NÃO usa bullet
					if (isTodoList) {
				
						prefix = '';
				
					} else {
				
						if (level === 0)
							prefix = '•';
				
						else if (level === 1)
							prefix = '○';
				
						else
							prefix = '■';
					}
				}

				// NUMBERED
				else {

					if (level === 0) {

						// 1. 2. 3.
						prefix =
							counter + '.';
					}
					
					else if (level === 1) {
					
						// a. b. c.
						prefix =
							String.fromCharCode(
								96 + counter
							) + '.';
					}
					
					else if (level === 2) {
					
						// i. ii. iii.
						prefix =
							toRoman(counter)
							+ '.';
					}
					
					else if (level === 3) {
					
						// A. B. C.
						prefix =
							String.fromCharCode(
								64 + counter
							) + '.';
					}
					
					else {
					
						// I. II. III.
						prefix =
							toRoman(counter)
								.toUpperCase()
							+ '.';
					}
				}

				// pega apenas texto
				const clone =
					li.cloneNode(true);

				clone
					.querySelectorAll(
						'ul,ol'
					)
					.forEach(el =>
						el.remove()
					);

				const text =
					clone.innerHTML
						.replace(/\n/g, ' ')
						.replace(/\s+/g, ' ')
						.trim();

				const margin =
					level * 20;
				
				result +=
					`\n<p style="margin-left:${margin}px;">${prefix} ${text}</p>\n`;

				// processa sublista
				li.querySelectorAll(
					':scope > ul, :scope > ol'
				)
				.forEach(subList => {

					processList(
						subList,
						level + 1
					);
				});
			});
	}

	// percorre body
	doc.body.childNodes.forEach(node => {

		// listas
		if (
			node.tagName === 'UL' ||
			node.tagName === 'OL'
		) {

			processList(node);
		}
		else {

			result +=
				node.outerHTML ||
				node.textContent;
		}
	});

	return result;
}

window.setTableBorder = function ( type ) {

	const editor = window.editor;
	const selection = editor.model.document.selection;

	editor.model.change( writer => {

		let changed = false;

		for ( const range of selection.getRanges() ) {

			for ( const item of range.getItems() ) {

				if ( item.name === 'tableCell' ) {

					if ( type === 'none' ) {
						writer.removeAttribute(
							'tableBorder',
							item
						);
					} else {
						writer.setAttribute(
							'tableBorder',
							type,
							item
						);
					}

					changed = true;
				}
			}
		}

		// fallback caso seleção não pegue direto a célula
		if ( !changed ) {

		let pos = selection.getFirstPosition();
		let cell = pos && pos.findAncestor( 'tableCell' );

			if ( cell ) {

				if ( type === 'none' ) {
					writer.removeAttribute('tableBorder', cell);
				} else {
					writer.setAttribute('tableBorder', type, cell);
				}
			}
		}
	});

	updateHTML?.();
};


let updateHTML = null;

function TableBorderPlugin(editor) {

	// 1. Schema (OK)
	editor.model.schema.extend('tableCell', {
		allowAttributes: ['tableBorder']
	});

	// 2. DOWNCAST (MODEL → VIEW) ✔ ESSENCIAL
	editor.conversion.for('downcast').attributeToElement({
		model: 'tableBorder',
		view: (value) => {

			if (!value) return;

			const styles = {
				all: { border: '1px solid #000' },
				top: { 'border-top': '1px solid #000' },
				right: { 'border-right': '1px solid #000' },
				bottom: { 'border-bottom': '1px solid #000' },
				left: { 'border-left': '1px solid #000' }
			};

			return {
				name: 'td',
				styles: styles[value]
			};
		}
	});

	// 3. UPCAST (SIMPLIFICADO E SEGURO)
	editor.conversion.for('upcast').elementToAttribute({
		view: {
			name: 'td'
		},
		model: {
			key: 'tableBorder',
			value: viewElement => {

				const style = viewElement.getStyle?.() || {};

				if (style.border) return 'all';
				if (style['border-top']) return 'top';
				if (style['border-right']) return 'right';
				if (style['border-bottom']) return 'bottom';
				if (style['border-left']) return 'left';

				return null;
			}
		}
	});
}

ClassicEditor
	.create(editorConfig)
	.then(editor => {

		window.editor = editor;

		const output =
			document.getElementById('output');

		updateHTML = function () {
		
			if (!output) return;
		
			let html = window.editor.getData();
		
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
