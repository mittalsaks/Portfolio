import { useEffect, useState } from "react";

export function useTypewriter(words: string[], { type = 80, erase = 40, pause = 1400 } = {}) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const current = words[i % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((v) => (v + 1) % words.length);
    } else {
      timer = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
          );
        },
        deleting ? erase : type,
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, i, words, type, erase, pause]);

  return text;
}
