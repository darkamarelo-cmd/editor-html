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

const LICENSE_KEY = 'GPL';

/* =========================
   CONFIG
========================= */

const editorConfig = {
	attachTo: document.querySelector('#editor'),

	toolbar: {
		items: [
			'undo', 'redo', '|',
			'sourceEditing', 'showBlocks', 'fullscreen', '|',
			'heading', '|',
			'fontColor', 'fontBackgroundColor', '|',
			'bold', 'italic', 'underline', 'strikethrough', '|',
			'link', 'mediaEmbed', 'insertTable', '|',
			'alignment', '|',
			'bulletedList', 'numberedList', 'todoList',
			'outdent', 'indent'
		]
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

	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
	},

	language: 'pt-br',
	translations: [translations]
};

/* =========================
   TABLE BORDER PLUGIN (CORRIGIDO)
========================= */

function TableBorderPlugin(editor) {

	editor.model.schema.extend('tableCell', {
		allowAttributes: ['tableBorder']
	});

	// MODEL → VIEW
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

	// HTML → MODEL (seguro)
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

/* =========================
   SET BORDER (MODEL ONLY)
========================= */

window.setTableBorder = function (type) {

	const editor = window.editor;
	const selection = editor.model.document.selection;

	editor.model.change(writer => {

		let applied = false;

		for (const range of selection.getRanges()) {

			for (const item of range.getItems()) {

				if (item.name === 'tableCell') {

					if (type === 'none') {
						writer.removeAttribute('tableBorder', item);
					} else {
						writer.setAttribute('tableBorder', type, item);
					}

					applied = true;
				}
			}
		}

		// fallback
		if (!applied) {

			const pos = selection.getFirstPosition();
			const cell = pos && pos.findAncestor('tableCell');

			if (cell) {

				if (type === 'none') {
					writer.removeAttribute('tableBorder', cell);
				} else {
					writer.setAttribute('tableBorder', type, cell);
				}
			}
		}
	});

	updateHTML?.();
};

/* =========================
   FORMAT HTML
========================= */

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

/* =========================
   LIST CONVERSION
========================= */

function convertLists(html) {

	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');

	let result = '';

	doc.body.childNodes.forEach(node => {
		result += node.outerHTML || node.textContent;
	});

	return result;
}

/* =========================
   INIT EDITOR
========================= */

let updateHTML = null;

ClassicEditor.create(editorConfig)
	.then(editor => {

		window.editor = editor;

		const output = document.getElementById('output');

		updateHTML = function () {

			if (!output) return;

			let html = editor.getData();

			html = html
				.replace(/<strong>/g, '<span style="font-weight:bold;">')
				.replace(/<\/strong>/g, '</span>')
				.replace(/<b>/g, '<span style="font-weight:bold;">')
				.replace(/<\/b>/g, '</span>');

			html = formatHTML(html);
			html = convertLists(html);

			output.value = `<div style="text-align:left;">${html}</div>`;
		};

		editor.model.document.on('change:data', updateHTML);

		updateHTML();

		window.copyHTML = function () {
			navigator.clipboard.writeText(output.value);
		};
	})
	.catch(console.error);
