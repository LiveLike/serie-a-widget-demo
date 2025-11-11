import { LiveLikeVoteCount } from "@livelike/engagementsdk";
import { PropertyValueMap } from "lit";

class VoteCount extends LiveLikeVoteCount {
  protected updated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    changedProperties.forEach((key: any, name) => {
      if (name === "count" && key > this.count) {
        this.count = key;
      }
    });
  }
}

customElements.define("vote-count", VoteCount as any);
