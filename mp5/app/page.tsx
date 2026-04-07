import Shortener from "@/components/Shortener";
import createShortUrl from "@/lib/shortenUrl";

export default function Home() {
  return (
    <main>
      <h1 className="mt-10 text-center text-4xl font-semibold">URL Shortener</h1>
      <h3 className="mt-4 text-center text-2xl">Shorten your links with ease!</h3>
      <Shortener createShortUrl={createShortUrl} />
    </main>
  );
}
