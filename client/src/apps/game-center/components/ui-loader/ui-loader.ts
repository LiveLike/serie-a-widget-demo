import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./ui-loader.css";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("ui-loader")
export class UILoader extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property({ type: String })
  loadingLabel: string = "";

  /**
   * The number of times the button has been clicked.
   */
  //   @state()
  //   count = 0;

  connectedCallback(): void {
    super.connectedCallback();
  }

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  renderLoadingLabel() {
    if (!this.loadingLabel) {
      return null;
    }
    return html`<span class="ui-loader-label">${this.loadingLabel}</span>`;
  }

  renderLoadingSpinner() {
    return html` <img
      src="/images/loader.png"
      height="28"
      width="28"
      class="ui-loader-spinner"
    />`;
  }

  render() {
    return html`<div class="ui-loader-container">
      ${this.renderLoadingSpinner()}${this.renderLoadingLabel()}
    </div>`;
  }
}
