import { Container } from 'unstated';

export default class PaletteContainer extends Container {
  tabs = [];
  state = { activeTab: 0 };

  clearTabs = () => (this.tabs = []);
  setTabRef = (el, i) => (this.tabs[i] = el);
  onClick = i => this.setState({ activeTab: i });
  focusActive = () => this.tabs[this.state.activeTab].focus();
  onDelete = i => {
    if (i === this.tabs.length - 1 && i !== 0) {
      this.setState({ activeTab: i - 1 }, this.focusActive);
      return;
    }

    this.focusActive();
  };
  onKeyDown = e => {
    const { activeTab } = this.state;

    switch (e.key) {
      case 'ArrowLeft': {
        e.preventDefault();
        const prev = activeTab === 0 ? this.tabs.length - 1 : activeTab - 1;
        this.setState({ activeTab: prev });
        this.tabs[prev].focus();
        break;
      }
      case 'ArrowRight': {
        e.preventDefault();
        const next = activeTab === this.tabs.length - 1 ? 0 : activeTab + 1;
        this.setState({ activeTab: next });
        this.tabs[next].focus();
        break;
      }
      default:
        break;
    }
  };
}
