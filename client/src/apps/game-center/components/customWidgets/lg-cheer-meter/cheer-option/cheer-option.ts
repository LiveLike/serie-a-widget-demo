import { LiveLikeWidgetElement } from "@livelike/engagementsdk";
const html = (window as any).html;

class CheerOption extends LiveLikeWidgetElement {
  createRenderRoot(): this {
    return this;
  }
  votePercentage = () => {
    const totalVotes = this.items.reduce(
      (a: number, b: any) => a + b["vote_count"],
      0
    );
    return totalVotes > 0
      ? Math.round((this.item.vote_count / totalVotes) * 100)
      : 0;
  };
  optionVoteUpdated = () => {
    const imageContainer = this.shadowRoot.querySelector("livelike-image");
    imageContainer &&
      imageContainer.style.setProperty(
        "background",
        `linear-gradient(0deg, #0096ff ${this.votePercentage()}%, transparent 0)`
      );
  };
  render() {
    return html`
      <style>
        livelike-image {
            height="48px"
        width="48px"
          padding: 10px;

          border-radius: 6px;
        }
        livelike-image img {
          border-radius: 4px;
        }
      </style>
      <div
        style="background: linear-gradient(0deg, #00E8DA ${this.votePercentage()}%, #F8F4F1 0);"
        class="cheer-image-container"
      >
        <livelike-image
          height="48px"
          width="48px"
          class="cheer-image"
        ></livelike-image>
      </div>
    `;
  }
}
customElements.define("cheer-option", CheerOption as any);
