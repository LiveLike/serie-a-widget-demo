import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./lg-error.css";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("lg-error")
export class LGError extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property({ type: String })
  errorLabel: string =
    "Ups! Wygląda na to, że coś jest nie tak. Odśwież stronę lub spróbuj ponownie wkrótce.";

  @property({ type: String })
  retryButtonLabel: string = "Odśwież";

  @property({ type: Function })
  onRetry?: () => void;

  connectedCallback(): void {
    super.connectedCallback();
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  render() {
    if (!this.errorLabel) {
      return null;
    }
    const retryButton = this.onRetry
      ? html`<button
          class="error-retry-button"
          @click=${() => this.onRetry?.()}
        >
          ${this.retryButtonLabel}
        </button>`
      : "";
    return html`
      <div class="error-container">
        <span class="error-label">${this.errorLabel}</span>
        ${retryButton}
      </div>
    `;
  }
}
