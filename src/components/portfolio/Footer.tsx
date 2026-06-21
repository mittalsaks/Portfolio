import { useQuery } from "@tanstack/react-query";
import { profileApi } from "@/lib/api/resources";

export function Footer() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile,
  });

  return (
    <footer className="border-t border-[color:var(--c-border)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[color:var(--c-text-dim)]">
        <p>
          © {new Date().getFullYear()} {profile?.name ?? "..."}. Built with care &amp; caffeine.
        </p>
        <p className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--c-accent)]" />
          coded by hand
          <a
            href="/admin/login"
            aria-label="Admin"
            className="ml-2 opacity-40 transition-opacity hover:opacity-100 hover:text-[color:var(--c-accent)]"
          >
            {"</>"}
          </a>
        </p>
      </div>
    </footer>
  );
}