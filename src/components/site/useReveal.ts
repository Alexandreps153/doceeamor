import { useEffect } from "react";

/** Revela elementos .reveal conforme entram na viewport. */
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((node) => {
        node.classList.add("is-visible");
      });
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    const observeRevealNodes = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((node) => {
        observer.observe(node);
      });
    };
    observeRevealNodes();
    const mutationObserver = new MutationObserver(observeRevealNodes);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}
