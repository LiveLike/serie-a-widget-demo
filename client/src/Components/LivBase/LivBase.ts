import { LitElement, html } from "lit-element";
import { property } from "lit/decorators.js";

import { appController } from "../../store";
import "../Loader";
import "../../apps/game-center/components/lg-error/";

const CLIENT_ID = import.meta.env.VITE_LL_CLIENT_ID;

export class LivBase extends LitElement {
  @property({ type: Boolean }) loading: boolean = true;
  @property({ type: String }) error: boolean = false;
  @property({ type: String }) accessToken: string | null = null;
  @property({ type: Object }) profile: any = {};

  retryFn?: () => void;

  protected createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.initializeAndFetchData();
  }

  async removeAccessToken() {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(`livelike-user-auth-${CLIENT_ID}`);
      }
    } catch (error) {
      console.error(
        "Error while removing access token from local storage:",
        error
      );
      this.loading = false;
      this.error = true;
    }
  }

  async initializeAndFetchData() {
    try {
      // await this.removeAccessToken();
      const res = await appController.initializeLivelike({
        clientId: CLIENT_ID,
        accessToken: this.accessToken ?? "",
      });
      this.profile = res;
      this.loading = false;
    } catch {
      this.error = true;
      this.loading = false;
      this.retryFn = () => window.location.reload();
    }
  }

  renderContent() {
    // Override this method in child classes to provide their specific main content
  }

  render() {
    if (this.loading) {
      return html`<ll-loader></ll-loader>`;
    }

    if (this.error) {
      return html`<lg-error
        .onRetry=${() => window.location.reload()}
      ></lg-error>`;
    }
    return html`${this.renderContent()}`;
  }
}

customElements.define("liv-base", LivBase);
