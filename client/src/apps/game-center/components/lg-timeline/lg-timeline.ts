import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./timeline.css";
import "../customWidgets";

enum WidgetKind {
  IMAGE_POLL = "image-poll",
  CHEER_METER = "cheer-meter",
}

@customElement("lg-timeline")
export class LGTimeline extends LitElement {
  @property({ type: String })
  programId: string = "";

  @property({ type: Boolean })
  loading: boolean = true;

  @property({ type: Number })
  widgetCount: number | undefined = undefined;

  filterLGWidget() {
    setTimeout(() => {
      const widgets = document.querySelector("livelike-widgets");

      const combinedInitialHandler = (args: any) => {
        this.widgetCount = args.widgets.length;
        return args.widgets;
      };

      const CustomWidgetRenderer = (args: any) => {
        const widgetPayload = args.widgetPayload;
        switch (widgetPayload.kind) {
          case WidgetKind.IMAGE_POLL:
            return document.createElement("lg-image-poll");
          case WidgetKind.CHEER_METER:
            return document.createElement("cheer-meter");
          default:
            return document.createElement("div");
        }
      };

      const combinedWidgetReceivedHandler = (widgetPayload: any) => {
        this.widgetCount = (this.widgetCount || 0) + 1;
        return widgetPayload;
      };

      if (widgets) {
        //@ts-ignore
        widgets.onInitialWidgetsLoaded = combinedInitialHandler;
        //@ts-ignore
        widgets.onMoreWidgetsLoaded = combinedInitialHandler;
        //@ts-ignore
        widgets.customWidgetRenderer = CustomWidgetRenderer;
        //@ts-ignore
        widgets.onWidgetReceived = combinedWidgetReceivedHandler;
      }
    }, 0);
  }

  preventDoubleClick() {
    document.addEventListener(
      "dblclick",
      function (event) {
        event.preventDefault();
      },
      { passive: false }
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("interacted", this.widgetInteractedCallback);
    this.filterLGWidget();
    this.preventDoubleClick();
  }

  widgetInteractedCallback = (evt: any) => {
    const { widget, element, item, interacted } = evt.detail;

    if (interacted && widget.kind === WidgetKind.CHEER_METER) {
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
    }
  };

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  renderEmptyWidgets() {
    return html`
      <div class="empty-container">
        <span class="sub-text-empty">No Widget Published.</span>
      </div>
    `;
  }

  render() {
    return html`
      ${this.widgetCount === 0 ? this.renderEmptyWidgets() : null}
      <livelike-widgets
        programId=${this.programId}
        mode="interactive-timeline"
        class="widget-styles"
        ?disabled=${this.widgetCount === 0}
      >
        <div slot="widgets-loading" class="loading-container">
          <ui-loader loadingLabel="Loading..."></ui-loader>
        </div>
      </livelike-widgets>
    `;
  }
}
