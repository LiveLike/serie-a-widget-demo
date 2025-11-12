import { LiveLikeCheerMeter } from "@livelike/engagementsdk";
import "../cheer-option";
import "../vote-count";
import "./cheer-meter.css";
const html = (window as any).html;

class CheerMeter extends LiveLikeCheerMeter {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("interacted", this.widgetInteractedCallback);
  }
  widgetInteractedCallback = (evt: any) => {
    const { widget, element, item } = evt.detail;

    const optionSelected = item.id;

    const newPayload = element.widgetPayload;
    element.widgetPayload = { ...newPayload };

    const optionIndex = widget.options.findIndex(
      (option: any) => option.id === optionSelected
    );

    if (optionIndex !== -1) {
      widget.options[optionIndex].vote_count += 1;
    }

    const updatedOptions = [...widget.options];
    element.options = updatedOptions;

    const countvalue = updatedOptions.reduce(
      (a: any, c: any) => a + c.vote_count,
      0
    );

    element.count = countvalue;
  };
  render() {
    return html`
      <template kind="cheer-meter" id="custom-cheer">
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            <div class="cheer-image-body">
              <vote-count></vote-count>
              <livelike-select class="image-grid">
                <template>
                  <livelike-option>
                    <cheer-option></cheer-option>
                    <livelike-description></livelike-description>
                  </livelike-option>
                </template>
              </livelike-select>
            </div>
          </livelike-widget-body>
          ${this.widgetPayload.interactive_until &&
          Date.now() > new Date(this.widgetPayload.interactive_until).getTime()
            ? html`<div class="expire-text">Expired</div>`
            : null}
        </livelike-widget-root>
      </template>
    `;
  }
}
customElements.define("cheer-meter", CheerMeter as any);
