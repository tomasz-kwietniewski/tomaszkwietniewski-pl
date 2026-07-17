import MarkdownIt from "markdown-it";

// html:true przepuszcza surowy HTML z WordPressa 1:1, a czysty markdown
// (przyszłe wpisy z Pages CMS) renderuje normalnie.
export const md = new MarkdownIt({ html: true, linkify: false, breaks: false });
