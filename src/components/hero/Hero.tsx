import ProfileCircle from "./ProfileCircle";
import IntroCircle from "./IntroCircle";

export default function Hero() {
  return (
    <section className="py-6">
      <div className="flex flex-wrap items-center gap-8">
        <nav className="flex w-full justify-center gap-8 text-sm font-medium md:hidden">
          <a href="#about">About Me</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>

        <ProfileCircle />
        <div className="flex flex-col gap-2">
          <IntroCircle />
          <p className="max-w-md text-sm text-gray-600">
            Current role and brief description text goes here.
          </p>
        </div>
      </div>

      <hr className="my-6" />
    </section>
  );
}
