type Props = { src?: string; alt?: string };
export default function ProfileCircle({ src, alt = "Profile photo" }: Props) {
  return (
    <div className="flex h-40 w-40 items-center justify-center rounded-full border">
      {src ? (
        <img src={src} alt={alt} className="h-40 w-40 rounded-full object-cover" />
      ) : (
        <div aria-hidden className="h-32 w-32 rounded-full border" />
      )}
    </div>
  );
}
