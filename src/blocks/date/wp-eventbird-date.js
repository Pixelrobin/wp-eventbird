const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'eventbird/date', {
  title: 'EventBird Date',

  icon: 'dashicons-calendar-alt',

  category: 'layout',

  attributes: {
    content: {
      type: 'array',
      source: 'children',
      selector: 'p'
    }
  },

  edit({ attributes, className, setAttributes }) {
    const { content } = attributes;

    function onChangeContent(newContent) {
      setAttributes({ content: newContent });
    }

    return (
      <RichText
        tagName="p"
        className={ className }
        onChange={ onChangeContent }
        value={ content }
      />
    );
  },

  save({ attributes, className }) {
    const { content } = attributes;

    return (
      <RichText.Content 
        tagName="p" 
        className={ className } 
        value={ content } 
      />
    );
  }
});