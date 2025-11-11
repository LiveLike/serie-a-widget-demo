import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fetchProgramByAppType } from "../../api";
import { ProgramResults } from "../../types";
import "./lg-game-center.css";
import "../ui-loader";
import "../lg-timeline"
import { LivBase } from "../../../../Components/LivBase";


@customElement("lg-game-center")
export class LGGameCenter extends LivBase {
  @state() program?: ProgramResults;

  @state() programLoading: boolean = true;

  @property({ type: String }) programId: string = "";

  async connectedCallback() {
    super.connectedCallback();
    try {
      await this.getProgramDetails();
    } catch (e: unknown) {
      console.error("Error while Fetching Program: ", e);
      this.error = true;
    } finally {
      this.programLoading = false;
    }
  }

  async getProgramDetails() {
    try {
      const programResults = await fetchProgramByAppType({
        status: "live",
        title: "Three Widgets Testing",
      });
      this.programId=programResults?.results[0]?.id;
    } catch (error) {
      console.error("Error during getProgramDetails:", error);
      this.retryFn = () => this.getProgramDetails();
      this.error = true;
    } finally {
      this.programLoading = false;
    }
  }

  renderLoader() {
    return html`<ui-loader loadingLabel="Loading..."></ui-loader>`;
  }

  renderContent() {
    if (this.programLoading || this.loading) {
      return this.renderLoader();
    }

    return html`
      <div class="game-center">
        <lg-timeline
          programId=${this.programId}
          .loading=${this.loading}
        ></lg-timeline>
      </div>
    `;
  }
}
