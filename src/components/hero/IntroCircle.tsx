type Props = { name?: string; tagline?: string };
export default function IntroCircle({ name = "Name", tagline = "Current role and brief description text goes here." }: Props) {
  return (
    <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border text-center p-3">
      <div className="text-lg font-semibold">Hi, I’m</div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
