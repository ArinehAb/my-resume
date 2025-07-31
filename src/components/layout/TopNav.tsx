export default function TopNav() {
  const link = "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100";
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6 lg:px-8 h-14">
        <div className="font-semibold">My Resume</div>
        <ul className="flex gap-2">
          <li><a className={link} href="#about">About Me</a></li>
          <li><a className={link} href="#skills">Skills</a></li>
          <li><a className={link} href="#projects">Projects</a></li>
          <li><a className={link} href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
