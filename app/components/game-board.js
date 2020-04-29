import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

const STATES = {
  PLAYING: 'Playihng',
  FINISHED: 'Finished',
};
const POSSIBLE_CHOICES = {
  B: range(15, 1),
  I: range(15, 16),
  N: range(15, 31),
  G: range(15, 46),
  O: range(15, 61),
};
const MAX_CHOICES = 75;

export default class GameBoardComponent extends Component {
  @tracked currentSelection = null;
  @tracked selections = [];
  @tracked showSelections = false;
  @tracked state = STATES.PLAYING;

  get hasSelectionsLeft() {
    return this.selections.length < MAX_CHOICES - 1;
  }

  get isPlaying() {
    return this.state === STATES.PLAYING;
  }

  get isFinished() {
    return this.state === STATES.FINISHED;
  }

  @action
  nextSelection() {
    this.showSelections = false;

    if (!this.hasSelectionsLeft) {
      this.state = STATES.FINISHED;
      return;
    }

    let selection;

    do {
      let choiceKeys = Object.keys(POSSIBLE_CHOICES);
      let letter = choiceKeys[randomNumber(choiceKeys.length)];
      let letterOptions = POSSIBLE_CHOICES[letter];
      let number = letterOptions[randomNumber(letterOptions.length)];
      selection = `${letter}${number}`;
    } while (this.selections.includes(selection));

    this.selections.push(selection);
    this.currentSelection = selection;
  }

  @action
  toggleSelections() {
    this.showSelections = !this.showSelections;

    if (this.showSelections) {
      this.selections = this.selections.sort();
    }
  }
}
