export function Honeypot() {
  return (
    <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden>
      <label htmlFor="website">Company website</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
