import { site } from '../content/site'

// „Szybkie wyjście”: zastępuje tę stronę neutralną, więc przycisk „Wstecz” do niej nie wraca.
export function quickExit() {
  window.location.replace(site.exitUrl)
}
