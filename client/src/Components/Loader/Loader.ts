import { html, LitElement } from "lit";

import "./Loader.css";

class Loader extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <div class="ui-loader-container">
        <img src=${"/serie-a-logo.svg"} alt="loader" class="ui-loader-main" />
      </div>
    `;
  }
}

customElements.define("ll-loader", Loader as any);
