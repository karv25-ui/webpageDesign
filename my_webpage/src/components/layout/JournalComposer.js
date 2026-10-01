import { useState } from 'react';
import './JournalComposer.css';

function defaultDate() {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function buildPostSnippet({ date, title, mood, tags, body, imageVar }) {
  const tagList = tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const lines = ['  {'];
  lines.push(`    date: ${JSON.stringify(date)},`);
  lines.push(`    title: ${JSON.stringify(title)},`);
  if (mood.trim()) lines.push(`    mood: ${JSON.stringify(mood.trim())},`);
  if (tagList.length > 0) {
    lines.push(`    tags: [${tagList.map((t) => JSON.stringify(t)).join(', ')}],`);
  }
  lines.push('    body: `' + body.trim().replace(/`/g, '\\`') + '`,');
  if (imageVar.trim()) {
    lines.push(`    media: { type: 'image', src: ${imageVar.trim()} },`);
  } else {
    lines.push('    media: null,');
  }
  lines.push('  },');

  return lines.join('\n');
}

function JournalComposer() {
  const [date, setDate] = useState(defaultDate());
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState('');
  const [body, setBody] = useState('');
  const [imageVar, setImageVar] = useState('');
  const [copyStatus, setCopyStatus] = useState('idle'); // idle | copied | failed

  const snippet = buildPostSnippet({ date, title, mood, tags, body, imageVar });
  const canGenerate = title.trim() && body.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
    setTimeout(() => setCopyStatus('idle'), 2500);
  };

  return (
    <div className="composer">
      <section className="composer-intro">
        <p className="composer-eyebrow">Journal Composer</p>
        <h1 className="composer-title">Write a Post</h1>
        <p className="composer-subtitle">
          Fill this out, then copy the generated snippet into the{' '}
          <code>POSTS</code> array at the top of Blog.js. This page isn't
          linked anywhere — it doesn't publish anything on its own, it just
          formats the JavaScript for you.
        </p>
      </section>

      <div className="composer-form">
        <div className="composer-field">
          <label htmlFor="c-date">Date</label>
          <input id="c-date" type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="composer-field">
          <label htmlFor="c-title">Title</label>
          <input id="c-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="composer-row">
          <div className="composer-field">
            <label htmlFor="c-mood">Current mood (optional)</label>
            <input id="c-mood" type="text" value={mood} onChange={(e) => setMood(e.target.value)} />
          </div>
          <div className="composer-field">
            <label htmlFor="c-tags">Tags (comma-separated, optional)</label>
            <input
              id="c-tags"
              type="text"
              placeholder="photography, life"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        <div className="composer-field">
          <label htmlFor="c-body">Body — blank line between paragraphs</label>
          <textarea
            id="c-body"
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="composer-field">
          <label htmlFor="c-image">
            Image import variable name (optional — the name you'll give the
            import in Blog.js, e.g. <code>post1Image</code>)
          </label>
          <input id="c-image" type="text" value={imageVar} onChange={(e) => setImageVar(e.target.value)} />
        </div>
      </div>

      <section className="composer-output">
        <div className="composer-output-header">
          <h2>Generated snippet</h2>
          <button type="button" onClick={handleCopy} disabled={!canGenerate} className="composer-copy">
            {copyStatus === 'copied' ? 'Copied!' : copyStatus === 'failed' ? 'Copy failed — select manually' : 'Copy'}
          </button>
        </div>

        {imageVar.trim() && (
          <p className="composer-note">
            Don't forget to add this import near the top of Blog.js:
            <br />
            <code>{`import ${imageVar.trim()} from './journal/your-image.jpg';`}</code>
          </p>
        )}

        <pre className="composer-pre">
          <code>{canGenerate ? snippet : '// fill in at least a title and body to generate'}</code>
        </pre>
      </section>
    </div>
  );
}

export default JournalComposer;