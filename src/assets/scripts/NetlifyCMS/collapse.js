CMS.registerEditorComponent({
  // Internal id of the component
  id: "collapse",

  // Visible label in NetlifyCMS
  label: "Collapse",

  // Fields the user needs to fill out when adding an instance of the component. Follows the NetlifyCMS pattern:
  //  https://www.netlifycms.org/docs/widgets/
  fields: [
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'content', label: 'Content', widget: 'markdown' }
  ],

  // Pattern to identify a block as being an instance of this component.

  // Shortcode pattern
  pattern: /^{\% collapse \"(\S+)\" \%}([\s\S]*?){\% endcollapse \%}$/,

  // HTML pattern
  // pattern: /^<details>$\s*?<summary>(.*?)<\/summary>\n\n(.*?)\n^<\/details>$/ms,


  // Function to extract the data from the matched block
  fromBlock: function(match) {
    return {
      title: match[1] ? match[1].trim() : '',
      content: match[2] ? match[2].trim() : ''
    };
  },

  // Function to create a block from an instance of this component
  toBlock: function(obj) {
    return `{% collapse "${obj.title}" %}\n${obj.content}\n{% endstrong %}`;
  },

  // What to preview in NetlifyCMS
  toPreview: function(obj) {
    return (
      `<details>
        <summary>${obj.title}</summary>
        ${obj.content}
      </details>`
    );
  }
});
