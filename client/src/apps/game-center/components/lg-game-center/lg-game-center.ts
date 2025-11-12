import { html } from "lit";
import { customElement } from "lit/decorators.js";
import "./lg-game-center.css";
import { LivBase } from "../../../../Components/LivBase";
import "../customWidgets/lg-image-poll";
import "../customWidgets/lg-cheer-meter";
import "../customWidgets/sa-circular-predictor";

@customElement("lg-game-center")
export class LGGameCenter extends LivBase {
  renderContent() {
    return html`
      <div class="game-center">
        <image-poll
          widgetid="84da4005-935e-4e53-8ac1-367b47454bac"
          kind="image-poll"
        ></image-poll>
        <cheer-meter
          widgetid="0119fa2a-5c32-40df-9cee-5672f9df811e"
          kind="cheer-meter"
        ></cheer-meter>
        <sa-circular-predictor
          widgetid="0be90515-804a-453a-a702-2f2c6382c663"
        ></sa-circular-predictor>
      </div>
    `;
  }
}
