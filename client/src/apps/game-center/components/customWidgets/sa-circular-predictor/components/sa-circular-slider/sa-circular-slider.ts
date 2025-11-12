import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import "./sa-circular-slider.css";

@customElement("sa-circular-slider")
export class CircularSlider extends LitElement {
  @property({ type: Object }) range: {
    min: number;
    max: number;
    step: number;
  } = { min: 0, max: 10, step: 1 };
  @property({ type: Number }) value = 0;
  @property() disabled: boolean = false;
  @state() hasInteracted: boolean = false;

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.value === -1) {
      this.hasInteracted = false;
      this.value = Number(this.range.min);
    } else {
      this.hasInteracted = true;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // Clean up any active event listeners
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("touchend", this.onTouchEnd);
    this.enableScroll();
  }

  center = 98.5;
  radius = 93.5;

  render() {
    let angle;
    if (this.range) {
      angle = this.valueToAngle(this.value);
    }
    const [x, y] = this.angleToCoordinates(angle || 0);

    return html`
      <svg
        width="197"
        height="197"
        @mousedown="${!this.disabled && this.onMouseDown}"
        @touchstart="${!this.disabled && this.onTouchStart}"
      >
        <circle
          class="slider-background"
          style="stroke: #F8F4F1"
          cx="${this.center}"
          cy="${this.center}"
          r="${this.radius}"
          stroke-width="15.175"
        />
        <path
          class="slider-progress"
          style="stroke: #00E8DA;"
          d="${this.describeArc(
            this.center,
            this.center,
            this.radius,
            1,
            angle || 1
          )}"
          stroke-width="15.175"
          stroke-linecap="round"
        />
        <circle
          class="slider-handle"
          style="fill: #225696;"
          cx="${x}"
          cy="${y}"
          r="15"
        />
        <text
          class="slider-value"
          style="fill: #02235C;"
          x="${this.center}"
          y="${this.center}"
          text-anchor="middle"
          dominant-baseline="central"
        >
          ${this.getDisplayScoreValue(this.value, this.hasInteracted)}
        </text>
      </svg>
    `;
  }

  valueToAngle(value: number): number {
    const percentage =
      (value - Number(this.range.min)) /
      (Number(this.range.max) - Number(this.range.min));
    return percentage * 360;
  }

  angleToCoordinates(angle: number): [number, number] {
    const radians = (angle - 90) * (Math.PI / 180);
    return [
      this.center + this.radius * Math.cos(radians),
      this.center + this.radius * Math.sin(radians),
    ];
  }

  describeArc(
    _x: number,
    _y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ): string {
    const start = this.angleToCoordinates(startAngle);
    const end = this.angleToCoordinates(endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${start[0]} ${start[1]} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end[0]} ${end[1]}`;
  }

  onMouseDown = (e: MouseEvent) => {
    this.disableScroll();
    this.updateValue(e);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  };

  onMouseUp = () => {
    this.enableScroll();
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  };

  onTouchStart = (e: TouchEvent) => {
    this.disableScroll();
    this.updateValue(e.touches[0]);
    window.addEventListener("touchmove", this.onTouchMove, { passive: false });
    window.addEventListener("touchend", this.onTouchEnd);
  };

  onTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    this.updateValue(e.touches[0]);
  };

  onTouchEnd = () => {
    this.enableScroll();
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("touchend", this.onTouchEnd);
  };

  disableScroll() {
    const scrollContainer = document.getElementById("ll-predictor-game-scroll");
    if (scrollContainer) {
      scrollContainer.style.overflow = "hidden";
      scrollContainer.style.touchAction = "none"; // Prevent touch scrolling
    }
  }

  enableScroll() {
    const scrollContainer = document.getElementById("ll-predictor-game-scroll");
    if (scrollContainer) {
      scrollContainer.style.overflow = "";
      scrollContainer.style.touchAction = "";
    }
  }

  onMouseMove = (e: MouseEvent) => {
    this.updateValue(e);
  };

  getDisplayScoreValue = (value: number, hasInteracted: boolean) => {
    if (!hasInteracted) {
      return "-";
    }
    return value;
  };

  updateValue(e: MouseEvent | Touch) {
    this.hasInteracted = true;
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - this.center;
    const y = e.clientY - rect.top - this.center;
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    const percentage = angle / 360;
    let newValue =
      Number(this.range.min) + percentage * (this.range.max - this.range.min);
    newValue = Math.round(newValue / this.range.step) * this.range.step;
    this.value = Math.min(Math.max(newValue, this.range.min), this.range.max);
    this.dispatchEvent(new CustomEvent("change", { detail: this.value }));
  }
}
