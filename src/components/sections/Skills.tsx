export default function Skills() {
  const skills = ["React", "TypeScript", "GitHub Actions", "WebdriverIO", "Appium", "Jenkins", "Docker", "SQL"];
  return (
    <section id="skills" className="py-6">
      <h2 className="text-2xl font-semibold">Skills</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {skills.map((s) => (
          <li key={s} className="rounded-full border px-3 py-1 text-sm">{s}</li>
        ))}
      </ul>
      <hr className="my-6" />
    </section>
  );
}
