export default function EmbedTestPage() {
  return (
    <main className="min-h-screen bg-[#0A192F] p-8 text-[#CCD6F6]">
      <h1 className="ui-label text-lg tracking-[0.2em] uppercase mb-6">
        Embed Preview
      </h1>

      <iframe
        src="http://localhost:3000/embed?url=%2FStatic%20%26%20Sync%20-%20S01E01%20-%20Test%20Audio%20for%20Transcripts.mp3&title=Static%20%26%20Sync%20-%20S01E01%20-%20Test%20Audio%20for%20Transcripts"
        width="100%"
        height="240"
        style={{ border: 0, maxWidth: 400, overflow: "hidden" }}
        scrolling="no"
        allow="autoplay"
        className="rounded-lg bg-[#112240]"
      />
    </main>
  );
}
