import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./sa-circular-predictor.css";
import LiveLike from "@livelike/engagementsdk";
import "./components/sa-circular-slider";

@customElement("sa-circular-predictor")
export class CircularPredictor extends LitElement {
  @property({ type: Object }) widgetPayload: any;
  @property({ type: String }) widgetid: string = "";
  @state() isFollowupPublished: boolean = false;
  @state() hasInteracted: boolean = false;
  @state() isUserCorrect: boolean = false;
  @property({ type: Number }) widgetValue?: number;
  @property({ type: Number }) interactedValue?: number;
  @property({ type: Object }) range: {
    min: number;
    max: number;
    step: number;
  } = { min: 0, max: 10, step: 1 };

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.initializeWidget();
  }
  async initializeWidget() {
    try {
      this.widgetPayload = await LiveLike.getWidget({
        id: this.widgetid,
        kind: "text-prediction",
      });
      this.isFollowupPublished =
        this.widgetPayload.follow_ups[0].status === "published";
      const res = await LiveLike.getWidgetsInteractions({
        programId: this.widgetPayload.program_id,
        widgets: [
          {
            kind: this.widgetPayload.kind,
            id: this.widgetPayload.id,
          },
        ],
      });
      this.hasInteracted = Object.keys(res).length > 0;
      if (this.hasInteracted) {
        this.isUserCorrect =
          res[this.widgetPayload.kind][0].is_correct === true;
        this.interactedValue = Number(
          this.widgetPayload.options.find(
            (obj: any) => obj.id === res[this.widgetPayload.kind][0].option_id
          )?.description
        );
      }
      this.setWidgetRange();
    } catch (error) {
      console.log("Error while widget initializing", error);
    }
  }

  setWidgetRange() {
    const option1 = Number(this.widgetPayload.options[0].description);
    const option2 = Number(this.widgetPayload.options[1].description);
    const optionLength = this.widgetPayload.options.length;
    const step = option2 - option1;
    this.range = {
      min: option1,
      max: option1 + step * (optionLength - 1),
      step: step,
    };
  }

  handleSliderChange = (e: CustomEvent<number>) => {
    this.widgetValue = e.detail;
  };

  handleSubmitButtonClicked = async () => {
    const selectedOptionItem = this.widgetPayload.options.find(
      (obj: any) => Number(obj.description) === this.widgetValue
    );
    try {
      //@ts-ignore
      const res = await LiveLike.createWidgetInteraction({
        widgetId: this.widgetPayload.id,
        widgetKind: this.widgetPayload.kind,
        interactionItem: selectedOptionItem,
      });
    } catch (error) {
      console.log("Error while Submitting response", error);
    }
    this.hasInteracted = true;
    this.interactedValue = this.widgetValue;
  };

  renderWidgetText() {
    if (this.isFollowupPublished) {
      if (this.hasInteracted) {
        if (this.isUserCorrect) return "Correct!";
        else return "Incorrect!";
      } else return "Missed!";
    } else {
      if (this.hasInteracted) {
        return html`<button class="predictor-footer-buton disabled">
          Submitted
        </button>`;
      } else {
        return html`<button
          class="predictor-footer-buton ${this.widgetValue !== undefined
            ? ""
            : "disabled"}"
          @click=${this.handleSubmitButtonClicked}
        >
          Submit
        </button>`;
      }
    }
  }
  render() {
    return html`
      <div class="title-container">${this.widgetPayload?.question}</div>
      <sa-circular-slider
        .range=${this.range}
        .value=${this.hasInteracted ? this.interactedValue : 0}
        @change=${this.handleSliderChange}
        .disabled=${this.isFollowupPublished || this.hasInteracted}
        .hasInteracted=${this.hasInteracted}
      ></sa-circular-slider>
      <div class="widget-footer">${this.renderWidgetText()}</div>
    `;
  }
}
