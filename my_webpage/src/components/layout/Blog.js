/* This is the Blog component for the website/app
* This will contain the blogs for Kaptured Moment.
* Debating on whether if it can be publishing for other people or if I am the only person publishing.
- Public Publishing
* There will be a buttom at the top right header or the top right of the page that will say "Publish Your Blog Here!". 
* Once button is pressed, the page will redirect the user to a form page. (Where they have to fill out all the proper requirements for the publishing)
* There will be options to either upload a file for your blog or to create your blog from the form itself.
* Once all the requirements are filled out, users will have the option to preview what their blog will look like.
* There will be a requirement checklist that will be displayed to the user to ensure that they have filled out all the requirements for publishing their blog.
* There will be rules and regulations that the user must agree to before they can submit their blog for publishing.
* There will be rules and regulations for the user to follow when creating their blog. (ex. no hate speech, no nudity, etc.)
* Once the user is satisfied with their blog, they can submit it for publishing.
* Users can upload their own images for their blog or they can use the images that are provided by Kaptured Moment.
* Users can choose to make their blog public or private. (everyone can see it or only the user can see it)
* Users can upload their own videos for their blog or they can use the videos that are provided by Kaptured Moment.
* Users can upload their own audio for their blog or they can use the audio that is provided by Kaptured Moment. 
* Users can upload their own documents for their blog. 
* Users can upload their own files for their blog.
* Users can choose to upload their references for their blog 
(ex. if they are using a quote from a book, they can upload the book or a screenshot of the book or website that they are using for their reference)
- Personal Publishing
* There will be a button at the top right header or the top right of the page that will say "Create Your Blog Here!".
* Once button is pressed, the page will redirect the user to a form page. (Where they have to fill out all the proper requirements for creating their blog)
* There will be options to either upload a file for your blog or to create your blog from the form itself.
* Once all the requirements are filled out, the user will have the option to preview what their blog will look like.
* There will be a requirement checklist that will be displayed to the user to ensure that they have filled out all the requirements for creating their blog.
* There will be rules and regulations that the user must agree to before they can submit their blog for creating.
* There will be rules and regulations for the user to follow when creating their blog. (ex. no hate speech, no nudity, etc.)
* Once the user is satisfied with their blog, they can submit it for creating.
* Mainly everything will be the same as the public publishing, but the only difference is that the user will not have admin access.

* Make these blogs look like social media posts. 
* I want it to have the vibe of MySpace, Tumblr & Threads. The way those apps funcition and just the aesthetic of those apps is how I want this blog section to look like 
and operate. I want it to be a social media platform for blogs. I want it to be a place where people can share their thoughts and ideas with the world. I want it to be a place where people can connect with each other and have discussions about different topics. 
I want it to be a place where people can express themselves freely and creatively. I want it to be a place where people can find inspiration and motivation from others. 
I want it to be a place where people can learn from each other and grow together. 
I want it to be a place where people can have fun and enjoy themselves. I want it to be a place where people can feel safe and comfortable. 
I want it to be a place where people can be themselves and not have to worry about being judged or criticized.
 I want it to be a place where people can feel like they belong and are part of a community. 
 I want it to be a place where people can feel like they are making a difference in the world. 
 I want it to be a place where people can feel like they are part of something bigger than themselves. 
 I want it to be a place where people can feel like they are part of something special and unique. 
 I want it to be a place where people can feel like they are part of something that is worth fighting for. 
 I want it to be a place where people can feel like they are part of something that is worth living for.

* I want the blogs to be like a journal or diary, a place where people can dump their thoughts, feelings or ideas. I want it to be a place where people can express themselves freely and creatively.
  I want it to be a place where people can connect with each other and have discussions about different topics.
*/

import './Blog.css';

// ---- Journal posts — personal only, manually maintained ----
// Add a new entry to the TOP of this array whenever you want to post.
// `mood` and `tags` are optional — leave either out and that part just
// won't render. `body` can be multiple paragraphs — separate them with a
// blank line and each becomes its own paragraph. For an image, import it
// the same way we've done elsewhere (About.js self-portraits, Home.js
// background) to avoid a broken-import build error:
//   import post1Image from './journal/post1.jpg';
// then: media: { type: 'image', src: post1Image }
const POSTS = [
  // {
  //   date: 'September 2026',
  //   title: 'Post title',
  //   mood: 'inspired',
  //   tags: ['photography', 'behind-the-scenes'],
  //   body: `First paragraph.
  //
  // Second paragraph.`,
  //   media: null,
  // },
];

function PostBody({ body }) {
  const paragraphs = body.split(/\n\s*\n/);
  return paragraphs.map((p, i) => <p key={i}>{p.trim()}</p>);
}

function PostCard({ post }) {
  return (
    <article className="post-card">
      <div className="post-meta">
        <span className="post-date">{post.date}</span>
        {post.mood && <span className="post-mood">current mood: {post.mood}</span>}
      </div>

      <h2 className="post-title">{post.title}</h2>

      {post.media?.type === 'image' && (
        <img src={post.media.src} alt="" className="post-media" />
      )}

      <div className="post-body">
        <PostBody body={post.body} />
      </div>

      {post.tags?.length > 0 && (
        <ul className="post-tags">
          {post.tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

function Blog() {
  return (
    <div className="blog">
      <section className="blog-intro">
        <p className="blog-eyebrow">The Journal</p>
        <h1 className="blog-title">
          Thoughts, Behind the Scenes &amp; Everything In Between!
        </h1>
        <p className="blog-subtitle">
          A running log of what's on my mind — the creative process, life
          behind the lens, and whatever else feels worth writing down.
        </p>
      </section>

      <section className="blog-feed">
        {POSTS.length === 0 ? (
          <div className="blog-empty">
            No posts yet — Entries will appear here once they are published. Check back soon!
          </div>
        ) : (
          POSTS.map((post, i) => <PostCard post={post} key={i} />)
        )}
      </section>
    </div>
  );
}

export default Blog;