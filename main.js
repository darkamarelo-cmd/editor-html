import {
    ClassicEditor,
    Autosave,
    Essentials,
    Paragraph,
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

const editorConfig = {
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
	    TodoList,
	    Underline
	],

    heading: {
        options: [
            {
                model: 'paragraph',
                title: 'Parágrafo',
                class: 'ck-heading_paragraph'
            },
            {
                model: 'heading1',
                view: 'h1',
                title: 'Título 1'
            },
            {
                model: 'heading2',
                view: 'h2',
                title: 'Título 2'
            },
            {
                model: 'heading3',
                view: 'h3',
                title: 'Título 3'
            }
        ]
    },

    language: 'pt-br',
    translations: [translations]
};

ClassicEditor
    .create(document.querySelector('#editor'), editorConfig)
    .then(editor => {

        window.editor = editor;

        function updateHTML() {
            document.getElementById('output').value =
                editor.getData();
        }

        editor.model.document.on(
            'change:data',
            updateHTML
        );

        updateHTML();

        window.copyHTML = function () {

            const html =
                document.getElementById('output').value;

            navigator.clipboard
                .writeText(html)
                .then(() => {
                    alert('HTML copiado!');
                });
        };
    })
    .catch(error => {
        console.error(error);
    });
