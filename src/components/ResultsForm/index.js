import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Select, Checkbox } from 'cauldron-react';
import PaletteContainer from '../../containers/PaletteContainer';
import TextInput from '../TextInput';
import './index.css';
const fontSizeOptions = [
  { label: '10pt', value: 10 },
  { label: '11pt', value: 11 },
  { label: '12pt', value: 12 },
  { label: '13pt', value: 13 },
  { label: '14pt', value: 14 },
  { label: '15pt', value: 15 },
  { label: '16pt', value: 16 },
  { label: '17pt', value: 17 },
  { label: '18pt', value: 18 },
  { label: '19pt', value: 19 },
  { label: '20pt', value: 20 }
];
const fontWeightOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'bold', label: 'Bold' }
];
const groupByOptions = [
  { value: 'background', label: 'Background color' },
  { value: 'text', label: 'Text color' }
];

export default class ResultsForm extends Component {
  render() {
    return (
      <Subscribe to={[PaletteContainer]}>
        {({ updateResultsSettings, state: { results } }) => (
          <div className="results">
            <h2>Results</h2>
            <form className="row" onSubmit={e => e.preventDefault()}>
              <TextInput
                id="results-text-sample"
                labelText="Text sample"
                inputRef={el => (this.textSample = el)}
                value={results.sample}
                onChange={() => {
                  updateResultsSettings({
                    sample: this.textSample.value
                  });
                }}
              />
              <Select
                label="Font size"
                listId="results-font-size-list"
                selectedId="selected-font-size-option"
                value={15}
                className="font-size-select"
                options={fontSizeOptions}
                onSelect={({ value }) => {
                  updateResultsSettings({ fontSize: value });
                }}
              />
              <Select
                label="Font weight"
                listId="results-font-weight-list"
                selectedId="selected-font-weight-option"
                value="normal"
                className="font-weight-select"
                options={fontWeightOptions}
                onSelect={({ value }) => {
                  updateResultsSettings({ fontWeight: value });
                }}
              />
              <Select
                label="Group by"
                listId="results-group-by-list"
                selectedId="selected-group-by-option"
                value="background"
                className="group-by-select"
                options={groupByOptions}
                onSelect={({ value }) => {
                  updateResultsSettings({ groupBy: value });
                }}
              />
              <Checkbox
                label="Include black and white text"
                id="black-and-white-text"
                name="bw-txt"
                onClick={e => {
                  if (!e.target.type || e.target.type !== 'checkbox') {
                    return;
                  }

                  updateResultsSettings({
                    includeBlackAndWhite: e.target.checked
                  });
                }}
              />
            </form>
          </div>
        )}
      </Subscribe>
    );
  }
}
